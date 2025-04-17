
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Save, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WizardStep } from '../EmailAgentWizard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FormFooterProps {
  currentStep: WizardStep;
  onBackClick: () => void;
  onNextClick: () => void;
  isNextDisabled: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const FormFooter: React.FC<FormFooterProps> = ({
  currentStep,
  onBackClick,
  onNextClick,
  isNextDisabled,
  isFirstStep,
  isLastStep
}) => {
  const [isSaving, setIsSaving] = useState(false);

  // Simulate autosave behavior
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSaving(true);
      
      // After 800ms, set saving to false
      const saveTimer = setTimeout(() => {
        setIsSaving(false);
      }, 800);
      
      return () => clearTimeout(saveTimer);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-lg p-4 flex justify-between items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        {isSaving ? (
          <>
            <Save className="h-4 w-4 animate-spin" />
            <span>Saving...</span>
          </>
        ) : null}
      </div>
      
      <div className="flex items-center space-x-3">
        {!isFirstStep && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={onBackClick}
                  className="flex items-center gap-1"
                >
                  <ArrowLeft size={16} />
                  Back
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ctrl/Cmd + ← to go back</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={onNextClick}
                disabled={isNextDisabled}
                className="flex items-center gap-1"
              >
                {isLastStep ? 'Finish' : 'Next'}
                {!isLastStep && <ArrowRight size={16} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Shift + Enter to continue</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default FormFooter;
