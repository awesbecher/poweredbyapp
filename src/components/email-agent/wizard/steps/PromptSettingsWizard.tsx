
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Save, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWizard } from '../../EmailAgentWizard';
import { toast } from '@/hooks/use-toast';

const TONE_OPTIONS = [
  { value: 0, label: 'Formal' },
  { value: 50, label: 'Balanced' },
  { value: 100, label: 'Casual' }
];

const promptTypes = [
  { id: 'general', name: 'General Emails' },
  { id: 'support', name: 'Support Requests' },
  { id: 'sales', name: 'Sales Inquiries' },
  { id: 'complaints', name: 'Complaints' }
];

const PromptSettingsWizard: React.FC = () => {
  const { updateStepData, markStepAsCompleted, stepData } = useWizard();
  const savedData = stepData.prompt || {};
  
  const [activeTab, setActiveTab] = useState('general');
  const [prompts, setPrompts] = useState({
    general: savedData.prompts?.general || 'You are an AI email assistant for {{company_name}}.\nYou communicate in a {{tone}} tone.\nUse the knowledgebase below to provide accurate, helpful responses.',
    support: savedData.prompts?.support || 'You are a technical support specialist for {{company_name}}.\nTone: Friendly\nInstruction: Always reassure the customer and offer clear steps.',
    sales: savedData.prompts?.sales || 'You are a sales representative for {{company_name}}.\nTone: Persuasive\nInstruction: Emphasize product value. Encourage action.',
    complaints: savedData.prompts?.complaints || 'You are a customer service representative for {{company_name}}.\nTone: Empathetic + Professional\nInstruction: Acknowledge the customer\'s frustration.'
  });
  
  const [toneValue, setToneValue] = useState(savedData.toneValue || 50);
  const [isRefining, setIsRefining] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Check if the prompt is valid and update completed step
  useEffect(() => {
    const allPromptsValid = Object.values(prompts).every(prompt => prompt.length >= 20);
    
    if (allPromptsValid) {
      updateStepData('prompt', { 
        prompts,
        toneValue,
        tone: getToneLabel(toneValue)
      });
      markStepAsCompleted('prompt');
    }
  }, [prompts, toneValue]);

  const getToneLabel = (value: number) => {
    if (value < 25) return 'Formal';
    if (value < 75) return 'Balanced';
    return 'Casual';
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>, type: string) => {
    setPrompts(prev => ({
      ...prev,
      [type]: e.target.value
    }));
    simulateAutosave();
  };

  const handleToneChange = (value: number[]) => {
    setToneValue(value[0]);
    simulateAutosave();
  };

  const simulateAutosave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };

  const handleRefinePrompt = () => {
    setIsRefining(true);
    
    // Simulate API call to refine prompt with GPT-4o
    setTimeout(() => {
      setIsRefining(false);
      
      // Example of refined prompt with better structure
      const refinedPrompt = `# AI Email Assistant for ${savedData.companyName || '{{company_name}}'}

## Role & Identity
You are a professional email assistant representing ${savedData.companyName || '{{company_name}}'}.
Communication Style: ${getToneLabel(toneValue)} and helpful.

## Response Guidelines
1. Address the recipient's questions directly and concisely.
2. Keep responses under 3 paragraphs when possible.
3. Be genuinely helpful without over-promising.
4. Use appropriate sign-off based on the context.

## Knowledge Base Usage
- Reference the provided knowledge base for accurate information.
- If information isn't available, acknowledge limits and offer alternatives.`;

      setPrompts(prev => ({
        ...prev,
        [activeTab]: refinedPrompt
      }));
      
      toast({
        title: "Prompt refined successfully!",
        description: "Your prompt has been optimized with AI assistance.",
      });
    }, 2000);
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
          <CardTitle>Tone Settings</CardTitle>
          <CardDescription>Define how your AI agent should sound in emails</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Communication Tone</h3>
                <span className="text-sm font-medium">{getToneLabel(toneValue)}</span>
              </div>
              
              <Slider
                value={[toneValue]}
                max={100}
                step={1}
                onValueChange={handleToneChange}
                className="my-6"
              />
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Formal</span>
                <span>Balanced</span>
                <span>Casual</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Prompt Templates</CardTitle>
            <CardDescription>Customize how your agent responds to different email types</CardDescription>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleRefinePrompt}
            disabled={isRefining}
          >
            {isRefining ? (
              <>
                <RotateCw className="h-4 w-4 animate-spin" />
                Refining...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Refine with AI
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              {promptTypes.map(type => (
                <TabsTrigger key={type.id} value={type.id}>
                  {type.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {promptTypes.map(type => (
              <TabsContent key={type.id} value={type.id} className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {type.id === 'general' && 'Base instructions for handling most emails.'}
                  {type.id === 'support' && 'How to respond to technical or product questions.'}
                  {type.id === 'sales' && 'Instructions for handling potential customer inquiries.'}
                  {type.id === 'complaints' && 'Guidance for addressing customer concerns or complaints.'}
                </p>
                
                <div className="relative">
                  <textarea
                    className="w-full h-60 p-4 border rounded-md font-mono text-sm"
                    value={prompts[type.id]}
                    onChange={(e) => handlePromptChange(e, type.id)}
                  />
                  
                  {prompts[type.id].length < 20 && (
                    <p className="text-sm text-red-500 mt-2">
                      Prompt should be at least 20 characters long
                    </p>
                  )}
                </div>
                
                <div className="bg-muted/50 p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Available Variables:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 text-xs rounded">
                      {'{{company_name}}'}
                    </span>
                    <span className="bg-primary/10 text-primary px-2 py-1 text-xs rounded">
                      {'{{tone}}'}
                    </span>
                    <span className="bg-primary/10 text-primary px-2 py-1 text-xs rounded">
                      {'{{agent_name}}'}
                    </span>
                    <span className="bg-primary/10 text-primary px-2 py-1 text-xs rounded">
                      {'{{current_date}}'}
                    </span>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          {isSaving && (
            <div className="flex items-center text-sm text-muted-foreground mt-4 gap-2">
              <Save className="h-4 w-4 animate-spin" />
              <span>Saving changes...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PromptSettingsWizard;
