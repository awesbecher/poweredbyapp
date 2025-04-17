
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Paintbrush, MessageSquare, GitBranch, Zap, Rocket } from 'lucide-react';
import { WizardStep } from '../EmailAgentWizard';

interface StepHeaderProps {
  step: WizardStep;
}

const StepHeader: React.FC<StepHeaderProps> = ({ step }) => {
  const getStepInfo = () => {
    switch(step) {
      case 'connect':
        return {
          icon: <Mail className="h-6 w-6" />,
          title: "Let's give your inbox superpowers.",
          subtitle: "Connect your email account to get started."
        };
      case 'branding':
        return {
          icon: <Paintbrush className="h-6 w-6" />,
          title: "Brand your AI agent",
          subtitle: "Customize how your AI agent presents itself to recipients."
        };
      case 'prompt':
        return {
          icon: <MessageSquare className="h-6 w-6" />,
          title: "Craft your agent's voice",
          subtitle: "Define how your AI should respond to different types of emails."
        };
      case 'automation':
        return {
          icon: <GitBranch className="h-6 w-6" />,
          title: "Set up automation rules",
          subtitle: "Define when and how your agent should respond automatically."
        };
      case 'testing':
        return {
          icon: <Zap className="h-6 w-6" />,
          title: "Test your agent",
          subtitle: "See how your agent responds to different scenarios."
        };
      case 'launch':
        return {
          icon: <Rocket className="h-6 w-6" />,
          title: "Ready for launch",
          subtitle: "Review your settings and activate your email agent."
        };
      default:
        return {
          icon: <Mail className="h-6 w-6" />,
          title: "Email Agent Setup",
          subtitle: "Configure your AI-powered email assistant."
        };
    }
  };

  const { icon, title, subtitle } = getStepInfo();

  return (
    <motion.div 
      className="flex items-start space-x-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-2 bg-primary/10 text-primary rounded-lg">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </motion.div>
  );
};

export default StepHeader;
