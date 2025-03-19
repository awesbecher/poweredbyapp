
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
        'relative flex flex-col p-5 rounded-lg transition-all duration-200',
        'bg-white border border-slate-200',
        'hover:border-brand-purple shadow-sm hover:shadow-md',
        isActive 
          ? 'cursor-pointer'
          : 'opacity-70 cursor-not-allowed'
      )}
      onClick={isActive ? onClick : undefined}
    >
      <div className="flex items-start">
        <div className={cn(
          'w-10 h-10 flex items-center justify-center rounded-md',
          'bg-brand-purple/10 text-brand-purple'
        )}>
          {icon}
        </div>
        
        <div className="ml-auto">
          <div className={cn(
            "h-1.5 w-12 rounded-full",
            type === 'voice' && "bg-emerald-400",
            type === 'email' && "bg-sky-400",
            type === 'sms' && "bg-amber-400",
            type === 'workflow' && "bg-violet-400",
          )} />
        </div>
      </div>
      
      <div className="mt-3 space-y-1">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
      </div>
      
      {!isActive && (
        <div className="absolute top-3 right-3 text-xs font-medium bg-slate-100 px-2 py-1 rounded-full text-slate-600">
          Coming Soon
        </div>
      )}
      
      <div className="flex items-center mt-3 pt-2 border-t border-slate-100">
        <div className={cn(
          "text-xs font-medium",
          type === 'voice' && "text-emerald-600",
          type === 'email' && "text-sky-600",
          type === 'sms' && "text-amber-600",
          type === 'workflow' && "text-violet-600",
        )}>
          Configure Agent
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={cn(
            "w-3 h-3 ml-1",
            type === 'voice' && "text-emerald-600",
            type === 'email' && "text-sky-600",
            type === 'sms' && "text-amber-600",
            type === 'workflow' && "text-violet-600",
          )} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default AgentTypeCard;
