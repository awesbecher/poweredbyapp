
import React from 'react';
import { AgentType } from '@/lib/types';
import { AgentStatus } from '@/components/dashboard/AgentStatusDot';
import AgentCard, { AgentTag } from '@/components/dashboard/AgentCard';

interface AgentCardData {
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
}

interface AgentGridProps {
  agents: AgentCardData[];
  onConfigure: (agentType: AgentType) => void;
  onToggleFavorite: (agentId: string) => void;
}

const AgentGrid: React.FC<AgentGridProps> = ({ 
  agents,
  onConfigure,
  onToggleFavorite
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
      {agents.map((agent) => (
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
          onConfigure={() => onConfigure(agent.agentType)}
          onToggleFavorite={() => onToggleFavorite(agent.id)}
        />
      ))}
    </div>
  );
};

export default AgentGrid;
