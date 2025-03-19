import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import ConfigSection from '@/components/ConfigSection';
import DropdownSelect from '@/components/DropdownSelect';
import FileUpload from '@/components/FileUpload';
import Button from '@/components/Button';
import ProgressModal from '@/components/ProgressModal';
import { 
  useStore, 
  voiceAgentTypeOptions, 
  modelVersionsByProvider,
  sttProviderOptions,
  ttsProviderOptions,
  voiceProviderOptions,
  agentToneOptions
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
    setRenderingError,
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
      <Header 
        showBackButton 
        title="Voice Agent Configuration" 
      />
      
      <main className="container-custom py-12">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Agent Type Selection */}
          <ConfigSection
            title="Voice Agent Type"
            description="Select the type of voice agent you want to create"
          >
            <DropdownSelect
              label="Agent Type"
              options={voiceAgentTypeOptions}
              value={voiceAgentConfig.agentType}
              onChange={(value) => updateVoiceConfig({ agentType: value as any })}
            />
          </ConfigSection>
          
          {showAllOptions && (
            <>
              {/* Model Selection */}
              <ConfigSection
                title="Model Configuration"
                description="Choose the AI model to power your voice agent"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DropdownSelect
                    label="LLM Provider"
                    options={getLLMProviderOptions()}
                    value={voiceAgentConfig.modelProvider}
                    onChange={(value) => updateVoiceConfig({ modelProvider: value as LLMModelProvider })}
                  />
                  
                  <DropdownSelect
                    label="Model Version"
                    options={modelOptions.map(model => ({ value: model.id, label: model.name }))}
                    value={voiceAgentConfig.modelVersion}
                    onChange={(value) => updateVoiceConfig({ modelVersion: value })}
                  />
                </div>
              </ConfigSection>
              
              {/* Voice Services */}
              <ConfigSection
                title="Voice Services"
                description="Configure the services for speech processing"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DropdownSelect
                    label="Speech-to-Text (STT) Service"
                    options={sttProviderOptions}
                    value={voiceAgentConfig.sttProvider}
                    onChange={(value) => updateVoiceConfig({ sttProvider: value as any })}
                  />
                  
                  <DropdownSelect
                    label="Text-to-Speech (TTS) Service"
                    options={ttsProviderOptions}
                    value={voiceAgentConfig.ttsProvider}
                    onChange={(value) => updateVoiceConfig({ ttsProvider: value as any })}
                  />
                </div>
                
                <div className="pt-2">
                  <DropdownSelect
                    label="AI Voice Provider"
                    options={voiceProviderOptions}
                    value={voiceAgentConfig.voiceProvider}
                    onChange={(value) => updateVoiceConfig({ voiceProvider: value as any })}
                  />
                </div>
              </ConfigSection>
              
              {/* Agent Details */}
              <ConfigSection
                title="Model Prompt"
                description="Define how your voice agent should behave"
                showAIWriteButton={true}
                onAIWriteClick={handleAIWriteClick}
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Voice Agent Name
                      </label>
                      <input
                        type="text"
                        value={voiceAgentConfig.agentName}
                        onChange={(e) => updateVoiceConfig({ agentName: e.target.value })}
                        placeholder="e.g., SalesAssistant, CustomerSupport"
                        className="w-full px-4 py-2.5 bg-background border border-input rounded-lg input-focus"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Voice Agent Function
                      </label>
                      <input
                        type="text"
                        value={voiceAgentConfig.agentFunction}
                        onChange={(e) => updateVoiceConfig({ agentFunction: e.target.value })}
                        placeholder="e.g., Help users with product inquiries"
                        className="w-full px-4 py-2.5 bg-background border border-input rounded-lg input-focus"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Voice Agent Tone
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {agentToneOptions.map((option) => (
                        <label 
                          key={option.value} 
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={voiceAgentConfig.agentTone.includes(option.value as AgentTone)}
                            onChange={(e) => handleToneChange(option.value as AgentTone, e.target.checked)}
                            className="rounded border-input text-brand-blue focus:ring-brand-blue/20 h-4 w-4"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Detailed Prompt
                    </label>
                    <textarea
                      value={voiceAgentConfig.promptDetails}
                      onChange={(e) => updateVoiceConfig({ promptDetails: e.target.value })}
                      placeholder="Write detailed instructions for your voice agent..."
                      rows={6}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg input-focus resize-none"
                    />
                  </div>
                </div>
              </ConfigSection>
              
              {/* Knowledge Base */}
              <ConfigSection
                title="Knowledge Base"
                description="Upload files for your agent to reference (optional)"
              >
                <FileUpload
                  value={voiceAgentConfig.knowledgeBase}
                  onChange={(files) => updateVoiceConfig({ knowledgeBase: files })}
                  label="Upload files for your agent to use as reference"
                  accept=".pdf,.docx,.xlsx,.csv,.jpg,.jpeg,.png"
                />
              </ConfigSection>
              
              {/* Render Button */}
              <div className="flex justify-center pt-6">
                <Button 
                  size="lg"
                  onClick={handleRenderClick}
                  className="px-8"
                >
                  Render Voice Agent
                </Button>
              </div>
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
