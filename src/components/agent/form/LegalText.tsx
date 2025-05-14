
import React from 'react';

const LegalText: React.FC = () => {
  return (
    <p className="text-xs text-white text-center mt-3">
      By clicking 'Submit', you agree to the Botpress{" "}
      <a href="/terms" className="text-[#0062FF] hover:underline">Terms of Service</a>
      {" "}and{" "}
      <a href="/privacy" className="text-[#0062FF] hover:underline">Privacy Policy</a>.
    </p>
  );
};

export default LegalText;
