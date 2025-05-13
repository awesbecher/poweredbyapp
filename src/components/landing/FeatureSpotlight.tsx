
import React from 'react';
import FeatureCard from "@/components/landing/FeatureCard";

const FeatureSpotlight = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Powerful Features, Simple Setup</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="messages-square" 
            title="Multi-Channel AI" 
            description="Voice, Email & SMS in one unified agent" 
          />
          <FeatureCard 
            icon="plug" 
            title="Plug-&-Play Integrations" 
            description="CRM, Slack, Calendar - seamless connection" 
          />
          <FeatureCard 
            icon="user" 
            title="Human-Fallback" 
            description="Seamless escalation to live agents when needed" 
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSpotlight;
