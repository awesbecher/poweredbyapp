
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AgentHeroContent from '@/components/agent/AgentHeroContent';
import AgentSubmissionForm from '@/components/agent/AgentSubmissionForm';
import ThankYouMessage from '@/components/agent/ThankYouMessage';
import type { AgentFormValues } from '@/components/agent/AgentSubmissionForm';

const AgentPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission
  const onSubmit = async (values: AgentFormValues) => {
    console.log("Form submitted:", values);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success state
    setIsSubmitted(true);
  };

  return (
    <div className="w-full font-sans">
      <div className="max-w-[1200px] mx-auto px-4 py-20 md:py-80">
        {!isSubmitted ? (
          <div className="flex flex-col md:flex-row md:gap-10">
            {/* Left Column - Hero Content */}
            <AgentHeroContent />
            
            {/* Right Column - Form */}
            <div className="md:w-[40%]">
              <AgentSubmissionForm onSubmit={onSubmit} />
            </div>
          </div>
        ) : (
          <ThankYouMessage />
        )}
      </div>
    </div>
  );
};

export default AgentPage;
