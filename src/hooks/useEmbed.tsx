
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
    
    // Ensure container has proper styling with very high z-index
    containerRef.current.style.position = 'relative';
    containerRef.current.style.zIndex = '9990';
    containerRef.current.style.backgroundColor = 'transparent';
    
    // Configure container with appropriate data attributes
    if (type === 'tally') {
      containerRef.current.setAttribute('data-tally-src', src);
      containerRef.current.setAttribute('data-tally-height', height);
      
      // Add any additional options as data attributes
      Object.entries(additionalOptions).forEach(([key, value]) => {
        containerRef.current?.setAttribute(`data-tally-${key}`, value);
      });
      
      // Clear any existing content to prevent duplicates
      const existingLoader = containerRef.current.querySelector('.tally-loader');
      if (existingLoader) {
        containerRef.current.removeChild(existingLoader);
      }
      
      // Remove loading indicator code
      
      // Use embedManager to load the Tally form
      setTimeout(() => embedManager.loadTally(), 100);
      
      // Force direct injection as ultimate fallback
      setTimeout(() => {
        if (containerRef.current && !containerRef.current.querySelector('iframe')) {
          // Create and configure iframe manually
          const iframe = document.createElement('iframe');
          iframe.src = src;
          iframe.width = '100%';
          iframe.height = height;
          iframe.title = 'Tally Form';
          iframe.style.border = 'none';
          iframe.style.width = '100%';
          iframe.style.minHeight = `${height}px`;
          iframe.style.overflow = 'hidden';
          iframe.style.position = 'relative';
          iframe.style.zIndex = '9999';
          iframe.style.backgroundColor = 'transparent';
          iframe.style.opacity = '1'; // Make immediately visible
          
          // Remove loader if it exists
          const loader = containerRef.current.querySelector('.tally-loader');
          if (loader) containerRef.current.removeChild(loader);
          
          containerRef.current.appendChild(iframe);
          console.log('Emergency direct iframe injection for Tally form');
        }
      }, 2000);
      
      // Second attempt with longer delay
      setTimeout(() => {
        if (containerRef.current && !containerRef.current.querySelector('iframe')) {
          const iframe = document.createElement('iframe');
          iframe.src = src;
          iframe.width = '100%';
          iframe.height = height;
          iframe.title = 'Tally Form';
          iframe.style.border = 'none';
          iframe.style.width = '100%';
          iframe.style.minHeight = `${height}px`;
          iframe.style.overflow = 'hidden';
          iframe.style.position = 'relative';
          iframe.style.zIndex = '9999';
          iframe.style.backgroundColor = 'transparent';
          iframe.style.opacity = '1'; // Make immediately visible
          
          // Remove loader if it exists
          const loader = containerRef.current.querySelector('.tally-loader');
          if (loader) containerRef.current.removeChild(loader);
          
          containerRef.current.appendChild(iframe);
          console.log('Second emergency attempt for Tally form');
        }
      }, 5000);
    } 
    else if (type === 'youtube') {
      // For YouTube, ensure the iframe has correct attributes and z-index
      containerRef.current.style.overflow = 'visible';
      
      const iframe = containerRef.current.querySelector('iframe');
      
      if (iframe) {
        // Set essential attributes and styling
        iframe.setAttribute('loading', 'eager');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowFullscreen', 'true');
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.zIndex = '9999';
        iframe.style.border = 'none';
        
        // If iframe already exists, refresh it
        const currentSrc = iframe.getAttribute('src') || '';
        if (currentSrc) {
          iframe.setAttribute('src', '');
          setTimeout(() => {
            iframe.setAttribute('src', currentSrc);
            console.log(`Refreshed YouTube iframe: ${currentSrc}`);
          }, 100);
        }
      } else {
        // Direct iframe injection as fallback
        const newIframe = document.createElement('iframe');
        newIframe.src = src;
        newIframe.title = "YouTube Video";
        newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        newIframe.allowFullscreen = true;
        newIframe.style.position = 'absolute';
        newIframe.style.top = '0';
        newIframe.style.left = '0';
        newIframe.style.width = '100%';
        newIframe.style.height = '100%';
        newIframe.style.border = 'none';
        newIframe.style.zIndex = '9999';
        
        containerRef.current.appendChild(newIframe);
      }
      
      // Use embedManager to refresh YouTube videos
      setTimeout(() => embedManager.refreshYouTube(), 300);
    }
    
    // Set up retry attempts with increasing delays
    const retryTimes = [800, 1500, 3000, 6000];
    const retryTimers = retryTimes.map(time => 
      setTimeout(() => {
        if (!containerRef.current) return;
        
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
