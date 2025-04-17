
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessHeaderProps {
  companyName: string;
}

const SuccessHeader: React.FC<SuccessHeaderProps> = ({ companyName }) => {
  return (
    <div className="flex flex-col items-center text-center pt-6 pb-8">
      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Your Email Agent is Ready!</h2>
      <p className="text-muted-foreground max-w-md">
        The AI email agent for {companyName} has been successfully created. 
        Next steps: Connect your Gmail and train it with your files.
      </p>
    </div>
  );
};

export default SuccessHeader;
