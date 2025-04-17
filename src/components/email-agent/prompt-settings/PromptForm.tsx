
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RotateCw } from 'lucide-react';

interface PromptFormProps {
  variationType: string;
  variationName: string;
  variationDescription: string;
  currentPrompt: string;
  onResetPrompt: (variationType: string) => void;
  onPromptChange: (variationType: string, value: string) => void;
}

const PromptForm: React.FC<PromptFormProps> = ({
  variationType,
  variationName,
  variationDescription,
  currentPrompt,
  onResetPrompt,
  onPromptChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{variationName} Prompt</h3>
          <p className="text-muted-foreground">{variationDescription}</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onResetPrompt(variationType)}
          className="flex items-center gap-1"
        >
          <RotateCw size={14} />
          Reset to Default
        </Button>
      </div>
      
      <Textarea 
        value={currentPrompt} 
        onChange={(e) => onPromptChange(variationType, e.target.value)} 
        className="min-h-[250px] font-mono text-sm"
        placeholder={`Enter your ${variationName} prompt template here...`}
      />
      
      <div className="text-sm text-muted-foreground">
        <p>Available variables:</p>
        <ul className="list-disc list-inside ml-2">
          <li>{'{{company_name}}'} - Your company name</li>
          <li>{'{{tone}}'} - The agent's configured tone</li>
          <li>{'{{kb_chunks}}'} - Knowledge base content</li>
          <li>{'{{customer_message}}'} - The incoming email text</li>
          <li>{'{{agent_history}}'} - Previous responses in this thread</li>
        </ul>
      </div>
    </div>
  );
};

export default PromptForm;
