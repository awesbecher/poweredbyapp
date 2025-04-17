
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Rocket, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useWizard } from '../../EmailAgentWizard';
import { toast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface LaunchProps {
  onComplete: () => void;
}

const Launch: React.FC<LaunchProps> = ({ onComplete }) => {
  const { stepData } = useWizard();
  const [isLaunching, setIsLaunching] = useState(false);
  const [selectedTier, setSelectedTier] = useState('basic');

  const launchAgent = () => {
    setIsLaunching(true);
    
    // Simulate API call to launch agent
    setTimeout(() => {
      setIsLaunching(false);
      
      // Show success toast
      toast({
        title: "Email Agent is live!",
        description: "Check your dashboard for stats!",
      });

      // Trigger confetti if user doesn't prefer reduced motion
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
      
      // Redirect to dashboard
      setTimeout(onComplete, 2000);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Final Review</CardTitle>
          <CardDescription>Review your settings before launching your email agent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email Connected</h3>
                    <p className="text-sm text-muted-foreground">
                      {stepData.connect?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Branding Set</h3>
                    <p className="text-sm text-muted-foreground">
                      {stepData.branding?.companyName || 'Your Company'} with custom colors
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Prompts Configured</h3>
                    <p className="text-sm text-muted-foreground">
                      {stepData.prompt?.tone || 'Balanced'} tone, 4 prompt variations
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Automations Ready</h3>
                    <p className="text-sm text-muted-foreground">
                      {stepData.automation?.rules?.length || 1} rules configured
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Agent Tested</h3>
                    <p className="text-sm text-muted-foreground">
                      Basic functionality verified
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Response Time</h3>
                    <p className="text-sm text-muted-foreground">
                      ~1-3 minutes per email
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-md border">
              <h3 className="font-medium mb-2">Usage Tier</h3>
              <RadioGroup value={selectedTier} onValueChange={setSelectedTier}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`border rounded-md p-3 ${selectedTier === 'basic' ? 'border-primary' : 'border-muted'}`}>
                    <RadioGroupItem value="basic" id="basic" className="sr-only" />
                    <Label htmlFor="basic" className="flex flex-col cursor-pointer">
                      <span className="font-medium">Basic</span>
                      <span className="text-lg font-bold">$29/mo</span>
                      <span className="text-xs text-muted-foreground">500 emails/mo</span>
                    </Label>
                  </div>
                  
                  <div className={`border rounded-md p-3 ${selectedTier === 'standard' ? 'border-primary' : 'border-muted'}`}>
                    <RadioGroupItem value="standard" id="standard" className="sr-only" />
                    <Label htmlFor="standard" className="flex flex-col cursor-pointer">
                      <span className="font-medium">Standard</span>
                      <span className="text-lg font-bold">$79/mo</span>
                      <span className="text-xs text-muted-foreground">2000 emails/mo</span>
                    </Label>
                  </div>
                  
                  <div className={`border rounded-md p-3 ${selectedTier === 'premium' ? 'border-primary' : 'border-muted'}`}>
                    <RadioGroupItem value="premium" id="premium" className="sr-only" />
                    <Label htmlFor="premium" className="flex flex-col cursor-pointer">
                      <span className="font-medium">Premium</span>
                      <span className="text-lg font-bold">$149/mo</span>
                      <span className="text-xs text-muted-foreground">5000 emails/mo</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="mt-8">
            <Button
              size="lg"
              className="w-full flex items-center justify-center gap-2 py-6 text-lg"
              onClick={launchAgent}
              disabled={isLaunching}
            >
              {isLaunching ? (
                <>
                  <AlertCircle className="h-5 w-5 animate-pulse" />
                  Launching Agent...
                </>
              ) : (
                <>
                  <Rocket className="h-5 w-5" />
                  Launch Email Agent
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Launch;
