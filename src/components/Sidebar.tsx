
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Plus, 
  Folder, 
  HelpCircle, 
  Settings, 
  BookOpen, 
  CreditCard, 
  FileText, 
  LogOut,
  Mail
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from '@/App';

interface SidebarIconProps {
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  highlight?: boolean;
  tooltip?: string;
  linkTo?: string;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ 
  icon, 
  isActive = false, 
  onClick,
  highlight = false,
  tooltip,
  linkTo
}) => {
  const iconElement = (
    <div 
      className={cn(
        "w-12 h-12 flex items-center justify-center cursor-pointer transition-colors duration-200",
        isActive ? "text-white" : "text-gray-400 hover:text-gray-300",
        highlight && "bg-blue-500 rounded-lg text-white"
      )}
      onClick={onClick}
    >
      {icon}
    </div>
  );

  const wrappedIcon = linkTo ? (
    <Link to={linkTo}>
      {iconElement}
    </Link>
  ) : iconElement;

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {wrappedIcon}
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return wrappedIcon;
};

const LogoIcon: React.FC = () => {
  return (
    <div className="w-12 h-12 flex items-center justify-center cursor-pointer">
      <img 
        src="/lovable-uploads/ae8e51ee-1015-4acb-8ff5-4da999c0777d.png"
        alt="Logo"
        className="w-6 h-6 object-contain" // Changed from w-full h-full to w-6 h-6 to match other icons
      />
    </div>
  );
};

const Divider: React.FC = () => {
  return <div className="w-full h-px bg-gray-700/20 my-2" />;
};

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the index page
  const isIndexPage = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-black shadow-md flex flex-col items-center py-4 z-10">
      <TooltipProvider>
        <div className="flex flex-col items-center space-y-1 w-full">
          {/* Top section - Logo icon */}
          <LogoIcon />
          
          <div className="mt-4"></div>
          
          {/* Main navigation icons - conditional based on page */}
          {isIndexPage ? (
            <>
              <SidebarIcon icon={<Home size={20} />} tooltip="Home" linkTo="/" />
              <SidebarIcon icon={<Plus size={20} />} tooltip="New Agent" linkTo="/voice-agent" />
              <SidebarIcon icon={<Mail size={20} />} tooltip="Email Agent" linkTo="/email-agent" />
              <SidebarIcon icon={<Folder size={20} />} tooltip="Projects" />
              <SidebarIcon icon={<HelpCircle size={20} />} tooltip="Help" />
              <SidebarIcon icon={<Settings size={20} />} tooltip="Settings" />
              <SidebarIcon icon={<BookOpen size={20} />} tooltip="Documentation" />
              <SidebarIcon icon={<CreditCard size={20} />} tooltip="Billing" />
              <SidebarIcon icon={<FileText size={20} />} tooltip="Documents" />
            </>
          ) : (
            <>
              <SidebarIcon icon={<Home size={20} />} tooltip="Home" linkTo="/" />
              <Divider />
              <SidebarIcon icon={<Plus size={20} />} tooltip="New Agent" linkTo="/voice-agent" />
              <SidebarIcon icon={<Mail size={20} />} tooltip="Email Agent" linkTo="/email-agent" />
              <SidebarIcon icon={<Folder size={20} />} tooltip="Projects" />
              <SidebarIcon icon={<HelpCircle size={20} />} tooltip="Help" />
              <SidebarIcon icon={<Settings size={20} />} tooltip="Settings" />
              <SidebarIcon icon={<BookOpen size={20} />} tooltip="Documentation" />
              <SidebarIcon icon={<CreditCard size={20} />} tooltip="Billing" />
              <SidebarIcon icon={<FileText size={20} />} tooltip="Documents" />
            </>
          )}
        </div>
        
        {/* Bottom section */}
        <div className="flex-grow"></div>
        <div className="flex flex-col items-center space-y-3 w-full mb-4">
          <SidebarIcon 
            icon={<LogOut size={20} />} 
            tooltip="Logout" 
            onClick={handleLogout}
          />
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Sidebar;
