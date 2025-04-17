
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UsageRingProps {
  used: number;
  total: number;
  upgradeUrl?: string;
}

const UsageRing: React.FC<UsageRingProps> = ({ 
  used,
  total,
  upgradeUrl = "#"
}) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.round((used / total) * 100));
  
  // Calculate the stroke-dashoffset value
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 z-10">
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#e6e6e6"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#00A1FF"
            strokeLinecap="round"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000 ease-out"
          />
          {/* Center text */}
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dy="0.3em"
            fontSize="24"
            fontWeight="bold"
            fill="currentColor"
          >
            {used}
          </text>
        </svg>
      </div>
      
      <div className="mt-2 text-center">
        <p className="text-sm font-medium">
          {total - used} free agent credits left
        </p>
        <Button 
          variant="link" 
          className="mt-1 text-primary flex items-center gap-1 p-0"
          asChild
        >
          <a href={upgradeUrl}>
            <PlusCircle size={14} />
            <span>Upgrade</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default UsageRing;
