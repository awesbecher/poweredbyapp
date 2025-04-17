
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText } from 'lucide-react';

interface PromptPreviewProps {
  prompt: string;
  activeTab: string;
  agent: any;
}

const PromptPreview: React.FC<PromptPreviewProps> = ({ prompt, activeTab, agent }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookText className="h-5 w-5" />
          System Prompt Preview
        </CardTitle>
        <CardDescription>
          See how your prompt will be processed in the AI system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
          {prompt
            .replace('{{company_name}}', agent?.company_name || 'Your Company')
            .replace('{{tone}}', agent?.tone || 'professional')}

          {`\nKnowledgebase:
[Your knowledge base content will appear here]

Email Thread:
Customer: [Customer's email will appear here]
[Previous agent responses, if any]`}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptPreview;
