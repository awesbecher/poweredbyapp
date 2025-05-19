
import { useEffect } from 'react';
import { embedManager } from '@/utils/embedManager';
import { useEmbedCommon, EmbedOptions } from './useEmbedCommon';

export interface TallyEmbedOptions extends EmbedOptions {
  height?: string;
}

/**
 * Custom hook specifically for Tally form embeds
 */
export const useTallyEmbed = ({ src, height = '350', additionalOptions = {} }: TallyEmbedOptions) => {
  const { containerRef, applyBaseStyles, createDirectIframe } = useEmbedCommon();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Apply base styles and configuration
    applyBaseStyles();
    
    // Configure container with Tally-specific data attributes
    containerRef.current.setAttribute('data-tally-src', src);
    containerRef.current.setAttribute('data-tally-height', height);
    
    // Add any additional options as data attributes
    Object.entries(additionalOptions).forEach(([key, value]) => {
      containerRef.current?.setAttribute(`data-tally-${key}`, value);
    });
    
    // Clear any existing loader elements
    const existingLoader = containerRef.current.querySelector('.tally-loader');
    if (existingLoader) {
      containerRef.current.removeChild(existingLoader);
    }
    
    // Initialize the Tally form using the embedManager
    setTimeout(() => embedManager.loadTally(), 100);
    
    // Set up multiple retry attempts with increasing delays
    const retryTimes = [800, 1500, 3000, 5000];
    
    // Create direct iframe fallbacks with increasing delays
    const fallbackTimers = retryTimes.map((delay, index) => {
      return setTimeout(() => {
        if (!containerRef.current || containerRef.current.querySelector('iframe')) return;
        
        if (index === 0) {
          embedManager.loadTally();
          return;
        }
        
        // Direct iframe injection as ultimate fallback
        console.log(`Attempt ${index + 1}: Direct Tally iframe injection`);
        const iframe = createDirectIframe(src, `${height}px`);
        if (iframe) {
          iframe.title = 'Tally Form';
          iframe.style.backgroundColor = 'transparent';
          
          // Remove any existing content first
          const existingIframe = containerRef.current.querySelector('iframe');
          if (existingIframe) containerRef.current.removeChild(existingIframe);
          
          containerRef.current.appendChild(iframe);
        }
      }, delay);
    });
    
    // Cleanup timers on unmount
    return () => fallbackTimers.forEach(timer => clearTimeout(timer));
  }, [src, height, additionalOptions]);
  
  return { containerRef };
};
