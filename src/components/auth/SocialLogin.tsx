
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Github, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/App';
import { isAuthorizedUser } from '@/utils/authUtils';

interface SocialLoginProps {
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SocialLogin = ({ setError, isLoading, setIsLoading }: SocialLoginProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError(null);
    toast({
      title: "Google login",
      description: "Redirecting to Google authentication...",
    });
    
    // Simulate OAuth flow with specific error handling
    setTimeout(() => {
      // Simulate a Google user for demo
      const mockGoogleEmail = "andrew@poweredby.agency"; // Use one of the whitelisted emails for demo
      
      // Check if the email is in the whitelist
      if (isAuthorizedUser(mockGoogleEmail)) {
        login(); // Set authenticated state
        navigate('/');
        toast({
          title: "Login successful",
          description: `Logged in as ${mockGoogleEmail}`,
        });
      } else {
        setError("Your Google account is not authorized to access this application. Please contact the administrator for access.");
        toast({
          title: "Access denied",
          description: "Your Google account is not in our allowed users list",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGithubLogin = () => {
    setIsLoading(true);
    setError(null);
    toast({
      title: "GitHub login",
      description: "Redirecting to GitHub authentication...",
    });
    
    // Simulate OAuth flow
    setTimeout(() => {
      // Simulate a GitHub user for demo
      const mockGithubEmail = "team@poweredby.agency"; // Use one of the whitelisted emails for demo
      
      // Check if the email is in the whitelist
      if (isAuthorizedUser(mockGithubEmail)) {
        login();
        navigate('/');
        toast({
          title: "Login successful",
          description: `Logged in as ${mockGithubEmail}`,
        });
      } else {
        setError("Your GitHub account is not authorized to access this application. Please contact the administrator for access.");
        toast({
          title: "Access denied",
          description: "Your GitHub account is not in our allowed users list",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white/5 text-accent rounded">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <Mail size={16} className="mr-2" />
          Google
        </Button>
        <Button 
          variant="outline" 
          onClick={handleGithubLogin}
          disabled={isLoading}
          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <Github size={16} className="mr-2" />
          GitHub
        </Button>
      </div>
    </>
  );
};

export default SocialLogin;
