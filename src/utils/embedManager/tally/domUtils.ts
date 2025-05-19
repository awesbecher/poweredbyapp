
/**
 * DOM manipulation utilities for Tally embeds
 */

/**
 * Enhance existing iframe with visibility styles
 */
export function enhanceExistingIframe(iframe: HTMLIFrameElement) {
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
export function prepareContainer(container: HTMLElement, height: string) {
  // Ensure container is visible and positioned correctly
  container.style.position = 'relative';
  container.style.zIndex = '9990';
  container.style.background = 'transparent';
  container.style.minHeight = `${height}px`;
  container.style.width = '100%';
  container.style.display = 'block';
  container.style.opacity = '1';
  container.style.visibility = 'visible';
}

/**
 * Create Tally iframe with all necessary attributes
 */
export function createTallyIframe(src: string, height: string, container: HTMLElement): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.width = '100%';
  iframe.height = height;
  iframe.title = 'Tally Form';
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.minHeight = `${height}px`;
  iframe.style.overflow = 'hidden';
  iframe.style.opacity = '1'; 
  iframe.style.position = 'relative';
  iframe.style.zIndex = '9999';
  iframe.style.backgroundColor = 'transparent';
  
  // Handle iframe load event
  iframe.onload = () => {
    console.log(`Tally iframe loaded: ${src}`);
    // Remove loader if it exists
    const loader = container.querySelector('.tally-loader');
    if (loader) container.removeChild(loader);
  };
  
  return iframe;
}

/**
 * Create a script element for Tally
 */
export function createTallyScript(scriptUrl: string): HTMLScriptElement {
  const script = document.createElement('script');
  script.src = scriptUrl;
  script.async = true;
  script.crossOrigin = 'anonymous';
  return script;
}
