
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Function to load and initialize Tally
const loadTallyScript = () => {
  // Check if Tally script is already loaded
  if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
    const script = document.createElement('script');
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => {
      console.log("Tally script loaded successfully");
      if (window.Tally) {
        window.Tally.loadEmbeds();
      }
    };
    document.body.appendChild(script);
  } else {
    // If script exists, try to initialize it
    if (window.Tally) {
      window.Tally.loadEmbeds();
    }
  }
};

// Make sure Tally is available in the window object
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

// Load Tally script first, then render React
loadTallyScript();

// Render the React application
createRoot(document.getElementById("root")!).render(<App />);
