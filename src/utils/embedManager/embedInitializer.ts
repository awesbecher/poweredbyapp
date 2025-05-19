
/**
 * Standalone embed initializer for critical embed functionality
 * This file provides initialization that runs directly from index.html
 */

/**
 * Main function to initialize all embeds
 * Called immediately when the script loads
 */
export function initializeAllEmbeds() {
  console.log('Direct initializer: initializing all embeds');
  initializeTallyForms();
  refreshYouTubeEmbeds();
}

/**
 * Initialize Tally forms using direct approach
 */
export function initializeTallyForms() {
  // Try the global Tally object first
  if ((window as any).Tally) {
    try {
      (window as any).Tally.loadEmbeds();
      console.log('Tally embeds initialized via global object');
    } catch (e) {
      console.error('Error initializing Tally via global object:', e);
      directlyInjectTallyForms();
    }
  } else {
    console.log('Tally global object not available, using direct injection');
    directlyInjectTallyForms();
  }
}

/**
 * Directly inject Tally forms as iframes
 */
export function directlyInjectTallyForms() {
  console.log('Using direct iframe injection for Tally forms');
  document.querySelectorAll('[data-tally-src]').forEach((container) => {
    try {
      const containerEl = container as HTMLElement;
      const src = containerEl.getAttribute('data-tally-src') || '';
      
      if (!src) return;
      
      // Check if we already have a working iframe
      const existingIframe = containerEl.querySelector('iframe');
      if (existingIframe && 
          existingIframe.style.opacity !== '0' && 
          existingIframe.style.visibility !== 'hidden') {
        existingIframe.style.opacity = '1';
        existingIframe.style.visibility = 'visible';
        existingIframe.style.display = 'block';
        existingIframe.style.zIndex = '9999';
        return;
      }
      
      // If iframe exists but might not be working, force it to be visible
      if (existingIframe) {
        existingIframe.style.opacity = '1';
        existingIframe.style.visibility = 'visible';
        existingIframe.style.display = 'block';
        existingIframe.style.zIndex = '9999';
        // Still create a new one just in case
      }
      
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.width = '100%';
      iframe.height = containerEl.getAttribute('data-tally-height') || '500';
      iframe.title = 'Tally Form';
      iframe.style.border = 'none';
      iframe.style.backgroundColor = 'transparent';
      iframe.style.width = '100%';
      iframe.style.minHeight = iframe.height + 'px';
      iframe.style.overflow = 'hidden';
      iframe.style.position = 'relative';
      iframe.style.zIndex = '9999';
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      iframe.style.display = 'block';
      
      // Only replace if there's no iframe, otherwise just ensure it's visible
      if (!existingIframe) {
        containerEl.innerHTML = '';
        containerEl.appendChild(iframe);
        console.log('Directly injected Tally iframe for', src);
      }
    } catch (e) {
      console.error('Error injecting Tally iframe:', e);
    }
  });
}

/**
 * Refresh YouTube embeds
 */
export function refreshYouTubeEmbeds() {
  console.log('Refreshing YouTube videos');
  document.querySelectorAll('iframe[src*="youtube"]').forEach((iframe) => {
    try {
      const ytIframe = iframe as HTMLIFrameElement;
      ytIframe.style.position = 'relative';
      ytIframe.style.zIndex = '9999';
      ytIframe.style.opacity = '1';
      ytIframe.style.visibility = 'visible';
      ytIframe.style.display = 'block';
      
      const currentSrc = ytIframe.src;
      if (currentSrc) {
        ytIframe.src = '';
        setTimeout(() => {
          ytIframe.src = currentSrc;
          console.log('Refreshed YouTube iframe:', currentSrc);
        }, 100);
      } else {
        // If the iframe has lost its src, attempt to recover it from data attributes
        const parent = ytIframe.closest('[data-youtube-id]');
        if (parent) {
          const videoId = parent.getAttribute('data-youtube-id');
          if (videoId) {
            ytIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?origin=${window.location.origin}`;
            console.log('Recovered YouTube iframe src with ID:', videoId);
          }
        }
      }
    } catch (e) {
      console.error('Error refreshing YouTube iframe:', e);
    }
  });
}

/**
 * Force all embeds to be visible
 */
export function forceEmbedsVisibility() {
  // Force YouTube videos to be visible
  document.querySelectorAll('iframe[src*="youtube"]').forEach((iframe) => {
    (iframe as HTMLElement).style.position = 'relative';
    (iframe as HTMLElement).style.zIndex = '9999';
    (iframe as HTMLElement).style.opacity = '1';
    (iframe as HTMLElement).style.visibility = 'visible';
    (iframe as HTMLElement).style.display = 'block';
  });
  
  // Force Tally forms to be visible
  document.querySelectorAll('[data-tally-src]').forEach((container) => {
    (container as HTMLElement).style.position = 'relative';
    (container as HTMLElement).style.zIndex = '9990';
    (container as HTMLElement).style.backgroundColor = 'transparent';
    
    const iframe = container.querySelector('iframe');
    if (iframe) {
      iframe.style.position = 'relative';
      iframe.style.zIndex = '9999';
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      iframe.style.display = 'block';
    } else {
      // If no iframe exists at this point, force a direct injection
      directlyInjectTallyForms();
    }
  });
}

/**
 * Set up mutation observers to detect DOM changes
 */
export function setupObservers() {
  try {
    const observer = new MutationObserver((mutations) => {
      let shouldCheckEmbeds = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          shouldCheckEmbeds = true;
        }
      });
      
      if (shouldCheckEmbeds) {
        setTimeout(initializeAllEmbeds, 100);
        setTimeout(forceEmbedsVisibility, 300);
      }
    });
    
    // Start observing the document body for added nodes
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
  } catch (e) {
    console.error('Error setting up mutation observer:', e);
  }
}

// Initialize everything immediately when loaded as a standalone script
if (typeof window !== 'undefined') {
  console.log('Standalone embed initializer loaded');
  
  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM content loaded - initializing from standalone');
      initializeAllEmbeds();
      setupObservers();
      
      // Multiple attempts with increasing delays
      setTimeout(initializeAllEmbeds, 500);
      setTimeout(initializeAllEmbeds, 1500);
      setTimeout(forceEmbedsVisibility, 1000);
      setTimeout(forceEmbedsVisibility, 3000);
    });
  } else {
    // DOM already loaded, run immediately
    console.log('DOM already loaded - initializing immediately from standalone');
    initializeAllEmbeds();
    setupObservers();
    
    // Multiple attempts with increasing delays
    setTimeout(initializeAllEmbeds, 500);
    setTimeout(initializeAllEmbeds, 1500);
    setTimeout(forceEmbedsVisibility, 1000);
    setTimeout(forceEmbedsVisibility, 3000);
  }
  
  // Also run on window load
  window.addEventListener('load', () => {
    console.log('Window loaded - initializing from standalone');
    initializeAllEmbeds();
    setTimeout(forceEmbedsVisibility, 600);
    setTimeout(initializeAllEmbeds, 1200);
    setTimeout(forceEmbedsVisibility, 2000);
  });
}
