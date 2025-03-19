
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { 
  useStore, 
  modelVersionsByProvider,
  agentToneOptions
} from '@/lib/store';
import { LLMModelProvider, AgentTone } from '@/lib/types';

export const useVoiceAgentConfig = () => {
  const { 
    voiceAgentConfig, 
    updateVoiceConfig
  } = useStore();
  
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [modelOptions, setModelOptions] = useState<{ id: string; name: string }[]>([]);
  
  // Update model options when provider changes
  useEffect(() => {
    const options = modelVersionsByProvider[voiceAgentConfig.modelProvider as LLMModelProvider] || [];
    setModelOptions(options);
    
    // If the current model version isn't in the new options, reset it
    if (options.length > 0 && !options.some(opt => opt.id === voiceAgentConfig.modelVersion)) {
      updateVoiceConfig({ modelVersion: options[0].id });
    }
  }, [voiceAgentConfig.modelProvider, updateVoiceConfig]);
  
  // Show all options when Voice Chat is selected
  useEffect(() => {
    if (voiceAgentConfig.agentType === 'voiceChat') {
      setShowAllOptions(true);
    } else {
      setShowAllOptions(false);
    }
  }, [voiceAgentConfig.agentType]);
  
  const handleToneChange = (tone: AgentTone, checked: boolean) => {
    const currentTones = [...voiceAgentConfig.agentTone];
    
    if (checked) {
      // Add tone if not already included
      if (!currentTones.includes(tone)) {
        updateVoiceConfig({ agentTone: [...currentTones, tone] });
      }
    } else {
      // Remove tone
      const filteredTones = currentTones.filter(t => t !== tone);
      updateVoiceConfig({ agentTone: filteredTones });
    }
  };
  
  const handleAIWriteClick = () => {
    // Generate AI prompt based on previous inputs
    const aiGeneratedPrompt = `I'm a voice agent that ${voiceAgentConfig.agentFunction || 'helps users'}. I'm designed to be ${voiceAgentConfig.agentTone.join(', ') || 'professional and helpful'}.`;
    
    updateVoiceConfig({ promptDetails: aiGeneratedPrompt });
    toast.success('AI has generated a prompt for you!');
  };
  
  const getLLMProviderOptions = () => {
    return Object.keys(modelVersionsByProvider).map(provider => ({
      value: provider,
      label: provider
    }));
  };

  return {
    voiceAgentConfig,
    updateVoiceConfig,
    showAllOptions,
    modelOptions,
    handleToneChange,
    handleAIWriteClick,
    getLLMProviderOptions
  };
};
