
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/App';
import { authenticateUser } from '@/utils/authUtils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const isAuthorized = await authenticateUser(email, password);
      
      if (isAuthorized) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        login(); // Set authenticated state
        navigate('/');
      } else {
        setError("Access denied. Your email is not authorized to use this application.");
        toast({
          title: "Login failed",
          description: "Access denied. Your email is not authorized.",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      toast({
        title: "Login error",
        description: "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="min-h-screen bg-deep-purple flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Agent Configuration Platform</h1>
          <p className="text-accent">Sign in to your account to continue</p>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-accent">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-3 mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <Mail size={18} />
                  </div>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <Lock size={18} />
                  </div>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-6 bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>
            
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
