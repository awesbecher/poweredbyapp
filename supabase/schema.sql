
-- Schema for AI Email Agent system

-- Gmail authentication tokens
CREATE TABLE gmail_auth (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email agents configuration
CREATE TABLE email_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  agent_email TEXT UNIQUE NOT NULL,
  purpose TEXT NOT NULL,
  tone TEXT NOT NULL,
  auto_reply BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email logs
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES email_agents(id) ON DELETE CASCADE,
  gmail_message_id TEXT NOT NULL,
  from_address TEXT NOT NULL,
  subject TEXT NOT NULL,
  raw_body TEXT NOT NULL,
  ai_reply TEXT,
  status TEXT NOT NULL CHECK (status IN ('received', 'awaiting_approval', 'replied', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
  user_feedback TEXT
);

-- Knowledge base embeddings
CREATE TABLE kb_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES email_agents(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX kb_embeddings_agent_id_idx ON kb_embeddings USING btree (agent_id);

-- Add RLS policies
-- Disable RLS by default - you'll want to customize these based on your auth setup
ALTER TABLE gmail_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb_embeddings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to access their data
CREATE POLICY "Users can access their own data" ON email_agents
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can access their own email logs" ON email_logs
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can access their own auth data" ON gmail_auth
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can access their own KB embeddings" ON kb_embeddings
  FOR ALL
  TO authenticated
  USING (true);
