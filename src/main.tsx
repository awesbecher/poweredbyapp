
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/embedStyles.css'; // Import the separate embed styles
import { embedManager } from './utils/embedManager';
import { initializeAllEmbeds } from './utils/embedManager/embedInitializer';

/**
 * Immediately initialize the embedManager for maximum reliability
 * This ensures embed scripts are ready before React hydration
 */
embedManager.init();

// Also call the standalone initializer for redundancy
initializeAllEmbeds();

// Render the React application
createRoot(document.getElementById("root")!).render(<App />);

// Additional embed initialization after app mount
setTimeout(() => {
  console.log('Post-render embed initialization');
  embedManager.loadAllEmbeds();
  initializeAllEmbeds(); // Call standalone initializer again
}, 1000);

// Final safety check for production environments
window.addEventListener('load', () => {
  setTimeout(() => {
    if (document.querySelector('[data-tally-src]:empty') || 
        document.querySelector('iframe[src*="youtube"]:not([src])')) {
      console.log('Final embed recovery attempt');
      embedManager.loadAllEmbeds();
      initializeAllEmbeds();
    }
  }, 2500);
});
