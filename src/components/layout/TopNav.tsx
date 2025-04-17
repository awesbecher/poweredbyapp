
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Settings, 
  HelpCircle, 
  BarChart3, 
  CreditCard, 
  Bot,
  UserRound,
  Search 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/App';

interface TopNavProps {
  onSearchClick?: () => void;
  onWhatsNewClick?: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ onSearchClick, onWhatsNewClick }) => {
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2); // Example unread count
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we have global handlers (from the AgentDashboard component)
  useEffect(() => {
    if ((window as any).__topNavHandlers) {
      const handlers = (window as any).__topNavHandlers;
      if (handlers.onSearchClick && !onSearchClick) {
        // Use the handler from the global object
      }
      if (handlers.onWhatsNewClick && !onWhatsNewClick) {
        // Use the handler from the global object
      }
    }
  }, [onSearchClick, onWhatsNewClick]);

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else if ((window as any).__topNavHandlers?.onSearchClick) {
      (window as any).__topNavHandlers.onSearchClick();
    }
  };

  const handleWhatsNewClick = () => {
    if (onWhatsNewClick) {
      onWhatsNewClick();
    } else if ((window as any).__topNavHandlers?.onWhatsNewClick) {
      (window as any).__topNavHandlers.onWhatsNewClick();
    }
  };

  const handleSignOut = () => {
    logout();
    window.location.href = '/login';
  };
  
  return (
    <div 
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 transition-all duration-200 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/ba850fee-49fa-4eb6-ad49-fa62b5b0e048.png" 
                alt="Logo" 
                className="h-8" 
              />
            </Link>
            
            <nav className="hidden md:flex items-center gap-4">
              <Link 
                to="/" 
                className="text-sm font-medium flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <Bot size={18} />
                My Agents
              </Link>
              <Link 
                to="/analytics" 
                className="text-sm font-medium flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <BarChart3 size={18} />
                Analytics
              </Link>
              <Link 
                to="/billing" 
                className="text-sm font-medium flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <CreditCard size={18} />
                Billing
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSearchClick}
              className="relative"
            >
              <Search size={20} />
              <kbd className="pointer-events-none absolute right-1.5 top-5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleWhatsNewClick}
              className="relative"
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                >
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" size="icon">
              <HelpCircle size={20} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full">
                  <UserRound 
                    size={24} 
                    color="#7E69AB" 
                    strokeWidth={1.5}
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/billing" className="w-full flex">Subscription</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full flex">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
