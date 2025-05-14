
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  form: UseFormReturn<z.infer<any>>;
  formStep: number;
  onSubmit: (data: any) => void;
  industries: string[];
}

const HeroSection = ({ form, formStep, onSubmit, industries }: HeroSectionProps) => {
  return (
    <section className="pt-24 pb-16 px-4 md:px-12 lg:px-24">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column: Headline */}
          <div className="space-y-6 pt-6"> {/* Added pt-6 for more vertical buffer */}
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
            
            {/* 2x2 Button Grid with links */}
            <div className="grid grid-cols-2 gap-4 max-w-md mt-8">
              <Button 
                variant="default" 
                className="bg-brand-purple hover:bg-brand-purple-dark text-white font-medium py-6"
                onClick={() => window.location.href = "https://www.poweredby.agency/voice-chat"}
              >
                AI Voice
              </Button>
              <Button 
                variant="default" 
                className="bg-brand-purple hover:bg-brand-purple-dark text-white font-medium py-6"
                onClick={() => window.location.href = "https://www.poweredby.agency/ai-receptionist"}
              >
                AI Receptionist
              </Button>
              <Button 
                variant="default" 
                className="bg-brand-purple hover:bg-brand-purple-dark text-white font-medium py-6"
                onClick={() => window.location.href = "https://www.poweredby.agency/email-agent"}
              >
                AI Email
              </Button>
              <Button 
                variant="default" 
                className="bg-brand-purple hover:bg-brand-purple-dark text-white font-medium py-6"
                onClick={() => window.location.href = "https://www.poweredby.agency/text-agent"}
              >
                AI SMS-Text
              </Button>
            </div>
          </div>
          
          {/* Right column: Tally.so Embed */}
          <div className="bg-black rounded-xl shadow-lg p-6 border border-white/10">
            <div className="tally-iframe-container">
              <iframe
                data-tally-src="https://tally.so/embed/wgrjdd?alignLeft=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="350"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Contact Form"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
