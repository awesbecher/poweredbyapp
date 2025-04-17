
/**
 * Generate AI Reply Function
 * 
 * Takes an email and generates a reply using OpenAI's API
 * based on the agent's configuration and knowledge base.
 */

const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');
const { notifyFailure } = require('./utils/errorMonitoring');
const { getContextualInstructions } = require('./utils/contextUtils');
const { getRelevantKnowledge } = require('./utils/knowledgeUtils');
const { buildSystemPrompt } = require('./utils/promptUtils');
const { analyzeEmailForAutoReply, shouldSendAutoReply } = require('./utils/autoReplyUtils');
const { getThreadHistory, getAgentRatings } = require('./utils/historyUtils');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    await notifyFailure({
      functionName: 'generate-reply',
      error: error,
      metadata: { rawBody: event.body }
    });
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { messageId, agentId } = body;
  
  if (!messageId || !agentId) {
    const error = new Error('Missing required fields');
    await notifyFailure({
      functionName: 'generate-reply',
      error,
      agentId,
      metadata: { messageId }
    });
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
      await notifyFailure({
        functionName: 'generate-reply',
        error: emailError || new Error('Email not found'),
        agentId,
        metadata: { messageId }
      });
      return { statusCode: 404, body: 'Email not found' };
    }
    
    // Get the agent configuration
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();
    
    if (agentError || !agent) {
      await notifyFailure({
        functionName: 'generate-reply',
        error: agentError || new Error('Agent not found'),
        agentId,
        metadata: { messageId }
      });
      return { statusCode: 404, body: 'Agent not found' };
    }
    
    // Get relevant knowledge chunks for this email
    const relevantKnowledge = await getRelevantKnowledge(email.raw_body, agentId);
    
    // Format knowledge base chunks
    const kbChunks = relevantKnowledge && relevantKnowledge.length > 0
      ? relevantKnowledge.map(item => item.content).join('\n\n')
      : 'No specific information available for this query.';
    
    // Get previous conversation history
    const pastAgentResponses = await getThreadHistory(
      supabase, 
      agentId, 
      email.from_address, 
      agent.company_name
    );
    
    // Analyze if this email is suitable for auto-reply
    const autoReplyAnalysis = await analyzeEmailForAutoReply(email, agentId);
    console.log('Auto-reply eligibility check:', autoReplyAnalysis);
    
    // Get contextual instructions based on intent and agent purpose
    const { instructions: contextualInstructions, tone: recommendedTone } = 
      getContextualInstructions(autoReplyAnalysis.intent, agent.purpose);
    
    // Build the system prompt
    const systemPrompt = buildSystemPrompt(
      agent,
      email,
      contextualInstructions,
      recommendedTone,
      kbChunks,
      pastAgentResponses
    );
    
    console.log('Built system prompt with context-aware template');
    
    // Generate reply with OpenAI
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    let aiReply;
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: email.raw_body }
        ],
        temperature: 0.7,
      });
      
      aiReply = completion.choices[0].message.content;
      console.log('Generated AI reply');
    } catch (replyError) {
      await notifyFailure({
        functionName: 'generate-reply',
        error: replyError,
        agentId,
        metadata: { 
          messageId,
          operation: 'generate_completion',
          emailSubject: email.subject
        }
      });
      return { statusCode: 500, body: 'Failed to generate AI reply' };
    }
    
    // Get agent's performance ratings
    const { avgRating, count: ratingCount } = await getAgentRatings(supabase, agentId);
    
    // Determine if this should be auto-replied
    const shouldAutoReply = shouldSendAutoReply(
      agent, 
      autoReplyAnalysis, 
      avgRating, 
      ratingCount
    );
    
    if (shouldAutoReply) {
      // Auto-mode: immediately send email
      console.log('Smart auto-reply enabled, sending email automatically');
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
        await notifyFailure({
          functionName: 'generate-reply',
          error: sendError,
          agentId,
          metadata: { 
            messageId,
            operation: 'trigger_auto_send',
            emailSubject: email.subject
          }
        });
      }
      
      const { error: updateError } = await supabase
        .from('email_logs')
        .update({
          ai_reply: aiReply,
          status: 'replied',
          updated_at: new Date().toISOString(),
          auto_reply_analysis: autoReplyAnalysis
        })
        .eq('id', email.id);
      
      if (updateError) {
        await notifyFailure({
          functionName: 'generate-reply',
          error: updateError,
          agentId,
          metadata: { 
            messageId,
            operation: 'update_status_replied',
            emailId: email.id
          }
        });
        return { statusCode: 500, body: 'Failed to update email with AI reply' };
      }
    } else {
      // Manual mode or smart-auto decided human review is needed
      console.log('Manual approval required, setting status to awaiting_approval');
      const { error: updateError } = await supabase
        .from('email_logs')
        .update({
          ai_reply: aiReply,
          status: 'awaiting_approval',
          updated_at: new Date().toISOString(),
          auto_reply_analysis: autoReplyAnalysis
        })
        .eq('id', email.id);
      
      if (updateError) {
        await notifyFailure({
          functionName: 'generate-reply',
          error: updateError,
          agentId,
          metadata: { 
            messageId,
            operation: 'update_status_awaiting',
            emailId: email.id
          }
        });
        return { statusCode: 500, body: 'Failed to update email with AI reply' };
      }
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        reply: aiReply,
        status: shouldAutoReply ? 'replied' : 'awaiting_approval',
        autoReplyAnalysis: autoReplyAnalysis,
        contextUsed: recommendedTone
      })
    };
  } catch (error) {
    console.error('Generate reply error:', error);
    await notifyFailure({
      functionName: 'generate-reply',
      error,
      agentId,
      metadata: { messageId }
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
