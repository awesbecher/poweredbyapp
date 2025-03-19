
import React from 'react';
import ConfigSection from '@/components/ConfigSection';
import DropdownSelect from '@/components/DropdownSelect';
import { sttProviderOptions, ttsProviderOptions, voiceProviderOptions } from '@/lib/store';
import { STTProvider, TTSProvider, VoiceProvider } from '@/lib/types';

interface VoiceServicesSectionProps {
  sttProvider: STTProvider;
  ttsProvider: TTSProvider;
  voiceProvider: VoiceProvider;
  onSttProviderChange: (value: STTProvider) => void;
  onTtsProviderChange: (value: TTSProvider) => void;
  onVoiceProviderChange: (value: VoiceProvider) => void;
}

const VoiceServicesSection: React.FC<VoiceServicesSectionProps> = ({
  sttProvider,
  ttsProvider,
  voiceProvider,
  onSttProviderChange,
  onTtsProviderChange,
  onVoiceProviderChange,
}) => {
  return (
    <ConfigSection
      title="Voice Services"
      description="Configure the services for speech processing"
      compact={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DropdownSelect
          label="Speech-to-Text (STT) Service"
          options={sttProviderOptions}
          value={sttProvider}
          onChange={(value) => onSttProviderChange(value as STTProvider)}
          placeholder="Select"
        />
        
        <DropdownSelect
          label="Text-to-Speech (TTS) Service"
          options={ttsProviderOptions}
          value={ttsProvider}
          onChange={(value) => onTtsProviderChange(value as TTSProvider)}
          placeholder="Select"
        />
      </div>
      
      <div className="pt-2">
        <DropdownSelect
          label="AI Voice Provider"
          options={voiceProviderOptions}
          value={voiceProvider}
          onChange={(value) => onVoiceProviderChange(value as VoiceProvider)}
          placeholder="Select"
        />
      </div>
    </ConfigSection>
  );
};

export default VoiceServicesSection;
