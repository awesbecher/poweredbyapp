
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/App';
import { authenticateUser } from '@/utils/authUtils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Create a schema for form validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  setError: (error: string | null) => void;
}

const LoginForm = ({ setError }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  // Initialize the form with React Hook Form and Zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await authenticateUser(values.email, values.password);
      
      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        login(); // Set authenticated state
        navigate('/');
      } else {
        // Handle different error types
        if (result.errorType === 'user_not_found') {
          setError("This email is not registered in our system. Please check your email or request access.");
          toast({
            title: "Login failed",
            description: "Email not recognized",
            variant: "destructive",
          });
        } else if (result.errorType === 'invalid_password') {
          setError("Invalid password. Please check your password and try again.");
          toast({
            title: "Login failed",
            description: "Invalid password",
            variant: "destructive",
          });
        } else {
          setError("Invalid email or password. Please check your credentials.");
          toast({
            title: "Login failed",
            description: "Authentication failed",
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      setError("An error occurred during login. Please try again later.");
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-white">Email</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Mail size={18} />
                </div>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel className="text-white">Password</FormLabel>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Lock size={18} />
                </div>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full mt-6 bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
