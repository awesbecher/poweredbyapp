
/**
 * Utilities for handling YouTube video embeds with improved reliability
 */

// Default timeout values (in ms)
const TIMEOUTS = {
  REFRESH: 200,
  PLACEHOLDER_REMOVAL: 500,
  FALLBACK: 5000,
  FINAL_FALLBACK: 8000
};

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

/**
 * Apply styles to ensure iframe visibility
 */
function applyVisibilityStyles(iframe: HTMLIFrameElement) {
  iframe.style.zIndex = '30';
  iframe.style.position = 'relative';
}

/**
 * Add loading placeholder to parent element
 */
function addLoadingPlaceholder(parent: HTMLElement) {
  const placeholder = document.createElement('div');
  placeholder.className = 'youtube-loading-placeholder';
  placeholder.style.position = 'absolute';
  placeholder.style.inset = '0';
  placeholder.style.display = 'flex';
  placeholder.style.alignItems = 'center';
  placeholder.style.justifyContent = 'center';
  placeholder.style.backgroundColor = 'rgba(0,0,0,0.7)';
  placeholder.style.zIndex = '25'; // High but below the iframe
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
 * Reload iframe with src
 */
function reloadIframe(iframe: HTMLIFrameElement, src: string) {
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
function setFallbackTimer(iframe: HTMLIFrameElement) {
  setTimeout(() => {
    const parent = iframe.parentElement;
    if (parent && parent.querySelector('.youtube-loading-placeholder')) {
      console.log('YouTube still loading after timeout, trying alternate approach');
      
      // Create a completely new iframe
      const newIframe = createFreshIframe(iframe);
      
      // Replace old iframe with new one
      parent.replaceChild(newIframe, iframe);
      
      // Set up load event to remove placeholder
      newIframe.onload = () => {
        const placeholder = parent.querySelector('.youtube-loading-placeholder');
        if (placeholder) placeholder.remove();
      };
    }
  }, TIMEOUTS.FALLBACK);
}

/**
 * Create a new iframe with proper attributes
 */
function createFreshIframe(originalIframe: HTMLIFrameElement) {
  const newIframe = document.createElement('iframe');
  newIframe.src = originalIframe.src;
  newIframe.width = originalIframe.width;
  newIframe.height = originalIframe.height;
  newIframe.className = originalIframe.className;
  newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  newIframe.allowFullscreen = true;
  newIframe.style.cssText = originalIframe.style.cssText;
  newIframe.style.position = 'relative';
  newIframe.style.zIndex = '30';
  
  return newIframe;
}

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

/**
 * Create YouTube iframe element
 */
function createYouTubeIframe(videoId: string) {
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
  iframe.style.zIndex = '30';
  
  return iframe;
}

/**
 * Create loading placeholder element
 */
function createLoadingPlaceholder() {
  const placeholder = document.createElement('div');
  placeholder.className = 'youtube-loading-placeholder';
  placeholder.style.position = 'absolute';
  placeholder.style.inset = '0';
  placeholder.style.display = 'flex';
  placeholder.style.alignItems = 'center';
  placeholder.style.justifyContent = 'center';
  placeholder.style.backgroundColor = 'rgba(0,0,0,0.7)';
  placeholder.style.zIndex = '25';
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
function addFallbackLink(placeholder: HTMLElement, videoId: string) {
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
