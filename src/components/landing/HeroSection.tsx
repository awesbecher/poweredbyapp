import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import HeroHeadline from './HeroHeadline';

interface HeroSectionProps {
  form: UseFormReturn<z.infer<any>>;
  formStep: number;
  onSubmit: (data: any) => void;
  industries: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ form, formStep, onSubmit, industries }) => {
  const videoId = "nJ7yDAbGCiM"; // Your YouTube video ID

  return (
    <section className="pt-28 pb-10 px-4 md:px-12 lg:px-24 relative z-5">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left column: Headline */}
          <div className="lg:w-1/2">
            <HeroHeadline />
          </div>
          {/* Right column: Tally.so Embed */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex flex-col relative z-20">
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
      </div>
    </section>
  );
};

export default HeroSection;
