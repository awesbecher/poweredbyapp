
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const Waitlist = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Tally.so script when component mounts
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-deep-purple flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src="/lovable-uploads/4c21c24d-5233-426f-8687-7dd9096c0e64.png" 
              alt="Agency Logo" 
              className="h-16 md:h-20"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Agent Configuration Platform</h1>
          <p className="text-accent">Join our waitlist</p>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Closed Beta</CardTitle>
            <CardDescription className="text-accent">
              The Powered_by App is currently in closed beta
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center space-y-6">
            <p className="text-white text-center">
              If you'd like to join the waitlist to be part of our beta program, please enter your contact details below.
            </p>
            
            <div className="w-full">
              {/* Tally.so form embed */}
              <iframe
                data-tally-src="https://tally.so/embed/example-form-id?alignLeft=1&hideTitle=1&transparentBackground=1"
                width="100%"
                height="400"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Waitlist Signup Form"
                className="bg-transparent"
              ></iframe>
            </div>
            
            <Button 
              onClick={() => navigate('/login')}
              className="mt-4"
              variant="outline"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Waitlist;
