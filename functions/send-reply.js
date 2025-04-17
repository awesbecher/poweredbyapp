
/**
 * Send Email Reply Function
 * 
 * Sends an email reply through Gmail API using the agent's credentials.
 */

const { createClient } = require('@supabase/supabase-js');
const { google } = require('googleapis');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { agentId, gmailMessageId, replyText } = body;
  
  if (!agentId || !gmailMessageId || !replyText) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    // Get the email data
    const { data: email, error: emailError } = await supabase
      .from('email_logs')
      .select('*')
      .eq('agent_id', agentId)
      .eq('gmail_message_id', gmailMessageId)
      .single();
    
    if (emailError || !email) {
      console.error('Error fetching email:', emailError);
      return { statusCode: 404, body: 'Email not found' };
    }
    
    // Get the agent configuration
    const { data: agent, error: agentError } = await supabase
      .from('email_agents')
      .select('*')
      .eq('id', agentId)
      .single();
    
    if (agentError || !agent) {
      console.error('Error fetching agent:', agentError);
      return { statusCode: 404, body: 'Agent not found' };
    }
    
    // Get Gmail auth for this agent
    const { data: auth, error: authError } = await supabase
      .from('gmail_auth')
      .select('*')
      .eq('email', agent.agent_email)
      .single();
    
    if (authError || !auth) {
      console.error('Error fetching auth:', authError);
      return { statusCode: 404, body: 'Auth not found' };
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
        console.error('Failed to refresh token:', refreshError);
        return { statusCode: 500, body: 'Failed to refresh token' };
      }
    }
    
    // Initialize Gmail API
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    // Get original message to extract headers
    const originalMessage = await gmail.users.messages.get({
      userId: 'me',
      id: gmailMessageId,
    });
    
    const headers = originalMessage.data.payload.headers;
    const fromHeader = headers.find(h => h.name === 'From');
    const subjectHeader = headers.find(h => h.name === 'Subject');
    const messageIdHeader = headers.find(h => h.name === 'Message-ID');
    
    let subject = subjectHeader ? subjectHeader.value : '(no subject)';
    if (!subject.toLowerCase().startsWith('re:')) {
      subject = `Re: ${subject}`;
    }
    
    // Create email content
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
      `From: ${agent.agent_email}`,
      `To: ${email.from_address}`,
      'Content-Type: text/plain; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      `In-Reply-To: ${messageIdHeader ? messageIdHeader.value : ''}`,
      `References: ${messageIdHeader ? messageIdHeader.value : ''}`,
      '',
      replyText
    ];
    const message = messageParts.join('\n');
    
    // Send the email
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
        threadId: originalMessage.data.threadId
      }
    });
    
    // Update the email record as replied
    const { error: updateError } = await supabase
      .from('email_logs')
      .update({
        ai_reply: replyText,
        status: 'replied',
        updated_at: new Date().toISOString()
      })
      .eq('id', email.id);
    
    if (updateError) {
      console.error('Error updating email status:', updateError);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Reply sent successfully'
      })
    };
  } catch (error) {
    console.error('Send reply error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
