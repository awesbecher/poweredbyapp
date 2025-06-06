
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, LifeBuoy } from 'lucide-react';
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
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const getBackPath = () => {
    if (location.pathname === '/voice-agent') return '/';
    if (location.pathname === '/review-agent') return '/voice-agent';
    return '/';
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleSupportClick = () => {
    // Open support modal or redirect to support page
    console.log('Support button clicked');
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
          <div className="h-8">
            <img 
              src="/lovable-uploads/ba850fee-49fa-4eb6-ad49-fa62b5b0e048.png" 
              alt="Logo" 
              className="h-full" 
            />
          </div>
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
            onClick={handleSupportClick}
          >
            <LifeBuoy size={16} />
            <span>Support</span>
          </Button>
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
