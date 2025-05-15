
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
    // Ensure that Tally loads properly by manually creating and injecting the iframe
    if (tallyContainerRef.current) {
      // Wait a moment to make sure the DOM is fully ready
      setTimeout(() => {
        // Clear the container first
        if (tallyContainerRef.current) {
          tallyContainerRef.current.innerHTML = '';
          
          // Create new iframe element
          const iframe = document.createElement('iframe');
          iframe.src = 'https://tally.so/embed/wgrjdd?alignLeft=1&transparentBackground=1&dynamicHeight=1';
          iframe.width = '100%';
          iframe.height = '350';
          iframe.frameBorder = '0';
          iframe.title = 'Contact Form';
          iframe.style.minHeight = '350px';
          iframe.style.border = 'none';
          iframe.style.backgroundColor = 'transparent';
          
          // Append to container
          tallyContainerRef.current.appendChild(iframe);
          
          console.log('Tally form iframe manually injected');
        }
      }, 500);
    }
  }, []);

  return (
    <section className="pt-28 pb-16 px-4 md:px-12 lg:px-24"> {/* Increased top padding from pt-20 to pt-28 */}
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start"> {/* Keep items-start alignment */}
          {/* Left column: Headline */}
          <div className="space-y-6"> 
            {/* Purple pill text box - updated to match reference image */}
            <div className="inline-block px-6 py-3 rounded-full bg-purple-800/20 backdrop-blur-sm border border-purple-500/30 mb-4">
              <p className="text-sm text-purple-300 font-medium">
                AI agents that work 24/7 so you don't have to.
              </p>
            </div>
            
            {/* Redesigned stylish heading with gradient effect */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-brand-purple-light bg-clip-text text-transparent 
                               inline-block transform transition-all duration-500 hover:scale-[1.02] pb-2">
                Custom AI Agents
              </span>
              <span className="block mt-1 text-white">for SMBs</span>
            </h1>
            
            {/* Original subtitle - kept the same as requested */}
            <p className="text-xl text-gray-200 max-w-xl">
              We design, build, and deploy AI agents that automate work for businesses of all sizes. See what a custom agent can do for you.
            </p>
          </div>
          
          {/* Right column: Tally.so Embed */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-white">Get Started Today!</h2>
            <div 
              ref={tallyContainerRef} 
              className="tally-iframe-container min-h-[350px]"
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
