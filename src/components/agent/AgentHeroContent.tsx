
import React from 'react';

const AgentHeroContent: React.FC = () => {
  return (
    <div className="md:w-[60%] mb-10 md:mb-0">
      <h1 className="text-3xl md:text-[42px] font-semibold text-white mb-6">
        Have an AI Agent idea?
        <br />
        <span className="text-2xl md:text-3xl">Tell us about it and we'll build it for you.</span>
      </h1>
      <p className="text-lg leading-relaxed text-white mb-10">
        Botpress Experts specialize in building and deploying custom AI agents. Let us know what you're looking for and we'll match you with the right Expert.
      </p>
    </div>
  );
};

export default AgentHeroContent;
