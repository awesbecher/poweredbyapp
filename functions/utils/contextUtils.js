
/**
 * Context Utility Functions
 * 
 * Functions for handling and analyzing email context, 
 * determining appropriate tones, and building contextual instructions.
 */

/**
 * Get contextual instructions based on email content analysis
 */
const getContextualInstructions = (emailIntent, agentPurpose) => {
  // Default instructions
  let instructions = "Respond professionally and empathetically. Sign the email as the company team.";
  let tone = "professional";
  
  // Determine appropriate context based on email intent
  switch(emailIntent) {
    case "complaint":
      tone = "empathetic";
      instructions = `
Tone: Empathetic + Professional
Instruction: Acknowledge the customer's frustration. Apologize if necessary.
Explain any policy from the knowledgebase clearly and politely.
Offer to escalate to a human if the situation is sensitive.`;
      break;
      
    case "simple_inquiry":
    case "general_request":
      tone = "friendly";
      instructions = `
Tone: Friendly
Instruction: Always reassure the customer and offer clear steps. If unsure, escalate.`;
      break;
      
    case "feedback":
      tone = "appreciative";
      instructions = `
Tone: Appreciative
Instruction: Thank the customer sincerely for their feedback. Acknowledge their input's value.
Explain how feedback helps improve the product/service.`;
      break;
      
    case "urgent_request":
      tone = "efficient";
      instructions = `
Tone: Efficient yet warm
Instruction: Address the urgency directly. Provide immediate next steps.
Be clear about timeframes. Offer escalation if needed.`;
      break;
  }
  
  // If agent has a custom purpose that seems sales-oriented, add sales guidance
  if (agentPurpose && 
      (agentPurpose.toLowerCase().includes("sales") || 
       agentPurpose.toLowerCase().includes("convert") || 
       agentPurpose.toLowerCase().includes("lead"))) {
    tone = "persuasive";
    instructions += `
Tone: Persuasive
Instruction: Emphasize product value. Encourage action (signup, upgrade, book a demo).
Highlight differentiators when asked about competitors.`;
  }
  
  return { instructions, tone };
};

module.exports = {
  getContextualInstructions
};
