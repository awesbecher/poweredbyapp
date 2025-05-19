
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
    containerRef.current.style.zIndex = '50'; // Increased from 15 to 50
    containerRef.current.style.backgroundColor = 'transparent'; // Ensure background is transparent
    
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
      
      // Add visible loading indicator with z-index management
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'tally-loader';
      loadingDiv.style.position = 'relative';
      loadingDiv.style.zIndex = '40'; // Increased from 10 to 40
      loadingDiv.style.backgroundColor = 'transparent';
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
          iframe.style.zIndex = '60'; // Increased from 30 to 60
          iframe.style.backgroundColor = 'transparent';
          
          // Remove loader and append iframe
          const loader = containerRef.current.querySelector('.tally-loader');
          if (loader) containerRef.current.removeChild(loader);
          containerRef.current.appendChild(iframe);
          console.log('Emergency direct iframe injection for Tally form');
        }
      }, 3000);
    } 
    else if (type === 'youtube') {
      // For YouTube, ensure the iframe has correct attributes and z-index
      containerRef.current.style.overflow = 'visible';
      
      const iframe = containerRef.current.querySelector('iframe');
      
      if (iframe) {
        // Set essential attributes and styling - removed 'importance' attribute
        iframe.setAttribute('loading', 'eager');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowFullscreen', 'true');
        iframe.style.position = 'relative';
        iframe.style.zIndex = '60'; // Increased from 30 to 60
        
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
      
      // Ensure the placeholder has proper z-index if it exists
      const placeholder = document.getElementById('youtube-placeholder');
      if (placeholder) {
        placeholder.style.zIndex = '45'; // Increased from 25 to 45 (below iframe but above other elements)
      }
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
