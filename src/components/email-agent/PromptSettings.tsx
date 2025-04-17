
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Save, MessageSquare, RotateCw } from 'lucide-react';
import { usePromptSettings } from './prompt-settings/usePromptSettings';
import { promptVariations } from './prompt-settings/promptVariations';
import PromptForm from './prompt-settings/PromptForm';
import PromptPreview from './prompt-settings/PromptPreview';

interface PromptSettingsProps {
  agentId?: string;
}

const PromptSettings: React.FC<PromptSettingsProps> = ({ agentId }) => {
  const {
    activeTab,
    setActiveTab,
    prompts,
    agent,
    isSaving,
    isLoading,
    handleSave,
    resetPrompt,
    handlePromptChange
  } = usePromptSettings({ agentId });

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
                <PromptForm
                  variationType={variation.id}
                  variationName={variation.name}
                  variationDescription={variation.description}
                  currentPrompt={prompts[variation.id] || ''}
                  onResetPrompt={resetPrompt}
                  onPromptChange={handlePromptChange}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <PromptPreview 
        prompt={prompts[activeTab]} 
        activeTab={activeTab}
        agent={agent}
      />
    </div>
  );
};

export default PromptSettings;
