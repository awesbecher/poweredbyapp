
/**
 * Core functionality for the EmbedManager
 * Handles initialization and orchestration of embed types
 */

import { loadTally, injectTallyForms } from './tallyUtils';
import { refreshYouTube } from './youtube'; // Updated to the new path
import { setupObserver } from './observerUtils';
import { 
  initializeAllEmbeds, 
  forceEmbedsVisibility 
} from './embedInitializer';

/**
 * Primary class for managing embedded content across the application
 */
class EmbedManager {
  initialized = false;

  /**
   * Initialize all embed management functionality with improved reliability
   */
  init() {
    console.log('Initializing EmbedManager');
    
    // Mark as initialized
    this.initialized = true;
    
    // Immediate initialization using both approaches
    this.loadAllEmbeds();
    initializeAllEmbeds();
    
    // Setup observer for dynamic content
    setupObserver(() => {
      this.loadAllEmbeds();
      initializeAllEmbeds();
    });
    
    // Set up additional load events
    window.addEventListener('load', () => {
      console.log('Window load event - reinitializing embeds');
      this.loadAllEmbeds();
      initializeAllEmbeds();
      
      // Additional delayed reinitializations for robustness
      setTimeout(() => this.loadAllEmbeds(), 1000);
      setTimeout(() => initializeAllEmbeds(), 1500);
      setTimeout(() => forceEmbedsVisibility(), 2000);
    });
    
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM ready - initializing embeds');
      this.loadAllEmbeds();
      initializeAllEmbeds();
    });
    
    // Set up visibility change event for when user switches tabs/windows
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        console.log('Page became visible - reinitializing embeds');
        this.loadAllEmbeds();
        initializeAllEmbeds();
      }
    });
    
    // Production-focused initialization strategy with multiple retries
    const retryIntervals = [800, 1500, 3000, 6000];
    retryIntervals.forEach(delay => {
      setTimeout(() => this.loadAllEmbeds(), delay);
      setTimeout(() => initializeAllEmbeds(), delay + 200);
    });
  }
  
  /**
   * Load all embed types with a comprehensive strategy
   */
  loadAllEmbeds() {
    console.log('EmbedManager: Loading all embeds');
    this.loadTally();
    this.refreshYouTube();
    
    // Double-check for any missed embeds after short delay
    setTimeout(() => {
      this.loadTally();
      this.refreshYouTube();
    }, 500);
  }
  
  /**
   * Loads and initializes Tally forms using multiple strategies
   */
  loadTally() {
    loadTally();
    
    // Force direct injection as ultimate fallback
    setTimeout(() => {
      injectTallyForms();
    }, 1500);
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
