import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import HeroHeadline from './HeroHeadline';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  form: UseFormReturn<z.infer<any>>;
  formStep: number;
  onSubmit: (data: any) => void;
  industries: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ form, formStep, onSubmit, industries }) => {
  const videoId = "nJ7yDAbGCiM"; // Your YouTube video ID

  return (
    <section className="pt-32 pb-10 px-4 md:px-12 lg:px-24 relative z-5">
      <div className="container mx-auto">
        {/* Main content area with text and form - Grid for md, Flex for lg */}
        <div className="grid md:grid-cols-2 lg:flex lg:flex-row lg:gap-x-16 items-start mb-16">
          {/* Left column: Headline - Takes more space on lg screens */}
          <div className="md:col-span-1 lg:w-3/5">
            <HeroHeadline />
          </div>
          {/* Right column: Tally.so Embed - Takes less space on lg screens */}
          <div className="md:col-span-1 lg:w-2/5 mt-10 md:mt-0 flex flex-col relative z-20">
            <iframe 
              data-tally-src="https://tally.so/embed/wgrjdd?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              loading="lazy" 
              width="100%" 
              height={200} 
              frameBorder={0} 
              marginHeight={0} 
              marginWidth={0} 
              title="Landing Page | Contact Me">
            </iframe>
          </div>
        </div>

        {/* Button Grid */}
        <div className="flex flex-wrap justify-center gap-4 my-12 max-w-4xl mx-auto">
          <Button 
            variant="default" 
            className="bg-gradient-to-br from-brand-purple via-brand-purple-dark to-deep-purple text-white font-medium border border-purple-400/60 hover:opacity-90 hover:scale-[1.03] transform transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-purple-500/40 py-3 px-6 rounded-lg"
            onClick={() => window.location.href = "https://www.poweredby.agency/voice-chat"}
          >
            AI Voice
          </Button>
          <Button 
            variant="default" 
            className="bg-gradient-to-br from-brand-purple via-brand-purple-dark to-deep-purple text-white font-medium border border-purple-400/60 hover:opacity-90 hover:scale-[1.03] transform transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-purple-500/40 py-3 px-6 rounded-lg"
            onClick={() => window.location.href = "https://www.poweredby.agency/ai-receptionist"}
          >
            AI Receptionist
          </Button>
          <Button 
            variant="default" 
            className="bg-gradient-to-br from-brand-purple via-brand-purple-dark to-deep-purple text-white font-medium border border-purple-400/60 hover:opacity-90 hover:scale-[1.03] transform transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-purple-500/40 py-3 px-6 rounded-lg"
            onClick={() => window.location.href = "https://www.poweredby.agency/email-agent"}
          >
            AI Email
          </Button>
          <Button 
            variant="default" 
            className="bg-gradient-to-br from-brand-purple via-brand-purple-dark to-deep-purple text-white font-medium border border-purple-400/60 hover:opacity-90 hover:scale-[1.03] transform transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-purple-500/40 py-3 px-6 rounded-lg"
            onClick={() => window.location.href = "https://www.poweredby.agency/text-agent"}
          >
            AI SMS-Text
          </Button>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
