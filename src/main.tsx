
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/embedStyles.css'; // Import the separate embed styles
import { embedManager } from './utils/embedManager';
import { initializeAllEmbeds, forceEmbedsVisibility } from './utils/embedManager/embedInitializer';

/**
 * Immediately initialize the embedManager for maximum reliability
 * This ensures embed scripts are ready before React hydration
 */
embedManager.init();

// Also call the standalone initializer for redundancy
initializeAllEmbeds();

// Create a function to handle embed initialization
const initializeEmbeds = () => {
  console.log('Initializing embeds from main.tsx');
  embedManager.loadAllEmbeds();
  initializeAllEmbeds();
  setTimeout(forceEmbedsVisibility, 500);
};

// Render the React application
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Additional embed initialization after app mount
setTimeout(initializeEmbeds, 500);
setTimeout(initializeEmbeds, 2000);
setTimeout(initializeEmbeds, 5000);

// Add a special debug function to the window for emergency reinitialization
(window as any).reinitializeEmbeds = () => {
  console.log('Manual embed reinitialization triggered');
  initializeEmbeds();
  setTimeout(forceEmbedsVisibility, 200);
};

// Additional safety check for production environments
window.addEventListener('load', () => {
  // First attempt
  setTimeout(initializeEmbeds, 1000);
  
  // Secondary attempt with checks for broken embeds
  setTimeout(() => {
    const brokenTallyForms = document.querySelectorAll('[data-tally-src]:empty');
    const brokenYouTubeVideos = document.querySelectorAll('iframe[src*="youtube"]:not([src])');
    
    if (brokenTallyForms.length > 0 || brokenYouTubeVideos.length > 0) {
      console.log(`Detected broken embeds: ${brokenTallyForms.length} Tally, ${brokenYouTubeVideos.length} YouTube`);
      initializeEmbeds();
    }
  }, 3000);
  
  // Final backup attempt for stubborn cases
  setTimeout(initializeEmbeds, 6000);
});
