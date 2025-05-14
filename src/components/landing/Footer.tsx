
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-[#120829] border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <a href="https://www.poweredby.agency/" className="block">
              <img src="/lovable-uploads/83a3f394-4c25-41ec-abf4-fa47df5cb6f3.png" alt="Powered_by Logo" className="h-8" />
            </a>
          </div>
          <div className="text-sm text-gray-300">
            © {new Date().getFullYear()} Powered_by Agency. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="mailto:team@poweredby.agency" className="text-sm text-gray-300 hover:text-[#9b87f5] transition-colors">
              Contact
            </a>
            <a href="https://www.poweredby.agency/about" className="text-sm text-gray-300 hover:text-[#9b87f5] transition-colors">
              About Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
