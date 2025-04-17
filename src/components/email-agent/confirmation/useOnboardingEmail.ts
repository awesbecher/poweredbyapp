
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { generateOnboardingEmailTemplate, sendOnboardingEmail } from '@/utils/emailTemplates';

interface UseOnboardingEmailProps {
  agentData: {
    id: string;
    company_name: string;
    agent_email: string;
  };
}

export function useOnboardingEmail({ agentData }: UseOnboardingEmailProps) {
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleSendOnboardingEmail = async () => {
    setIsSendingEmail(true);
    try {
      const clientName = agentData.company_name || 'Valued Client';
      const dashboardUrl = `${window.location.origin}/email-agent?agent_id=${agentData.id}`;
      
      const emailContent = generateOnboardingEmailTemplate({
        clientName,
        agentEmail: agentData.agent_email,
        dashboardUrl
      });

      await sendOnboardingEmail(agentData.agent_email, emailContent);
      
      toast({
        title: 'Onboarding Email Sent',
        description: `Email sent to ${agentData.agent_email}`,
        variant: 'default'
      });
    } catch (error) {
      console.error('Failed to send onboarding email:', error);
      toast({
        title: 'Email Send Failed',
        description: 'Could not send onboarding email. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return {
    isSendingEmail,
    handleSendOnboardingEmail
  };
}
