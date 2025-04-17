
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentType } from '@/lib/types';
import { AgentTag } from '@/components/dashboard/AgentCard';
import { AgentCardData, agentData } from '@/data/agentData';

export function useAgentDashboard() {
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

  return {
    showEmptyState,
    sortedAgents,
    searchOpen,
    setSearchOpen,
    whatsNewOpen,
    setWhatsNewOpen,
    handleAgentConfigure,
    handleToggleFavorite,
    handleFilterChange,
    handleSortChange,
    activeFilters
  };
}
