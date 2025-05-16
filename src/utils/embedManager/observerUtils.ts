
/**
 * Utilities for observing DOM changes related to embeds
 */

/**
 * Sets up a mutation observer to detect DOM changes and trigger callbacks
 * @param callback Function to call when relevant DOM changes are detected
 */
export function setupObserver(callback: () => void) {
  try {
    const observer = new MutationObserver((mutations) => {
      let shouldCheckEmbeds = false;
      
      mutations.forEach((mutation) => {
        // Check for relevant DOM changes
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Look for specific elements that might contain embeds
              if (
                element.tagName === 'DIV' ||
                element.tagName === 'SECTION' ||
                element.querySelector('[data-tally-src]') ||
                element.querySelector('iframe')
              ) {
                shouldCheckEmbeds = true;
              }
            }
          });
        }
      });
      
      // If relevant changes were detected, trigger callback
      if (shouldCheckEmbeds) {
        console.log('DOM changed, reinitializing embeds');
        setTimeout(() => {
          callback();
        }, 500);
      }
    });
    
    // Start observing the entire document
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
    
    console.log('Mutation observer setup complete');
  } catch (e) {
    console.error('Error setting up mutation observer:', e);
  }
}
