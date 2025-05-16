
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Improved function to load and initialize Tally
const loadTallyScript = () => {
  return new Promise((resolve) => {
    // Check if script is already loaded
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script');
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      script.onload = () => {
        console.log("Tally script loaded successfully");
        if ((window as any).Tally) {
          (window as any).Tally.loadEmbeds();
        }
        resolve(true);
      };
      document.body.appendChild(script);
    } else {
      // If script exists, try to initialize it
      if ((window as any).Tally) {
        (window as any).Tally.loadEmbeds();
      }
      resolve(true);
    }
  });
};

// Load Tally script immediately
loadTallyScript().then(() => {
  console.log("Tally initialized at application start");
});

// Render the React application
createRoot(document.getElementById("root")!).render(<App />);
