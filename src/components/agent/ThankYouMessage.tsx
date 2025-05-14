
import React from 'react';
import { CheckCircle } from 'lucide-react';

const ThankYouMessage: React.FC = () => {
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-brand-purple/20 p-3">
          <CheckCircle className="h-10 w-10 text-brand-purple-light" />
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
        Thank you for submitting your request
      </h2>
      <p className="text-white/80">
        We'll be in touch shortly to connect you with the best builder for your project. 
        Our team typically responds within 24-48 hours.
      </p>
    </div>
  );
};

export default ThankYouMessage;
