
/**
 * Error Monitoring Utility
 * 
 * Provides centralized error logging, notification, and alerting
 * for all Netlify functions in the application.
 */

const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Logs an error and sends notifications
 * 
 * @param {Object} options
 * @param {string} options.functionName - Name of the function where error occurred
 * @param {Error|Object} options.error - The error object
 * @param {string} options.agentId - ID of the agent (if applicable)
 * @param {Object} options.metadata - Additional context about the error
 * @returns {Promise<void>}
 */
const notifyFailure = async ({ functionName, error, agentId, metadata = {} }) => {
  console.error(`Error in ${functionName}:`, error);
  
  const errorMessage = error.message || JSON.stringify(error);

  try {
    // 1. Save to Supabase
    await supabase.from('error_logs').insert({
      function_name: functionName,
      error_message: errorMessage,
      agent_id: agentId,
      metadata
    });
    console.log('Error logged to Supabase');
  } catch (dbError) {
    console.error('Failed to log error to database:', dbError);
  }

  // Only proceed with notifications if environment variables are set
  if (process.env.SLACK_WEBHOOK_URL) {
    try {
      // 2. Slack Notification
      await axios.post(process.env.SLACK_WEBHOOK_URL, {
        text: `🚨 Error in \`${functionName}\` for agent ${agentId}:\n${errorMessage}`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*🚨 Error in \`${functionName}\`*`
            }
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Agent:*\n${agentId || 'N/A'}`
              },
              {
                type: "mrkdwn",
                text: `*Time:*\n${new Date().toISOString()}`
              }
            ]
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Error:*\n\`\`\`${errorMessage}\`\`\``
            }
          }
        ]
      });
      console.log('Error notification sent to Slack');
    } catch (slackError) {
      console.error('Failed to send Slack notification:', slackError);
    }
  }

  // Only send email if Mailgun credentials are configured
  if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
    try {
      // 3. Email alert via Mailgun
      await axios.post(`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`, 
        new URLSearchParams({
          from: 'AI Agent Monitor <alerts@yourdomain.com>',
          to: process.env.ALERT_EMAIL || 'you@yourdomain.com',
          subject: `❗ AI Agent Error: ${functionName}`,
          text: `Error: ${errorMessage}\nAgent ID: ${agentId}\nTimestamp: ${new Date().toISOString()}\nMetadata: ${JSON.stringify(metadata, null, 2)}`
        }), 
        {
          auth: {
            username: 'api',
            password: process.env.MAILGUN_API_KEY
          }
        }
      );
      console.log('Error notification email sent');
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }
  }
};

module.exports = {
  notifyFailure
};

