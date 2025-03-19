
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProgressModal from '@/components/ProgressModal';
import { 
  AgentTypeSection,
  ModelConfigSection,
  VoiceServicesSection,
  AgentDetailsSection,
  KnowledgeBaseSection,
  RenderButton
} from '@/components/voice-agent';
import { 
  useStore, 
  modelVersionsByProvider
} from '@/lib/store';
import { LLMModelProvider, AgentTone } from '@/lib/types';

const VoiceAgent = () => {
  const navigate = useNavigate();
  const [showAllOptions, setShowAllOptions] = useState(false);
  
  const { 
    voiceAgentConfig, 
    updateVoiceConfig,
    renderingState,
    startRendering,
    updateRenderingProgress,
    completeRendering,
    resetRenderingState
  } = useStore();
  
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
  
  const handleRenderClick = () => {
    startRendering();
    
    // Simulate rendering process
    const simulateRendering = () => {
      let progress = 0;
      const statuses = [
        'Initializing...',
        'Loading model configuration...',
        'Processing agent settings...',
        'Loading knowledge base...',
        'Optimizing for voice interactions...',
        'Finalizing voice agent...'
      ];
      
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        const statusIndex = Math.min(
          Math.floor((progress / 100) * statuses.length),
          statuses.length - 1
        );
        
        if (progress >= 100) {
          clearInterval(interval);
          progress = 100;
          completeRendering();
          
          // Navigate to review page after completion
          setTimeout(() => {
            navigate('/review-agent');
          }, 1500);
        } else {
          updateRenderingProgress(progress, statuses[statusIndex]);
        }
      }, 800);
    };
    
    // Start the simulation
    simulateRendering();
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
  
  return (
    <div className="min-h-screen bg-deep-purple pb-20">
      <Sidebar />
      
      <Header 
        showBackButton 
        title="Voice Agent Configuration" 
      />
      
      <main className="container-custom py-12 ml-16">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Agent Type Selection */}
          <AgentTypeSection 
            agentType={voiceAgentConfig.agentType}
            onAgentTypeChange={(value) => updateVoiceConfig({ agentType: value })}
          />
          
          {showAllOptions && (
            <>
              {/* Model Selection */}
              <ModelConfigSection 
                modelProvider={voiceAgentConfig.modelProvider}
                modelVersion={voiceAgentConfig.modelVersion}
                modelOptions={modelOptions.map(model => ({ value: model.id, label: model.name }))}
                llmProviderOptions={getLLMProviderOptions()}
                onModelProviderChange={(value) => updateVoiceConfig({ modelProvider: value })}
                onModelVersionChange={(value) => updateVoiceConfig({ modelVersion: value })}
              />
              
              {/* Voice Services */}
              <VoiceServicesSection 
                sttProvider={voiceAgentConfig.sttProvider}
                ttsProvider={voiceAgentConfig.ttsProvider}
                voiceProvider={voiceAgentConfig.voiceProvider}
                onSttProviderChange={(value) => updateVoiceConfig({ sttProvider: value })}
                onTtsProviderChange={(value) => updateVoiceConfig({ ttsProvider: value })}
                onVoiceProviderChange={(value) => updateVoiceConfig({ voiceProvider: value })}
              />
              
              {/* Agent Details */}
              <AgentDetailsSection 
                agentName={voiceAgentConfig.agentName}
                agentFunction={voiceAgentConfig.agentFunction}
                agentTone={voiceAgentConfig.agentTone}
                promptDetails={voiceAgentConfig.promptDetails}
                onAgentNameChange={(value) => updateVoiceConfig({ agentName: value })}
                onAgentFunctionChange={(value) => updateVoiceConfig({ agentFunction: value })}
                onAgentToneChange={handleToneChange}
                onPromptDetailsChange={(value) => updateVoiceConfig({ promptDetails: value })}
                onAIWriteClick={handleAIWriteClick}
              />
              
              {/* Knowledge Base */}
              <KnowledgeBaseSection 
                knowledgeBase={voiceAgentConfig.knowledgeBase}
                onKnowledgeBaseChange={(files) => updateVoiceConfig({ knowledgeBase: files })}
              />
              
              {/* Render Button */}
              <RenderButton onRenderClick={handleRenderClick} />
            </>
          )}
        </div>
      </main>
      
      <ProgressModal
        isOpen={renderingState.isRendering || renderingState.isComplete}
        progress={renderingState.progress}
        status={renderingState.status}
        isComplete={renderingState.isComplete}
        error={renderingState.error}
        onClose={resetRenderingState}
      />
    </div>
  );
};

export default VoiceAgent;
