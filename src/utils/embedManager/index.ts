
/**
 * Entry point for the EmbedManager module
 * Re-exports the singleton instance and key utilities
 */

export { embedManager } from './core';
export { loadTally, injectTallyForms } from './tally';
export { refreshYouTube } from './youtube';
export { setupObserver } from './observerUtils';
