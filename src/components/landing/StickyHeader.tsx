
import React from 'react';
import { Button } from "@/components/ui/button";

interface StickyHeaderProps {
  onDemoClick: () => void;
}

const StickyHeader = ({ onDemoClick }: StickyHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <img 
            src="/lovable-uploads/83a3f394-4c25-41ec-abf4-fa47df5cb6f3.png" 
            alt="Powered_by Logo" 
            className="h-8" 
          />
        </div>
        <Button 
          onClick={onDemoClick}
          className="bg-[#8B5CF6] hover:bg-[#7c4fee] text-white text-base rounded-lg py-2 px-4"
        >
          Request Demo
        </Button>
      </div>
    </header>
  );
};

export default StickyHeader;
