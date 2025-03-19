
import React from 'react';
import ConfigSection from '@/components/ConfigSection';
import { agentToneOptions } from '@/lib/store';
import { AgentTone } from '@/lib/types';

interface AgentDetailsSectionProps {
  agentName: string;
  agentFunction: string;
  agentTone: AgentTone[];
  promptDetails: string;
  onAgentNameChange: (value: string) => void;
  onAgentFunctionChange: (value: string) => void;
  onAgentToneChange: (tone: AgentTone, checked: boolean) => void;
  onPromptDetailsChange: (value: string) => void;
  onAIWriteClick: () => void;
}

const AgentDetailsSection: React.FC<AgentDetailsSectionProps> = ({
  agentName,
  agentFunction,
  agentTone,
  promptDetails,
  onAgentNameChange,
  onAgentFunctionChange,
  onAgentToneChange,
  onPromptDetailsChange,
  onAIWriteClick,
}) => {
  return (
    <ConfigSection
      title="Model Prompt"
      description="Define how your voice agent should behave"
      showAIWriteButton={true}
      onAIWriteClick={onAIWriteClick}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Voice Agent Name
            </label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => onAgentNameChange(e.target.value)}
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
              value={agentFunction}
              onChange={(e) => onAgentFunctionChange(e.target.value)}
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
                  checked={agentTone.includes(option.value as AgentTone)}
                  onChange={(e) => onAgentToneChange(option.value as AgentTone, e.target.checked)}
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
            value={promptDetails}
            onChange={(e) => onPromptDetailsChange(e.target.value)}
            placeholder="Write detailed instructions for your voice agent..."
            rows={6}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg input-focus resize-none"
          />
        </div>
      </div>
    </ConfigSection>
  );
};

export default AgentDetailsSection;
