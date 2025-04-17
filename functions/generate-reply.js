
/**
 * Generate AI Reply Function
 * 
 * Takes an email and generates a reply using OpenAI's API
 * based on the agent's configuration and knowledge base.
 */

const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { messageId, agentId } = body;
  
  if (!messageId || !agentId) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  console.log(`Generating reply for message ${messageId}, agent ${agentId}`);

  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    // Get the email data
    const { data: email, error: emailError } = await supabase
      .from('email_logs')
      .select('*')
      .eq('agent_id', agentId)
      .eq('gmail_message_id', messageId)
      .single();
    
    if (emailError || !email) {
      console.error('Error fetching email:', emailError);
      return { statusCode: 404, body: 'Email not found' };
    }
    
    // Get the agent configuration
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();
    
    if (agentError || !agent) {
      console.error('Error fetching agent:', agentError);
      return { statusCode: 404, body: 'Agent not found' };
    }
    
    // Initialize OpenAI client
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // Generate embedding for the email content to find relevant knowledge
    const emailEmbedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: email.raw_body,
    });
    
    // Get relevant knowledge chunks using vector search
    const { data: relevantKnowledge, error: knowledgeError } = await supabase
      .rpc('match_kb_embeddings', {
        query_embedding: emailEmbedding.data[0].embedding,
        match_threshold: 0.5, // Adjust as needed
        match_count: 5, // Increased from 3 to 5
        agent_id: agentId
      });
    
    if (knowledgeError) {
      console.error('Error fetching relevant knowledge:', knowledgeError);
      console.log('Continuing without knowledge base context');
    }

    // Get previous conversation history for this thread
    const { data: threadHistory, error: threadError } = await supabase
      .from('email_logs')
      .select('*')
      .eq('agent_id', agentId)
      .eq('from_address', email.from_address)
      .not('ai_reply', 'is', null)
      .order('created_at', { ascending: true })
      .limit(3);

    let pastAgentResponses = '';
    if (!threadError && threadHistory && threadHistory.length > 0) {
      pastAgentResponses = threadHistory
        .map(item => `${agent.company_name}: ${item.ai_reply}`)
        .join('\n\n');
      console.log(`Found ${threadHistory.length} past responses for this thread`);
    } else {
      console.log('No past responses found for this thread');
    }
    
    // Format knowledge base chunks
    let kbChunks = '';
    if (relevantKnowledge && relevantKnowledge.length > 0) {
      kbChunks = relevantKnowledge.map(item => item.content).join('\n\n');
      console.log(`Found ${relevantKnowledge.length} relevant knowledge chunks`);
    } else {
      console.log('No relevant knowledge chunks found');
      kbChunks = 'No specific information available for this query.';
    }
    
    // Build the improved prompt using the template
    const systemPrompt = `
You are an AI email assistant for ${agent.company_name}. 
You are helpful, knowledgeable, and communicate with a ${agent.tone} tone.
Use the knowledgebase provided to assist with the inquiry.

Knowledgebase:
${kbChunks}

Email Thread:
Customer: ${email.raw_body}
${pastAgentResponses ? `Agent History:\n${pastAgentResponses}` : ''}

Generate a reply that is clear, polite, and helpful.
If you are not confident, defer to a human.
Sign the email as "${agent.company_name} Team".
`;
    
    console.log('Built system prompt with template');
    
    // Generate reply with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: email.raw_body }
      ],
      temperature: 0.7,
    });
    
    const aiReply = completion.choices[0].message.content;
    console.log('Generated AI reply');
    
    // Implement the auto/manual reply logic
    if (agent.auto_reply === true) {
      // Auto-mode: immediately send email
      console.log('Auto-reply enabled, sending email automatically');
      try {
        await fetch(`${process.env.BASE_URL}/.netlify/functions/send-reply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            agentId,
            gmailMessageId: messageId,
            replyText: aiReply
          })
        });
      } catch (sendError) {
        console.error('Error triggering send-reply:', sendError);
      }
      
      const { error: updateError } = await supabase
        .from('email_logs')
        .update({
          ai_reply: aiReply,
          status: 'replied',
          updated_at: new Date().toISOString()
        })
        .eq('id', email.id);
      
      if (updateError) {
        console.error('Error updating email with AI reply:', updateError);
        return { statusCode: 500, body: 'Failed to update email with AI reply' };
      }
    } else {
      // Manual mode: wait for human approval
      console.log('Manual approval required, setting status to awaiting_approval');
      const { error: updateError } = await supabase
        .from('email_logs')
        .update({
          ai_reply: aiReply,
          status: 'awaiting_approval',
          updated_at: new Date().toISOString()
        })
        .eq('id', email.id);
      
      if (updateError) {
        console.error('Error updating email with AI reply:', updateError);
        return { statusCode: 500, body: 'Failed to update email with AI reply' };
      }
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        reply: aiReply,
        status: agent.auto_reply ? 'replied' : 'awaiting_approval'
      })
    };
  } catch (error) {
    console.error('Generate reply error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
