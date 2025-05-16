
/**
 * Entry point for the EmbedManager module
 * Re-exports the singleton instance and key utilities
 */

export { embedManager } from './core';
export { loadTally, injectTallyForms } from './tallyUtils';
export { refreshYouTube } from './youtubeUtils';
export { setupObserver } from './observerUtils';
