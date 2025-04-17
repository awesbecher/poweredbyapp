
import React from 'react';
import { Check, Circle } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  completed: boolean;
  current: boolean;
}

interface ProgressStepperProps {
  steps: Step[];
  overallProgress: number;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, overallProgress }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Your Progress</h3>
        <span className="text-sm font-medium">{overallProgress}%</span>
      </div>
      
      <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-6">
        {steps.map((step) => (
          <li key={step.id} className="ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3">
              {step.completed ? (
                <div className="bg-primary text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              ) : (
                <Circle 
                  size={20} 
                  className={step.current ? 'text-primary' : 'text-muted-foreground'}
                  fill={step.current ? 'transparent' : 'transparent'} 
                  strokeWidth={step.current ? 2 : 1}
                />
              )}
            </span>
            <h3 className={`font-medium ${
              step.completed ? 'text-foreground' :
              step.current ? 'text-primary' : 
              'text-muted-foreground'}`}
            >
              {step.name}
            </h3>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProgressStepper;
