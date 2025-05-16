
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fixed and optimized embed management system
const EmbedManager = {
  init() {
    console.log('Initializing EmbedManager');
    this.loadTally();
    this.setupObserver();
    
    // Set up additional load events
    window.addEventListener('load', () => {
      console.log('Window load event - reinitializing embeds');
      this.loadTally();
      this.refreshYouTube();
    });
    
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM ready - initializing embeds');
      this.loadTally();
      setTimeout(() => this.refreshYouTube(), 1000);
    });
    
    // Additional delayed initialization for reliability
    setTimeout(() => this.loadTally(), 1500);
    setTimeout(() => this.loadTally(), 3000);
    setTimeout(() => this.loadTally(), 6000);
  },
  
  loadTally() {
    console.log('EmbedManager: Loading Tally forms');
    
    // First, try to use the Tally global object
    if ((window as any).Tally) {
      try {
        console.log('Using Tally global object');
        (window as any).Tally.loadEmbeds();
      } catch (e) {
        console.error('Error initializing Tally via global object:', e);
        this.injectTallyForms();
      }
    } else {
      // If Tally object isn't available, try loading the script
      console.log('Tally global object not available');
      this.loadTallyScript()
        .then(success => {
          if (!success) {
            // If script loading fails, use direct injection
            this.injectTallyForms();
          }
        });
    }
    
    // Also attempt direct injection as a backup
    setTimeout(() => this.injectTallyForms(), 1000);
  },
  
  // Improved script loading with better error handling
  loadTallyScript() {
    return new Promise<boolean>((resolve) => {
      try {
        // Check if script already exists
        if (document.querySelector('script[src*="tally.so/widgets/embed.js"]')) {
          console.log('Tally script already exists');
          resolve(true);
          return;
        }
        
        // Create and add the script
        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        // Handle successful load
        script.onload = () => {
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
          }, 500);
        };
        
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
  },
  
  // Direct injection of Tally forms as a reliable fallback
  injectTallyForms() {
    console.log('Using direct iframe injection for Tally forms');
    document.querySelectorAll('[data-tally-src]').forEach(container => {
      if (!container.querySelector('iframe')) {
        try {
          // Here's the TypeScript fix: Cast container to HTMLElement so we can safely access the attributes
          const containerEl = container as HTMLElement;
          const src = containerEl.getAttribute('data-tally-src') || '';
          const height = containerEl.getAttribute('data-tally-height') || '500';
          
          const iframe = document.createElement('iframe');
          iframe.src = src;
          iframe.width = '100%';
          iframe.height = height;
          iframe.title = 'Tally Form';
          iframe.style.border = 'none';
          iframe.style.width = '100%';
          iframe.style.minHeight = `${height}px`;
          iframe.style.overflow = 'hidden';
          
          // Don't override if container already has an iframe
          if (!containerEl.querySelector('iframe')) {
            containerEl.innerHTML = '';
            containerEl.appendChild(iframe);
            console.log(`Directly injected Tally iframe: ${src}`);
          }
        } catch (e) {
          console.error('Error injecting Tally iframe:', e);
        }
      }
    });
  },
  
  // Refresh YouTube embeds - Fixed TypeScript errors
  refreshYouTube() {
    console.log('EmbedManager: Refreshing YouTube videos');
    document.querySelectorAll('iframe[src*="youtube"]').forEach((iframe) => {
      try {
        // Cast to HTMLIFrameElement to access src property
        const ytIframe = iframe as HTMLIFrameElement;
        const currentSrc = ytIframe.src;
        if (currentSrc) {
          ytIframe.src = '';
          setTimeout(() => {
            ytIframe.src = currentSrc;
            console.log(`Refreshed YouTube iframe: ${currentSrc}`);
          }, 100);
        }
      } catch (e) {
        console.error('Error refreshing YouTube iframe:', e);
      }
    });
  },
  
  // Set up a mutation observer to detect DOM changes
  setupObserver() {
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
        
        // If relevant changes were detected, reinitialize embeds
        if (shouldCheckEmbeds) {
          console.log('DOM changed, reinitializing embeds');
          setTimeout(() => {
            this.loadTally();
            this.refreshYouTube();
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
};

// Initialize the EmbedManager
EmbedManager.init();

// Render the React application
createRoot(document.getElementById("root")!).render(<App />);
