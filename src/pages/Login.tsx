
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from 'lucide-react'; 
import LoginForm from '@/components/auth/LoginForm';
import SocialLogin from '@/components/auth/SocialLogin';
import LoginHeader from '@/components/auth/LoginHeader';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-deep-purple flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <LoginHeader />
        
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-accent">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert variant="destructive" className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md mb-4">
                <AlertDescription className="text-sm flex items-start">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-2 mt-0.5" />
                  <span>{error}</span>
                </AlertDescription>
              </Alert>
            )}
            
            <LoginForm setError={setError} />
            
            <SocialLogin 
              setError={setError} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
            />
          </CardContent>
          
          <CardFooter className="flex justify-center border-t border-white/10 pt-6">
            <p className="text-sm text-accent">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary font-medium hover:underline">
                Sign up here!
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
