
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Headphones, Mail, MessageSquare, GitBranch } from 'lucide-react';
import Header from '@/components/Header';
import AgentTypeCard from '@/components/AgentTypeCard';
import { AgentType } from '@/lib/types';

const Index = () => {
  const navigate = useNavigate();
  
  const agentTypes: { 
    type: AgentType; 
    title: string; 
    description: string; 
    icon: React.ReactNode;
    isActive: boolean;
  }[] = [
    {
      type: 'voice',
      title: 'Voice Agent',
      description: 'Create AI agents that can speak and listen to users in natural conversations.',
      icon: <Headphones size={24} />,
      isActive: true
    },
    {
      type: 'email',
      title: 'Email Agent',
      description: 'Build AI agents that can process, understand, and respond to emails.',
      icon: <Mail size={24} />,
      isActive: false
    },
    {
      type: 'sms',
      title: 'SMS-Text Agent',
      description: 'Develop AI agents that can communicate with users via text messages.',
      icon: <MessageSquare size={24} />,
      isActive: false
    },
    {
      type: 'workflow',
      title: 'Workflow Agent',
      description: 'Create AI agents that can manage and automate complex business processes.',
      icon: <GitBranch size={24} />,
      isActive: false
    }
  ];
  
  const handleAgentTypeClick = (type: AgentType) => {
    if (type === 'voice') {
      navigate('/voice-agent');
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray">
      <Header />
      
      <main className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-medium mb-3">Agent Configuration</h1>
            <p className="text-xl text-muted-foreground">
              Select the type of AI agent you want to build
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agentTypes.map((agent) => (
              <AgentTypeCard
                key={agent.type}
                type={agent.type}
                title={agent.title}
                description={agent.description}
                icon={agent.icon}
                isActive={agent.isActive}
                onClick={() => handleAgentTypeClick(agent.type)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
