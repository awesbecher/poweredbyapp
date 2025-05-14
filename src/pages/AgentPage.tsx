
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
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
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Content area with same background as landing page */}
      <div className="flex-1 bg-gradient-to-b from-deep-purple to-[#120829] text-white">
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
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AgentPage;
