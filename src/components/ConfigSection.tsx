
import React from 'react';
import { cn } from '@/lib/utils';

interface ConfigSectionProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <div className={cn(
      'p-6 rounded-xl border border-white/20 shadow-sm',
      'transition-all duration-300 hover:shadow-md',
      'bg-gradient-to-br from-brand-purple-light via-brand-purple to-brand-purple-dark text-white',
      className
    )}>
      <div className="space-y-1 mb-5">
        <h3 className="text-xl font-medium text-white">{title}</h3>
        {description && (
          <p className="text-sm text-white/80">
            {description}
          </p>
        )}
      </div>
      
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default ConfigSection;
