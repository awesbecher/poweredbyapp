
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare } from 'lucide-react';
import ProgressStepper from './ProgressStepper';

const DashboardSidebar: React.FC = () => {
  // Demo steps for the progress stepper
  const onboardingSteps = [
    { id: 1, name: 'Create account', completed: true, current: false },
    { id: 2, name: 'Configure first agent', completed: false, current: true },
    { id: 3, name: 'Connect data source', completed: false, current: false },
    { id: 4, name: 'Test agent', completed: false, current: false },
    { id: 5, name: 'Go live', completed: false, current: false },
  ];
  
  return (
    <div className="hidden xl:block w-64 border-r p-6 h-[calc(100vh-4rem)] sticky top-16">
      <div className="h-full flex flex-col justify-between">
        <div>
          <ProgressStepper steps={onboardingSteps} overallProgress={20} />
        </div>
        
        <div className="space-y-4">
          <Link to="/docs" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <BookOpen size={18} />
            <span>Documentation</span>
          </Link>
          
          <Link to="https://slack.com" target="_blank" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <MessageSquare size={18} />
            <span>Join our Community</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
