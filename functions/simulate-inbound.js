
/**
 * Simulate Inbound Email Function
 * 
 * This function is for testing purposes to simulate receiving an email
 * without having to set up the actual Gmail integration.
 */

const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const { notifyFailure } = require('./utils/errorMonitoring');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Only allow in development or if auth token provided
  const isDev = process.env.NODE_ENV === 'development';
  const authHeader = event.headers.authorization || '';
  
  // Simple auth check for production (customize as needed)
  if (!isDev && !authHeader.startsWith('Bearer ')) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    await notifyFailure({
      functionName: 'simulate-inbound',
      error: error,
      metadata: { rawBody: event.body }
    });
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { agentId, from_address, subject, raw_body } = body;
  
  if (!agentId || !from_address || !subject || !raw_body) {
    const error = new Error('Missing required fields');
    await notifyFailure({
      functionName: 'simulate-inbound',
      error: error,
      agentId: agentId,
      metadata: { from: from_address }
    });
    return { statusCode: 400, body: 'Missing required fields' };
  }

  console.log(`Simulating email from ${from_address} for agent ${agentId}`);

  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    // Generate a random Gmail-like message ID for testing
    const gmailMessageId = `sim_${uuidv4()}`;
    
    // Get the agent to verify it exists
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('id, company_name')
      .eq('id', agentId)
      .single();
    
    if (agentError || !agent) {
      await notifyFailure({
        functionName: 'simulate-inbound',
        error: agentError || new Error('Agent not found'),
        agentId,
        metadata: { from: from_address }
      });
      return { statusCode: 404, body: 'Agent not found' };
    }
    
    // Create a new email log entry
    const { data: emailLog, error: insertError } = await supabase
      .from('email_logs')
      .insert({
        agent_id: agentId,
        gmail_message_id: gmailMessageId,
        from_address,
        subject,
        raw_body,
        status: 'received',
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (insertError) {
      await notifyFailure({
        functionName: 'simulate-inbound',
        error: insertError,
        agentId,
        metadata: { from: from_address }
      });
      return { statusCode: 500, body: 'Failed to create email log' };
    }
    
    console.log(`Simulated email created with ID ${gmailMessageId}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Simulated email received',
        gmailMessageId: gmailMessageId,
        emailLogId: emailLog.id
      })
    };
  } catch (error) {
    console.error('Simulate inbound error:', error);
    await notifyFailure({
      functionName: 'simulate-inbound',
      error: error,
      agentId,
      metadata: { from: from_address }
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
