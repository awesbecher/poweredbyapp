
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
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              Custom AI Agents for SMBs
            </h1>
            <p className="text-xl text-gray-600 max-w-xl">
              Automate support, sales & scheduling across voice, email & SMS
            </p>
          </div>
          
          {/* Right column: Two-step Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
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
