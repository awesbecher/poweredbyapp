
import React from 'react';
import { 
  MessagesSquare, 
  Plug, 
  User, 
  Mic, 
  Mail, 
  Calendar, 
  Slack, 
  Shield
} from "lucide-react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  // Map string icon names to Lucide components
  const getIcon = () => {
    switch (icon) {
      case 'messages-square':
        return <MessagesSquare size={32} className="text-[#8B5CF6]" />;
      case 'plug':
        return <Plug size={32} className="text-[#8B5CF6]" />;
      case 'user':
        return <User size={32} className="text-[#8B5CF6]" />;
      case 'mic':
        return <Mic size={32} className="text-[#8B5CF6]" />;
      case 'mail':
        return <Mail size={32} className="text-[#8B5CF6]" />;
      case 'calendar':
        return <Calendar size={32} className="text-[#8B5CF6]" />;
      case 'slack':
        return <Slack size={32} className="text-[#8B5CF6]" />;
      case 'shield':
        return <Shield size={32} className="text-[#8B5CF6]" />;
      default:
        return <MessagesSquare size={32} className="text-[#8B5CF6]" />;
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <div className="p-3 bg-[#8B5CF6]/10 rounded-full w-fit">
          {getIcon()}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
