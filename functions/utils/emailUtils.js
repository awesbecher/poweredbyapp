
/**
 * Email Utility Functions
 * 
 * Functions for formatting and sending emails through Gmail API
 */

const { google } = require('googleapis');
const { notifyFailure } = require('./errorMonitoring');

/**
 * Create Gmail API client with OAuth credentials
 * 
 * @param {string} accessToken - Valid Gmail access token
 * @returns {Object} Authenticated Gmail API client
 */
const createGmailClient = (accessToken) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.gmail({ version: 'v1', auth: oauth2Client });
};

/**
 * Get original email message details from Gmail API
 * 
 * @param {Object} gmail - Gmail API client
 * @param {string} gmailMessageId - Message ID to retrieve
 * @returns {Promise<Object>} Original message data
 */
const getOriginalMessage = async (gmail, gmailMessageId) => {
  try {
    return await gmail.users.messages.get({
      userId: 'me',
      id: gmailMessageId,
    });
  } catch (error) {
    throw new Error(`Failed to retrieve original message: ${error.message}`);
  }
};

/**
 * Format and encode email reply for sending
 * 
 * @param {Object} options - Email formatting options
 * @param {string} options.fromAddress - Sender email address
 * @param {string} options.toAddress - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.messageId - Original message ID for threading
 * @param {string} options.replyText - Email reply content
 * @returns {string} Base64 URL encoded email
 */
const formatEmailReply = ({ fromAddress, toAddress, subject, messageId, replyText }) => {
  // Format subject with Re: prefix if needed
  let formattedSubject = subject;
  if (!subject.toLowerCase().startsWith('re:')) {
    formattedSubject = `Re: ${subject}`;
  }
  
  // Encode subject for UTF-8 support
  const utf8Subject = `=?utf-8?B?${Buffer.from(formattedSubject).toString('base64')}?=`;
  
  // Build email parts
  const messageParts = [
    `From: ${fromAddress}`,
    `To: ${toAddress}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    messageId ? `In-Reply-To: ${messageId}` : '',
    messageId ? `References: ${messageId}` : '',
    '',
    replyText
  ];
  
  const message = messageParts.join('\n');
  
  // Encode for Gmail API
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

/**
 * Send email reply through Gmail API
 * 
 * @param {Object} gmail - Gmail API client
 * @param {string} encodedMessage - Base64 URL encoded email
 * @param {string} threadId - Thread ID for reply
 * @returns {Promise<Object>} Send response
 */
const sendEmailReply = async (gmail, encodedMessage, threadId) => {
  try {
    return await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
        threadId: threadId
      }
    });
  } catch (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = {
  createGmailClient,
  getOriginalMessage,
  formatEmailReply,
  sendEmailReply
};
