
import { useEffect } from 'react';
import { embedManager } from '@/utils/embedManager';
import { forceEmbedsVisibility } from '@/utils/embedManager/embedInitializer';
import { useEmbedCommon, EmbedOptions } from './useEmbedCommon';

export interface YouTubeEmbedOptions extends EmbedOptions {
  allowFullscreen?: boolean;
}

/**
 * Custom hook specifically for YouTube video embeds
 */
export const useYouTubeEmbed = ({ src, height = '100%', additionalOptions = {} }: YouTubeEmbedOptions) => {
  const { containerRef, applyBaseStyles, createDirectIframe } = useEmbedCommon();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Apply base styling
    applyBaseStyles();
    containerRef.current.style.overflow = 'visible';
    
    // Check for existing iframe and enhance it
    const enhanceExistingIframe = () => {
      const iframe = containerRef.current?.querySelector('iframe');
      
      if (iframe) {
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
        
        // Refresh the iframe by temporarily clearing the src
        const currentSrc = iframe.getAttribute('src') || '';
        if (currentSrc) {
          iframe.setAttribute('src', '');
          setTimeout(() => {
            iframe.setAttribute('src', currentSrc);
          }, 100);
        }
        
        return true;
      }
      
      return false;
    };
    
    // Create a new iframe if one doesn't exist
    const createNewIframe = () => {
      if (!containerRef.current) return;
      
      const iframe = createDirectIframe(src);
      if (iframe) {
        iframe.title = "YouTube Video";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        
        containerRef.current.appendChild(iframe);
      }
    };
    
    // Initial enhancement attempt
    if (!enhanceExistingIframe()) {
      createNewIframe();
    }
    
    // Use embedManager to refresh YouTube videos
    setTimeout(() => embedManager.refreshYouTube(), 300);
    
    // Set up retry attempts with increasing delays
    const retryTimes = [800, 1500, 3000];
    const retryTimers = retryTimes.map(time => 
      setTimeout(() => {
        if (!containerRef.current) return;
        
        if (!enhanceExistingIframe()) {
          createNewIframe();
        }
        
        embedManager.refreshYouTube();
        forceEmbedsVisibility();
      }, time)
    );
    
    // Cleanup timers on unmount
    return () => retryTimers.forEach(timer => clearTimeout(timer));
  }, [src, height, additionalOptions]);
  
  return { containerRef };
};
