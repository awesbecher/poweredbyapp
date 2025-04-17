
/**
 * Gmail Inbox Polling Function
 * 
 * Retrieves new emails from Gmail and stores them in the database.
 * This function is designed to be run on a schedule.
 */

const { createClient } = require('@supabase/supabase-js');
const { google } = require('googleapis');
const { notifyFailure } = require('./utils/errorMonitoring');

exports.handler = async function(event, context) {
  // Check if this is triggered by a scheduled event
  const isScheduled = event.headers && event.headers['x-netlify-scheduled-function-name'] === 'poll-inbox';
  console.log(`Poll inbox triggered. Scheduled: ${isScheduled}`);
  
  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    // Get all active email agents
    const { data: agents, error: agentError } = await supabase
      .from('agents')
      .select('*')
      .not('gmail_access_token', 'is', null);
    
    if (agentError) {
      await notifyFailure({
        functionName: 'poll-inbox',
        error: agentError,
        metadata: { operation: 'fetch_agents' }
      });
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch agents' }) };
    }
    
    console.log(`Found ${agents.length} agents with Gmail credentials`);
    
    for (const agent of agents) {
      // Check if token needs refresh
      let accessToken = agent.gmail_access_token;
      if (new Date(agent.gmail_token_expires_at) <= new Date()) {
        // Token expired, refresh it
        const oauth2Client = new google.auth.OAuth2(
          process.env.GMAIL_CLIENT_ID,
          process.env.GMAIL_CLIENT_SECRET,
          process.env.REDIRECT_URI
        );
        
        oauth2Client.setCredentials({
          refresh_token: agent.gmail_refresh_token
        });
        
        try {
          const { token } = await oauth2Client.getAccessToken();
          accessToken = token;
          
          // Update the token in database
          await supabase
            .from('agents')
            .update({
              gmail_access_token: token,
              gmail_token_expires_at: new Date(Date.now() + 3600 * 1000).toISOString()
            })
            .eq('id', agent.id);
            
          console.log(`Refreshed token for agent ${agent.id}`);
        } catch (refreshError) {
          await notifyFailure({
            functionName: 'poll-inbox',
            error: refreshError,
            agentId: agent.id,
            metadata: { operation: 'refresh_token' }
          });
          console.log(`Skipping agent ${agent.id} due to token refresh failure`);
          continue;
        }
      }
      
      // Initialize Gmail API
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: accessToken });
      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
      
      try {
        // Get recent unread emails
        const messageList = await gmail.users.messages.list({
          userId: 'me',
          q: 'is:unread',
          maxResults: 10
        });
        
        const messages = messageList.data.messages || [];
        console.log(`Found ${messages.length} unread messages for agent ${agent.id}`);
        
        for (const message of messages) {
          // Check if we've already processed this message
          const { data: existingEmail } = await supabase
            .from('email_logs')
            .select('id')
            .eq('gmail_message_id', message.id)
            .eq('agent_id', agent.id)
            .single();
          
          if (existingEmail) {
            // Skip already processed emails
            console.log(`Skipping already processed message: ${message.id}`);
            continue;
          }
          
          // Get full message content
          let fullMessage;
          try {
            fullMessage = await gmail.users.messages.get({
              userId: 'me',
              id: message.id,
              format: 'full'
            });
          } catch (messageError) {
            await notifyFailure({
              functionName: 'poll-inbox',
              error: messageError,
              agentId: agent.id,
              metadata: { 
                messageId: message.id,
                operation: 'get_message' 
              }
            });
            continue;
          }
          
          const headers = fullMessage.data.payload.headers;
          const fromHeader = headers.find(h => h.name === 'From');
          const subjectHeader = headers.find(h => h.name === 'Subject');
          
          let body = '';
          // Extract message body
          if (fullMessage.data.payload.parts) {
            // Multipart message
            for (const part of fullMessage.data.payload.parts) {
              if (part.mimeType === 'text/plain' && part.body.data) {
                body += Buffer.from(part.body.data, 'base64').toString('utf8');
                break;
              }
            }
          } else if (fullMessage.data.payload.body.data) {
            // Simple message
            body = Buffer.from(fullMessage.data.payload.body.data, 'base64').toString('utf8');
          }
          
          // Parse the from address
          const fromAddress = fromHeader ? fromHeader.value.match(/<(.+)>/) ? 
            fromHeader.value.match(/<(.+)>/)[1] : fromHeader.value : 'unknown';
          
          // Add email to database
          const { data: newEmail, error: insertError } = await supabase
            .from('email_logs')
            .insert({
              agent_id: agent.id,
              gmail_message_id: message.id,
              from_address: fromAddress,
              subject: subjectHeader ? subjectHeader.value : '(no subject)',
              raw_body: body,
              status: 'received',
              created_at: new Date().toISOString()
            })
            .select()
            .single();
          
          if (insertError) {
            await notifyFailure({
              functionName: 'poll-inbox',
              error: insertError,
              agentId: agent.id,
              metadata: { 
                messageId: message.id,
                operation: 'insert_email' 
              }
            });
            console.error(`Error storing email ${message.id}:`, insertError);
          } else {
            console.log(`Stored new email ${message.id} from ${fromAddress}`);
            
            // Mark message as read in Gmail
            try {
              await gmail.users.messages.modify({
                userId: 'me',
                id: message.id,
                requestBody: {
                  removeLabelIds: ['UNREAD']
                }
              });
            } catch (markReadError) {
              await notifyFailure({
                functionName: 'poll-inbox',
                error: markReadError,
                agentId: agent.id,
                metadata: { 
                  messageId: message.id,
                  operation: 'mark_read' 
                }
              });
            }
            
            // Trigger generate-reply function
            try {
              await fetch(`${process.env.BASE_URL}/.netlify/functions/generate-reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  messageId: message.id,
                  agentId: agent.id 
                })
              });
              console.log(`Triggered generate-reply for message ${message.id}`);
            } catch (triggerError) {
              await notifyFailure({
                functionName: 'poll-inbox',
                error: triggerError,
                agentId: agent.id,
                metadata: { 
                  messageId: message.id,
                  operation: 'trigger_generate_reply' 
                }
              });
            }
          }
        }
      } catch (gmailError) {
        await notifyFailure({
          functionName: 'poll-inbox',
          error: gmailError,
          agentId: agent.id,
          metadata: { operation: 'gmail_api' }
        });
      }
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Inbox polling complete' })
    };
  } catch (error) {
    console.error('Poll inbox error:', error);
    await notifyFailure({
      functionName: 'poll-inbox',
      error,
      metadata: { operation: 'main' }
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
