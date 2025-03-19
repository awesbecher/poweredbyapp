
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
        'group relative overflow-hidden flex flex-col gap-4 p-6 rounded-xl transition-all duration-300',
        'bg-white border-0 shadow-lg hover:shadow-xl',
        'transform hover:-translate-y-1',
        isActive 
          ? 'cursor-pointer'
          : 'opacity-70 cursor-not-allowed'
      )}
      onClick={isActive ? onClick : undefined}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-brand-purple/5 opacity-80" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-brand-purple/10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-16 h-16 -ml-8 -mb-8 bg-brand-blue/10 rounded-full" />
      
      {/* Content - relative position to appear above background elements */}
      <div className="relative">
        <div className={cn(
          'w-14 h-14 flex items-center justify-center rounded-xl',
          'bg-gradient-to-br from-brand-blue/20 to-brand-purple/20',
          'text-brand-blue'
        )}>
          {icon}
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold text-brand-purple">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        {!isActive && (
          <div className="absolute top-3 right-3 text-xs font-medium bg-muted px-2 py-1 rounded-full">
            Coming Soon
          </div>
        )}
        
        {/* Subtle highlight border on hover */}
        <div className={cn(
          'absolute inset-0 border-2 border-brand-blue/50 rounded-xl opacity-0',
          'group-hover:opacity-100 transition-opacity duration-300'
        )} />
      </div>
    </div>
  );
};

export default AgentTypeCard;
