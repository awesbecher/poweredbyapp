
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Headphones, Mail, MessageSquare, GitBranch } from 'lucide-react';
import Header from '@/components/Header';
import AgentTypeCard from '@/components/AgentTypeCard';
import Sidebar from '@/components/Sidebar';
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
      icon: <Headphones size={18} />,
      isActive: true
    },
    {
      type: 'email',
      title: 'Email Agent',
      description: 'Build AI agents that can process, understand, and respond to emails.',
      icon: <Mail size={18} />,
      isActive: true
    },
    {
      type: 'sms',
      title: 'SMS-Text Agent',
      description: 'Develop AI agents that can communicate with users via text messages.',
      icon: <MessageSquare size={18} />,
      isActive: true
    },
    {
      type: 'workflow',
      title: 'Workflow Agent',
      description: 'Create AI agents that can manage and automate complex business processes.',
      icon: <GitBranch size={18} />,
      isActive: true
    }
  ];
  
  const handleAgentTypeClick = (type: AgentType) => {
    if (type === 'voice') {
      navigate('/voice-agent');
    } else if (type === 'email') {
      navigate('/voice-agent'); // Temporarily pointing to voice-agent
    } else if (type === 'sms') {
      navigate('/voice-agent'); // Temporarily pointing to voice-agent
    } else if (type === 'workflow') {
      navigate('/voice-agent'); // Temporarily pointing to voice-agent
    }
  };

  return (
    <div className="min-h-screen bg-deep-purple flex">
      <Sidebar />
      
      <div className="flex-grow ml-16">
        <Header />
        
        <main className="container-custom py-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10 space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white/95 pb-2 border-b border-white/10">
                Agent Configuration
              </h1>
              <p className="text-lg text-white/70 font-normal">
                Select the type of AI agent you want to build from the options below
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
    </div>
  );
};

export default Index;
