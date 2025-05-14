
import React from 'react';

const ThankYouMessage: React.FC = () => {
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Thank you for submitting your request.</h2>
      <p className="text-gray-300">
        We'll be in touch shortly to connect you with the best builder for your project.
      </p>
    </div>
  );
};

export default ThankYouMessage;
