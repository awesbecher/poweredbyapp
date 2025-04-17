
-- Enable the pgvector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Generate UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- agents table
create table if not exists agents (
  id uuid primary key default gen_random_uuid(),
  company_name text,
  agent_email text,
  purpose text,
  tone text,
  auto_reply boolean default true,
  gmail_access_token text,
  gmail_refresh_token text,
  gmail_token_expires_at timestamp,
  created_at timestamp default now(),
  prompt_variations jsonb
);

-- knowledgebase_files table
create table if not exists knowledgebase_files (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id),
  file_name text,
  file_url text,
  uploaded_at timestamp default now()
);

-- kb_embeddings table
create table if not exists kb_embeddings (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id),
  chunk_text text,
  embedding vector(1536),
  source_file text,
  created_at timestamp default now()
);

-- email_logs table
create table if not exists email_logs (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id),
  gmail_message_id text,
  from_address text,
  subject text,
  raw_body text,
  ai_reply text,
  status text default 'received', -- received | replied | awaiting_approval | rejected
  user_rating int,
  user_feedback text,
  created_at timestamp default now(),
  auto_reply_analysis jsonb
);

-- error_logs table for monitoring
create table if not exists error_logs (
  id uuid primary key default gen_random_uuid(),
  function_name text,
  error_message text,
  agent_id uuid,
  metadata jsonb,
  created_at timestamp default now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS agents_email_idx ON agents(agent_email);
CREATE INDEX IF NOT EXISTS kb_embeddings_agent_id_idx ON kb_embeddings(agent_id);
CREATE INDEX IF NOT EXISTS email_logs_agent_id_idx ON email_logs(agent_id);
CREATE INDEX IF NOT EXISTS email_logs_status_idx ON email_logs(status);
CREATE INDEX IF NOT EXISTS error_logs_agent_id_idx ON error_logs(agent_id);
CREATE INDEX IF NOT EXISTS error_logs_function_idx ON error_logs(function_name);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledgebase_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated access
CREATE POLICY "Users can access their own data" ON agents
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can access their own knowledge files" ON knowledgebase_files
  FOR ALL USING (agent_id IN (SELECT id FROM agents WHERE auth.uid() = id));

CREATE POLICY "Users can access their own embeddings" ON kb_embeddings
  FOR ALL USING (agent_id IN (SELECT id FROM agents WHERE auth.uid() = id));

CREATE POLICY "Users can access their own email logs" ON email_logs
  FOR ALL USING (agent_id IN (SELECT id FROM agents WHERE auth.uid() = id));

CREATE POLICY "Users can access their own error logs" ON error_logs
  FOR ALL USING (agent_id IN (SELECT id FROM agents WHERE auth.uid() = id));
