
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import NewAgentSetup from '@/components/email-agent/NewAgentSetup';
import ConfirmationScreen from '@/components/email-agent/ConfirmationScreen';

const EmailAgent: React.FC = () => {
  const [step, setStep] = useState<'setup' | 'confirmation'>('setup');
  const [agentData, setAgentData] = useState<any>(null);

  const handleSetupComplete = (data: any) => {
    setAgentData(data);
    setStep('confirmation');
  };

  const handleStartOver = () => {
    setAgentData(null);
    setStep('setup');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-16">
        <Header 
          showBackButton={true}
          title="AI Email Agent Builder"
        />
        <main className="container-custom py-6 max-w-4xl mx-auto">
          {step === 'setup' && (
            <NewAgentSetup onComplete={handleSetupComplete} />
          )}
          
          {step === 'confirmation' && (
            <ConfirmationScreen 
              agentData={agentData} 
              onStartOver={handleStartOver}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default EmailAgent;
