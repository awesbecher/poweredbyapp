
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import AgentHeroContent from '@/components/agent/AgentHeroContent';
import ThankYouMessage from '@/components/agent/ThankYouMessage';

const AgentPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Tally.so script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    
    // Add event listener for form submission
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'tally-form-submit-success') {
        setIsSubmitted(true);
      }
    };
    
    window.addEventListener('message', handleMessage);
    document.body.appendChild(script);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      document.body.removeChild(script);
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
                  <div ref={formRef} data-tally-src="https://tally.so/embed/wvp76X?alignLeft=1&transparentBackground=1&dynamicHeight=1" data-tally-width="100%" className="tally-form"></div>
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

export default AgentPage;
