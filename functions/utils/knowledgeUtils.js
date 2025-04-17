
/**
 * Knowledge Base Utility Functions
 * 
 * Functions for retrieving and processing knowledge base contents
 */
const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');
const { notifyFailure } = require('./errorMonitoring');

/**
 * Get relevant knowledge for an email based on its content
 * 
 * @param {string} emailContent - The raw email body
 * @param {string} agentId - The agent ID to search knowledge for
 * @returns {Promise<Array>} - Array of relevant knowledge chunks
 */
const getRelevantKnowledge = async (emailContent, agentId) => {
  if (!process.env.OPENAI_API_KEY || !emailContent) {
    return [];
  }
  
  // Initialize OpenAI client
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  // Initialize Supabase client
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  // Generate embedding for the email content
  try {
    const emailEmbedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: emailContent,
    });
    
    // Get relevant knowledge chunks using vector search
    const { data: knowledgeData, error: knowledgeError } = await supabase
      .rpc('match_kb_embeddings', {
        query_embedding: emailEmbedding.data[0].embedding,
        match_threshold: 0.5,
        match_count: 5,
        agent_id: agentId
      });
      
    if (knowledgeError) {
      await notifyFailure({
        functionName: 'knowledgeUtils',
        error: knowledgeError,
        agentId,
        metadata: { operation: 'knowledge_search' }
      });
      console.log('Error fetching relevant knowledge, continuing without knowledge base context');
      return [];
    }
    
    return knowledgeData || [];
  } catch (error) {
    await notifyFailure({
      functionName: 'knowledgeUtils',
      error,
      agentId,
      metadata: { operation: 'generate_embedding' }
    });
    console.log('Error generating embeddings or searching knowledge, continuing without knowledge context');
    return [];
  }
};

module.exports = {
  getRelevantKnowledge
};
