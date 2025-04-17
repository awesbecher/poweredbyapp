
/**
 * Send Email Reply Function
 * 
 * Sends an email reply through Gmail API using the agent's credentials.
 */

const { createClient } = require('@supabase/supabase-js');
const { notifyFailure } = require('./utils/errorMonitoring');
const { createGmailClient, getOriginalMessage, formatEmailReply, sendEmailReply } = require('./utils/emailUtils');
const { refreshTokenIfNeeded } = require('./utils/tokenUtils');
const { getEmailByMessageId, getAgentById, updateEmailWithReply } = require('./utils/databaseUtils');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    await notifyFailure({
      functionName: 'send-reply',
      error: error,
      metadata: { rawBody: event.body }
    });
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { agentId, gmailMessageId, replyText } = body;
  
  if (!agentId || !gmailMessageId || !replyText) {
    const error = new Error('Missing required fields');
    await notifyFailure({
      functionName: 'send-reply',
      error: error,
      agentId: agentId,
      metadata: { gmailMessageId }
    });
    return { statusCode: 400, body: 'Missing required fields' };
  }

  console.log(`Sending reply for message ${gmailMessageId}, agent ${agentId}`);

  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    // Get the email and agent data using utility functions
    const email = await getEmailByMessageId(supabase, agentId, gmailMessageId);
    const agent = await getAgentById(supabase, agentId);
    
    // Refresh token if needed
    const accessToken = await refreshTokenIfNeeded(supabase, agent);
    
    // Initialize Gmail API client
    const gmail = createGmailClient(accessToken);
    
    // Get original message to extract headers
    const originalMessage = await getOriginalMessage(gmail, gmailMessageId);
    
    // Extract necessary headers
    const headers = originalMessage.data.payload.headers;
    const fromHeader = headers.find(h => h.name === 'From');
    const subjectHeader = headers.find(h => h.name === 'Subject');
    const messageIdHeader = headers.find(h => h.name === 'Message-ID');
    
    // Format email for sending
    const encodedMessage = formatEmailReply({
      fromAddress: agent.agent_email,
      toAddress: email.from_address,
      subject: subjectHeader ? subjectHeader.value : '(no subject)',
      messageId: messageIdHeader ? messageIdHeader.value : '',
      replyText: replyText
    });
    
    // Send the email
    await sendEmailReply(gmail, encodedMessage, originalMessage.data.threadId);
    console.log('Email reply sent successfully');
    
    // Update the email record as replied
    await updateEmailWithReply(supabase, email.id, replyText);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Reply sent successfully'
      })
    };
  } catch (error) {
    console.error('Send reply error:', error);
    await notifyFailure({
      functionName: 'send-reply',
      error: error,
      agentId: agentId,
      metadata: { gmailMessageId }
    });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' })
    };
  }
};
