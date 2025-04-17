import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import NewAgentSetup from '@/components/email-agent/NewAgentSetup';
import ConfirmationScreen from '@/components/email-agent/ConfirmationScreen';
import EmailDashboardTabs from '@/components/email-agent/EmailDashboardTabs';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/utils/supabaseClient';

const EmailAgent: React.FC = () => {
  const [step, setStep] = useState<'setup' | 'confirmation' | 'monitoring'>('setup');
  const [agentData, setAgentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // If agent_id is in URL, try to load that agent
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const agentId = params.get('agent_id');
    
    if (agentId) {
      fetchAgentById(agentId);
    }
  }, []);

  const fetchAgentById = async (id: string) => {
    setIsLoading(true);
    try {
      // Check if Supabase is initialized
      if (!supabase) {
        throw new Error('Supabase client is not initialized. Please check your environment configuration.');
      }
      
      // Get agent data
      const { data: agent, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(`Agent not found: ${error.message}`);
      }

      // Get knowledge files
      const { data: files } = await supabase
        .from('knowledgebase_files')
        .select('*')
        .eq('agent_id', id);

      const completeAgentData = {
        ...agent,
        fileCount: files?.length || 0,
        fileNames: files?.map(file => file.file_name) || [],
        knowledgeFiles: files || []
      };

      setAgentData(completeAgentData);
      setStep('monitoring'); // Go directly to monitoring
    } catch (error: any) {
      console.error('Error fetching agent:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load agent',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupComplete = (data: any) => {
    setAgentData(data);
    setStep('confirmation');
  };

  const handleStartOver = () => {
    setAgentData(null);
    setStep('setup');
  };

  const handleActivate = () => {
    setStep('monitoring');
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
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {step === 'setup' && (
                <NewAgentSetup onComplete={handleSetupComplete} />
              )}
              
              {step === 'confirmation' && (
                <ConfirmationScreen 
                  agentData={agentData} 
                  onStartOver={handleStartOver}
                  onActivate={handleActivate}
                />
              )}

              {step === 'monitoring' && (
                <EmailDashboardTabs 
                  agentId={agentData?.id}
                  onBack={() => setStep('confirmation')}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmailAgent;
