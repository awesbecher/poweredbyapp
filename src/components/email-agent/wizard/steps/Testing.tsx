
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useWizard } from '../../EmailAgentWizard';

const Testing: React.FC = () => {
  const { updateStepData, markStepAsCompleted } = useWizard();
  const [testEmailContent, setTestEmailContent] = useState(
    `Subject: Inquiry about your AI services\n\nHello,\n\nI came across your company while researching AI solutions. I'm interested in learning more about your services and pricing. Could you please provide more information?\n\nBest regards,\nJohn Smith`
  );
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [verboseMode, setVerboseMode] = useState(false);
  const [costEstimate, setCostEstimate] = useState('$0.003');
  const responseRef = useRef<HTMLDivElement>(null);

  // Mark this step as completed by default
  useEffect(() => {
    markStepAsCompleted('testing');
    updateStepData('testing', { tested: true });
  }, []);

  const generateResponse = () => {
    setIsGenerating(true);
    setResponse('');
    
    // Sample response text
    const sampleResponse = `Thank you for your interest in our AI services! 

I'd be happy to provide more information about what we offer:

**Our AI Services Include:**
- Custom AI solution development
- AI integration with existing systems
- Data analysis and machine learning models
- Automated workflow solutions

Our pricing typically ranges from $1,000-5,000 per month depending on your specific needs and implementation requirements.

Would you like to schedule a call with one of our specialists to discuss your specific requirements in more detail? We offer a free 30-minute consultation.

Best regards,
AI Assistant
Example Company`;

    // Stream the response character by character
    let i = 0;
    const interval = setInterval(() => {
      if (i < sampleResponse.length) {
        setResponse(prev => prev + sampleResponse.charAt(i));
        i++;
        
        // Auto-scroll the response area
        if (responseRef.current) {
          responseRef.current.scrollTop = responseRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        
        // Update cost estimate
        setCostEstimate('$0.004');
      }
    }, 15);
  };

  const resetTest = () => {
    setResponse('');
    setCostEstimate('$0.003');
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Test Your Agent</CardTitle>
              <CardDescription>See how your agent responds to sample emails</CardDescription>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-1" 
              onClick={resetTest}
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="test-email">Sample Incoming Email</Label>
                <textarea
                  id="test-email"
                  className="w-full h-60 p-4 border rounded-md font-mono text-sm mt-2"
                  value={testEmailContent}
                  onChange={(e) => setTestEmailContent(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={generateResponse} 
                disabled={isGenerating || testEmailContent.trim().length === 0}
                className="w-full flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Test Response
                  </>
                )}
              </Button>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="verbose-mode"
                    checked={verboseMode}
                    onCheckedChange={setVerboseMode}
                  />
                  <Label htmlFor="verbose-mode" className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    Verbose thinking
                  </Label>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Est. cost: {costEstimate}
                </div>
              </div>
            </div>
            
            <div>
              <Label>Agent Response</Label>
              <div 
                ref={responseRef}
                className="w-full h-60 p-4 border rounded-md font-mono text-sm mt-2 overflow-auto whitespace-pre-wrap"
              >
                {response || (
                  <span className="text-muted-foreground">
                    Response will appear here...
                  </span>
                )}
                
                {isGenerating && (
                  <span className="animate-pulse">▌</span>
                )}
              </div>
              
              {verboseMode && response && (
                <div className="mt-4 p-3 text-xs bg-muted/50 rounded-md">
                  <p className="font-medium mb-1">AI Thinking Process:</p>
                  <p className="text-muted-foreground">
                    1. Identified inquiry type: Product information request<br/>
                    2. Determined appropriate tone: Professional, informative<br/>
                    3. Accessing knowledge base for service details and pricing<br/>
                    4. Adding call-to-action for next steps
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Testing;
