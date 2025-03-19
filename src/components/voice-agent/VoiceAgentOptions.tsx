
import React from 'react';
import { 
  ModelConfigSection,
  VoiceServicesSection,
  AgentDetailsSection,
  KnowledgeBaseSection,
  RenderButton
} from '@/components/voice-agent';
import { AgentTone, LLMModelProvider } from '@/lib/types';

interface VoiceAgentOptionsProps {
  modelProvider: LLMModelProvider;
  modelVersion: string;
  modelOptions: { value: string; label: string }[];
  llmProviderOptions: { value: string; label: string }[];
  onModelProviderChange: (value: LLMModelProvider) => void;
  onModelVersionChange: (value: string) => void;
  sttProvider: string;
  ttsProvider: string;
  voiceProvider: string;
  onSttProviderChange: (value: string) => void;
  onTtsProviderChange: (value: string) => void;
  onVoiceProviderChange: (value: string) => void;
  agentName: string;
  agentFunction: string;
  agentTone: AgentTone[];
  promptDetails: string;
  onAgentNameChange: (value: string) => void;
  onAgentFunctionChange: (value: string) => void;
  onAgentToneChange: (tone: AgentTone, checked: boolean) => void;
  onPromptDetailsChange: (value: string) => void;
  onAIWriteClick: () => void;
  knowledgeBase: File[] | null;
  onKnowledgeBaseChange: (files: File[] | null) => void;
  onRenderClick: () => void;
}

const VoiceAgentOptions: React.FC<VoiceAgentOptionsProps> = ({
  modelProvider,
  modelVersion,
  modelOptions,
  llmProviderOptions,
  onModelProviderChange,
  onModelVersionChange,
  sttProvider,
  ttsProvider,
  voiceProvider,
  onSttProviderChange,
  onTtsProviderChange,
  onVoiceProviderChange,
  agentName,
  agentFunction,
  agentTone,
  promptDetails,
  onAgentNameChange,
  onAgentFunctionChange,
  onAgentToneChange,
  onPromptDetailsChange,
  onAIWriteClick,
  knowledgeBase,
  onKnowledgeBaseChange,
  onRenderClick
}) => {
  return (
    <>
      {/* Model Selection */}
      <ModelConfigSection 
        modelProvider={modelProvider}
        modelVersion={modelVersion}
        modelOptions={modelOptions}
        llmProviderOptions={llmProviderOptions}
        onModelProviderChange={onModelProviderChange}
        onModelVersionChange={onModelVersionChange}
      />
              
      {/* Voice Services */}
      <VoiceServicesSection 
        sttProvider={sttProvider}
        ttsProvider={ttsProvider}
        voiceProvider={voiceProvider}
        onSttProviderChange={onSttProviderChange}
        onTtsProviderChange={onTtsProviderChange}
        onVoiceProviderChange={onVoiceProviderChange}
      />
              
      {/* Agent Details */}
      <AgentDetailsSection 
        agentName={agentName}
        agentFunction={agentFunction}
        agentTone={agentTone}
        promptDetails={promptDetails}
        onAgentNameChange={onAgentNameChange}
        onAgentFunctionChange={onAgentFunctionChange}
        onAgentToneChange={onAgentToneChange}
        onPromptDetailsChange={onPromptDetailsChange}
        onAIWriteClick={onAIWriteClick}
      />
              
      {/* Knowledge Base */}
      <KnowledgeBaseSection 
        knowledgeBase={knowledgeBase}
        onKnowledgeBaseChange={onKnowledgeBaseChange}
      />
              
      {/* Render Button */}
      <RenderButton onRenderClick={onRenderClick} />
    </>
  );
};

export default VoiceAgentOptions;
