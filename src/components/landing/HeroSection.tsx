
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import HeroHeadline from './HeroHeadline';
import TallyFormEmbed from './TallyFormEmbed';

interface HeroSectionProps {
  form: UseFormReturn<z.infer<any>>;
  formStep: number;
  onSubmit: (data: any) => void;
  industries: string[];
}

const HeroSection = ({ form, formStep, onSubmit, industries }: HeroSectionProps) => {
  return (
    <section className="pt-28 pb-10 px-4 md:px-12 lg:px-24 relative z-5">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left column: Headline */}
          <HeroHeadline />
          
          {/* Right column: Tally.so Embed with improved loading and visibility */}
          <div className="flex flex-col relative z-20">
            {/* Tally form container with explicit z-index management */}
            <TallyFormEmbed 
              src='https://tally.so/embed/wgrjdd?alignLeft=1&transparentBackground=1&dynamicHeight=1'
              height='350'
              additionalOptions={{ 
                alignLeft: '1', 
                transparentBackground: '1', 
                dynamicHeight: '1'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
