
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { embedManager } from './utils/embedManager';

/**
 * Immediately initialize the embedManager for maximum reliability
 * This ensures embed scripts are ready before React hydration
 */
embedManager.init();

// Render the React application
createRoot(document.getElementById("root")!).render(<App />);

// Additional embed initialization after app mount
setTimeout(() => {
  console.log('Post-render embed initialization');
  embedManager.loadAllEmbeds();
}, 1000);

// Final safety check for production environments
window.addEventListener('load', () => {
  setTimeout(() => {
    if (document.querySelector('[data-tally-src]:empty') || 
        document.querySelector('iframe[src*="youtube"]:not([src])')) {
      console.log('Final embed recovery attempt');
      embedManager.loadAllEmbeds();
    }
  }, 2500);
});
