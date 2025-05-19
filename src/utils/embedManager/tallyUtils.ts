
/**
 * Utilities for handling Tally form embeds with enhanced reliability
 */

// Configuration constants
const TIMEOUTS = {
  SCRIPT_LOAD: 500,
  DIRECT_INJECTION: 800,
  DELAYED_INJECTION: 2500,
  IFRAME_LOAD: 1500
};

/**
 * Loads and initializes Tally forms using multiple strategies
 */
export function loadTally() {
  console.log('EmbedManager: Loading Tally forms');
  
  // Try primary method - global Tally object
  if (isTallyAvailable()) {
    loadViaGlobalObject();
  } else {
    // If Tally object isn't available, try loading the script
    loadTallyScript();
  }
  
  // Always attempt direct injection as backup regardless of other methods
  setTimeout(() => injectTallyForms(), TIMEOUTS.DIRECT_INJECTION);
  setTimeout(() => injectTallyForms(), TIMEOUTS.DELAYED_INJECTION);
}

/**
 * Check if Tally global object is available
 */
function isTallyAvailable(): boolean {
  return !!(window as any).Tally;
}

/**
 * Load Tally forms via the global object
 */
function loadViaGlobalObject() {
  try {
    console.log('Using Tally global object');
    (window as any).Tally.loadEmbeds();
  } catch (e) {
    console.error('Error initializing Tally via global object:', e);
    // Fall back to direct injection immediately
    injectTallyForms();
  }
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
      const script = createTallyScript();
      
      // Handle successful load
      script.onload = () => handleScriptLoad(resolve);
      
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
 * Create a script element for Tally
 */
function createTallyScript(): HTMLScriptElement {
  const script = document.createElement('script');
  script.src = 'https://tally.so/widgets/embed.js';
  script.async = true;
  script.crossOrigin = 'anonymous';
  return script;
}

/**
 * Handle script load event
 */
function handleScriptLoad(resolve: (success: boolean) => void) {
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
  }, TIMEOUTS.SCRIPT_LOAD);
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
      if (!src) return;
      
      // Check if there's already a working iframe
      const existingIframe = containerEl.querySelector('iframe') as HTMLIFrameElement;
      if (existingIframe && existingIframe.contentWindow) {
        enhanceExistingIframe(existingIframe);
        return;
      }
      
      // Remove existing non-working iframe if present
      if (existingIframe) {
        containerEl.removeChild(existingIframe);
      }
      
      // Prepare container and add loading state
      prepareContainer(containerEl, height);
      
      // Create and configure iframe
      const iframe = createTallyIframe(src, height, containerEl);
      
      // Add the iframe to the container
      containerEl.appendChild(iframe);
      console.log(`Directly injected Tally iframe: ${src}`);
    } catch (e) {
      console.error('Error injecting Tally iframe:', e);
    }
  });
}

/**
 * Enhance existing iframe with visibility styles
 */
function enhanceExistingIframe(iframe: HTMLIFrameElement) {
  iframe.style.position = 'relative';
  iframe.style.zIndex = '9999';
  iframe.style.opacity = '1';
  iframe.style.visibility = 'visible';
  iframe.style.display = 'block';
  iframe.style.background = 'transparent';
}

/**
 * Prepare container for Tally form
 */
function prepareContainer(container: HTMLElement, height: string) {
  // Ensure container is visible and positioned correctly
  container.style.position = 'relative';
  container.style.zIndex = '9990';
  container.style.background = 'transparent';
  container.style.minHeight = `${height}px`;
  container.style.width = '100%';
  container.style.display = 'block';
  container.style.opacity = '1';
  container.style.visibility = 'visible';
  
  // Add a loading state if it doesn't exist
  if (!container.querySelector('.tally-loader')) {
    addLoader(container);
  }
}

/**
 * Add loading indicator to container
 */
function addLoader(container: HTMLElement) {
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
  container.appendChild(loader);
}

/**
 * Create Tally iframe with all necessary attributes
 */
function createTallyIframe(src: string, height: string, container: HTMLElement): HTMLIFrameElement {
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
  iframe.style.position = 'relative';
  iframe.style.zIndex = '9999'; // Highest possible z-index
  iframe.style.backgroundColor = 'transparent'; // Keep background transparent
  
  // Handle iframe load event
  iframe.onload = () => {
    console.log(`Tally iframe loaded: ${src}`);
    // Remove loader and show form
    const loader = container.querySelector('.tally-loader');
    if (loader) container.removeChild(loader);
    iframe.style.opacity = '1';
  };
  
  return iframe;
}
