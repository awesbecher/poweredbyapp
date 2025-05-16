
/**
 * Utilities for handling Tally form embeds
 */

/**
 * Loads and initializes Tally forms using multiple strategies
 */
export function loadTally() {
  console.log('EmbedManager: Loading Tally forms');
  
  // First, try to use the Tally global object
  if ((window as any).Tally) {
    try {
      console.log('Using Tally global object');
      (window as any).Tally.loadEmbeds();
    } catch (e) {
      console.error('Error initializing Tally via global object:', e);
      injectTallyForms();
    }
  } else {
    // If Tally object isn't available, try loading the script
    console.log('Tally global object not available');
    loadTallyScript()
      .then(success => {
        if (!success) {
          // If script loading fails, use direct injection
          injectTallyForms();
        }
      });
  }
  
  // Also attempt direct injection as a backup
  setTimeout(() => injectTallyForms(), 1000);
}

/**
 * Loads the Tally script if not already loaded
 * @returns Promise resolving to boolean indicating success
 */
export function loadTallyScript(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    try {
      // Check if script already exists
      if (document.querySelector('script[src*="tally.so/widgets/embed.js"]')) {
        console.log('Tally script already exists');
        resolve(true);
        return;
      }
      
      // Create and add the script
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      // Handle successful load
      script.onload = () => {
        console.log('Tally script loaded successfully');
        setTimeout(() => {
          if ((window as any).Tally) {
            try {
              (window as any).Tally.loadEmbeds();
              resolve(true);
            } catch (e) {
              console.error('Error initializing Tally after script load:', e);
              resolve(false);
            }
          } else {
            console.warn('Tally object not found after script load');
            resolve(false);
          }
        }, 500);
      };
      
      // Handle load failure
      script.onerror = () => {
        console.error('Failed to load Tally script');
        resolve(false);
      };
      
      // Add to document
      document.head.appendChild(script);
    } catch (e) {
      console.error('Error loading Tally script:', e);
      resolve(false);
    }
  });
}

/**
 * Directly injects Tally forms as iframe elements
 * Used as a reliable fallback when other methods fail
 */
export function injectTallyForms() {
  console.log('Using direct iframe injection for Tally forms');
  document.querySelectorAll('[data-tally-src]').forEach(container => {
    if (!container.querySelector('iframe')) {
      try {
        // Cast container to HTMLElement to safely access attributes
        const containerEl = container as HTMLElement;
        const src = containerEl.getAttribute('data-tally-src') || '';
        const height = containerEl.getAttribute('data-tally-height') || '500';
        
        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.width = '100%';
        iframe.height = height;
        iframe.title = 'Tally Form';
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.style.minHeight = `${height}px`;
        iframe.style.overflow = 'hidden';
        
        // Don't override if container already has an iframe
        if (!containerEl.querySelector('iframe')) {
          containerEl.innerHTML = '';
          containerEl.appendChild(iframe);
          console.log(`Directly injected Tally iframe: ${src}`);
        }
      } catch (e) {
        console.error('Error injecting Tally iframe:', e);
      }
    }
  });
}
