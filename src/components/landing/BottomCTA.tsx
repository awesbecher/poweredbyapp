
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BottomCTA = () => {
  return (
    <section className="py-16 px-4">
      <div className="bg-[#331B63] rounded-xl max-w-5xl mx-auto p-10 sm:p-14 lg:p-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-bold text-white leading-tight">
              Ready to deploy your first AI agent?
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-[#6045FF] hover:bg-[#5039e6] text-white font-semibold py-6 px-6 rounded-md min-w-44 text-base"
            >
              Get Started Now! <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              className="border-[#ffffff66] text-white bg-transparent font-semibold py-6 px-6 rounded-md hover:bg-[#ffffff22] min-w-44 text-base"
            >
              Explore our AI Agent Demos <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCTA;
