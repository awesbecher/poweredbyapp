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
        isScrolled ? 'bg-black shadow-md py-3' : 'bg-black py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="https://www.poweredby.agency/" 
              className="flex items-center"
            >
              <img 
                src="/lovable-uploads/a3ce0501-322f-4a7c-991e-66d07fdde2fc.png" 
                alt="Powered By Agency" 
                className="h-10 md:h-12" 
              />
            </a>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-4">
            <div className="flex items-center gap-8">
              <a 
                href="https://www.poweredby.agency/products" 
                className="text-white hover:text-brand-purple-light transition-colors text-base font-medium"
              >
                Solutions
              </a>
              <span className="text-white font-bold">|</span>
              <a 
                href="https://www.poweredby.agency/demo" 
                className="text-white hover:text-brand-purple-light transition-colors text-base font-medium"
              >
                Demos
              </a>
              <span className="text-white font-bold">|</span>
              <a 
                href="https://www.poweredby.agency/about" 
                className="text-white hover:text-brand-purple-light transition-colors text-base font-medium"
              >
                About
              </a>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="hidden md:flex flex-shrink-0 items-center">
            <div className="flex items-center gap-2">
              <Link to="/agent">
                <Button 
                  className="bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-base"
                  size="sm"
                >
                  Build me an AI Agent
                </Button>
              </Link>
            </div>
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
          <div className="md:hidden pt-4 pb-2 bg-black mt-2 rounded-md">
            <div className="flex flex-col gap-2 px-2">
              <a 
                href="https://www.poweredby.agency/products" 
                className="text-white hover:text-brand-purple-light transition-colors py-2 px-4 text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </a>
              <a 
                href="https://www.poweredby.agency/demo" 
                className="text-white hover:text-brand-purple-light transition-colors py-2 px-4 text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demos
              </a>
              <a 
                href="https://www.poweredby.agency/about" 
                className="text-white hover:text-brand-purple-light transition-colors py-2 px-4 text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <div className="flex flex-col gap-2 mt-2 px-4 pb-2">
                <Link to="/agent">
                  <Button 
                    className="bg-brand-purple hover:bg-brand-purple-dark text-white w-full font-bold text-base"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Build me an AI Agent
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
