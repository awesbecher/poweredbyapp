
/**
 * Operations for YouTube iframe manipulation
 */

import { TIMEOUTS } from './constants';

/**
 * Reload iframe with src
 */
export function reloadIframe(iframe: HTMLIFrameElement, src: string) {
  iframe.src = '';
  setTimeout(() => {
    iframe.src = src;
    console.log(`Refreshed YouTube iframe: ${src}`);
    
    // Set up load event to remove placeholder
    iframe.onload = () => {
      const parent = iframe.parentElement;
      if (parent) {
        const placeholder = parent.querySelector('.youtube-loading-placeholder');
        if (placeholder) {
          setTimeout(() => placeholder.remove(), TIMEOUTS.PLACEHOLDER_REMOVAL);
        }
      }
    };
  }, TIMEOUTS.REFRESH);
}

/**
 * Set fallback timer for iframe loading
 */
export function setFallbackTimer(iframe: HTMLIFrameElement) {
  setTimeout(() => {
    const parent = iframe.parentElement;
    if (parent && parent.querySelector('.youtube-loading-placeholder')) {
      console.log('YouTube still loading after timeout, trying alternate approach');
      
      // Import dynamically to avoid circular dependency
      import('./domUtils').then(({ createFreshIframe }) => {
        // Create a completely new iframe
        const newIframe = createFreshIframe(iframe);
        
        // Replace old iframe with new one
        parent.replaceChild(newIframe, iframe);
        
        // Set up load event to remove placeholder
        newIframe.onload = () => {
          const placeholder = parent.querySelector('.youtube-loading-placeholder');
          if (placeholder) placeholder.remove();
        };
      });
    }
  }, TIMEOUTS.FALLBACK);
}
