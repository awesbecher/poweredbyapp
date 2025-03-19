
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Code, 
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

const Divider: React.FC = () => {
  return <div className="w-full h-px bg-gray-700/20 my-2" />;
};

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-white shadow-md flex flex-col items-center py-4 z-10">
      <div className="flex flex-col items-center space-y-1 w-full">
        {/* Top section - blue code icon */}
        <SidebarIcon icon={<Code size={24} />} highlight={true} />
        
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
