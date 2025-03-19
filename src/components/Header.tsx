
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/App';

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
  const { logout } = useAuth();
  
  const getBackPath = () => {
    if (location.pathname === '/voice-agent') return '/';
    if (location.pathname === '/review-agent') return '/voice-agent';
    return '/';
  };

  const handleSignOut = () => {
    logout();
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
        
        <div className="flex items-center gap-4">
          {rightElement && (
            <div className="flex items-center gap-2">
              {rightElement}
            </div>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2" 
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
