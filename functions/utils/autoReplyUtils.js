
/**
 * Auto-Reply Analysis Utility Functions
 * 
 * Functions to determine if an email is suitable for automatic replies
 */
const { OpenAI } = require('openai');
const { notifyFailure } = require('./errorMonitoring');

/**
 * Analyze if an email is suitable for auto-reply
 *
 * @param {Object} email - The email object containing content
 * @param {string} agentId - Agent ID
 * @returns {Promise<Object>} Analysis result
 */
const analyzeEmailForAutoReply = async (email, agentId) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const autoReplyCheck = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Analyze the following email and determine if an auto-reply is appropriate." },
        { role: "user", content: email.raw_body }
      ],
      functions: [
        {
          name: "checkAutoReplyEligibility",
          parameters: {
            type: "object",
            properties: {
              intent: { 
                type: "string", 
                description: "The primary intent of the email (inquiry, complaint, request, etc.)",
                enum: ["simple_inquiry", "complex_inquiry", "complaint", "urgent_request", "general_request", "feedback", "other"]
              },
              complexity: { 
                type: "number", 
                description: "A measure of how complex the email is (1-10 scale, where 1 is very simple and 10 is very complex)"
              },
              confidence: { 
                type: "number", 
                description: "Confidence level in being able to generate an appropriate response (0-100)"
              },
              autoReplyRecommended: {
                type: "boolean",
                description: "Whether auto-reply is recommended based on the email content"
              },
              reasoning: {
                type: "string",
                description: "Brief explanation for the recommendation"
              }
            },
            required: ["intent", "complexity", "confidence", "autoReplyRecommended", "reasoning"]
          }
        }
      ],
      function_call: { name: "checkAutoReplyEligibility" },
      temperature: 0.3,
    });
    
    return JSON.parse(autoReplyCheck.choices[0].message.function_call.arguments);
  } catch (error) {
    await notifyFailure({
      functionName: 'autoReplyUtils',
      error,
      agentId,
      metadata: { 
        emailSubject: email.subject,
        operation: 'auto_reply_analysis',
      }
    });
    
    // Default to conservative auto-reply settings if analysis fails
    return {
      intent: "other",
      complexity: 7,
      confidence: 50,
      autoReplyRecommended: false,
      reasoning: "Analysis failed, defaulting to human review"
    };
  }
};

/**
 * Determine if an email should be auto-replied based on analysis and agent settings
 * 
 * @param {Object} agent - Agent configuration
 * @param {Object} autoReplyAnalysis - Analysis result from analyzeEmailForAutoReply
 * @param {number} avgRating - Average rating of previous replies
 * @param {number} ratingCount - Number of ratings
 * @returns {boolean} Whether to auto-reply
 */
const shouldSendAutoReply = (agent, autoReplyAnalysis, avgRating, ratingCount) => {
  const isLowRiskMessage = autoReplyAnalysis.intent === 'simple_inquiry' || 
                           autoReplyAnalysis.complexity < 4;
  const hasHighConfidence = autoReplyAnalysis.confidence > 85;
  const hasGoodHistoricalPerformance = avgRating >= 4.0 && ratingCount >= 5;
  
  // Smart auto-mode logic
  return agent.auto_reply === true && 
         (autoReplyAnalysis.autoReplyRecommended && 
         isLowRiskMessage && 
         hasHighConfidence && 
         (hasGoodHistoricalPerformance || ratingCount < 5));
};

module.exports = {
  analyzeEmailForAutoReply,
  shouldSendAutoReply
};
