
import React from 'react';

const AgentHeroContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
        Have an AI Agent idea?
        <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
          Tell us about it and we'll build it for you.
        </span>
      </h1>
      <p className="text-base md:text-lg leading-relaxed text-white/90">
        We help small & mid-sized businesses build custom AI agent solutions completely 
        tailored to their needs. If you have a vision (or just an initial idea) about an 
        AI agent you'd like to implement, we'd love to help you build it!
      </p>
    </div>
  );
};

export default AgentHeroContent;
