
import React from 'react';

const BusinessValueSection = () => {
  return (
    <section className="py-16 px-4 bg-[#1A0B3A]">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            The Business Value of AI Agents
          </h2>
          <div className="w-24 h-1 bg-[#8B5CF6] mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">6×</div>
            <p className="text-lg text-gray-300 uppercase tracking-wide">Faster Customer Response</p>
          </div>
          
          <div className="space-y-4">
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">$50 K+</div>
            <p className="text-lg text-gray-300 uppercase tracking-wide">Annual Support Cost Saved</p>
          </div>
          
          <div className="space-y-4">
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">24/7</div>
            <p className="text-lg text-gray-300 uppercase tracking-wide">Non-Stop Availability</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessValueSection;
