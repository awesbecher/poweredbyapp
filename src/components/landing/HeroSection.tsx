
import React, { useRef, useEffect } from 'react';
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { useEmbed } from "@/hooks/useEmbed";
import { initializeAllEmbeds, forceEmbedsVisibility } from "@/utils/embedManager/embedInitializer";

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
  
  // Force iframe visibility after component mount with multiple attempts
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
          
          // Hide any loader once iframe is loaded
          const loader = containerRef.current.querySelector('.tally-loader');
          if (loader) {
            loader.remove();
          }
        } else {
          // If no iframe exists, create one directly
          const directIframe = document.createElement('iframe');
          directIframe.src = tallyOptions.src;
          directIframe.width = '100%';
          directIframe.height = tallyOptions.height;
          directIframe.style.border = 'none';
          directIframe.style.width = '100%';
          directIframe.style.minHeight = `${tallyOptions.height}px`;
          directIframe.style.position = 'relative';
          directIframe.style.zIndex = '9999';
          directIframe.style.opacity = '1';
          directIframe.style.visibility = 'visible';
          directIframe.style.display = 'block';
          
          // Remove any existing content and add the iframe
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(directIframe);
          console.log('Emergency direct iframe creation for Tally form');
        }
      }
    };
    
    // Add emergency button after a delay if iframe still doesn't appear
    const addEmergencyButton = () => {
      if (containerRef.current && !containerRef.current.querySelector('iframe')) {
        const button = document.createElement('button');
        button.className = 'bg-purple-600 text-white px-4 py-2 rounded-md mt-4';
        button.textContent = 'Click to Load Form';
        button.onclick = () => {
          // Create iframe directly
          const directIframe = document.createElement('iframe');
          directIframe.src = tallyOptions.src;
          directIframe.width = '100%';
          directIframe.height = tallyOptions.height;
          directIframe.style.border = 'none';
          directIframe.style.width = '100%';
          directIframe.style.minHeight = `${tallyOptions.height}px`;
          directIframe.style.position = 'relative';
          directIframe.style.zIndex = '9999';
          
          // Add the iframe to container
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(directIframe);
          }
          
          // Remove the button
          button.remove();
        };
        
        // Add button to container
        containerRef.current.appendChild(button);
      }
    };
    
    // Apply multiple times to ensure it catches
    setTimeout(forceVisibility, 300);
    setTimeout(forceVisibility, 800);
    setTimeout(forceVisibility, 1500);
    setTimeout(forceVisibility, 3000);
    setTimeout(forceVisibility, 6000);
    
    // Make sure global embed visibility is also triggered
    setTimeout(forceEmbedsVisibility, 500);
    setTimeout(forceEmbedsVisibility, 2000);
    setTimeout(forceEmbedsVisibility, 5000);
    
    // Add emergency button as a last resort
    setTimeout(addEmergencyButton, 7000);
    
    // Also trigger global embed initialization
    setTimeout(initializeAllEmbeds, 1000);
    setTimeout(initializeAllEmbeds, 4000);
  }, [containerRef]);

  // Function to handle manual reload of form
  const handleManualReload = () => {
    if (containerRef.current) {
      const iframe = document.createElement('iframe');
      iframe.src = tallyOptions.src;
      iframe.width = '100%';
      iframe.height = tallyOptions.height;
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.minHeight = `${tallyOptions.height}px`;
      iframe.style.position = 'relative';
      iframe.style.zIndex = '9999';
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      iframe.style.display = 'block';
      
      // Clear container and add new iframe
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(iframe);
      console.log('Manual Tally form reload executed');
    }
  };

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
              data-tally-src={tallyOptions.src}
              data-tally-height={tallyOptions.height}
            >
              {/* Initial loading state */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-purple-500 animate-spin mx-auto"></div>
                  <p className="mt-4 text-white">Loading form...</p>
                </div>
              </div>
              
              {/* Emergency reload button */}
              <button 
                onClick={handleManualReload}
                className="embed-emergency-button"
              >
                Force Reload Form
              </button>
            </div>
            
            {/* Direct fallback link */}
            <div className="mt-4 text-center">
              <a 
                href="https://tally.so/r/wgrjdd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-purple-100 text-sm"
              >
                Form not loading? Click here
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
