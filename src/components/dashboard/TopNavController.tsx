
import React, { useEffect } from 'react';

interface TopNavControllerProps {
  onSearchClick: () => void;
  onWhatsNewClick: () => void;
}

const TopNavController: React.FC<TopNavControllerProps> = ({ 
  onSearchClick, 
  onWhatsNewClick 
}) => {
  useEffect(() => {
    // Find the TopNav component and attach our handlers
    const topNav = document.querySelector('header[class*="sticky top-0"]');
    if (topNav) {
      // This is a bit of a hack, but it allows us to connect components
      // without having to modify the main layout
      (window as any).__topNavHandlers = {
        onSearchClick,
        onWhatsNewClick
      };
    }
  }, [onSearchClick, onWhatsNewClick]);

  return null;
};

export default TopNavController;
