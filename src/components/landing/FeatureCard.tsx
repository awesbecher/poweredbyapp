
import React from 'react';
import { icons } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  // Using the dynamic approach to get icons from lucide-react with fallback
  const IconComponent = icons[icon] || HelpCircle;
    
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg shadow-md">
      <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-purple-500 to-blue-600">
        <IconComponent size={24} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-200">{description}</p>
    </div>
  );
};

export default FeatureCard;
