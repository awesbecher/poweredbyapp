
import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import Button from './Button';

interface ConfigSectionProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  showAIWriteButton?: boolean;
  onAIWriteClick?: () => void;
  compact?: boolean;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({
  title,
  description,
  className,
  children,
  showAIWriteButton = false,
  onAIWriteClick,
  compact = false,
}) => {
  return (
    <div className={cn(
      'rounded-xl border border-white/20 shadow-sm',
      'transition-all duration-300 hover:shadow-md',
      'bg-gradient-to-br from-brand-purple-light via-brand-purple to-brand-purple-dark text-white',
      'relative',
      compact ? 'p-4' : 'p-6',
      className
    )}>
      {showAIWriteButton && (
        <div className="absolute top-6 right-6">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
            onClick={onAIWriteClick}
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Write with AI
          </Button>
        </div>
      )}
      
      <div className={cn("space-y-1", compact ? "mb-3" : "mb-5")}>
        <h3 className="text-xl font-medium text-white">{title}</h3>
        {description && (
          <p className={cn("text-white/80", compact ? "text-xs" : "text-sm")}>
            {description}
          </p>
        )}
      </div>
      
      <div className={cn("space-y-4", compact ? "space-y-3" : "space-y-6")}>
        {children}
      </div>
    </div>
  );
};

export default ConfigSection;
