
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import AgentHeroContent from '@/components/agent/AgentHeroContent';
import ThankYouMessage from '@/components/agent/ThankYouMessage';

const AgentPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add event listener for form submission
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'tally-form-submit-success') {
        setIsSubmitted(true);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Manual initialization of Tally form
    const initializeForm = () => {
      if (!window.Tally) {
        console.log("Tally not found, loading script...");
        // If Tally isn't loaded, add the script dynamically
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => {
          console.log("Tally script loaded, initializing embed...");
          if (window.Tally) {
            window.Tally.loadEmbeds();
            setIsLoading(false);
          }
        };
        document.head.appendChild(script);
      } else {
        console.log("Tally found, initializing embed...");
        window.Tally.loadEmbeds();
        setIsLoading(false);
      }
    };
    
    // Initialize form with a slight delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      initializeForm();
    }, 500);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Content area with same background as landing page */}
      <div className="flex-1 bg-gradient-to-b from-deep-purple to-[#120829] text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-20 md:py-80">
          {!isSubmitted ? (
            <div className="flex flex-col md:flex-row md:gap-10">
              {/* Left Column - Hero Content */}
              <AgentHeroContent />
              
              {/* Right Column - Tally.so embed */}
              <div className="md:w-[40%]">
                <div className="bg-black rounded-lg shadow-md p-8 h-full">
                  {isLoading && (
                    <div className="flex justify-center items-center h-[300px]">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                  <div 
                    ref={formRef} 
                    data-tally-src="https://tally.so/embed/wvp76X?alignLeft=1&transparentBackground=1&dynamicHeight=1" 
                    className={`tally-iframe-container w-full ${isLoading ? 'hidden' : 'block'}`}
                    style={{ minHeight: '400px' }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <ThankYouMessage />
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Add Tally to the Window interface
declare global {
  interface Window {
    Tally: {
      loadEmbeds: () => void;
    };
  }
}

export default AgentPage;
