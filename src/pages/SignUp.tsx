
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-deep-purple flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Agent Configuration Platform</h1>
          <p className="text-accent">Create a new account</p>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sign Up</CardTitle>
            <CardDescription className="text-accent">
              This page will be implemented in the future
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-white text-center">
              The sign-up functionality will be implemented in a future update.
            </p>
            
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

export default SignUp;
