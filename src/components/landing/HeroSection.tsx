
import React from 'react';
import LeadForm from "@/components/landing/LeadForm";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

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
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
              Custom AI Agents for SMBs
            </h1>
            <p className="text-xl text-gray-200 max-w-xl">
              We design, build, and deploy AI agents that automate work for businesses of all sizes. See what a custom agent can do for you.
            </p>
          </div>
          
          {/* Right column: Two-step Form - Updated with black background and white text */}
          <div className="bg-black rounded-xl shadow-lg p-8 border border-white/10">
            <LeadForm 
              form={form} 
              formStep={formStep}
              onSubmit={onSubmit}
              industries={industries} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
