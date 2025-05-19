
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useEmbed } from '@/hooks/useEmbed';

const WhatIsAiSection = () => {
  const youtubeOptions = {
    type: 'youtube' as const,
    src: 'https://www.youtube-nocookie.com/embed/C2FAFvwwnL0?origin=https://poweredby.agency',
  };
  
  const { containerRef } = useEmbed(youtubeOptions);

  return (
    <section className="py-8 px-4"> {/* Reduced top padding */}
      <Separator className="max-w-6xl mx-auto bg-white/20 mb-12" />
      
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          What's an AI Agent?
        </h2>
        <div className="w-24 h-1 bg-[#8B5CF6] mx-auto mb-12"></div>
        
        {/* Enhanced YouTube embed with visible loading state */}
        <div className="max-w-4xl mx-auto mb-8">
          <AspectRatio ratio={16 / 9} className="bg-black/20 rounded-xl overflow-hidden embed-container">
            {/* Persistent placeholder that will be managed by the embedManager */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10" id="youtube-placeholder">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-purple-500 animate-spin mx-auto"></div>
                <div className="text-white text-lg mt-4">Loading video...</div>
              </div>
            </div>
            
            <div ref={containerRef} className="w-full h-full">
              <iframe
                src="https://www.youtube-nocookie.com/embed/C2FAFvwwnL0?origin=https://poweredby.agency"
                title="What is an AI Agent?"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full relative z-20"
                loading="lazy"
                onLoad={() => {
                  // Hide placeholder when video loads
                  const placeholder = document.getElementById('youtube-placeholder');
                  if (placeholder) placeholder.style.display = 'none';
                }}
              ></iframe>
            </div>
          </AspectRatio>
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
