
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-50 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <img src="/lovable-uploads/83a3f394-4c25-41ec-abf4-fa47df5cb6f3.png" alt="Powered_by Logo" className="h-8" />
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Powered_by Agency. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-[#8B5CF6] transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
