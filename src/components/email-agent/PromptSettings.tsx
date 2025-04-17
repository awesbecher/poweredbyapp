
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save, MessageSquare, RotateCw, Check, BookText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

// Define prompt variation types
const promptVariations = [
  { id: 'default', name: 'Default', description: 'Base prompt for general inquiries' },
  { id: 'support', name: 'Support', description: 'For technical support and assistance inquiries' },
  { id: 'sales', name: 'Sales', description: 'For product inquiries and potential purchases' },
  { id: 'complaint', name: 'Complaint/Refund', description: 'For handling customer issues and refund requests' },
  { id: 'custom', name: 'Custom', description: 'Create a specialized prompt variation' }
];

const defaultPrompts = {
  default: 'You are an AI email assistant for {{company_name}}.\nYou communicate in a {{tone}} tone.\nUse the knowledgebase below to provide accurate, helpful responses.',
  support: 'You are a technical support specialist for {{company_name}}.\nTone: Friendly\nInstruction: Always reassure the customer and offer clear steps. If unsure, escalate.',
  sales: 'You are a sales representative for {{company_name}}.\nTone: Persuasive\nInstruction: Emphasize product value. Encourage action (signup, upgrade, book a demo).\nHighlight differentiators when asked about competitors.',
  complaint: 'You are a customer service representative for {{company_name}}.\nTone: Empathetic + Professional\nInstruction: Acknowledge the customer\'s frustration. Apologize if necessary.\nExplain any policy from the KB clearly and politely.\nOffer to escalate to a human if the situation is sensitive.',
  custom: 'You are an AI email assistant for {{company_name}}.\n\n[Instructions for your specialized use case]\n\nUse the knowledgebase to ensure accurate information.'
};

interface PromptSettingsProps {
  agentId?: string;
}

const PromptSettings: React.FC<PromptSettingsProps> = ({ agentId }) => {
  const [activeTab, setActiveTab] = useState('default');
  const [prompts, setPrompts] = useState<Record<string, string>>(defaultPrompts);
  const [agent, setAgent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (agentId) {
      fetchAgentData();
    }
  }, [agentId]);

  const fetchAgentData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agentId)
        .single();
      
      if (error) throw error;
      
      setAgent(data);
      
      // Load any saved prompt variations
      if (data.prompt_variations) {
        setPrompts({
          ...defaultPrompts,
          ...data.prompt_variations
        });
      }
    } catch (error: any) {
      toast({
        title: "Error fetching agent data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!agentId) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('agents')
        .update({
          prompt_variations: prompts,
          updated_at: new Date().toISOString()
        })
        .eq('id', agentId);
      
      if (error) throw error;
      
      toast({
        title: "Prompt variations saved",
        description: "Your prompt configurations have been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving prompt variations",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetPrompt = (variationType: string) => {
    if (defaultPrompts[variationType as keyof typeof defaultPrompts]) {
      setPrompts(prev => ({
        ...prev,
        [variationType]: defaultPrompts[variationType as keyof typeof defaultPrompts]
      }));

      toast({
        title: "Prompt reset",
        description: `${variationType} prompt has been reset to default.`,
      });
    }
  };

  const handlePromptChange = (variationType: string, value: string) => {
    setPrompts(prev => ({
      ...prev,
      [variationType]: value
    }));
  };

  const renderPromptForm = (variationType: string) => {
    const variation = promptVariations.find(v => v.id === variationType);
    const currentPrompt = prompts[variationType] || defaultPrompts[variationType as keyof typeof defaultPrompts] || '';

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">{variation?.name} Prompt</h3>
            <p className="text-muted-foreground">{variation?.description}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => resetPrompt(variationType)}
            className="flex items-center gap-1"
          >
            <RotateCw size={14} />
            Reset to Default
          </Button>
        </div>
        
        <Textarea 
          value={currentPrompt} 
          onChange={(e) => handlePromptChange(variationType, e.target.value)} 
          className="min-h-[250px] font-mono text-sm"
          placeholder={`Enter your ${variation?.name} prompt template here...`}
        />
        
        <div className="text-sm text-muted-foreground">
          <p>Available variables:</p>
          <ul className="list-disc list-inside ml-2">
            <li>{'{{company_name}}'} - Your company name</li>
            <li>{'{{tone}}'} - The agent's configured tone</li>
            <li>{'{{kb_chunks}}'} - Knowledge base content</li>
            <li>{'{{customer_message}}'} - The incoming email text</li>
            <li>{'{{agent_history}}'} - Previous responses in this thread</li>
          </ul>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Prompt Settings</h2>
          <p className="text-muted-foreground">
            Customize how your AI agent responds to different types of emails
          </p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-1"
        >
          {isSaving ? <RotateCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Prompt Variations
          </CardTitle>
          <CardDescription>
            Different prompt templates for various types of customer emails
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              {promptVariations.map(variation => (
                <TabsTrigger key={variation.id} value={variation.id}>
                  {variation.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {promptVariations.map(variation => (
              <TabsContent key={variation.id} value={variation.id}>
                {renderPromptForm(variation.id)}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookText className="h-5 w-5" />
            System Prompt Preview
          </CardTitle>
          <CardDescription>
            See how your prompt will be processed in the AI system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
            {prompts[activeTab]
              .replace('{{company_name}}', agent?.company_name || 'Your Company')
              .replace('{{tone}}', agent?.tone || 'professional')}

            {`\nKnowledgebase:
[Your knowledge base content will appear here]

Email Thread:
Customer: [Customer's email will appear here]
[Previous agent responses, if any]`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptSettings;
