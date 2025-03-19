
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/App';

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
    toast({
      title: "Google login",
      description: "Redirecting to Google authentication...",
    });
    // Implement Google OAuth with whitelist check
    setTimeout(() => {
      // Simulate a whitelisted Google user for demo
      const mockGoogleEmail = "admin@example.com";
      const isAuthorized = true; // In real implementation, check against whitelist
      
      if (isAuthorized) {
        login(); // Set authenticated state
        navigate('/');
      } else {
        setError("Access denied. Your Google account is not authorized.");
        toast({
          title: "Login failed",
          description: "Access denied. Your Google account is not authorized.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGithubLogin = () => {
    setIsLoading(true);
    toast({
      title: "GitHub login",
      description: "Redirecting to GitHub authentication...",
    });
    // Implement GitHub OAuth with whitelist check
    setTimeout(() => {
      // Simulate a whitelisted GitHub user for demo
      const mockGithubEmail = "user1@example.com";
      const isAuthorized = true; // In real implementation, check against whitelist
      
      if (isAuthorized) {
        login(); // Set authenticated state
        navigate('/');
      } else {
        setError("Access denied. Your GitHub account is not authorized.");
        toast({
          title: "Login failed",
          description: "Access denied. Your GitHub account is not authorized.",
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
