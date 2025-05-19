
import { TIMEOUTS, TALLY_SCRIPT_URL } from './constants';

/**
 * Check if Tally global object is available
 */
export function isTallyAvailable(): boolean {
  return !!(window as any).Tally;
}

/**
 * Load Tally forms via the global object
 */
export function loadViaGlobalObject() {
  try {
    console.log('Using Tally global object');
    (window as any).Tally.loadEmbeds();
    return true;
  } catch (e) {
    console.error('Error initializing Tally via global object:', e);
    return false;
  }
}

/**
 * Handle script load event
 */
export function handleScriptLoad(resolve: (success: boolean) => void) {
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
 * Loads the Tally script if not already loaded
 * @returns Promise resolving to boolean indicating success
 */
export function loadTallyScript(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    try {
      // Check if script already exists
      if (document.querySelector(`script[src*="${TALLY_SCRIPT_URL}"]`)) {
        console.log('Tally script already exists');
        resolve(true);
        return;
      }
      
      // Create and add the script
      const script = document.createElement('script');
      script.src = TALLY_SCRIPT_URL;
      script.async = true;
      script.crossOrigin = 'anonymous';
      
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
