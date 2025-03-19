
import React from 'react';
import Button from '@/components/Button';

interface RenderButtonProps {
  onRenderClick: () => void;
}

const RenderButton: React.FC<RenderButtonProps> = ({ onRenderClick }) => {
  return (
    <div className="flex justify-center pt-6">
      <Button 
        size="lg"
        onClick={onRenderClick}
        className="px-8"
      >
        Render Voice Agent
      </Button>
    </div>
  );
};

export default RenderButton;
