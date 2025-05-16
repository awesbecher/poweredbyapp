
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
    // More robust approach to loading Tally forms
    const loadTallyForm = () => {
      if (tallyContainerRef.current) {
        // Make sure container is empty first
        tallyContainerRef.current.innerHTML = '';
        
        // Create direct iframe for better compatibility
        const iframe = document.createElement('iframe');
        iframe.src = 'https://tally.so/embed/wgrjdd?alignLeft=1&transparentBackground=1&dynamicHeight=1';
        iframe.width = '100%';
        iframe.height = '350';
        iframe.title = 'Contact Form';
        iframe.style.border = 'none';
        iframe.style.backgroundColor = 'transparent';
        iframe.style.minHeight = '350px';
        iframe.style.display = 'block';
        iframe.style.overflow = 'hidden';
        
        tallyContainerRef.current.appendChild(iframe);
        
        console.log('Tally form iframe directly injected in HeroSection');
      }
    };
    
    // Initial load
    loadTallyForm();
    
    // Also try loading after a short delay to ensure DOM is fully ready
    const timer = setTimeout(loadTallyForm, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-28 pb-10 px-4 md:px-12 lg:px-24">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left column: Headline */}
          <div className="space-y-6"> 
            {/* Purple pill text box - updated to match reference image */}
            <div className="inline-block px-6 py-3 rounded-full bg-purple-800/20 backdrop-blur-sm border border-purple-500/30 mb-4">
              <p className="text-sm text-purple-300 font-medium">
                AI agents that work 24/7 so you don't have to.
              </p>
            </div>
            
            {/* Redesigned stylish heading with gradient effect - UPDATED TEXT */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-brand-purple-light bg-clip-text text-transparent 
                               inline-block transform transition-all duration-500 hover:scale-[1.02] pb-2">
                Smarter Work,
              </span>
              <span className="block mt-1 text-white">Powered by AI Agents</span>
            </h1>
            
            {/* Updated subtitle text with FURTHER DECREASED font size from text-lg to text-base */}
            <p className="text-base text-gray-200 max-w-xl">
              Imagine AI agents that answer your calls, reply to your emails, send your texts, & automate your tasks. Tailored for SMBs, our solutions supercharge your workflows and wow your customers. Start your AI agent journey now.
            </p>
          </div>
          
          {/* Right column: Tally.so Embed */}
          <div className="flex flex-col">
            <div 
              ref={tallyContainerRef} 
              className="tally-form-container bg-transparent min-h-[350px] w-full"
              style={{ overflow: 'hidden' }}
            >
              {/* Iframe will be injected here via useEffect */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
