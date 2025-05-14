
import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/landing/LeadForm";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface RoiCalculatorProps {
  form: UseFormReturn<z.infer<any>>;
  formStep: number;
  onSubmit: (data: any) => void;
  industries: string[];
  isFormOpen: boolean;
  setIsFormOpen: (isOpen: boolean) => void;
}

const RoiCalculator = ({ 
  form, 
  formStep, 
  onSubmit, 
  industries,
  isFormOpen,
  setIsFormOpen
}: RoiCalculatorProps) => {
  const [leadsPerMonth, setLeadsPerMonth] = useState(100);
  const [revGrowth, setRevGrowth] = useState(12);

  // Calculate ROI based on leads
  useEffect(() => {
    setRevGrowth(Math.round(leadsPerMonth * 0.12));
  }, [leadsPerMonth]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-2 text-white">Calculate Your ROI</h2>
          <p className="text-gray-200">See how our AI agents can impact your business</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-white">Leads per month</label>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">0</span>
              <Slider
                value={[leadsPerMonth]}
                min={0}
                max={1000}
                step={10}
                onValueChange={(value) => setLeadsPerMonth(value[0])}
                className="flex-1"
              />
              <span className="text-gray-300">1,000</span>
            </div>
            <div className="text-right text-sm text-gray-300 mt-1">Current: {leadsPerMonth} leads</div>
          </div>
          
          <div className="text-center">
            <div className="mb-6">
              <div className="text-[#9b87f5] text-sm font-medium mb-1">ESTIMATED</div>
              <div className="text-4xl font-bold mb-2 text-white">+{revGrowth}% Revenue Growth</div>
              <p className="text-gray-300 text-sm">Based on average conversion rate improvements</p>
            </div>
            
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#9b87f5] hover:bg-[#7c4fee] text-white px-8 py-6 rounded-lg text-lg">
                  See Your Numbers
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="p-4">
                  <h3 className="text-2xl font-semibold mb-4">Get Your Personalized ROI Report</h3>
                  <LeadForm 
                    form={form}
                    formStep={formStep}
                    onSubmit={onSubmit}
                    industries={industries}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
