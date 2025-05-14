
import React from 'react';

interface SubmitButtonProps {
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading = false }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-[#0062FF] hover:bg-[#0056E6] text-white px-4 py-4 rounded-md font-semibold text-base mt-4 transition-colors disabled:opacity-70"
    >
      {isLoading ? 'Submitting...' : 'Submit'}
    </button>
  );
};

export default SubmitButton;
