import React from 'react';

const HeroHeadline = () => {
  return (
    <div className="space-y-6"> 
      {/* Purple pill text box */}
      <div className="inline-block px-6 py-3 rounded-full bg-purple-800/20 backdrop-blur-sm border border-purple-500/30 mb-4">
        <p className="text-sm text-purple-300 font-medium">
          AI agents that work 24/7 so you don't have to.
        </p>
      </div>
      
      {/* Redesigned stylish heading with gradient effect */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
        <span className="bg-gradient-to-r from-white via-purple-200 to-brand-purple-light bg-clip-text text-transparent 
                         inline-block transform transition-all duration-500 hover:scale-[1.02] pb-2">
          Smarter Work,
        </span>
        <span className="block mt-1 text-white">Powered by AI</span>
      </h1>
      
      {/* Updated subtitle text */}
      <p className="text-base text-gray-200 max-w-xl">
        Imagine AI agents that answer your calls, reply to your emails, send your texts, & automate your tasks. Tailored for SMBs, our solutions supercharge your workflows and wow your customers. Start your AI agent journey now.
      </p>
    </div>
  );
};

export default HeroHeadline;
