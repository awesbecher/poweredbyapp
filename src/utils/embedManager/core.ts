
/**
 * Core functionality for the EmbedManager
 * Handles initialization and orchestration of embed types
 */

import { loadTally, injectTallyForms } from './tallyUtils';
import { refreshYouTube } from './youtube'; // Using the directory import
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
    
    // Force immediate initialization
    this.loadAllEmbeds();
    initializeAllEmbeds();
    
    // Setup observer for dynamic content
    setupObserver(() => {
      this.loadAllEmbeds();
      initializeAllEmbeds();
    });
    
    // Set up additional load events with progressive timeouts
    window.addEventListener('load', () => {
      console.log('Window load event - reinitializing embeds');
      this.loadAllEmbeds();
      initializeAllEmbeds();
      
      // Additional delayed reinitializations for robustness
      setTimeout(() => this.loadAllEmbeds(), 500);
      setTimeout(() => initializeAllEmbeds(), 800);
      setTimeout(() => forceEmbedsVisibility(), 1200);
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
        setTimeout(() => forceEmbedsVisibility(), 300);
      }
    });
    
    // Production-focused initialization strategy with aggressive retries
    const retryIntervals = [300, 800, 1500, 3000, 6000];
    retryIntervals.forEach(delay => {
      setTimeout(() => this.loadAllEmbeds(), delay);
      setTimeout(() => initializeAllEmbeds(), delay + 100);
      setTimeout(() => forceEmbedsVisibility(), delay + 200);
    });
  }
  
  /**
   * Load all embed types with a comprehensive strategy
   */
  loadAllEmbeds() {
    console.log('EmbedManager: Loading all embeds');
    this.loadTally();
    this.refreshYouTube();
  }
  
  /**
   * Loads and initializes Tally forms using multiple strategies
   */
  loadTally() {
    loadTally();
    
    // Force direct injection as ultimate fallback
    setTimeout(() => {
      injectTallyForms();
    }, 100);
    
    // Add an additional fallback with a longer delay for stubborn iframes
    setTimeout(() => {
      injectTallyForms();
      console.log("Emergency Tally iframe injection triggered");
    }, 2000);
  }
  
  /**
   * Refreshes YouTube embeds by temporarily removing and restoring their src
   */
  refreshYouTube() {
    refreshYouTube();
    
    // Add an additional refresh with a delay
    setTimeout(() => {
      refreshYouTube();
      console.log("Emergency YouTube refresh triggered");
    }, 1500);
  }
}

// Export a singleton instance
export const embedManager = new EmbedManager();
