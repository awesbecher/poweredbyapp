
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import AgentHeroContent from '@/components/agent/AgentHeroContent';
import ThankYouMessage from '@/components/agent/ThankYouMessage';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const AgentPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  
  // Listen for messages from the Tally iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'tally-form-submit-success') {
        setIsSubmitted(true);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Set loading to false after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Increased timeout to ensure iframe has time to load
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Function to manually insert the Tally iframe after component mount
  useEffect(() => {
    if (!isLoading && formRef.current && !iframeLoaded) {
      // Clear any existing content
      formRef.current.innerHTML = '';
      
      // Create and configure the iframe
      const iframe = document.createElement('iframe');
      iframe.src = 'https://tally.so/embed/wvp76X?alignLeft=1&hideTitle=1&dynamicHeight=1';
      iframe.width = '100%';
      iframe.height = '700px'; // Increased height from 600px to 700px
      iframe.frameBorder = '0';
      iframe.marginHeight = '0'; // Convert from number to string
      iframe.marginWidth = '0'; // Convert from number to string
      iframe.title = 'Landing Page | Agent Form';
      iframe.style.minHeight = '700px'; // Increased min-height from 600px to 700px
      iframe.style.border = 'none';
      iframe.style.backgroundColor = 'transparent';
      
      // Add load event listener
      iframe.onload = () => {
        setIframeLoaded(true);
        console.log('Tally iframe loaded successfully');
      };
      
      // Append the iframe to the container
      formRef.current.appendChild(iframe);
    }
  }, [isLoading, iframeLoaded]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Content area with floating card design */}
      <div className="flex-1 bg-gradient-to-b from-deep-purple to-[#120829] text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-16 md:py-24">
          {!isSubmitted ? (
            <div className="relative">
              {/* Decorative elements */}
              <div className="hidden md:block absolute -top-20 right-20 w-64 h-64 rounded-full bg-brand-purple/10 blur-3xl"></div>
              <div className="hidden md:block absolute top-40 -left-10 w-40 h-40 rounded-full bg-brand-purple-light/10 blur-2xl"></div>
              
              <div className="rounded-2xl border border-white/10 backdrop-blur-sm bg-black/20 overflow-hidden shadow-xl animate-fade-in">
                <div className="md:flex">
                  {/* Left Column - Hero Content */}
                  <div className="md:w-[60%] p-8 md:p-12 flex items-center">
                    <AgentHeroContent />
                  </div>
                  
                  {/* Right Column - Tally.so embed with improved styling */}
                  <div className="md:w-[40%] bg-black rounded-r-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-brand-purple-light via-brand-purple to-brand-purple-dark"></div>
                    
                    <Card className="bg-black border-0 shadow-none rounded-none h-full p-8">
                      {isLoading && (
                        <div className="flex justify-center items-center h-[700px]">
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                          </div>
                        </div>
                      )}
                      <div 
                        ref={formRef}
                        className={`tally-iframe-container w-full ${isLoading ? 'hidden' : 'block'}`}
                        style={{ minHeight: '700px' }} // Increased min-height from 600px to 700px
                      >
                        {/* Iframe will be inserted here by the useEffect */}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 backdrop-blur-sm bg-black/20 p-12 shadow-xl animate-fade-in">
              <ThankYouMessage />
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AgentPage;
