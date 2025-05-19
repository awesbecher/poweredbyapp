
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
      
      if (!src || containerEl.querySelector('iframe')) return;
      
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
      iframe.style.zIndex = '30';
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      iframe.style.display = 'block';
      
      containerEl.innerHTML = '';
      containerEl.appendChild(iframe);
      console.log('Directly injected Tally iframe for', src);
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
      ytIframe.style.zIndex = '30';
      
      const currentSrc = ytIframe.src;
      if (currentSrc) {
        ytIframe.src = '';
        setTimeout(() => {
          ytIframe.src = currentSrc;
          console.log('Refreshed YouTube iframe:', currentSrc);
        }, 100);
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
    (iframe as HTMLElement).style.zIndex = '30';
  });
  
  // Force Tally forms to be visible
  document.querySelectorAll('[data-tally-src]').forEach((container) => {
    (container as HTMLElement).style.position = 'relative';
    (container as HTMLElement).style.zIndex = '20';
    (container as HTMLElement).style.backgroundColor = 'transparent';
    
    const iframe = container.querySelector('iframe');
    if (iframe) {
      iframe.style.position = 'relative';
      iframe.style.zIndex = '30';
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      iframe.style.display = 'block';
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
        setTimeout(forceEmbedsVisibility, 500);
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
      setTimeout(initializeAllEmbeds, 1000);
      setTimeout(initializeAllEmbeds, 3000);
      setTimeout(forceEmbedsVisibility, 2000);
    });
  } else {
    // DOM already loaded, run immediately
    console.log('DOM already loaded - initializing immediately from standalone');
    initializeAllEmbeds();
    setupObservers();
    
    // Multiple attempts with increasing delays
    setTimeout(initializeAllEmbeds, 1000);
    setTimeout(initializeAllEmbeds, 3000);
    setTimeout(forceEmbedsVisibility, 2000);
  }
  
  // Also run on window load
  window.addEventListener('load', () => {
    console.log('Window loaded - initializing from standalone');
    initializeAllEmbeds();
    setTimeout(forceEmbedsVisibility, 1500);
  });
}
