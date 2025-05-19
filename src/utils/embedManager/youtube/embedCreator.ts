
/**
 * Functions for creating YouTube embeds
 */

import { TIMEOUTS } from './constants';
import { 
  createYouTubeIframe, 
  createLoadingPlaceholder, 
  addFallbackLink 
} from './domUtils';

/**
 * Manually creates a YouTube embed with proper attributes and fallbacks
 * @param elementSelector - CSS selector for the container element
 * @param videoId - YouTube video ID
 */
export function createYouTubeEmbed(elementSelector: string, videoId: string) {
  const container = document.querySelector(elementSelector);
  if (!container) return;
  
  try {
    // Clear any existing content
    container.innerHTML = '';
    
    // Create iframe with high-reliability settings
    const iframe = createYouTubeIframe(videoId);
    
    // Add loading placeholder
    const placeholder = createLoadingPlaceholder();
    
    // Create container
    const embedContainer = document.createElement('div');
    embedContainer.style.position = 'relative';
    embedContainer.style.width = '100%';
    embedContainer.style.height = '100%';
    embedContainer.style.zIndex = '20';
    
    // Assemble elements
    embedContainer.appendChild(iframe);
    embedContainer.appendChild(placeholder);
    container.appendChild(embedContainer);
    
    // Handle load event
    iframe.onload = () => placeholder.remove();
    
    // Add fallback
    addFallbackLink(placeholder, videoId);
    
  } catch (e) {
    console.error('Error creating YouTube embed:', e);
  }
}
