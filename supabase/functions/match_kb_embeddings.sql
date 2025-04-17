
CREATE OR REPLACE FUNCTION match_kb_embeddings(
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  agent_id uuid
)
RETURNS TABLE (
  id uuid,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kb_embeddings.id,
    kb_embeddings.chunk_text as content,
    1 - (kb_embeddings.embedding <=> query_embedding) as similarity
  FROM kb_embeddings
  WHERE 
    kb_embeddings.agent_id = match_kb_embeddings.agent_id
    AND 1 - (kb_embeddings.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;
