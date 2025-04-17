
import React from 'react';
import { RotateCw, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  isSendingEmail: boolean;
  onStartOver: () => void;
  onSendEmail: () => void;
  onActivate: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isSendingEmail,
  onStartOver,
  onSendEmail,
  onActivate
}) => {
  return (
    <div className="flex justify-between pt-4">
      <Button variant="outline" onClick={onStartOver}>
        <RotateCw className="mr-2 h-4 w-4" />
        Create Another Agent
      </Button>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={onSendEmail}
          disabled={isSendingEmail}
        >
          <Send className="mr-2 h-4 w-4" />
          Send Onboarding Email
        </Button>
        
        <Button onClick={onActivate}>
          Activate Agent
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
