
import React from 'react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type AgentStatus = 'running' | 'warning' | 'error' | 'idle';

interface AgentStatusDotProps {
  status: AgentStatus;
  message?: string;
}

const getStatusColor = (status: AgentStatus) => {
  switch (status) {
    case 'running':
      return 'bg-green-500';
    case 'warning':
      return 'bg-amber-500';
    case 'error':
      return 'bg-red-500';
    case 'idle':
    default:
      return 'bg-gray-300';
  }
};

const getStatusMessage = (status: AgentStatus, message?: string) => {
  if (message) return message;
  
  switch (status) {
    case 'running':
      return 'Agent is operational';
    case 'warning':
      return 'Agent needs attention';
    case 'error':
      return 'Agent has encountered an error';
    case 'idle':
    default:
      return 'Agent is idle';
  }
};

const AgentStatusDot: React.FC<AgentStatusDotProps> = ({ status, message }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(status)} ring-2 ring-white`}></div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" className="text-xs">
          {getStatusMessage(status, message)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AgentStatusDot;
