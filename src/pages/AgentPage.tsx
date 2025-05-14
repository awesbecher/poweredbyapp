
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const AgentPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content area with dark purple gradient background */}
      <div className="flex-1 bg-gradient-to-b from-deep-purple to-[#120829] text-white">
        {/* Body content will be added later */}
        <div className="container mx-auto px-4 py-16">
          {/* Content placeholder */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AgentPage;
