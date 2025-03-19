
import React from 'react';
import { Button } from '@/components/ui/button';

interface RenderButtonProps {
  onRenderClick: () => void;
}

const RenderButton: React.FC<RenderButtonProps> = ({ onRenderClick }) => {
  return (
    <div className="flex justify-center pt-6">
      <Button 
        size="lg"
        onClick={onRenderClick}
        className="px-8 bg-gradient-to-br from-brand-purple-light via-brand-purple to-brand-purple-dark hover:opacity-90 transition-all duration-300 text-white shadow-md hover:shadow-lg"
      >
        Render Voice Agent
      </Button>
    </div>
  );
};

export default RenderButton;
