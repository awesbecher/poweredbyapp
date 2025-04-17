
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Settings, 
  HelpCircle, 
  Search, 
  BarChart3, 
  CreditCard, 
  Bot
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
import { useAuth } from '@/App';

interface TopNavProps {
  showSearchBar?: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ showSearchBar = true }) => {
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll event to add shadow to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <Link to="/dashboard" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/ba850fee-49fa-4eb6-ad49-fa62b5b0e048.png" 
                alt="Logo" 
                className="h-8" 
              />
            </Link>
            
            <nav className="hidden md:flex items-center gap-4">
              <Link 
                to="/dashboard" 
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
            {showSearchBar && (
              <div className="relative hidden md:flex items-center">
                <div className="absolute left-3 text-muted-foreground">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Search agents... (Ctrl+K)"
                  className="w-64 h-9 pl-9 pr-4 rounded-md border border-input bg-background"
                />
                <div className="absolute right-3 text-muted-foreground text-xs bg-muted px-1.5 py-0.5 rounded">
                  ⌘K
                </div>
              </div>
            )}
            
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            
            <Button variant="ghost" size="icon">
              <HelpCircle size={20} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
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
