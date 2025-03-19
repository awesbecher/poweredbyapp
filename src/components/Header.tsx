
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
  rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  showBackButton = false, 
  title = "Agent Configuration",
  rightElement
}) => {
  const location = useLocation();
  
  const getBackPath = () => {
    if (location.pathname === '/voice-agent') return '/';
    if (location.pathname === '/review-agent') return '/voice-agent';
    return '/';
  };

  return (
    <header className="w-full py-6 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Link 
              to={getBackPath()} 
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </Link>
          )}
          <h1 className="text-2xl font-medium">{title}</h1>
        </div>
        
        {rightElement && (
          <div className="flex items-center gap-2">
            {rightElement}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
