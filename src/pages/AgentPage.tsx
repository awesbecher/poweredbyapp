
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import AgentHeroContent from '@/components/agent/AgentHeroContent';
import ThankYouMessage from '@/components/agent/ThankYouMessage';

const AgentPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

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
              
              {/* Right Column - Space for Tally.so form to be added later */}
              <div className="md:w-[40%]">
                <div className="bg-black rounded-lg shadow-md p-8 h-full flex items-center justify-center">
                  <p className="text-white text-center">Tally.so form will be embedded here.</p>
                </div>
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
