
/**
 * Main YouTube utilities module
 */

import { TIMEOUTS } from './constants';
import { applyVisibilityStyles, addLoadingPlaceholder } from './domUtils';
import { reloadIframe, setFallbackTimer } from './iframeOperations';

/**
 * Refreshes YouTube embeds by temporarily removing and restoring their src
 */
export function refreshYouTube() {
  console.log('EmbedManager: Refreshing YouTube videos');
  
  document.querySelectorAll('iframe[src*="youtube"]').forEach((iframe) => {
    try {
      const ytIframe = iframe as HTMLIFrameElement;
      const currentSrc = ytIframe.src;
      
      // Skip empty sources
      if (!currentSrc) return;
      
      // Apply visibility styles
      applyVisibilityStyles(ytIframe);
      
      // Check if video is already loaded correctly
      const isLoaded = ytIframe.contentWindow && 
                      !ytIframe.parentElement?.querySelector('.youtube-loading-placeholder');
      
      if (isLoaded) {
        console.log(`YouTube iframe already loaded: ${currentSrc}`);
        return;
      }
      
      // Add a loading placeholder
      const parent = ytIframe.parentElement;
      if (parent && !parent.querySelector('.youtube-loading-placeholder')) {
        addLoadingPlaceholder(parent);
      }
      
      // Reload the iframe
      reloadIframe(ytIframe, currentSrc);
      
      // Set fallback timer
      setFallbackTimer(ytIframe);
    } catch (e) {
      console.error('Error refreshing YouTube iframe:', e);
    }
  });
}

// Re-export the embed creator for direct use
export { createYouTubeEmbed } from './embedCreator';
