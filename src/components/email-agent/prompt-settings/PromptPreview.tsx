
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface PromptPreviewProps {
  prompt: string;
  activeTab: string;
  agent: any;
}

const PromptPreview: React.FC<PromptPreviewProps> = ({ prompt, activeTab, agent }) => {
  // If we don't have agent data (which could happen if Supabase connection failed)
  if (!agent) {
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
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Required</AlertTitle>
            <AlertDescription>
              Please set up your Supabase connection to see a personalized preview.
            </AlertDescription>
          </Alert>
          <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap opacity-70">
            {prompt
              .replace('{{company_name}}', 'Your Company')
              .replace('{{tone}}', 'professional')}

            {`\nKnowledgebase:
[Your knowledge base content will appear here]

Email Thread:
Customer: [Customer's email will appear here]
[Previous agent responses, if any]`}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Original implementation when agent data is available
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
