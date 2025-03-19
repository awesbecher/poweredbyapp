
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';

export const useVoiceAgentRendering = () => {
  const navigate = useNavigate();
  const { 
    renderingState,
    startRendering,
    updateRenderingProgress,
    completeRendering,
    resetRenderingState
  } = useStore();

  const handleRenderClick = () => {
    startRendering();
    
    // Simulate rendering process
    const simulateRendering = () => {
      let progress = 0;
      const statuses = [
        'Initializing...',
        'Loading model configuration...',
        'Processing agent settings...',
        'Loading knowledge base...',
        'Optimizing for voice interactions...',
        'Finalizing voice agent...'
      ];
      
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        const statusIndex = Math.min(
          Math.floor((progress / 100) * statuses.length),
          statuses.length - 1
        );
        
        if (progress >= 100) {
          clearInterval(interval);
          progress = 100;
          completeRendering();
          
          // Navigate to review page after completion
          setTimeout(() => {
            navigate('/review-agent');
          }, 1500);
        } else {
          updateRenderingProgress(progress, statuses[statusIndex]);
        }
      }, 800);
    };
    
    // Start the simulation
    simulateRendering();
  };

  return {
    renderingState,
    handleRenderClick,
    resetRenderingState
  };
};
