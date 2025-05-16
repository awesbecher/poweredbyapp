
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
  const [loadRetries, setLoadRetries] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  
  // Listen for messages from the Tally iframe with improved error handling
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        if (e.data && e.data.type === 'tally-form-submit-success') {
          setIsSubmitted(true);
          console.log('Tally form submission successful');
        }
      } catch (error) {
        console.error('Error handling Tally message:', error);
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
    }, 800);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Completely overhauled Tally form loading with robust error handling and retries
  useEffect(() => {
    // Function to load the Tally form with improved reliability
    const loadTallyForm = () => {
      if (!isLoading && formRef.current) {
        try {
          console.log('Attempting to load agent form...');
          
          // Clear any existing content to avoid duplicates
          formRef.current.innerHTML = '';
          
          // Add data attribute for the direct injection fallback
          formRef.current.setAttribute('data-tally-src', 
            'https://tally.so/embed/wvp76X?alignLeft=1&hideTitle=1&dynamicHeight=1');
          formRef.current.setAttribute('data-tally-height', '1500');
          
          // Try to use the Tally global object first
          if (window && (window as any).Tally) {
            try {
              console.log('Using Tally global object to load agent form');
              (window as any).Tally.loadEmbeds();
            } catch (e) {
              console.error('Error using Tally global object for agent form:', e);
            }
          }
          
          // Direct iframe injection as a reliable fallback
          setTimeout(() => {
            if (formRef.current && !formRef.current.querySelector('iframe')) {
              // Create and configure the iframe with direct injection
              const iframe = document.createElement('iframe');
              iframe.src = 'https://tally.so/embed/wvp76X?alignLeft=1&hideTitle=1&dynamicHeight=1';
              iframe.width = '100%';
              iframe.height = '1500'; // Increased height significantly
              iframe.frameBorder = '0';
              iframe.title = 'Agent Form';
              iframe.style.minHeight = '1500px'; // Increased min-height 
              iframe.style.border = 'none';
              iframe.style.backgroundColor = 'transparent';
              iframe.style.display = 'block';
              iframe.style.visibility = 'visible';
              iframe.style.overflow = 'hidden';
              
              // Add load event to verify iframe loaded correctly
              iframe.onload = () => {
                console.log('Agent form iframe loaded successfully');
              };
              
              // Add error handling
              iframe.onerror = () => {
                console.error('Agent form iframe failed to load');
                if (loadRetries < 5) {
                  setTimeout(() => {
                    setLoadRetries(prev => prev + 1);
                    loadTallyForm();
                  }, 1500);
                }
              };
              
              // Append the iframe to the container
              formRef.current.appendChild(iframe);
              console.log('Directly injected agent form iframe');
            }
          }, 500);
        } catch (error) {
          console.error('Error creating agent form iframe:', error);
        }
      }
    };

    // Initial load with delay to ensure DOM is ready
    if (!isLoading) {
      setTimeout(loadTallyForm, 500);
    }
    
    // Multiple retries with increasing delays
    const retryDelays = [1500, 3000, 5000, 8000, 12000];
    const retryTimers = retryDelays.map(delay => 
      setTimeout(() => {
        if (!isLoading && formRef.current && !formRef.current.querySelector('iframe')) {
          console.log(`Retry attempt for agent form at ${delay}ms`);
          loadTallyForm();
        }
      }, delay)
    );
    
    return () => retryTimers.forEach(timer => clearTimeout(timer));
  }, [isLoading, loadRetries]);

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
                  
                  {/* Right Column - Tally.so embed with loading indicator */}
                  <div className="md:w-[40%] bg-black rounded-r-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-brand-purple-light via-brand-purple to-brand-purple-dark"></div>
                    
                    <Card className="bg-black border-0 shadow-none rounded-none h-full py-16">
                      {/* Loading indicator that stays visible longer */}
                      <div className={`flex justify-center items-center h-[200px] ${!isLoading && formRef.current?.querySelector('iframe') ? 'hidden' : 'block'}`}>
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-purple-500 animate-spin"></div>
                          <p className="text-white mt-4">Loading form...</p>
                        </div>
                      </div>
                      
                      {/* Tally form container with data attributes for direct injection */}
                      <div 
                        ref={formRef}
                        className="tally-embed agent-tally-form w-full"
                        data-tally-src="https://tally.so/embed/wvp76X?alignLeft=1&hideTitle=1&dynamicHeight=1"
                        data-tally-height="1500"
                        style={{ 
                          minHeight: '1500px',
                          display: 'block',
                          visibility: 'visible',
                          paddingBottom: '80px',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Iframe will be inserted here by JavaScript */}
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
