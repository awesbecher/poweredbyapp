
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import NewAgentSetup from '@/components/email-agent/NewAgentSetup';
import ConfirmationScreen from '@/components/email-agent/ConfirmationScreen';
import EmailDashboardTabs from '@/components/email-agent/EmailDashboardTabs';
import { toast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAgentData, AgentData } from '@/components/email-agent/hooks/useAgentData';

type SetupStep = 'setup' | 'confirmation' | 'monitoring';

const EmailAgent: React.FC = () => {
  const [step, setStep] = useState<SetupStep>('setup');
  const [urlAgentId, setUrlAgentId] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Extract agent_id from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const agentId = params.get('agent_id');
    if (agentId) {
      setUrlAgentId(agentId);
    }
  }, []);
  
  // Fetch agent data if we have an ID from the URL
  const { agentData, isLoading, error } = useAgentData(urlAgentId);

  // Set the appropriate step based on the agent data
  useEffect(() => {
    if (agentData && urlAgentId) {
      setStep('monitoring');
    }
  }, [agentData, urlAgentId]);

  const handleSetupComplete = (data: AgentData) => {
    setStep('confirmation');
  };

  const handleStartOver = () => {
    setStep('setup');
  };

  const handleActivate = () => {
    setStep('monitoring');
  };

  // Render content based on current step
  const renderStepContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    if (error) {
      return (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Agent</AlertTitle>
          <AlertDescription>
            {error}
            <div className="mt-4">
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      );
    }
    
    switch (step) {
      case 'setup':
        return <NewAgentSetup onComplete={handleSetupComplete} />;
      
      case 'confirmation':
        return (
          <ConfirmationScreen 
            agentData={agentData!} 
            onStartOver={handleStartOver}
            onActivate={handleActivate}
          />
        );
      
      case 'monitoring':
        return (
          <EmailDashboardTabs 
            agentId={agentData?.id}
            onBack={() => setStep('confirmation')}
          />
        );
        
      default:
        return <NewAgentSetup onComplete={handleSetupComplete} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-16">
        <Header 
          showBackButton={true}
          title="AI Email Agent Builder"
        />
        <main className="container-custom py-6 max-w-4xl mx-auto">
          {renderStepContent()}
        </main>
      </div>
    </div>
  );
};

export default EmailAgent;
