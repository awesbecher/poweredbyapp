
export interface OnboardingEmailTemplateProps {
  clientName: string;
  agentEmail: string;
  dashboardUrl: string;
}

export const generateOnboardingEmailTemplate = ({ 
  clientName, 
  agentEmail, 
  dashboardUrl 
}: OnboardingEmailTemplateProps) => {
  return `Subject: Your AI Email Agent is Ready to Roll

Hi ${clientName},

Your AI Email Agent has been successfully set up!

Here's what happens next:
✅ Your agent will now monitor the inbox at **${agentEmail}**  
✅ It will reply to customers using GPT-4, based on your company knowledge  
✅ You can approve, edit, or reject replies from your admin dashboard  

👉 **Dashboard Login:** [Launch Your Agent](${dashboardUrl})

Want to improve responses? Just upload more docs to the knowledgebase — the agent will learn instantly.

If you need help or want to add more inboxes, reply to this email anytime.

Welcome to the future of customer support 🚀  
– The Powered_by Team`;
};

export const sendOnboardingEmail = async (
  emailAddress: string, 
  emailContent: string
) => {
  // Placeholder for future email sending logic
  // This will likely use a service like SendGrid or a Netlify function
  console.log(`Sending onboarding email to: ${emailAddress}`);
  console.log('Email Content:', emailContent);
  
  // TODO: Implement actual email sending logic
};
