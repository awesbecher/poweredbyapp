
/**
 * Core functionality for the EmbedManager
 * Handles initialization and orchestration of embed types
 */

import { loadTally, injectTallyForms } from './tallyUtils';
import { refreshYouTube } from './youtubeUtils';
import { setupObserver } from './observerUtils';

/**
 * Primary class for managing embedded content across the application
 */
class EmbedManager {
  /**
   * Initialize all embed management functionality
   */
  init() {
    console.log('Initializing EmbedManager');
    loadTally();
    setupObserver(() => {
      loadTally();
      refreshYouTube();
    });
    
    // Set up additional load events
    window.addEventListener('load', () => {
      console.log('Window load event - reinitializing embeds');
      loadTally();
      refreshYouTube();
    });
    
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM ready - initializing embeds');
      loadTally();
      setTimeout(() => refreshYouTube(), 1000);
    });
    
    // Additional delayed initialization for reliability
    setTimeout(() => loadTally(), 1500);
    setTimeout(() => loadTally(), 3000);
    setTimeout(() => loadTally(), 6000);
  }
  
  /**
   * Loads and initializes Tally forms using multiple strategies
   */
  loadTally() {
    loadTally();
  }
  
  /**
   * Refreshes YouTube embeds by temporarily removing and restoring their src
   */
  refreshYouTube() {
    refreshYouTube();
  }
}

// Export a singleton instance
export const embedManager = new EmbedManager();
