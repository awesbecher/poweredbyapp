
import { useEffect, useRef } from 'react';
import { embedManager } from '../utils/embedManager/EmbedManager';

interface UseEmbedOptions {
  type: 'tally' | 'youtube';
  src: string;
  height?: string;
  additionalOptions?: Record<string, string>;
}

/**
 * Custom hook to handle embed initialization and loading
 * Supports both Tally forms and YouTube videos
 */
export const useEmbed = ({ type, src, height = '350', additionalOptions = {} }: UseEmbedOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Configure container with appropriate data attributes
    if (type === 'tally') {
      containerRef.current.setAttribute('data-tally-src', src);
      containerRef.current.setAttribute('data-tally-height', height);
      
      // Add any additional options as data attributes
      Object.entries(additionalOptions).forEach(([key, value]) => {
        containerRef.current?.setAttribute(`data-tally-${key}`, value);
      });
      
      // Use embedManager to load the Tally form
      setTimeout(() => embedManager.loadTally(), 100);
    } 
    else if (type === 'youtube') {
      // For YouTube, we'll set up the iframe directly
      const iframe = containerRef.current.querySelector('iframe');
      
      if (iframe) {
        // If iframe already exists, refresh it
        const currentSrc = iframe.getAttribute('src') || '';
        if (currentSrc) {
          iframe.setAttribute('src', '');
          setTimeout(() => {
            iframe.setAttribute('src', currentSrc);
            console.log(`Refreshed YouTube iframe: ${currentSrc}`);
          }, 100);
        }
      }
      
      // Use embedManager to refresh YouTube videos
      setTimeout(() => embedManager.refreshYouTube(), 300);
    }
    
    // Set up retry attempts with increasing delays
    const retryTimes = [800, 1500, 3000];
    const retryTimers = retryTimes.map(time => 
      setTimeout(() => {
        if (type === 'tally') {
          embedManager.loadTally();
        } else if (type === 'youtube') {
          embedManager.refreshYouTube();
        }
      }, time)
    );
    
    return () => retryTimers.forEach(timer => clearTimeout(timer));
  }, [type, src, height, additionalOptions]);
  
  return { containerRef };
};
