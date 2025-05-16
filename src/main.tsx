
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced function to load and initialize Tally with better error handling and retries
const loadTallyScript = () => {
  return new Promise((resolve) => {
    try {
      // Check if script is already loaded
      if (!document.querySelector('script[src*="tally.so/widgets/embed.js"]')) {
        console.log("No Tally script found. Loading it now...");
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.defer = false;
        script.setAttribute('crossorigin', 'anonymous');
        script.onload = () => {
          console.log("Tally script loaded successfully");
          // Delay the loadEmbeds call to ensure the script is fully initialized
          setTimeout(() => {
            if ((window as any).Tally) {
              console.log("Initializing Tally embeds");
              try {
                (window as any).Tally.loadEmbeds();
                console.log("Tally embeds loaded");
              } catch (error) {
                console.error("Failed to load Tally embeds:", error);
              }
            } else {
              console.warn("Tally object not available after script load");
            }
            resolve(true);
          }, 500);
        };
        script.onerror = (error) => {
          console.error("Failed to load Tally script:", error);
          resolve(false);
        };
        document.body.appendChild(script);
      } else {
        // If script exists, try to initialize it
        console.log("Tally script already exists");
        if ((window as any).Tally) {
          try {
            (window as any).Tally.loadEmbeds();
            console.log("Tally embeds re-initialized");
          } catch (error) {
            console.error("Error re-initializing Tally embeds:", error);
          }
        } else {
          console.warn("Tally object not found despite script being present");
        }
        resolve(true);
      }
    } catch (e) {
      console.error("Error in Tally initialization:", e);
      resolve(false);
    }
  });
};

// Load Tally script immediately
loadTallyScript().then((success) => {
  console.log(`Tally initialization ${success ? "completed" : "failed"} at application start`);
  
  // Implement multiple retry attempts with increasing delays
  if (!success) {
    const retryDelays = [2000, 4000, 8000];
    
    retryDelays.forEach((delay, index) => {
      setTimeout(() => {
        console.log(`Retry ${index + 1} of ${retryDelays.length} for Tally initialization`);
        loadTallyScript();
      }, delay);
    });
  }
});

// Set up a MutationObserver to detect DOM changes and reinitialize Tally forms
// This helps ensure forms load after route changes or dynamic content updates
document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    let shouldReloadTally = false;
    let shouldReloadYouTube = false;
    
    mutations.forEach((mutation) => {
      // Check if any tally-related or youtube-related elements were added
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element;
            
            // Check for Tally elements
            if (
              element.querySelector('.tally-form-container') || 
              element.classList?.contains('tally-form-container') ||
              element.querySelector('iframe[src*="tally.so"]')
            ) {
              shouldReloadTally = true;
            }
            
            // Check for YouTube elements
            if (
              element.querySelector('iframe[src*="youtube"]') ||
              (element.tagName === 'IFRAME' && (element as HTMLIFrameElement).src.includes('youtube'))
            ) {
              shouldReloadYouTube = true;
            }
          }
        });
      }
    });
    
    // Reload Tally if needed
    if (shouldReloadTally && (window as any).Tally) {
      console.log("DOM changed, reloading Tally embeds");
      try {
        (window as any).Tally.loadEmbeds();
      } catch (e) {
        console.error("Error reloading Tally embeds after DOM change:", e);
      }
    }
    
    // Reload YouTube iframes if needed
    if (shouldReloadYouTube) {
      console.log("DOM changed, refreshing YouTube embeds");
      document.querySelectorAll('iframe[src*="youtube"]').forEach((iframe) => {
        // Cast to HTMLIFrameElement to access src property
        const currentSrc = (iframe as HTMLIFrameElement).src;
        (iframe as HTMLIFrameElement).src = '';
        setTimeout(() => {
          (iframe as HTMLIFrameElement).src = currentSrc;
        }, 100);
      });
    }
  });
  
  // Start observing changes to the document body
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
  
  // Initial check for elements that might need initialization
  setTimeout(() => {
    if (document.querySelector('.tally-form-container') && (window as any).Tally) {
      console.log("Initial check: Found Tally containers, initializing");
      try {
        (window as any).Tally.loadEmbeds();
      } catch (e) {
        console.error("Error initializing Tally embeds on initial check:", e);
      }
    }
  }, 2000);
});

// Render the React application
createRoot(document.getElementById("root")!).render(<App />);
