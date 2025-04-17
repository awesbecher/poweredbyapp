
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/utils/supabaseClient';
import { defaultPrompts } from './promptVariations';

interface UsePromptSettingsProps {
  agentId?: string;
}

export function usePromptSettings({ agentId }: UsePromptSettingsProps) {
  const [activeTab, setActiveTab] = useState('default');
  const [prompts, setPrompts] = useState<Record<string, string>>(defaultPrompts);
  const [agent, setAgent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (agentId) {
      fetchAgentData();
    } else {
      setIsLoading(false);
    }
  }, [agentId]);

  const fetchAgentData = async () => {
    setIsLoading(true);
    try {
      // Check if Supabase is initialized
      if (!supabase) {
        throw new Error('Supabase client is not initialized. Please check your environment configuration.');
      }
      
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
      console.error("Error fetching agent data:", error);
      toast({
        title: "Error fetching agent data",
        description: error.message || "Failed to load agent data",
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
      // Check if Supabase is initialized
      if (!supabase) {
        throw new Error('Supabase client is not initialized. Please check your environment configuration.');
      }
      
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
        description: error.message || "Failed to save prompt settings",
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

  return {
    activeTab,
    setActiveTab,
    prompts,
    agent,
    isSaving,
    isLoading,
    handleSave,
    resetPrompt,
    handlePromptChange
  };
}
