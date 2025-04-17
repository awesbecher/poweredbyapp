
/**
 * Gmail Inbox Polling Function
 * 
 * Retrieves new emails from Gmail and stores them in the database.
 * This function is designed to be run on a schedule.
 */

const { createClient } = require('@supabase/supabase-js');
const { google } = require('googleapis');

exports.handler = async function(event, context) {
  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    // Get all active email agents
    const { data: agents, error: agentError } = await supabase
      .from('email_agents')
      .select('*')
      .eq('status', 'active');
    
    if (agentError) {
      console.error('Error fetching agents:', agentError);
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch agents' }) };
    }
    
    for (const agent of agents) {
      // Get Gmail auth tokens for this agent's email
      const { data: auth, error: authError } = await supabase
        .from('gmail_auth')
        .select('*')
        .eq('email', agent.agent_email)
        .single();
      
      if (authError || !auth) {
        console.error(`No auth found for agent ${agent.id}:`, authError);
        continue;
      }
      
      // Check if token needs refresh
      let accessToken = auth.access_token;
      if (new Date(auth.expires_at) <= new Date()) {
        // Token expired, refresh it
        const oauth2Client = new google.auth.OAuth2(
          process.env.GMAIL_CLIENT_ID,
          process.env.GMAIL_CLIENT_SECRET,
          process.env.REDIRECT_URI
        );
        
        oauth2Client.setCredentials({
          refresh_token: auth.refresh_token
        });
        
        try {
          const { token } = await oauth2Client.getAccessToken();
          accessToken = token;
          
          // Update the token in database
          await supabase
            .from('gmail_auth')
            .update({
              access_token: token,
              expires_at: new Date(Date.now() + 3600 * 1000).toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('email', agent.agent_email);
        } catch (refreshError) {
          console.error(`Failed to refresh token for ${agent.id}:`, refreshError);
          continue;
        }
      }
      
      // Initialize Gmail API
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: accessToken });
      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
      
      // Get recent emails
      const messageList = await gmail.users.messages.list({
        userId: 'me',
        q: 'is:unread',
        maxResults: 10
      });
      
      const messages = messageList.data.messages || [];
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
          continue;
        }
        
        // Get full message content
        const fullMessage = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full'
        });
        
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
        const status = agent.auto_reply ? 'received' : 'awaiting_approval';
        const { error: insertError } = await supabase
          .from('email_logs')
          .insert({
            agent_id: agent.id,
            gmail_message_id: message.id,
            from_address: fromAddress,
            subject: subjectHeader ? subjectHeader.value : '(no subject)',
            raw_body: body,
            status: status,
            created_at: new Date().toISOString()
          });
        
        if (insertError) {
          console.error(`Error storing email ${message.id}:`, insertError);
        } else if (agent.auto_reply) {
          // Trigger auto-reply generation
          await fetch(`${process.env.BASE_URL}/.netlify/functions/generate-reply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              messageId: message.id,
              agentId: agent.id 
            })
          });
        }
      }
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Poll inbox error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
