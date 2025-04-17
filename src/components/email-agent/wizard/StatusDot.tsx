
import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type StatusType = 'draft' | 'validating' | 'live' | 'error';

interface StatusDotProps {
  status: StatusType;
  className?: string;
}

const StatusDot: React.FC<StatusDotProps> = ({ status, className }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'draft':
        return { 
          color: 'bg-amber-500',
          pulseColor: 'bg-amber-400',
          label: 'Draft'
        };
      case 'validating':
        return { 
          color: 'bg-blue-500',
          pulseColor: 'bg-blue-400',
          label: 'Validating'
        };
      case 'live':
        return { 
          color: 'bg-green-500',
          pulseColor: 'bg-green-400',
          label: 'Live'
        };
      case 'error':
        return { 
          color: 'bg-red-500',
          pulseColor: 'bg-red-400',
          label: 'Error'
        };
      default:
        return { 
          color: 'bg-gray-500',
          pulseColor: 'bg-gray-400',
          label: 'Unknown'
        };
    }
  };

  const { color, pulseColor, label } = getStatusInfo();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("relative flex items-center", className)}>
            <span className={cn(
              "relative flex h-3 w-3",
              color === 'bg-amber-500' ? 'animate-pulse' : ''
            )}>
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                pulseColor
              )}></span>
              <span className={cn("relative inline-flex rounded-full h-3 w-3", color)}></span>
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Status: {label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StatusDot;
