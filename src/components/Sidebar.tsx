import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Plus, 
  Folder, 
  HelpCircle, 
  Settings, 
  BookOpen, 
  CreditCard, 
  MessageSquare, 
  FileText, 
  Lightbulb,
  Sun,
  LogOut
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className="w-12 h-12 flex items-center justify-center cursor-pointer rounded-lg overflow-hidden bg-blue-500">
      <img 
        src="/lovable-uploads/82880f9b-90b3-4305-adc6-58a002e01f94.png"
        alt="Logo"
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

const Divider: React.FC = () => {
  return <div className="w-full h-px bg-gray-700/20 my-2" />;
};

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-black shadow-md flex flex-col items-center py-4 z-10">
      <TooltipProvider>
        <div className="flex flex-col items-center space-y-1 w-full">
          {/* Top section - Logo icon */}
          <LogoIcon />
          
          <div className="mt-4"></div>
          
          {/* Main navigation icons */}
          <SidebarIcon icon={<Home size={20} />} tooltip="Home" linkTo="/index" />
          <SidebarIcon icon={<Plus size={20} />} tooltip="New Agent" linkTo="/voice-agent" />
          <SidebarIcon icon={<Folder size={20} />} tooltip="Projects" />
          <SidebarIcon icon={<HelpCircle size={20} />} tooltip="Help" />
          <SidebarIcon icon={<Settings size={20} />} tooltip="Settings" />
          <SidebarIcon icon={<BookOpen size={20} />} tooltip="Documentation" />
          <SidebarIcon icon={<CreditCard size={20} />} tooltip="Billing" />
          <SidebarIcon icon={<MessageSquare size={20} />} tooltip="Messages" />
          <SidebarIcon icon={<FileText size={20} />} tooltip="Documents" />
          <SidebarIcon icon={<Lightbulb size={20} />} tooltip="Ideas" />
        </div>
        
        {/* Bottom section */}
        <div className="flex-grow"></div>
        <div className="flex flex-col items-center space-y-3 w-full mb-4">
          <SidebarIcon icon={<Sun size={20} />} tooltip="Theme" />
          <SidebarIcon icon={<LogOut size={20} />} tooltip="Logout" />
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Sidebar;
