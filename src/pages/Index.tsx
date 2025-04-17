
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Headphones, 
  Mail, 
  MessageSquare, 
  Search,
  Bell
} from 'lucide-react';
import { AgentTag } from '@/components/dashboard/AgentCard';
import { AgentType } from '@/lib/types';
import TopNav from '@/components/layout/TopNav';
import HeroHeader from '@/components/dashboard/HeroHeader';
import AgentCard from '@/components/dashboard/AgentCard';
import EmptyState from '@/components/dashboard/EmptyState';
import DashboardSidebar from '@/components/dashboard/Sidebar';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AgentStatus } from '@/components/dashboard/AgentStatusDot';
import { Button } from '@/components/ui/button';
import QuickStartBanner from '@/components/dashboard/QuickStartBanner';
import SpotlightSearch from '@/components/dashboard/SpotlightSearch';
import AgentFilters from '@/components/dashboard/AgentFilters';
import TemplateCarousel from '@/components/dashboard/TemplateCarousel';
import WhatsNewDrawer from '@/components/dashboard/WhatsNewDrawer';

type AgentCardData = {
  id: string;
  name: string;
  description: string;
  agentType: AgentType;
  tags: AgentTag[];
  progress?: number;
  icon: React.ReactNode;
  isActive: boolean;
  isFavorite?: boolean;
  status?: AgentStatus;
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
    isActive: true,
    status: 'running'
  },
  {
    id: 'email-agent',
    name: 'Email Agent',
    description: 'Inbox zero, on autopilot',
    agentType: 'email',
    tags: ['Email'],
    progress: 60,
    icon: <Mail size={24} />,
    isActive: true,
    status: 'warning'
  },
  {
    id: 'sms-agent',
    name: 'SMS Agent',
    description: 'Instant text replies that close deals',
    agentType: 'sms',
    tags: ['SMS'],
    progress: 25,
    icon: <MessageSquare size={24} />,
    isActive: true,
    status: 'idle'
  },
  {
    id: 'receptionist-agent',
    name: 'Receptionist',
    description: 'Never miss a call again',
    agentType: 'voice',
    tags: ['Voice'],
    icon: <Headphones size={24} />,
    isActive: true,
    status: 'running'
  }
];

// Sample release notes
const releaseNotes = [
  {
    id: 'release-1',
    date: 'April 2025',
    title: 'Slack alerts & webhooks now live',
    description: 'You can now configure Slack alerts for agent events and set up webhooks to integrate with your existing tools.'
  },
  {
    id: 'release-2',
    date: 'March 2025',
    title: 'Custom voice profiles',
    description: 'Create and customize your agent voice profiles with our new voice editor.'
  },
  {
    id: 'release-3',
    date: 'February 2025',
    title: 'Advanced analytics dashboard',
    description: 'Track your agent performance with our new analytics dashboard featuring detailed metrics and insights.'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [agents, setAgents] = useState<AgentCardData[]>(agentData);
  const [showBanner, setShowBanner] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [whatsNewOpen, setWhatsNewOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<AgentTag[]>([]);
  const [sortOption, setSortOption] = useState('recent');
  
  // Effect to handle keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  
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

  const handleToggleFavorite = (agentId: string) => {
    setAgents(currentAgents => 
      currentAgents.map(agent => 
        agent.id === agentId 
          ? { ...agent, isFavorite: !agent.isFavorite } 
          : agent
      )
    );
  };

  const handleFilterChange = (filters: AgentTag[]) => {
    setActiveFilters(filters);
    // Filter logic would be applied to agents display
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    // Sort logic would be applied to agents display
  };

  const handleUseTemplate = (templateId: string) => {
    console.log('Using template:', templateId);
    // Logic to clone template into a new agent
  };

  const handleResumeSetup = () => {
    // Navigate to the setup page of the agent that needs attention
    navigate('/email-agent');
  };

  // Filter agents based on active filters
  const filteredAgents = activeFilters.length > 0
    ? agents.filter(agent => agent.tags.some(tag => activeFilters.includes(tag)))
    : agents;

  // Sort agents based on selected option
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortOption === 'a-z') return a.name.localeCompare(b.name);
    if (sortOption === 'z-a') return b.name.localeCompare(a.name);
    if (sortOption === 'favorites') {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    }
    // Default is 'recent'
    return 0;
  });

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <TopNav 
          onSearchClick={() => setSearchOpen(true)}
          onWhatsNewClick={() => setWhatsNewOpen(true)}
        />
        
        <div className="flex">
          <DashboardSidebar />
          
          <main className="flex-grow px-4 pb-24">
            <div className="max-w-7xl mx-auto">
              {showBanner && (
                <QuickStartBanner 
                  onboardingPercentage={60}
                  nextStep="Configure email notifications"
                  onDismiss={() => setShowBanner(false)}
                  onResumeSetup={handleResumeSetup}
                />
              )}
              
              <HeroHeader 
                title="Pick your AI Agent" 
                subtitle="Configure once, automate forever."
              />
              
              <AgentFilters 
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
              />
              
              {showEmptyState ? (
                <EmptyState />
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                    {sortedAgents.map((agent) => (
                      <AgentCard
                        key={agent.id}
                        name={agent.name}
                        description={agent.description}
                        agentType={agent.agentType}
                        tags={agent.tags}
                        progress={agent.progress}
                        icon={agent.icon}
                        isActive={agent.isActive}
                        isFavorite={agent.isFavorite}
                        status={agent.status}
                        onConfigure={() => handleAgentConfigure(agent.agentType)}
                        onToggleFavorite={() => handleToggleFavorite(agent.id)}
                      />
                    ))}
                  </div>
                  
                  <TemplateCarousel onUseTemplate={handleUseTemplate} />
                </>
              )}
            </div>
          </main>
        </div>

        {/* Global Components */}
        <SpotlightSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <WhatsNewDrawer 
          open={whatsNewOpen} 
          onOpenChange={setWhatsNewOpen} 
          releaseNotes={releaseNotes} 
        />
      </div>
    </ThemeProvider>
  );
};

export default Index;
