
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react'; 
import LoginForm from '@/components/auth/LoginForm';
import SocialLogin from '@/components/auth/SocialLogin';
import LoginHeader from '@/components/auth/LoginHeader';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user was redirected from a protected route
  useEffect(() => {
    const from = location.state?.from;
    if (from && from.pathname !== '/login') {
      setRedirectMessage(`Please log in to access ${from.pathname}`);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-deep-purple flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in pt-8">
        <div className="flex justify-center mb-8 mt-8">
          <img 
            src="/lovable-uploads/4c21c24d-5233-426f-8687-7dd9096c0e64.png" 
            alt="Agency Logo" 
            className="h-16 md:h-20"
          />
        </div>
        <LoginHeader />
        
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-accent">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {redirectMessage && (
              <Alert className="bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md mb-4">
                <AlertDescription className="text-sm flex items-start">
                  <Info className="h-4 w-4 mr-2 mt-0.5" />
                  <span>{redirectMessage}</span>
                </AlertDescription>
              </Alert>
            )}
            
            {error && (
              <Alert variant="destructive" className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md mb-4">
                <AlertDescription className="text-sm flex items-start">
                  <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
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
              <a href="/waitlist" className="text-primary font-medium hover:underline">
                Join the waitlist!
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
