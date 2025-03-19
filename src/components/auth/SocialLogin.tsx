
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Github, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/App';
import { isAuthorizedUser } from '@/utils/authUtils';
import { Input } from '@/components/ui/input';

interface SocialLoginProps {
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SocialLogin = ({ setError, isLoading, setIsLoading }: SocialLoginProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Check if the email is in the whitelist
    if (isAuthorizedUser(email)) {
      // Simulate successful login
      setTimeout(() => {
        login();
        navigate('/');
        toast({
          title: "Login successful",
          description: `Logged in as ${email}`,
        });
        setIsLoading(false);
      }, 800);
    } else {
      setError("This email is not authorized to access this application. Please contact the administrator for access.");
      toast({
        title: "Access denied",
        description: "Your email is not in our allowed users list",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleGoogleClick = () => {
    setShowEmailInput(true);
    setError(null);
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
      
      {showEmailInput ? (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
            <p className="text-xs text-accent">
              Enter your email to sign in
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-primary text-white w-full"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={() => setShowEmailInput(false)}
              className="bg-white/5 border-white/10 text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={handleGoogleClick}
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
      )}
    </>
  );
};

export default SocialLogin;
