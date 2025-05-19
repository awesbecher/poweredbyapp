
import React, { useRef, useEffect } from 'react';
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { useEmbed } from "@/hooks/useEmbed";

interface HeroSectionProps {
  form: UseFormReturn<z.infer<any>>;
  formStep: number;
  onSubmit: (data: any) => void;
  industries: string[];
}

const HeroSection = ({ form, formStep, onSubmit, industries }: HeroSectionProps) => {
  const tallyOptions = {
    src: 'https://tally.so/embed/wgrjdd?alignLeft=1&transparentBackground=1&dynamicHeight=1',
    type: 'tally' as const,
    height: '350',
    additionalOptions: { 
      alignLeft: '1', 
      transparentBackground: '1', 
      dynamicHeight: '1'
    }
  };
  
  const { containerRef } = useEmbed(tallyOptions);
  
  // Force iframe visibility after component mount
  useEffect(() => {
    const forceVisibility = () => {
      if (containerRef.current) {
        const iframe = containerRef.current.querySelector('iframe');
        if (iframe) {
          iframe.style.position = 'relative';
          iframe.style.zIndex = '9999';
          iframe.style.opacity = '1';
          iframe.style.visibility = 'visible';
          iframe.style.display = 'block';
          iframe.style.background = 'transparent';
        }
      }
    };
    
    // Apply multiple times to ensure it catches
    setTimeout(forceVisibility, 1000);
    setTimeout(forceVisibility, 3000);
    setTimeout(forceVisibility, 6000);
  }, [containerRef]);

  return (
    <section className="pt-28 pb-10 px-4 md:px-12 lg:px-24 relative z-5">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left column: Headline */}
          <div className="space-y-6"> 
            {/* Purple pill text box */}
            <div className="inline-block px-6 py-3 rounded-full bg-purple-800/20 backdrop-blur-sm border border-purple-500/30 mb-4">
              <p className="text-sm text-purple-300 font-medium">
                AI agents that work 24/7 so you don't have to.
              </p>
            </div>
            
            {/* Redesigned stylish heading with gradient effect */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-brand-purple-light bg-clip-text text-transparent 
                               inline-block transform transition-all duration-500 hover:scale-[1.02] pb-2">
                Smarter Work,
              </span>
              <span className="block mt-1 text-white">Powered by AI Agents</span>
            </h1>
            
            {/* Updated subtitle text */}
            <p className="text-base text-gray-200 max-w-xl">
              Imagine AI agents that answer your calls, reply to your emails, send your texts, & automate your tasks. Tailored for SMBs, our solutions supercharge your workflows and wow your customers. Start your AI agent journey now.
            </p>
          </div>
          
          {/* Right column: Tally.so Embed with improved loading and visibility */}
          <div className="flex flex-col relative z-20">
            {/* Tally form container with explicit z-index management */}
            <div 
              ref={containerRef} 
              className="tally-embed bg-transparent min-h-[350px] w-full relative z-30"
              style={{ 
                position: 'relative',
                zIndex: 30,
                backgroundColor: 'transparent'
              }}
            >
              {/* The iframe will be inserted here by the useEmbed hook */}
              
              {/* Backup emergency placeholder in case nothing loads */}
              <div 
                id="emergency-tally-fallback" 
                className="absolute inset-0 flex items-center justify-center"
                style={{ display: 'none', zIndex: 25 }}
              >
                <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-lg">
                  <p className="text-white mb-4">Having trouble loading the form?</p>
                  <a 
                    href="https://tally.so/r/wgrjdd" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Open Form Directly
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emergency fallback script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Show emergency fallback after 8 seconds if no iframe is loaded
          setTimeout(() => {
            const container = document.querySelector('.tally-embed');
            const fallback = document.getElementById('emergency-tally-fallback');
            if (container && !container.querySelector('iframe') && fallback) {
              fallback.style.display = 'flex';
            }
          }, 8000);
        `
      }} />
    </section>
  );
};

export default HeroSection;
