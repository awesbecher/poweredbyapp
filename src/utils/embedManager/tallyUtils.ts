/**
 * Utilities for handling Tally form embeds with enhanced production reliability
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
      // Fall back to direct injection immediately
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
  
  // Always attempt direct injection as a backup regardless of other methods
  setTimeout(() => injectTallyForms(), 800);
  setTimeout(() => injectTallyForms(), 2500);
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
 * Directly injects Tally forms as iframe elements with enhanced reliability
 * Used as a reliable fallback when other methods fail
 */
export function injectTallyForms() {
  console.log('Using direct iframe injection for Tally forms');
  document.querySelectorAll('[data-tally-src]').forEach(container => {
    try {
      // Cast container to HTMLElement to safely access attributes
      const containerEl = container as HTMLElement;
      const src = containerEl.getAttribute('data-tally-src') || '';
      const height = containerEl.getAttribute('data-tally-height') || '500';
      
      // Skip empty sources or if already has working iframe
      if (!src || (containerEl.querySelector('iframe') && 
          (containerEl.querySelector('iframe') as HTMLIFrameElement).contentWindow)) {
        return;
      }
      
      // Add a loading state if it doesn't exist
      if (!containerEl.querySelector('.tally-loader')) {
        const loader = document.createElement('div');
        loader.className = 'tally-loader';
        loader.innerHTML = `
          <div style="display:flex;justify-content:center;align-items:center;height:100px;width:100%">
            <div style="border:3px solid #f3f3f3;border-top:3px solid #8B5CF6;border-radius:50%;width:30px;height:30px;animation:tally-spin 1s linear infinite"></div>
          </div>
          <style>
            @keyframes tally-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        `;
        containerEl.appendChild(loader);
      }
      
      // Create and configure iframe
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.width = '100%';
      iframe.height = height;
      iframe.title = 'Tally Form';
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.minHeight = `${height}px`;
      iframe.style.overflow = 'hidden';
      iframe.style.opacity = '0'; // Start hidden until loaded
      
      // Handle iframe load event
      iframe.onload = () => {
        console.log(`Tally iframe loaded: ${src}`);
        // Remove loader and show form
        const loader = containerEl.querySelector('.tally-loader');
        if (loader) containerEl.removeChild(loader);
        iframe.style.opacity = '1';
      };
      
      // Handle load error with retry
      iframe.onerror = () => {
        console.error(`Error loading Tally iframe: ${src}`);
        // Keep loader visible
      };
      
      // Don't override if container already has a working iframe
      const existingIframe = containerEl.querySelector('iframe') as HTMLIFrameElement;
      if (!existingIframe || !existingIframe.contentWindow) {
        if (existingIframe) containerEl.removeChild(existingIframe);
        containerEl.appendChild(iframe);
        console.log(`Directly injected Tally iframe: ${src}`);
      }
    } catch (e) {
      console.error('Error injecting Tally iframe:', e);
    }
  });
}
