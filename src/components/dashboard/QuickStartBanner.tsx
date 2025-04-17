
import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface QuickStartBannerProps {
  onboardingPercentage: number;
  nextStep: string;
  onDismiss: () => void;
  onResumeSetup: () => void;
}

const QuickStartBanner: React.FC<QuickStartBannerProps> = ({
  onboardingPercentage,
  nextStep,
  onDismiss,
  onResumeSetup
}) => {
  return (
    <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center shadow-md mb-6 animate-fade-in">
      <div className="flex-1 mb-3 md:mb-0">
        <h3 className="font-semibold text-lg flex items-center">
          🚀 Just one more step to launch your first agent!
        </h3>
        <div className="flex items-center mt-2">
          <div className="w-full max-w-xs mr-4">
            <Progress value={onboardingPercentage} className="h-2" />
          </div>
          <span className="text-sm font-medium">{onboardingPercentage}% complete</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">Next: {nextStep}</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button 
          onClick={onResumeSetup}
          className="flex items-center"
        >
          Resume Setup
          <ArrowRight size={16} className="ml-1" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onDismiss} 
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  );
};

export default QuickStartBanner;
