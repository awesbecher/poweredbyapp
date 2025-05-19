import React, { useEffect, useRef } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const WhatIsAiSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Force YouTube iframe visibility with multiple attempts
  useEffect(() => {
    const createAndInjectYouTubeIframe = () => {
      if (!containerRef.current) return;
      
      // Check if iframe already exists
      const existingIframe = containerRef.current.querySelector('iframe');
      
      // If iframe exists and is loaded properly, just ensure it's visible
      if (existingIframe && existingIframe.contentWindow) {
        existingIframe.style.position = 'absolute';
        existingIframe.style.top = '0';
        existingIframe.style.left = '0';
        existingIframe.style.width = '100%';
        existingIframe.style.height = '100%';
        existingIframe.style.border = 'none';
        existingIframe.style.zIndex = '9999';
        existingIframe.style.opacity = '1';
        existingIframe.style.visibility = 'visible';
        existingIframe.style.display = 'block';
        
        // Hide placeholder when video exists
        const placeholder = document.getElementById('youtube-placeholder');
        if (placeholder) placeholder.style.display = 'none';
        
        return;
      }
      
      // Clear container before injecting
      if (existingIframe) {
        containerRef.current.removeChild(existingIframe);
      }
      
      // Create new iframe with all necessary attributes
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/C2FAFvwwnL0?origin=' + window.location.origin;
      iframe.title = "What is an AI Agent?";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.zIndex = '9999';
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      iframe.style.display = 'block';
      
      // Add the iframe to container
      containerRef.current.appendChild(iframe);
      
      // Hide placeholder
      const placeholder = document.getElementById('youtube-placeholder');
      if (placeholder) placeholder.style.display = 'none';
    };
    
    // Multiple attempts with increasing delays
    setTimeout(createAndInjectYouTubeIframe, 300);
    setTimeout(createAndInjectYouTubeIframe, 1000);
    setTimeout(createAndInjectYouTubeIframe, 3000);
    
    // Show fallback after timeout
    setTimeout(() => {
      if (containerRef.current && !containerRef.current.querySelector('iframe[src]')) {
        const placeholder = document.getElementById('youtube-placeholder');
        if (placeholder) {
          placeholder.innerHTML = `
            <div class="text-center">
              <p class="text-white mb-4">Video not loading?</p>
              <a 
                href="https://www.youtube.com/watch?v=C2FAFvwwnL0"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-purple-600 text-white px-4 py-2 rounded-md">
                Watch on YouTube
              </a>
            </div>
          `;
        }
      }
    }, 5000);
  }, []);

  // Function to handle manual reload of video
  const handleManualReload = () => {
    if (containerRef.current) {
      // Clear container
      containerRef.current.innerHTML = '';
      
      // Create new iframe with all necessary attributes
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/C2FAFvwwnL0?origin=' + window.location.origin;
      iframe.title = "What is an AI Agent?";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.zIndex = '9999';
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      
      // Add the iframe to container
      containerRef.current.appendChild(iframe);
      
      // Hide placeholder
      const placeholder = document.getElementById('youtube-placeholder');
      if (placeholder) placeholder.style.display = 'none';
    }
  };

  return (
    <section ref={sectionRef} className="py-8 px-4 relative z-10">
      <Separator className="max-w-6xl mx-auto bg-white/20 mb-12" />
      
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          What's an AI Agent?
        </h2>
        <div className="w-24 h-1 bg-[#8B5CF6] mx-auto mb-12"></div>
        
        {/* Enhanced YouTube embed with improved visibility */}
        <div className="max-w-4xl mx-auto mb-8 relative z-20">
          <AspectRatio ratio={16 / 9} className="bg-black rounded-xl overflow-hidden embed-container">
            {/* Placeholder that shows while video is loading */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10" id="youtube-placeholder">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-purple-500 animate-spin mx-auto"></div>
                <div className="text-white text-lg mt-4">Loading video...</div>
              </div>
            </div>
            
            {/* Container for direct iframe injection */}
            <div 
              ref={containerRef} 
              className="absolute inset-0 z-20"
              style={{
                width: '100%',
                height: '100%'
              }}
            />
            
            {/* Emergency reload button */}
            <button 
              onClick={handleManualReload}
              className="absolute bottom-4 right-4 bg-purple-600/80 text-white text-sm px-3 py-1 rounded z-30 hover:bg-purple-600"
            >
              Reload Video
            </button>
            
            {/* Backup direct iframe */}
            <iframe
              src="https://www.youtube-nocookie.com/embed/C2FAFvwwnL0?origin=https://poweredby.agency"
              title="What is an AI Agent?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0 z-10"
              loading="eager"
              style={{
                zIndex: 9990
              }}
            ></iframe>
          </AspectRatio>
          
          {/* Direct fallback link */}
          <div className="mt-2 text-center">
            <a 
              href="https://www.youtube.com/watch?v=C2FAFvwwnL0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-100 text-sm"
            >
              Video not loading? Watch on YouTube
            </a>
          </div>
        </div>
        
        {/* Button Grid in a single horizontal row */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-4xl mx-auto">
          <Button 
            variant="default" 
            className="bg-brand-purple hover:bg-brand-purple-dark text-white font-medium"
            onClick={() => window.location.href = "https://www.poweredby.agency/voice-chat"}
          >
            AI Voice
          </Button>
          <Button 
            variant="default" 
            className="bg-brand-purple hover:bg-brand-purple-dark text-white font-medium"
            onClick={() => window.location.href = "https://www.poweredby.agency/ai-receptionist"}
          >
            AI Receptionist
          </Button>
          <Button 
            variant="default" 
            className="bg-brand-purple hover:bg-brand-purple-dark text-white font-medium"
            onClick={() => window.location.href = "https://www.poweredby.agency/email-agent"}
          >
            AI Email
          </Button>
          <Button 
            variant="default" 
            className="bg-brand-purple hover:bg-brand-purple-dark text-white font-medium"
            onClick={() => window.location.href = "https://www.poweredby.agency/text-agent"}
          >
            AI SMS-Text
          </Button>
        </div>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="mb-5 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Always Listening</h3>
            <p className="text-gray-300">AI agents can process incoming messages 24/7, ensuring no customer inquiry goes unanswered.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="mb-5 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Instant Responses</h3>
            <p className="text-gray-300">Your AI agent responds immediately to customer queries, delivering information without any wait time.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="mb-5 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M8 13h8"></path>
                <path d="M8 17h8"></path>
                <path d="M8 9h1"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Trained On Your Data</h3>
            <p className="text-gray-300">Custom AI agents leverage your business knowledge to provide accurate and tailored responses.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsAiSection;
