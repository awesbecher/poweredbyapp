
/**
 * Database Utility Functions
 * 
 * Functions for database operations related to email processing
 */

const { notifyFailure } = require('./errorMonitoring');

/**
 * Get email data by message ID
 *
 * @param {Object} supabase - Supabase client
 * @param {string} agentId - Agent ID
 * @param {string} gmailMessageId - Gmail message ID
 * @returns {Promise<Object>} Email data
 */
const getEmailByMessageId = async (supabase, agentId, gmailMessageId) => {
  const { data: email, error } = await supabase
    .from('email_logs')
    .select('*')
    .eq('agent_id', agentId)
    .eq('gmail_message_id', gmailMessageId)
    .single();
  
  if (error || !email) {
    throw new Error(error ? error.message : 'Email not found');
  }
  
  return email;
};

/**
 * Get agent configuration by ID
 *
 * @param {Object} supabase - Supabase client
 * @param {string} agentId - Agent ID
 * @returns {Promise<Object>} Agent configuration data
 */
const getAgentById = async (supabase, agentId) => {
  const { data: agent, error } = await supabase
    .from('agents')
    .select('*')
    .eq('id', agentId)
    .single();
  
  if (error || !agent) {
    throw new Error(error ? error.message : 'Agent not found');
  }
  
  return agent;
};

/**
 * Update email log with reply status
 *
 * @param {Object} supabase - Supabase client
 * @param {string} emailId - Email log ID
 * @param {string} replyText - AI generated reply text
 * @returns {Promise<void>}
 */
const updateEmailWithReply = async (supabase, emailId, replyText) => {
  const { error } = await supabase
    .from('email_logs')
    .update({
      ai_reply: replyText,
      status: 'replied',
      updated_at: new Date().toISOString()
    })
    .eq('id', emailId);
  
  if (error) {
    throw new Error(`Failed to update email status: ${error.message}`);
  }
};

module.exports = {
  getEmailByMessageId,
  getAgentById,
  updateEmailWithReply
};
