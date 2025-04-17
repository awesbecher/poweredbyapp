import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { useWizard } from '../../EmailAgentWizard';
import confetti from 'canvas-confetti';

const ConnectEmail: React.FC = () => {
  const { updateStepData, markStepAsCompleted } = useWizard();
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  
  const handleGoogleConnect = async () => {
    setConnecting(true);
    
    // Simulate API call
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      
      updateStepData('connect', { 
        provider: 'gmail',
        email: 'user@example.com',
        connected: true 
      });
      
      markStepAsCompleted('connect');
      
      // Show success toast
      toast({
        title: "Email connected successfully!",
        description: "Your Gmail account has been connected.",
      });

      // Trigger confetti if user doesn't prefer reduced motion
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 1500);
  };

  const handleMicrosoftConnect = async () => {
    setConnecting(true);
    
    // Simulate API call
    setTimeout(() => {
      setConnecting(false);
      
      toast({
        title: "Connection failed",
        description: "Microsoft 365 integration is coming soon.",
        variant: "destructive"
      });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Build your AI Email Agent</h3>
              <h4 className="text-xl font-medium text-muted-foreground mb-4">Let's give your inbox superpowers.</h4>
              <p className="text-muted-foreground">
                Connect your email account to get started.
              </p>
              
              <div className="space-y-3">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleConnect}
                  disabled={connecting || connected}
                >
                  {connected ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Connected with Gmail
                    </>
                  ) : connecting ? (
                    <>
                      <Mail className="h-5 w-5 animate-pulse" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5" />
                      Connect with Gmail
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleMicrosoftConnect}
                  disabled={connecting || connected}
                >
                  <Mail className="h-5 w-5" />
                  Connect with Microsoft 365
                </Button>
                
                <Button
                  variant="link"
                  className="w-full"
                  disabled={connecting || connected}
                >
                  Advanced: Manual IMAP setup
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-medium">What happens next?</h3>
              <p className="text-muted-foreground">
                After connecting your email:
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded">1</span>
                  <span>We'll verify your email access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded">2</span>
                  <span>You'll define your agent's personality and rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded">3</span>
                  <span>You can test your agent before going live</span>
                </li>
              </ul>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Privacy notice</AlertTitle>
                <AlertDescription>
                  Your emails are processed securely. We never store email content permanently and follow strict data protection practices.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConnectEmail;
