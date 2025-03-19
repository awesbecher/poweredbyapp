
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Plus, 
  Folder, 
  HelpCircle, 
  Settings, 
  BookOpen, 
  Box, 
  CreditCard, 
  MessageSquare, 
  FileText, 
  Lightbulb,
  Sun,
  LogOut
} from 'lucide-react';

interface SidebarIconProps {
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  highlight?: boolean;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ 
  icon, 
  isActive = false, 
  onClick,
  highlight = false
}) => {
  return (
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
      <div className="flex flex-col items-center space-y-1 w-full">
        {/* Top section - Logo icon */}
        <LogoIcon />
        
        {/* Removed the Expand/Collapse button with ChevronRight icon */}
        
        <div className="mt-4"></div>
        
        {/* Main navigation icons */}
        <SidebarIcon icon={<Home size={20} />} />
        <SidebarIcon icon={<Plus size={20} />} />
        <SidebarIcon icon={<Folder size={20} />} />
        <SidebarIcon icon={<HelpCircle size={20} />} />
        <SidebarIcon icon={<Settings size={20} />} />
        <SidebarIcon icon={<BookOpen size={20} />} />
        <SidebarIcon icon={<Box size={20} />} />
        <SidebarIcon icon={<CreditCard size={20} />} />
        <SidebarIcon icon={<MessageSquare size={20} />} />
        <SidebarIcon icon={<FileText size={20} />} />
        <SidebarIcon icon={<Lightbulb size={20} />} />
      </div>
      
      {/* Bottom section */}
      <div className="flex-grow"></div>
      <div className="flex flex-col items-center space-y-3 w-full mb-4">
        <SidebarIcon icon={<Sun size={20} />} />
        <SidebarIcon icon={<LogOut size={20} />} />
      </div>
    </div>
  );
};

export default Sidebar;
