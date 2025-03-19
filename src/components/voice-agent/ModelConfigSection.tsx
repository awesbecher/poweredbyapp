
import React from 'react';
import ConfigSection from '@/components/ConfigSection';
import DropdownSelect from '@/components/DropdownSelect';
import { LLMModelProvider } from '@/lib/types';

interface ModelConfigSectionProps {
  modelProvider: LLMModelProvider;
  modelVersion: string;
  modelOptions: { value: string; label: string }[];
  llmProviderOptions: { value: string; label: string }[];
  onModelProviderChange: (value: LLMModelProvider) => void;
  onModelVersionChange: (value: string) => void;
}

const ModelConfigSection: React.FC<ModelConfigSectionProps> = ({
  modelProvider,
  modelVersion,
  modelOptions,
  llmProviderOptions,
  onModelProviderChange,
  onModelVersionChange,
}) => {
  return (
    <ConfigSection
      title="Model Configuration"
      description="Choose the AI model to power your voice agent"
      compact={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DropdownSelect
          label="LLM Provider"
          options={llmProviderOptions}
          value={modelProvider}
          onChange={(value) => onModelProviderChange(value as LLMModelProvider)}
        />
        
        <DropdownSelect
          label="Model Version"
          options={modelOptions}
          value={modelVersion}
          onChange={(value) => onModelVersionChange(value)}
        />
      </div>
    </ConfigSection>
  );
};

export default ModelConfigSection;
