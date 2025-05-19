
import { useEffect, useRef } from 'react';
import { embedManager } from '../utils/embedManager';

interface UseEmbedOptions {
  type: 'tally' | 'youtube';
  src: string;
  height?: string;
  additionalOptions?: Record<string, string>;
}

/**
 * Custom hook to handle embed initialization and loading
 * Supports both Tally forms and YouTube videos with enhanced reliability
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
      
      // Add loading indicator
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'tally-loader';
      loadingDiv.innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:100px;width:100%">
          <div style="border:3px solid #f3f3f3;border-top:3px solid #8B5CF6;border-radius:50%;width:30px;height:30px;animation:tally-spin 1s linear infinite"></div>
          <p style="margin-left:15px;color:#8B5CF6">Loading form...</p>
        </div>
        <style>
          @keyframes tally-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      `;
      containerRef.current.appendChild(loadingDiv);
      
      // Use embedManager to load the Tally form
      setTimeout(() => embedManager.loadTally(), 100);
    } 
    else if (type === 'youtube') {
      // For YouTube, ensure the iframe has correct attributes
      const iframe = containerRef.current.querySelector('iframe');
      
      if (iframe) {
        iframe.setAttribute('loading', 'eager');
        iframe.setAttribute('importance', 'high');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowFullscreen', 'true');
        
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
    const retryTimes = [800, 1500, 3000, 6000];
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
