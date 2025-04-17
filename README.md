
# Powered_by AI Email Agent

This project provides an AI-powered email agent that can automatically read, understand, and reply to emails using advanced natural language processing. Vist us at www.poweredby.agency for assistance on how to implement this for your use case. 

## Features

- **Gmail Integration**: Connect to Gmail accounts and monitor incoming emails
- **AI-Powered Replies**: Generate context-aware responses to emails
- **Knowledge Base**: Upload documents to provide reference information to the AI
- **Approval Workflow**: Review AI-generated replies before sending
- **Analytics**: Track email agent performance and collect user feedback

## Project Structure

```
poweredbyapp/
├── functions/                 # Netlify serverless functions
│   ├── auth/
│   │   └── gmail-callback.js  # OAuth handler
│   ├── poll-inbox.js          # Gmail polling
│   ├── generate-reply.js      # OpenAI reply logic
│   ├── send-reply.js          # Send email replies
│   ├── process-kb-upload.js   # KB file embedding
├── supabase/
│   ├── schema.sql             # Database schema
├── netlify.toml               # Netlify configuration
├── .env.example               # Example environment variables
```

## Setup Instructions

### Prerequisites

1. Supabase account and project
2. OpenAI API key
3. Gmail API credentials
4. Netlify account

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
# Copy example env file
cp .env.example .env

# Edit with your values
nano .env
```

### Supabase Setup

1. Create a new Supabase project
2. Run the schema from `supabase/schema.sql`
3. Enable vector extension if not already enabled:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

### Gmail API Setup

1. Create a project in Google Cloud Console
2. Enable Gmail API
3. Create OAuth credentials (web application type)
4. Add authorized redirect URI: `https://your-netlify-site.netlify.app/.netlify/functions/gmail-callback`

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Configure build settings as per `netlify.toml`
3. Add all environment variables from `.env` to Netlify environment variables

## Required Dependencies

The project requires the following npm packages:

```bash
npm install @supabase/supabase-js openai googleapis pdf-parse mammoth node-fetch
```

## Development

For local development, install the Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify link
netlify dev
```

## License

This project is licensed under the MIT License.
