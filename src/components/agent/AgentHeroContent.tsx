
import React from 'react';

const AgentHeroContent: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Updated heading to match landing page styling with gradients */}
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        Have an AI Agent idea?
        <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-brand-purple-light">
          Tell us about it and we'll build it for you.
        </span>
      </h1>
      <p className="text-base md:text-lg leading-relaxed text-white/90">
        We build AI agents designed for your SMB, tackling everything from customer service to sales. Have an idea? We'll make it real, fast. Let's build your future now.
      </p>
    </div>
  );
};

export default AgentHeroContent;
