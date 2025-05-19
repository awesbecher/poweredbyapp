
import React, { useEffect, useRef } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useEmbed } from '@/hooks/useEmbed';
import { forceEmbedsVisibility } from '@/utils/embedManager/embedInitializer';

const WhatIsAiSection = () => {
  const youtubeOptions = {
    type: 'youtube' as const,
    src: 'https://www.youtube-nocookie.com/embed/C2FAFvwwnL0?origin=https://poweredby.agency',
  };
  
  const { containerRef } = useEmbed(youtubeOptions);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Force YouTube iframe visibility with multiple attempts
  useEffect(() => {
    const forceYouTubeVisibility = () => {
      if (containerRef.current) {
        const iframe = containerRef.current.querySelector('iframe');
        if (iframe) {
          iframe.style.position = 'absolute';
          iframe.style.top = '0';
          iframe.style.left = '0';
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.zIndex = '9999';
          iframe.style.border = 'none';
          iframe.style.opacity = '1';
          iframe.style.visibility = 'visible';
          iframe.style.display = 'block';
          
          // Hide placeholder when video loads
          const placeholder = document.getElementById('youtube-placeholder');
          if (placeholder) placeholder.style.display = 'none';
        } else {
          // Direct iframe injection as fallback
          const newIframe = document.createElement('iframe');
          newIframe.src = 'https://www.youtube-nocookie.com/embed/C2FAFvwwnL0?origin=https://poweredby.agency';
          newIframe.title = "What is an AI Agent?";
          newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          newIframe.allowFullscreen = true;
          newIframe.setAttribute('loading', 'eager');
          newIframe.style.position = 'absolute';
          newIframe.style.top = '0';
          newIframe.style.left = '0';
          newIframe.style.width = '100%';
          newIframe.style.height = '100%';
          newIframe.style.border = 'none';
          newIframe.style.zIndex = '9999';
          newIframe.style.opacity = '1';
          newIframe.style.visibility = 'visible';
          newIframe.style.display = 'block';
          
          // Make sure container is ready
          if (containerRef.current) {
            containerRef.current.appendChild(newIframe);
          }
        }
      }
    };
    
    // Multiple attempts with increasing delays
    setTimeout(forceYouTubeVisibility, 300);
    setTimeout(forceYouTubeVisibility, 800);
    setTimeout(forceYouTubeVisibility, 1500);
    setTimeout(forceYouTubeVisibility, 3000);
    setTimeout(forceEmbedsVisibility, 2000);
    setTimeout(forceEmbedsVisibility, 5000);
    
    // Add emergency button if video still fails to load
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
    }, 6000);
  }, [containerRef]);

  // Function to handle manual reload of video
  const handleManualReload = () => {
    if (containerRef.current) {
      const newIframe = document.createElement('iframe');
      newIframe.src = 'https://www.youtube-nocookie.com/embed/C2FAFvwwnL0?origin=https://poweredby.agency';
      newIframe.title = "What is an AI Agent?";
      newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      newIframe.allowFullscreen = true;
      newIframe.style.position = 'absolute';
      newIframe.style.top = '0';
      newIframe.style.left = '0';
      newIframe.style.width = '100%';
      newIframe.style.height = '100%';
      newIframe.style.border = 'none';
      newIframe.style.zIndex = '9999';
      
      // Replace existing content
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(newIframe);
      }
      
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
          <AspectRatio ratio={16 / 9} className="bg-transparent rounded-xl overflow-hidden embed-container">
            {/* Persistent placeholder that will be managed by the embedManager */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-30" id="youtube-placeholder">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-purple-500 animate-spin mx-auto"></div>
                <div className="text-white text-lg mt-4">Loading video...</div>
              </div>
            </div>
            
            {/* Force iframe to be visible with high z-index */}
            <div 
              ref={containerRef} 
              className="w-full h-full absolute inset-0 z-40"
              data-youtube-id="C2FAFvwwnL0"
            >
              <iframe
                src="https://www.youtube-nocookie.com/embed/C2FAFvwwnL0?origin=https://poweredby.agency"
                title="What is an AI Agent?"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="eager"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  zIndex: 9999,
                  opacity: 1,
                  visibility: 'visible',
                  display: 'block'
                }}
                onLoad={() => {
                  // Hide placeholder when video loads
                  const placeholder = document.getElementById('youtube-placeholder');
                  if (placeholder) placeholder.style.display = 'none';
                }}
              ></iframe>
            </div>
            
            {/* Emergency reload button */}
            <button 
              onClick={handleManualReload}
              className="embed-emergency-button"
            >
              Reload Video
            </button>
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
