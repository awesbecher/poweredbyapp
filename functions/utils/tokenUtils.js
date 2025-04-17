
/**
 * Token Management Utility Functions
 * 
 * Functions for refreshing and managing OAuth access tokens
 */

const { google } = require('googleapis');
const { notifyFailure } = require('./errorMonitoring');

/**
 * Refresh Gmail access token if expired
 *
 * @param {Object} supabase - Supabase client
 * @param {Object} agent - Agent data with token information
 * @returns {Promise<string>} Valid access token
 */
const refreshTokenIfNeeded = async (supabase, agent) => {
  // Check if token is expired
  if (new Date(agent.gmail_token_expires_at) <= new Date()) {
    console.log('Access token expired, refreshing...');
    
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.REDIRECT_URI
    );
    
    oauth2Client.setCredentials({
      refresh_token: agent.gmail_refresh_token
    });
    
    try {
      // Refresh the token
      const { token } = await oauth2Client.getAccessToken();
      
      // Update the token in database
      await supabase
        .from('agents')
        .update({
          gmail_access_token: token,
          gmail_token_expires_at: new Date(Date.now() + 3600 * 1000).toISOString()
        })
        .eq('id', agent.id);
      
      console.log('Successfully refreshed access token');
      return token;
    } catch (error) {
      throw new Error(`Failed to refresh token: ${error.message}`);
    }
  }
  
  // Token is still valid
  return agent.gmail_access_token;
};

module.exports = {
  refreshTokenIfNeeded
};
