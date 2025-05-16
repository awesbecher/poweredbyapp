
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { embedManager } from './utils/embedManager/EmbedManager';

// Initialize the EmbedManager
embedManager.init();

// Render the React application
createRoot(document.getElementById("root")!).render(<App />);
