
import React, { useEffect, useRef } from 'react';
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface HeroSectionProps {
  form: UseFormReturn<z.infer<any>>;
  formStep: number;
  onSubmit: (data: any) => void;
  industries: string[];
}

const HeroSection = ({ form, formStep, onSubmit, industries }: HeroSectionProps) => {
  const tallyContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // More robust approach to rendering the Tally form
    if (tallyContainerRef.current) {
      // Use a custom attribute for direct iframe injection fallback
      tallyContainerRef.current.setAttribute('data-tally-src', 
        'https://tally.so/embed/wgrjdd?alignLeft=1&transparentBackground=1&dynamicHeight=1');
      tallyContainerRef.current.setAttribute('data-tally-height', '350');
      
      // Try multiple approaches to ensure the form loads
      
      // Approach 1: Use the Tally global object if available
      if (window && (window as any).Tally) {
        try {
          console.log("Using Tally global object to load form in HeroSection");
          (window as any).Tally.loadEmbeds();
        } catch (e) {
          console.error("Error loading Tally form via global object:", e);
        }
      }
      
      // Approach 2: Direct iframe injection as fallback
      if (!tallyContainerRef.current.querySelector('iframe')) {
        setTimeout(() => {
          if (tallyContainerRef.current && !tallyContainerRef.current.querySelector('iframe')) {
            const iframe = document.createElement('iframe');
            iframe.src = 'https://tally.so/embed/wgrjdd?alignLeft=1&transparentBackground=1&dynamicHeight=1';
            iframe.width = '100%';
            iframe.height = '350';
            iframe.title = 'Contact Form';
            iframe.style.border = 'none';
            iframe.style.backgroundColor = 'transparent';
            iframe.style.minHeight = '350px';
            iframe.style.maxWidth = '100%';
            iframe.style.display = 'block';
            iframe.style.overflow = 'hidden';
            
            // Clear container and add the iframe
            tallyContainerRef.current.innerHTML = '';
            tallyContainerRef.current.appendChild(iframe);
            
            console.log('Directly injected Tally iframe in HeroSection');
          }
        }, 500);
      }
    }
    
    // Additional retry attempts
    const retryTimes = [1000, 2000, 3500];
    const retryTimers = retryTimes.map(time => 
      setTimeout(() => {
        if (tallyContainerRef.current && !tallyContainerRef.current.querySelector('iframe')) {
          console.log(`Retry attempt at ${time}ms for Tally form in HeroSection`);
          
          if (window && (window as any).Tally) {
            try {
              (window as any).Tally.loadEmbeds();
            } catch (e) {
              console.error(`Error in retry at ${time}ms:`, e);
            }
          }
        }
      }, time)
    );
    
    return () => retryTimers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <section className="pt-28 pb-10 px-4 md:px-12 lg:px-24">
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
          
          {/* Right column: Tally.so Embed with improved loading */}
          <div className="flex flex-col">
            {/* Placeholder that shows while form is loading */}
            <div className="embed-placeholder" id="tally-form-placeholder">
              <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent"></div>
            </div>
            
            {/* Tally form container with data attributes for direct injection */}
            <div 
              ref={tallyContainerRef} 
              className="tally-embed tally-form-container bg-transparent"
              data-tally-src="https://tally.so/embed/wgrjdd?alignLeft=1&transparentBackground=1&dynamicHeight=1"
              data-tally-height="350"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
