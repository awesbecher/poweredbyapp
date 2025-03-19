
import React from 'react';
import { cn } from '@/lib/utils';
import { AgentType } from '@/lib/types';

interface AgentTypeCardProps {
  type: AgentType;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const AgentTypeCard: React.FC<AgentTypeCardProps> = ({
  type,
  title,
  description,
  icon,
  isActive = true,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col gap-4 p-6 rounded-xl border border-border transition-all duration-300',
        isActive 
          ? 'hover:border-brand-blue hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-white'
          : 'opacity-50 bg-muted/30 cursor-not-allowed'
      )}
      onClick={isActive ? onClick : undefined}
    >
      <div className={cn(
        'w-12 h-12 flex items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue',
        isActive && 'group-hover:bg-brand-blue group-hover:text-white'
      )}>
        {icon}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      {!isActive && (
        <div className="absolute top-3 right-3 text-xs font-medium bg-muted px-2 py-1 rounded-full">
          Coming Soon
        </div>
      )}
      
      {isActive && (
        <div className={cn(
          'absolute inset-0 rounded-xl border-2 border-brand-blue opacity-0 pointer-events-none',
          'group-hover:opacity-100 transition-opacity duration-300'
        )} />
      )}
    </div>
  );
};

export default AgentTypeCard;
