
/**
 * Prompt Building Utility Functions
 * 
 * Functions to build and customize AI prompts
 */

/**
 * Build the system prompt for the AI using the template and contextual information
 *
 * @param {Object} agent - Agent information
 * @param {Object} email - Email information
 * @param {string} contextualInstructions - Context-specific instructions
 * @param {string} recommendedTone - Recommended tone for the reply
 * @param {string} knowledgeBaseContent - Relevant knowledge base content
 * @param {string} pastAgentResponses - Previous responses in this thread
 * @returns {string} - Complete system prompt
 */
const buildSystemPrompt = (
  agent,
  email,
  contextualInstructions,
  recommendedTone,
  knowledgeBaseContent,
  pastAgentResponses
) => {
  return `
You are an AI email assistant for ${agent.company_name}. 
You are helpful, knowledgeable, and communicate with a ${agent.tone || recommendedTone} tone.
Purpose: ${agent.purpose || 'To assist customers with their inquiries'}

${contextualInstructions}

Knowledgebase:
${knowledgeBaseContent}

Email Thread:
Customer: ${email.raw_body}
${pastAgentResponses ? `Agent History:\n${pastAgentResponses}` : ''}

Generate a reply that is clear, polite, and helpful.
If you are not confident, defer to a human.
Sign the email as "${agent.company_name} Team".
`;
};

module.exports = {
  buildSystemPrompt
};
