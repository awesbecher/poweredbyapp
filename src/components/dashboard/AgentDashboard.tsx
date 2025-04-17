
import React from 'react';
import EmptyState from '@/components/dashboard/EmptyState';
import SpotlightSearch from '@/components/dashboard/SpotlightSearch';
import AgentFilters from '@/components/dashboard/AgentFilters';
import WhatsNewDrawer from '@/components/dashboard/WhatsNewDrawer';
import AgentGrid from '@/components/dashboard/AgentGrid';
import TopNavController from '@/components/dashboard/TopNavController';
import { useAgentDashboard } from '@/hooks/useAgentDashboard';
import { releaseNotes } from '@/data/agentData';

const AgentDashboard: React.FC = () => {
  const {
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
  } = useAgentDashboard();

  return (
    <>
      <AgentFilters 
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      
      {showEmptyState ? (
        <EmptyState />
      ) : (
        <AgentGrid 
          agents={sortedAgents}
          onConfigure={handleAgentConfigure}
          onToggleFavorite={handleToggleFavorite}
        />
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

export default AgentDashboard;
