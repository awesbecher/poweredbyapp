
import { useEffect } from 'react';
import { embedManager } from '@/utils/embedManager';
import { useEmbedCommon, EmbedOptions } from './useEmbedCommon';

export interface TallyEmbedOptions extends EmbedOptions {
  height?: string;
}

/**
 * Custom hook specifically for Tally form embeds
 * Handles initialization, visibility, and fallback mechanisms
 */
export const useTallyEmbed = ({ src, height = '350', additionalOptions = {} }: TallyEmbedOptions) => {
  const { containerRef, applyBaseStyles, createDirectIframe } = useEmbedCommon();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Apply base styles and configure container
    applyBaseStyles();
    
    // Configure container with Tally-specific data attributes
    containerRef.current.setAttribute('data-tally-src', src);
    containerRef.current.setAttribute('data-tally-height', height);
    
    // Add any additional options as data attributes
    Object.entries(additionalOptions).forEach(([key, value]) => {
      containerRef.current?.setAttribute(`data-tally-${key}`, value);
    });
    
    // Initialize the Tally form using the embedManager
    setTimeout(() => embedManager.loadTally(), 100);
    
    // Set up retry attempts with increasing delays
    const retryTimes = [800, 1500, 3000, 5000];
    
    // Create retry attempts with increasing delays
    const retryTimers = retryTimes.map((delay, index) => {
      return setTimeout(() => {
        if (!containerRef.current || containerRef.current.querySelector('iframe')) return;
        
        // For first attempt, just try reloading
        if (index === 0) {
          embedManager.loadTally();
          return;
        }
        
        // For subsequent attempts, try direct injection
        console.log(`Attempt ${index + 1}: Direct Tally iframe injection`);
        const iframe = createDirectIframe(src, `${height}px`);
        if (iframe && containerRef.current) {
          // Set Tally-specific properties
          iframe.title = 'Tally Form';
          iframe.style.backgroundColor = 'transparent';
          
          // Remove any existing content first
          const existingIframe = containerRef.current.querySelector('iframe');
          if (existingIframe) containerRef.current.removeChild(existingIframe);
          
          // Add the new iframe
          containerRef.current.appendChild(iframe);
        }
      }, delay);
    });
    
    // Ensure forms are visible after all content is loaded
    const visibilityTimer = setTimeout(() => {
      if (containerRef.current) {
        const iframe = containerRef.current.querySelector('iframe');
        if (iframe) {
          iframe.style.opacity = '1';
          iframe.style.visibility = 'visible';
          iframe.style.position = 'relative';
          iframe.style.zIndex = '9999';
        }
      }
    }, 2000);
    
    // Cleanup timers on unmount
    return () => {
      retryTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(visibilityTimer);
    };
  }, [src, height, additionalOptions]);
  
  return { containerRef };
};
