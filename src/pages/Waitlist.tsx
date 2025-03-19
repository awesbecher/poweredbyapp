
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const Waitlist = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-deep-purple flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-8">
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
            
            <div className="w-full h-80 bg-white/5 rounded-md flex items-center justify-center text-accent border border-white/10">
              {/* Placeholder for the Tally.so form that will be provided later */}
              <p>Tally.so form will be embedded here</p>
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
