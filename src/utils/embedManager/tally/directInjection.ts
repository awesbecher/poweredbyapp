
import { prepareContainer, createTallyIframe, enhanceExistingIframe } from './domUtils';

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
      
      // Prepare container 
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
