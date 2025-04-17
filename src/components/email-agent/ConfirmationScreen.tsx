
import React from 'react';
import SuccessHeader from './confirmation/SuccessHeader';
import EmailConnectionCard from './confirmation/EmailConnectionCard';
import KnowledgeBaseCard from './confirmation/KnowledgeBaseCard';
import AgentSummary from './confirmation/AgentSummary';
import ActionButtons from './confirmation/ActionButtons';
import { useOnboardingEmail } from './confirmation/useOnboardingEmail';

interface ConfirmationScreenProps {
  agentData: {
    id: string;
    company_name: string;
    agent_email: string;
    purpose: string;
    tone: string;
    auto_reply: boolean;
    fileCount?: number;
    fileNames?: string[];
    knowledgeFiles?: any[];
  };
  onStartOver: () => void;
  onActivate: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ 
  agentData, 
  onStartOver, 
  onActivate 
}) => {
  const { isSendingEmail, handleSendOnboardingEmail } = useOnboardingEmail({
    agentData
  });

  return (
    <div className="space-y-6">
      <SuccessHeader companyName={agentData.company_name} />

      <div className="grid gap-6 md:grid-cols-2">
        <EmailConnectionCard />
        <KnowledgeBaseCard 
          fileCount={agentData.fileCount || 0}
          fileNames={agentData.fileNames}
        />
      </div>

      <AgentSummary
        company_name={agentData.company_name}
        agent_email={agentData.agent_email}
        tone={agentData.tone}
        auto_reply={agentData.auto_reply}
      />

      <ActionButtons
        isSendingEmail={isSendingEmail}
        onStartOver={onStartOver}
        onSendEmail={handleSendOnboardingEmail}
        onActivate={onActivate}
      />
    </div>
  );
};

export default ConfirmationScreen;
