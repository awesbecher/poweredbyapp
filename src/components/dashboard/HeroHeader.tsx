
import React, { useState } from 'react';

interface HeroHeaderProps {
  title: string;
  subtitle: string;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({ title, subtitle }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-6 lg:h-28"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </div>
      
      <div className="hidden lg:block w-60 h-60">
        {/* This would be replaced with an actual Lottie animation */}
        <div className={`w-full h-full rounded-full bg-gradient-to-tr from-blue-100 to-indigo-50 flex items-center justify-center shadow-inner transition-all duration-500 ${isHovering ? 'scale-105' : 'scale-100'}`}>
          <img 
            src="/lovable-uploads/82880f9b-90b3-4305-adc6-58a002e01f94.png" 
            alt="Robot" 
            className={`w-40 h-40 object-contain transition-transform duration-700 ${isHovering ? 'rotate-12' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
