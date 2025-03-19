
import React from 'react';
import ConfigSection from '@/components/ConfigSection';
import DropdownSelect from '@/components/DropdownSelect';
import { voiceAgentTypeOptions } from '@/lib/store';
import { VoiceAgentType } from '@/lib/types';

interface AgentTypeSectionProps {
  agentType: VoiceAgentType;
  onAgentTypeChange: (value: VoiceAgentType) => void;
}

const AgentTypeSection: React.FC<AgentTypeSectionProps> = ({
  agentType,
  onAgentTypeChange,
}) => {
  return (
    <ConfigSection
      title="Voice Agent Type"
      description="Select the type of voice agent you want to create"
      compact={true}
    >
      <DropdownSelect
        label="" // Removed "Agent Type" label here
        options={voiceAgentTypeOptions}
        value={agentType}
        onChange={(value) => onAgentTypeChange(value as VoiceAgentType)}
        placeholder="Select"
      />
    </ConfigSection>
  );
};

export default AgentTypeSection;
