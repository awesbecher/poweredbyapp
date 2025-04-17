
import React from 'react';
import { Check, Mail, Paintbrush, MessageSquare, GitBranch, Zap, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWizard, WizardStep } from '../EmailAgentWizard';

interface StepItem {
  id: WizardStep;
  label: string;
  icon: React.ReactNode;
}

const steps: StepItem[] = [
  { id: 'connect', label: 'Connect', icon: <Mail size={18} /> },
  { id: 'branding', label: 'Branding', icon: <Paintbrush size={18} /> },
  { id: 'prompt', label: 'Prompt', icon: <MessageSquare size={18} /> },
  { id: 'automation', label: 'Automations', icon: <GitBranch size={18} /> },
  { id: 'testing', label: 'Test', icon: <Zap size={18} /> },
  { id: 'launch', label: 'Launch', icon: <Rocket size={18} /> },
];

const ProgressSidebar: React.FC = () => {
  const { currentStep, setCurrentStep, completedSteps, totalProgress } = useWizard();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Your Progress</h3>
        <span className="text-sm font-medium">{totalProgress}%</span>
      </div>
      
      <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-6">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          
          return (
            <li key={step.id} className="ml-6">
              <button 
                onClick={() => setCurrentStep(step.id)} 
                className="flex items-start focus:outline-none group"
                disabled={!isCompleted && !isCurrent}
              >
                <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3">
                  {isCompleted ? (
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <Check size={16} />
                    </div>
                  ) : (
                    <span 
                      className={cn(
                        "flex items-center justify-center w-6 h-6 rounded-full",
                        isCurrent ? "text-primary border-2 border-primary" : "text-muted-foreground border border-muted-foreground"
                      )}
                    >
                      {step.icon}
                    </span>
                  )}
                </span>
                <div className="ml-2">
                  <h3 className={cn(
                    "font-medium",
                    isCompleted ? "text-foreground" : 
                    isCurrent ? "text-primary" : 
                    "text-muted-foreground group-hover:text-foreground transition-colors"
                  )}>
                    {step.label}
                  </h3>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ProgressSidebar;
