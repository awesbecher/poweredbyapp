import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Headphones, 
  Mail, 
  MessageSquare
} from 'lucide-react';
import { AgentTag } from '@/components/dashboard/AgentCard';
import { AgentType } from '@/lib/types';
import TopNav from '@/components/layout/TopNav';
import HeroHeader from '@/components/dashboard/HeroHeader';
import AgentCard from '@/components/dashboard/AgentCard';
import EmptyState from '@/components/dashboard/EmptyState';
import DashboardSidebar from '@/components/dashboard/Sidebar';
import { ThemeProvider } from '@/providers/ThemeProvider';

type AgentCardData = {
  id: string;
  name: string;
  description: string;
  agentType: AgentType;
  tags: AgentTag[];
  progress?: number;
  icon: React.ReactNode;
  isActive: boolean;
};

const agentData: AgentCardData[] = [
  {
    id: 'voice-agent',
    name: 'Voice Agent',
    description: '24/7 human-sounding calls',
    agentType: 'voice',
    tags: ['Voice'],
    progress: undefined,
    icon: <Headphones size={24} />,
    isActive: true
  },
  {
    id: 'email-agent',
    name: 'Email Agent',
    description: 'Inbox zero, on autopilot',
    agentType: 'email',
    tags: ['Email'],
    progress: 60,
    icon: <Mail size={24} />,
    isActive: true
  },
  {
    id: 'sms-agent',
    name: 'SMS Agent',
    description: 'Instant text replies that close deals',
    agentType: 'sms',
    tags: ['SMS'],
    progress: 25,
    icon: <MessageSquare size={24} />,
    isActive: true
  },
  {
    id: 'receptionist-agent',
    name: 'Receptionist',
    description: 'Never miss a call again',
    agentType: 'voice',
    tags: ['Voice'],
    icon: <Headphones size={24} />,
    isActive: true
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [showEmptyState, setShowEmptyState] = useState(false);
  
  useEffect(() => {
    setShowEmptyState(false);
  }, []);
  
  const handleAgentConfigure = (agentType: AgentType) => {
    if (agentType === 'voice') {
      navigate('/voice-agent');
    } else if (agentType === 'email') {
      navigate('/email-agent');
    } else if (agentType === 'sms') {
      navigate('/voice-agent');
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <TopNav />
        
        <div className="flex">
          <DashboardSidebar />
          
          <main className="flex-grow px-4 pb-24">
            <div className="max-w-7xl mx-auto">
              <HeroHeader 
                title="Pick your AI Agent" 
                subtitle="Configure once, automate forever."
              />
              
              {showEmptyState ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                  {agentData.map((agent) => (
                    <AgentCard
                      key={agent.id}
                      name={agent.name}
                      description={agent.description}
                      agentType={agent.agentType}
                      tags={agent.tags}
                      progress={agent.progress}
                      icon={agent.icon}
                      isActive={agent.isActive}
                      onConfigure={() => handleAgentConfigure(agent.agentType)}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
