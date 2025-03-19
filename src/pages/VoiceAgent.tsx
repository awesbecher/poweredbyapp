
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProgressModal from '@/components/ProgressModal';
import { AgentTypeSection } from '@/components/voice-agent';
import VoiceAgentOptions from '@/components/voice-agent/VoiceAgentOptions';
import { useVoiceAgentConfig } from '@/hooks/useVoiceAgentConfig';
import { useVoiceAgentRendering } from '@/hooks/useVoiceAgentRendering';
import { STTProvider, TTSProvider, VoiceProvider, VoiceAgentType } from '@/lib/types';

const VoiceAgent = () => {
  const {
    voiceAgentConfig,
    updateVoiceConfig,
    showAllOptions,
    modelOptions,
    handleToneChange,
    handleAIWriteClick,
    getLLMProviderOptions
  } = useVoiceAgentConfig();
  
  const {
    renderingState,
    handleRenderClick,
    resetRenderingState
  } = useVoiceAgentRendering();
  
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
            onAgentTypeChange={(value) => updateVoiceConfig({ agentType: value as VoiceAgentType })}
          />
          
          {showAllOptions && (
            <VoiceAgentOptions 
              modelProvider={voiceAgentConfig.modelProvider}
              modelVersion={voiceAgentConfig.modelVersion}
              modelOptions={modelOptions.map(model => ({ value: model.id, label: model.name }))}
              llmProviderOptions={getLLMProviderOptions()}
              onModelProviderChange={(value) => updateVoiceConfig({ modelProvider: value })}
              onModelVersionChange={(value) => updateVoiceConfig({ modelVersion: value })}
              sttProvider={voiceAgentConfig.sttProvider}
              ttsProvider={voiceAgentConfig.ttsProvider}
              voiceProvider={voiceAgentConfig.voiceProvider}
              onSttProviderChange={(value) => updateVoiceConfig({ sttProvider: value as STTProvider })}
              onTtsProviderChange={(value) => updateVoiceConfig({ ttsProvider: value as TTSProvider })}
              onVoiceProviderChange={(value) => updateVoiceConfig({ voiceProvider: value as VoiceProvider })}
              agentName={voiceAgentConfig.agentName}
              agentFunction={voiceAgentConfig.agentFunction}
              agentTone={voiceAgentConfig.agentTone}
              promptDetails={voiceAgentConfig.promptDetails}
              onAgentNameChange={(value) => updateVoiceConfig({ agentName: value })}
              onAgentFunctionChange={(value) => updateVoiceConfig({ agentFunction: value })}
              onAgentToneChange={handleToneChange}
              onPromptDetailsChange={(value) => updateVoiceConfig({ promptDetails: value })}
              onAIWriteClick={handleAIWriteClick}
              knowledgeBase={voiceAgentConfig.knowledgeBase}
              onKnowledgeBaseChange={(files) => updateVoiceConfig({ knowledgeBase: files })}
              onRenderClick={handleRenderClick}
            />
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
