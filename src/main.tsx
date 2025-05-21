import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/embedStyles.css';

// Ensure Tally script is loaded
export const ensureTallyScript = () => {
  // Check if Tally script exists
  if (!(window as any).Tally && !document.querySelector('script[src*="tally.so/widgets/embed.js"]')) {
    console.log('Loading Tally script directly');
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
  
  // Initialize if Tally object exists
  if ((window as any).Tally) {
    try {
      (window as any).Tally.loadEmbeds();
      console.log('Tally forms initialized from main.tsx');
    } catch (e) {
      console.error('Error initializing Tally:', e);
    }
  }
};

// Initialize YouTube embeds
const initializeYouTube = () => {
  document.querySelectorAll('[data-youtube-id]').forEach((container) => {
    const containerEl = container as HTMLElement;
    const videoId = containerEl.getAttribute('data-youtube-id') || '';
    
    if (!videoId) return;
    
    // Check if iframe already exists
    const existingIframe = containerEl.querySelector('iframe');
    if (existingIframe && existingIframe.contentWindow) {
      existingIframe.style.opacity = '1';
      existingIframe.style.visibility = 'visible';
      return;
    }
    
    // Create iframe with all necessary attributes
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?origin=${window.location.origin}`;
    iframe.title = "YouTube Video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.position = 'absolute';
    iframe.style.inset = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.zIndex = '9999';
    
    // Replace existing content
    containerEl.innerHTML = '';
    containerEl.appendChild(iframe);
    console.log(`Directly injected YouTube iframe for: ${videoId}`);
  });
};

// Force visibility of all embeds
const forceEmbedsVisibility = () => {
  // Force YouTube videos to be visible
  document.querySelectorAll('iframe[src*="youtube"]').forEach((iframe) => {
    (iframe as HTMLElement).style.opacity = '1';
    (iframe as HTMLElement).style.visibility = 'visible';
    (iframe as HTMLElement).style.display = 'block';
    (iframe as HTMLElement).style.zIndex = '9999';
  });
};

// Initialize everything
const initializeEmbeds = () => {
  console.log('Initializing embeds from main.tsx');
  ensureTallyScript();
  initializeYouTube();
  forceEmbedsVisibility();
};

// Render the React application
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Initialize embeds immediately
initializeEmbeds();

// Set up multiple attempts with delays
setTimeout(initializeEmbeds, 500);
setTimeout(initializeEmbeds, 1500);
setTimeout(initializeEmbeds, 3000);
setTimeout(initializeEmbeds, 5000);

// Set up visibility change event for when user switches tabs
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    console.log('Page became visible - reinitializing embeds');
    setTimeout(initializeEmbeds, 300);
  }
});

// Initialize embeds after window load
window.addEventListener('load', () => {
  initializeEmbeds();
  setTimeout(initializeEmbeds, 1000);
});

// Add a global function for emergency reinitialization
(window as any).reinitializeEmbeds = initializeEmbeds;
