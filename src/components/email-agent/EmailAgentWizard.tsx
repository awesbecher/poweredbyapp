
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TopNavController from '@/components/dashboard/TopNavController';
import ProgressSidebar from '@/components/email-agent/wizard/ProgressSidebar';
import StepHeader from '@/components/email-agent/wizard/StepHeader';
import FormFooter from '@/components/email-agent/wizard/FormFooter';

// Step components
import ConnectEmail from '@/components/email-agent/wizard/steps/ConnectEmail';
import Branding from '@/components/email-agent/wizard/steps/Branding';
import PromptSettingsWizard from '@/components/email-agent/wizard/steps/PromptSettingsWizard';
import AutomationRules from '@/components/email-agent/wizard/steps/AutomationRules';
import Testing from '@/components/email-agent/wizard/steps/Testing';
import Launch from '@/components/email-agent/wizard/steps/Launch';

// Define wizard steps
export type WizardStep = 'connect' | 'branding' | 'prompt' | 'automation' | 'testing' | 'launch';

interface WizardContextType {
  currentStep: WizardStep;
  setCurrentStep: (step: WizardStep) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  stepData: Record<string, any>;
  updateStepData: (step: WizardStep, data: any) => void;
  completedSteps: WizardStep[];
  markStepAsCompleted: (step: WizardStep) => void;
  totalProgress: number;
}

const WizardContext = createContext<WizardContextType | null>(null);

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};

const STEPS_ORDER: WizardStep[] = ['connect', 'branding', 'prompt', 'automation', 'testing', 'launch'];

const EmailAgentWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<WizardStep>('connect');
  const [stepData, setStepData] = useState<Record<string, any>>({});
  const [completedSteps, setCompletedSteps] = useState<WizardStep[]>([]);

  // Calculate total progress percentage
  const totalProgress = Math.round((completedSteps.length / STEPS_ORDER.length) * 100);

  const goToNextStep = () => {
    const currentIndex = STEPS_ORDER.indexOf(currentStep);
    if (currentIndex < STEPS_ORDER.length - 1) {
      setCurrentStep(STEPS_ORDER[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = STEPS_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS_ORDER[currentIndex - 1]);
    }
  };

  const updateStepData = (step: WizardStep, data: any) => {
    setStepData(prevData => ({
      ...prevData,
      [step]: { ...prevData[step], ...data }
    }));
  };

  const markStepAsCompleted = (step: WizardStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
  };

  // Render the current step component
  const renderStepComponent = () => {
    switch (currentStep) {
      case 'connect':
        return <ConnectEmail />;
      case 'branding':
        return <Branding />;
      case 'prompt':
        return <PromptSettingsWizard />;
      case 'automation':
        return <AutomationRules />;
      case 'testing':
        return <Testing />;
      case 'launch':
        return <Launch onComplete={() => navigate('/dashboard')} />;
      default:
        return <ConnectEmail />;
    }
  };

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + Enter = Next
      if (e.key === 'Enter' && e.shiftKey) {
        goToNextStep();
      }
      // Ctrl/Cmd + Left Arrow = Back
      if (e.key === 'ArrowLeft' && (e.ctrlKey || e.metaKey)) {
        goToPreviousStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  const wizardContextValue: WizardContextType = {
    currentStep,
    setCurrentStep,
    goToNextStep,
    goToPreviousStep,
    stepData,
    updateStepData,
    completedSteps,
    markStepAsCompleted,
    totalProgress
  };

  return (
    <WizardContext.Provider value={wizardContextValue}>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-16">
          <Header 
            showBackButton={true}
            title="AI Email Agent"
            subtitle="Create your automated email assistant in minutes"
          />
          
          <TopNavController 
            onSearchClick={() => {}} 
            onWhatsNewClick={() => {}} 
          />

          <div className="flex">
            {/* Progress Sidebar - visible on lg screens */}
            <div className="hidden lg:block w-64 border-r p-6 min-h-[calc(100vh-4rem)]">
              <ProgressSidebar />
            </div>
            
            {/* Main Content Area */}
            <motion.main 
              className="flex-1 container max-w-4xl mx-auto mt-10 px-4 pb-24"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StepHeader step={currentStep} />
              
              <div className="mt-8">
                {renderStepComponent()}
              </div>
              
              <FormFooter 
                currentStep={currentStep}
                onBackClick={goToPreviousStep}
                onNextClick={goToNextStep}
                isNextDisabled={!completedSteps.includes(currentStep)}
                isFirstStep={currentStep === STEPS_ORDER[0]}
                isLastStep={currentStep === STEPS_ORDER[STEPS_ORDER.length - 1]}
              />
            </motion.main>
          </div>
        </div>
      </div>
    </WizardContext.Provider>
  );
};

export default EmailAgentWizard;
