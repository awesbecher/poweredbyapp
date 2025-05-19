
import { TIMEOUTS } from './constants';
import { isTallyAvailable, loadViaGlobalObject, loadTallyScript } from './scriptLoader';
import { injectTallyForms } from './directInjection';

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

// Re-export all the functions to maintain the same public API
export { injectTallyForms } from './directInjection';
export { loadTallyScript } from './scriptLoader';
