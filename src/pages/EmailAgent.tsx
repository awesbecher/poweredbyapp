
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmailAgentWizard from '@/components/email-agent/EmailAgentWizard';
import EmailDashboardTabs from '@/components/email-agent/EmailDashboardTabs';
import { useAgentData } from '@/components/email-agent/hooks/useAgentData';

const EmailAgent: React.FC = () => {
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
  
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  // If there's an error or loading, show appropriate UI
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <div className="container-custom py-12 max-w-4xl mx-auto">
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
      </div>
    );
  }
  
  // If we have an agent ID, show the dashboard for that agent
  // Otherwise show the wizard to create a new agent
  return (
    <div className="bg-background">
      {urlAgentId && agentData ? (
        <EmailDashboardTabs 
          agentId={agentData?.id} 
          onBack={handleBackToDashboard} 
        />
      ) : (
        <EmailAgentWizard />
      )}
    </div>
  );
};

export default EmailAgent;
