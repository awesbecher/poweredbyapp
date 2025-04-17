
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
    
    // Get top 3 relevant knowledge chunks using vector search
    const { data: relevantKnowledge, error: knowledgeError } = await supabase
      .rpc('match_kb_embeddings', {
        query_embedding: emailEmbedding.data[0].embedding,
        match_threshold: 0.5, // Adjust as needed
        match_count: 3,
        agent_id: agentId
      });
    
    if (knowledgeError) {
      console.error('Error fetching relevant knowledge:', knowledgeError);
      console.log('Continuing without knowledge base context');
    }
    
    // Build the prompt
    let systemPrompt = `You are an AI email assistant for ${agent.company_name}. 
    Your purpose is: ${agent.purpose}
    Your tone should be: ${agent.tone}
    
    Respond to the email in a helpful, concise manner. Sign the email as "${agent.company_name} Team".`;
    
    // Add knowledge base context if available
    if (relevantKnowledge && relevantKnowledge.length > 0) {
      const context = relevantKnowledge.map(item => item.content).join('\n\n');
      systemPrompt += `\n\nRelevant information from the knowledge base:\n${context}`;
      console.log(`Found ${relevantKnowledge.length} relevant knowledge chunks`);
    } else {
      console.log('No relevant knowledge chunks found');
    }
    
    // Generate reply with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Please respond to this email:\n\nFrom: ${email.from_address}\nSubject: ${email.subject}\n\n${email.raw_body}` }
      ],
      temperature: 0.7,
    });
    
    const aiReply = completion.choices[0].message.content;
    console.log('Generated AI reply');
    
    // Update the email record with the AI reply
    const status = agent.auto_reply ? 'replied' : 'awaiting_approval';
    const { error: updateError } = await supabase
      .from('email_logs')
      .update({
        ai_reply: aiReply,
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', email.id);
    
    if (updateError) {
      console.error('Error updating email with AI reply:', updateError);
      return { statusCode: 500, body: 'Failed to update email with AI reply' };
    }
    
    console.log(`Updated email status to ${status}`);
    
    // If auto-reply is enabled, send the email immediately
    if (agent.auto_reply) {
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
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        reply: aiReply,
        status
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
