
/**
 * Utilities for handling YouTube video embeds with improved reliability
 */

/**
 * Refreshes YouTube embeds by temporarily removing and restoring their src
 * Enhanced for production reliability
 */
export function refreshYouTube() {
  console.log('EmbedManager: Refreshing YouTube videos');
  
  document.querySelectorAll('iframe[src*="youtube"]').forEach((iframe) => {
    try {
      // Cast to HTMLIFrameElement to access src property
      const ytIframe = iframe as HTMLIFrameElement;
      const currentSrc = ytIframe.src;
      
      // Skip empty sources or if already working
      if (!currentSrc) return;
      
      // Force higher z-index to ensure visibility
      ytIframe.style.zIndex = '30';
      ytIframe.style.position = 'relative';
      
      // Check if video is already loaded correctly
      const isLoaded = ytIframe.contentWindow && 
                      !ytIframe.parentElement?.querySelector('.youtube-loading-placeholder');
      
      if (isLoaded) {
        console.log(`YouTube iframe already loaded: ${currentSrc}`);
        return;
      }
      
      // Add a loading placeholder if it doesn't exist
      const parent = ytIframe.parentElement;
      if (parent && !parent.querySelector('.youtube-loading-placeholder')) {
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
      
      // Reload the iframe
      ytIframe.src = '';
      setTimeout(() => {
        ytIframe.src = currentSrc;
        console.log(`Refreshed YouTube iframe: ${currentSrc}`);
        
        // Set up load event to remove placeholder
        ytIframe.onload = () => {
          const parent = ytIframe.parentElement;
          if (parent) {
            const placeholder = parent.querySelector('.youtube-loading-placeholder');
            if (placeholder) {
              setTimeout(() => {
                placeholder.remove();
              }, 500);
            }
          }
        };
      }, 200);
      
      // If still not loaded after 5 seconds, try a different approach
      setTimeout(() => {
        const parent = ytIframe.parentElement;
        if (parent && parent.querySelector('.youtube-loading-placeholder')) {
          console.log('YouTube still loading after timeout, trying alternate approach');
          
          // Create a completely new iframe with explicit z-index
          const newIframe = document.createElement('iframe');
          newIframe.src = currentSrc;
          newIframe.width = ytIframe.width;
          newIframe.height = ytIframe.height;
          newIframe.className = ytIframe.className;
          newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          newIframe.allowFullscreen = true;
          // Removed 'importance' attribute as it's not standard
          newIframe.style.cssText = ytIframe.style.cssText;
          newIframe.style.position = 'relative';
          newIframe.style.zIndex = '30';
          
          // Replace old iframe with new one
          parent.replaceChild(newIframe, ytIframe);
          
          // Set up load event to remove placeholder
          newIframe.onload = () => {
            const placeholder = parent.querySelector('.youtube-loading-placeholder');
            if (placeholder) {
              placeholder.remove();
            }
          };
        }
      }, 5000);
    } catch (e) {
      console.error('Error refreshing YouTube iframe:', e);
    }
  });
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
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?origin=${window.location.origin}`;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.setAttribute('loading', 'eager');
    // Removed 'importance' attribute
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.zIndex = '30'; // Ensure high z-index
    
    // Add loading indicator
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
    `;
    
    // Create container
    const embedContainer = document.createElement('div');
    embedContainer.style.position = 'relative';
    embedContainer.style.width = '100%';
    embedContainer.style.height = '100%';
    embedContainer.style.zIndex = '20'; // Ensure container has proper z-index
    
    // Assemble elements
    embedContainer.appendChild(iframe);
    embedContainer.appendChild(placeholder);
    container.appendChild(embedContainer);
    
    // Handle load event
    iframe.onload = () => {
      placeholder.remove();
    };
    
    // Fallback if the iframe doesn't load within 5 seconds
    setTimeout(() => {
      if (container.contains(placeholder)) {
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
    }, 8000);
    
  } catch (e) {
    console.error('Error creating YouTube embed:', e);
  }
}
