
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - changed from Link to anchor tag with external URL */}
          <div className="flex items-center">
            <a 
              href="https://www.poweredby.agency/" 
              className="flex items-center"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src="/lovable-uploads/a3ce0501-322f-4a7c-991e-66d07fdde2fc.png" 
                alt="Powered By Agency" 
                className="h-10 md:h-12" 
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="https://www.poweredby.agency/products" 
              className="text-white hover:text-brand-purple-light transition-colors text-sm font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solutions
            </a>
            <Link to="/about" className="text-white hover:text-brand-purple-light transition-colors text-sm font-medium">
              About
            </Link>
            <Link to="/resources" className="text-white hover:text-brand-purple-light transition-colors text-sm font-medium">
              Resources
            </Link>
            <Button 
              className="bg-brand-purple hover:bg-brand-purple-dark text-white ml-2"
              size="sm"
            >
              Build me an AI Agent
            </Button>
            <Button 
              className="bg-white text-black hover:bg-gray-100"
              size="sm"
            >
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 bg-black/95 mt-2 rounded-md">
            <div className="flex flex-col gap-2 px-2">
              <a 
                href="https://www.poweredby.agency/products" 
                className="text-white hover:text-brand-purple-light transition-colors py-2 px-4 text-sm"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </a>
              <Link 
                to="/about" 
                className="text-white hover:text-brand-purple-light transition-colors py-2 px-4 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/resources" 
                className="text-white hover:text-brand-purple-light transition-colors py-2 px-4 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <div className="flex flex-col gap-2 mt-2 px-4 pb-2">
                <Button 
                  className="bg-brand-purple hover:bg-brand-purple-dark text-white w-full"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Build me an AI Agent
                </Button>
                <Button 
                  className="bg-white text-black hover:bg-gray-100 w-full"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
