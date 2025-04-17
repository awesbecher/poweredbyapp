
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headphones, Mail, MessageSquare } from 'lucide-react';
import { AgentTag } from '@/components/dashboard/AgentCard';
import { AgentType } from '@/lib/types';
import { AgentStatus } from '@/components/dashboard/AgentStatusDot';
import EmptyState from '@/components/dashboard/EmptyState';
import SpotlightSearch from '@/components/dashboard/SpotlightSearch';
import AgentFilters from '@/components/dashboard/AgentFilters';
import TemplateCarousel from '@/components/dashboard/TemplateCarousel';
import WhatsNewDrawer from '@/components/dashboard/WhatsNewDrawer';
import AgentGrid from '@/components/dashboard/AgentGrid';

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

const AgentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [agents, setAgents] = useState<AgentCardData[]>(agentData);
  const [searchOpen, setSearchOpen] = useState(false);
  const [whatsNewOpen, setWhatsNewOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<AgentTag[]>([]);
  const [sortOption, setSortOption] = useState('recent');
  
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
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
  };

  const handleUseTemplate = (templateId: string) => {
    console.log('Using template:', templateId);
  };

  const filteredAgents = activeFilters.length > 0
    ? agents.filter(agent => agent.tags.some(tag => activeFilters.includes(tag)))
    : agents;

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortOption === 'a-z') return a.name.localeCompare(b.name);
    if (sortOption === 'z-a') return b.name.localeCompare(a.name);
    if (sortOption === 'favorites') {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    }
    return 0;
  });

  return (
    <>
      <AgentFilters 
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      
      {showEmptyState ? (
        <EmptyState />
      ) : (
        <>
          <AgentGrid 
            agents={sortedAgents}
            onConfigure={handleAgentConfigure}
            onToggleFavorite={handleToggleFavorite}
          />
          <TemplateCarousel onUseTemplate={handleUseTemplate} />
        </>
      )}

      <SpotlightSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <WhatsNewDrawer 
        open={whatsNewOpen} 
        onOpenChange={setWhatsNewOpen} 
        releaseNotes={releaseNotes} 
      />

      {/* Connect TopNav to the drawer */}
      <TopNavController 
        onSearchClick={() => setSearchOpen(true)}
        onWhatsNewClick={() => setWhatsNewOpen(true)}
      />
    </>
  );
};

// This is a controller component that doesn't render anything but connects
// the TopNav component to the local state in this component
const TopNavController: React.FC<{
  onSearchClick: () => void;
  onWhatsNewClick: () => void;
}> = ({ onSearchClick, onWhatsNewClick }) => {
  useEffect(() => {
    // Find the TopNav component and attach our handlers
    const topNav = document.querySelector('header[class*="sticky top-0"]');
    if (topNav) {
      // This is a bit of a hack, but it allows us to connect components
      // without having to modify the main layout
      (window as any).__topNavHandlers = {
        onSearchClick,
        onWhatsNewClick
      };
    }
  }, [onSearchClick, onWhatsNewClick]);

  return null;
};

export default AgentDashboard;
