
import React from 'react';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const Icon = (LucideIcons as Record<string, LucideIcon>)[icon] || 
               (LucideIcons as Record<string, LucideIcon>)["HelpCircle"];
    
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg shadow-md">
      <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-purple-500 to-blue-600">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-200">{description}</p>
    </div>
  );
};

export default FeatureCard;
