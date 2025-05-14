
/// <reference types="vite/client" />

// Global Tally declaration for use throughout the application
interface Window {
  Tally?: {
    loadEmbeds: () => void;
  };
}
