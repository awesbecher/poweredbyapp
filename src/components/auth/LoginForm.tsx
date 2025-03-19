
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/App';
import { authenticateUser } from '@/utils/authUtils';

interface LoginFormProps {
  setError: (error: string | null) => void;
}

const LoginForm = ({ setError }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  return (
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
  );
};

export default LoginForm;
