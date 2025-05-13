
import React, { useState, useEffect } from 'react';

const DynamicProofStrip = () => {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { emoji: "💬", text: "1,200+ Agents Deployed" },
    { emoji: "⭐️", text: "4.9/5 Average Rating" },
    { emoji: "🏆", text: "Trusted by 50+ SMBs" }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="bg-[#8B5CF6]/10 py-4">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center w-full transition-opacity duration-500 absolute ${
                index === currentStat ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-xl mr-2">{stat.emoji}</span>
              <span className="text-lg font-medium">{stat.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicProofStrip;
