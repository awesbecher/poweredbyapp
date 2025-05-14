
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Headphones } from 'lucide-react';

const SpeakToAgentSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-deep-purple to-[#1d0e54]">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          Speak to an AI Agent Now
        </h2>
        <div className="w-24 h-1 bg-[#8B5CF6] mx-auto mb-12"></div>
        
        {/* Interactive Demo */}
        <div className="max-w-4xl mx-auto mb-12">
          <AspectRatio ratio={16 / 9} className="bg-black/20 rounded-xl overflow-hidden">
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-900/30 to-purple-800/30 backdrop-blur-sm">
              <Headphones className="w-16 h-16 text-purple-400 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Experience AI Voice Interactions</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-lg text-center">
                Speak live with an AI agent now! Ask it anything about AI Agents, how they work, use cases, or AI best practices.
              </p>
              {/* Button without Link wrapper to disable click action */}
              <Button 
                className="bg-brand-purple hover:bg-brand-purple-dark text-white px-8 py-6 h-auto text-lg font-bold transition-transform hover:scale-105"
                disabled={true} // Disable the button
              >
                <Headphones className="mr-2" /> Call +1 (650) 484-5356
              </Button>
            </div>
          </AspectRatio>
        </div>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="mb-5 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Crystal Clear Voice</h3>
            <p className="text-gray-300">Experience natural-sounding voice that's indistinguishable from human conversation.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="mb-5 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Natural Language</h3>
            <p className="text-gray-300">Our AI understands context and nuance, creating truly conversational experiences.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="mb-5 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Global Accessibility</h3>
            <p className="text-gray-300">Support customers worldwide with multilingual capabilities and 24/7 availability.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakToAgentSection;
