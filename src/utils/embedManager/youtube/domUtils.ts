
/**
 * DOM utility functions for YouTube embeds
 */

import { TIMEOUTS } from './constants';

/**
 * Apply styles to ensure iframe visibility
 */
export function applyVisibilityStyles(iframe: HTMLIFrameElement) {
  iframe.style.zIndex = '9999'; // Much higher z-index to ensure visibility
  iframe.style.position = 'relative';
  iframe.style.display = 'block';
  iframe.style.opacity = '1';
  iframe.style.visibility = 'visible';
}

/**
 * Add loading placeholder to parent element
 */
export function addLoadingPlaceholder(parent: HTMLElement) {
  const placeholder = document.createElement('div');
  placeholder.className = 'youtube-loading-placeholder';
  placeholder.style.position = 'absolute';
  placeholder.style.inset = '0';
  placeholder.style.display = 'flex';
  placeholder.style.alignItems = 'center';
  placeholder.style.justifyContent = 'center';
  placeholder.style.backgroundColor = 'rgba(0,0,0,0.7)';
  placeholder.style.zIndex = '9980'; // High but below the iframe
  placeholder.innerHTML = `
    <div style="text-align:center">
      <div style="border:3px solid #f3f3f3;border-top:3px solid #8B5CF6;border-radius:50%;width:40px;height:40px;margin:0 auto;animation:yt-spin 1s linear infinite"></div>
      <p style="color:white;margin-top:10px">Loading video...</p>
    </div>
    <style>
      @keyframes yt-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
  parent.style.position = 'relative';
  parent.appendChild(placeholder);
}

/**
 * Create a new iframe with proper attributes
 */
export function createFreshIframe(originalIframe: HTMLIFrameElement) {
  const newIframe = document.createElement('iframe');
  newIframe.src = originalIframe.src;
  newIframe.width = originalIframe.width;
  newIframe.height = originalIframe.height;
  newIframe.className = originalIframe.className;
  newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  newIframe.allowFullscreen = true;
  newIframe.style.cssText = originalIframe.style.cssText;
  newIframe.style.position = 'relative';
  newIframe.style.zIndex = '9999';
  newIframe.style.display = 'block';
  newIframe.style.opacity = '1';
  newIframe.style.visibility = 'visible';
  newIframe.style.border = 'none';
  
  return newIframe;
}

/**
 * Create YouTube iframe element
 */
export function createYouTubeIframe(videoId: string) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?origin=${window.location.origin}`;
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.setAttribute('loading', 'eager');
  iframe.style.position = 'absolute';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.zIndex = '9999';
  iframe.style.display = 'block';
  iframe.style.opacity = '1';
  iframe.style.visibility = 'visible';
  
  return iframe;
}

/**
 * Create loading placeholder element
 */
export function createLoadingPlaceholder() {
  const placeholder = document.createElement('div');
  placeholder.className = 'youtube-loading-placeholder';
  placeholder.style.position = 'absolute';
  placeholder.style.inset = '0';
  placeholder.style.display = 'flex';
  placeholder.style.alignItems = 'center';
  placeholder.style.justifyContent = 'center';
  placeholder.style.backgroundColor = 'rgba(0,0,0,0.7)';
  placeholder.style.zIndex = '9980';
  placeholder.innerHTML = `
    <div style="text-align:center">
      <div style="border:3px solid #f3f3f3;border-top:3px solid #8B5CF6;border-radius:50%;width:40px;height:40px;margin:0 auto;animation:yt-spin 1s linear infinite"></div>
      <p style="color:white;margin-top:10px">Loading video...</p>
    </div>
  `;
  
  return placeholder;
}

/**
 * Add fallback link to placeholder
 */
export function addFallbackLink(placeholder: HTMLElement, videoId: string) {
  setTimeout(() => {
    if (document.body.contains(placeholder)) {
      console.log('YouTube embed fallback activated');
      placeholder.innerHTML = `
        <div style="text-align:center">
          <p style="color:white">Video could not be loaded.</p>
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" 
             style="display:inline-block;background:#8B5CF6;color:white;padding:10px 20px;margin-top:15px;border-radius:4px;text-decoration:none">
            Watch on YouTube
          </a>
        </div>
      `;
    }
  }, TIMEOUTS.FINAL_FALLBACK);
}
