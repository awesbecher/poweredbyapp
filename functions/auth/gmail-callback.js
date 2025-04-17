
/**
 * Gmail OAuth Callback Handler
 * 
 * This function handles the OAuth callback from Gmail.
 * It exchanges the authorization code for tokens and stores them securely.
 */

const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const code = event.queryStringParameters.code;
  if (!code) {
    return { statusCode: 400, body: 'Missing authorization code' };
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GMAIL_CLIENT_ID,
        client_secret: process.env.GMAIL_CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();
    
    if (tokens.error) {
      console.error('Error exchanging code for tokens:', tokens.error_description);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Failed to exchange code for tokens' }),
      };
    }

    // Extract token data
    const { access_token, refresh_token, expires_in } = tokens;
    const expires_at = new Date(Date.now() + expires_in * 1000).toISOString();

    // Get user info to identify the Gmail account
    const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    const userInfo = await userInfoResponse.json();
    const email = userInfo.email;

    // Update the agent record with Gmail tokens
    const { error } = await supabase
      .from('agents')
      .update({
        gmail_access_token: access_token,
        gmail_refresh_token: refresh_token,
        gmail_token_expires_at: expires_at,
      })
      .eq('agent_email', email);

    if (error) {
      console.error('Error storing tokens:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to store tokens' }),
      };
    }

    // Redirect back to the application
    return {
      statusCode: 302,
      headers: {
        Location: '/email-agent?auth=success',
      },
      body: 'Redirecting...',
    };
  } catch (error) {
    console.error('OAuth callback error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
