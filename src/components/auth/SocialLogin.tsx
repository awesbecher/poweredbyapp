
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

  // Google OAuth configuration
  const googleOAuthConfig = {
    client_id: '707588075803-0p7hpi6j3qri3vtu1u4a8l7qhhl7nbbf.apps.googleusercontent.com',
    redirect_uri: window.location.origin + '/login',
    scope: 'email profile',
    response_type: 'token',
    prompt: 'select_account',
  };

  // Function to handle the OAuth redirect response
  React.useEffect(() => {
    // Check if we have a hash in the URL (indicates OAuth callback)
    if (window.location.hash) {
      setIsLoading(true);
      
      // Extract the access token from the URL hash
      const params = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = params.get('access_token');
      
      if (accessToken) {
        // Get user info from Google using the access token
        fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            const email = data.email;
            
            // Check if the user's email is in the whitelist
            if (isAuthorizedUser(email)) {
              login();
              navigate('/');
              toast({
                title: 'Login successful',
                description: `Logged in as ${email}`,
              });
            } else {
              setError('Your Google account is not authorized to access this application. Please contact the administrator for access.');
              toast({
                title: 'Access denied',
                description: 'Your Google account is not in our allowed users list',
                variant: 'destructive',
              });
            }
          })
          .catch(err => {
            console.error('Error fetching user info:', err);
            setError('Failed to get user information from Google');
            toast({
              title: 'Authentication error',
              description: 'Failed to verify Google account',
              variant: 'destructive',
            });
          })
          .finally(() => {
            setIsLoading(false);
            // Clean up the URL to remove the hash
            window.history.replaceState({}, document.title, window.location.pathname);
          });
      }
    }
  }, []);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError(null);
    
    // Build the Google OAuth URL
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    const urlParams = new URLSearchParams(googleOAuthConfig);
    authUrl.search = urlParams.toString();
    
    // Redirect to Google's authorization page
    window.location.href = authUrl.toString();
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
