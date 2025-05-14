
import React from 'react';
import { Button } from "@/components/ui/button";

const MainCTA = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-[600px] mx-auto text-center">
          {/* Main Heading */}
          <h2 className="text-[32px] font-bold text-[#111] mb-[18px]">
            Custom AI Agents for SMBs
          </h2>
          
          {/* Supporting Paragraph */}
          <p className="text-[18px] text-[#444] leading-[1.6] mb-[32px]">
            We design, build, and deploy AI agents that automate work for businesses of all sizes. 
            See what a custom agent can do for you.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button 
              className="bg-[#8B5CF6] text-white font-semibold py-[14px] px-[32px] rounded-md hover:bg-[#7c4fee]"
            >
              What's An AI Agent?
            </Button>
            
            <Button 
              variant="outline"
              className="border-2 border-[#8B5CF6] text-[#8B5CF6] bg-white font-semibold py-[14px] px-[32px] rounded-md"
            >
              Try Demos
            </Button>
          </div>
          
          {/* Small muted text */}
          <p className="text-[15px] text-[#888] mt-[24px]">
            Talk to an AI Agent now
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainCTA;
