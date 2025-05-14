
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
    
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timer);
    };
  }, []);

  // Function to initialize Tally embed
  const initializeTallyEmbed = () => {
    const script = document.createElement('script');
    script.innerHTML = `
      var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
    `;
    document.body.appendChild(script);
  };

  // Call the initialize function when the component mounts
  useEffect(() => {
    initializeTallyEmbed();
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
                    className={`tally-iframe-container w-full ${isLoading ? 'hidden' : 'block'}`}
                  >
                    <iframe 
                      data-tally-src="https://tally.so/embed/wvp76X?alignLeft=1&hideTitle=1&dynamicHeight=1" 
                      loading="lazy" 
                      width="100%" 
                      height="200" 
                      frameBorder="0" 
                      marginHeight="0" 
                      marginWidth="0" 
                      title="Landing Page | Agent Form"
                    ></iframe>
                  </div>
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
