
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

// Import refactored components
import CompanyInfoFields from './agent-setup/CompanyInfoFields';
import AgentConfigFields from './agent-setup/AgentConfigFields';
import AutoReplyToggle from './agent-setup/AutoReplyToggle';
import KnowledgeBaseUpload from './agent-setup/KnowledgeBaseUpload';
import { useAgentSetup } from './agent-setup/useAgentSetup';
import { formSchema, FormValues } from './agent-setup/setupSchema';

interface NewAgentSetupProps {
  onComplete: (data: any) => void;
}

const NewAgentSetup: React.FC<NewAgentSetupProps> = ({ onComplete }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: '',
      agent_email: '',
      purpose: '',
      tone: 'professional',
      auto_reply: false,
      files: null,
    },
  });

  const { isLoading, uploadedFiles, handleFilesChange, onSubmit } = useAgentSetup({ 
    onComplete 
  });

  const handleFormSubmit = form.handleSubmit(onSubmit);
  
  // Set the files in the form when they change
  const handleKnowledgeBaseChange = (files: File[] | null) => {
    handleFilesChange(files);
    form.setValue('files', files);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">New Agent Setup</h2>
        <p className="text-muted-foreground mt-2">
          Complete the form below to create your AI email agent
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-8">
          <div className="space-y-6">
            {/* Company and Agent Info */}
            <CompanyInfoFields form={form} />
            
            {/* Purpose and Tone */}
            <AgentConfigFields form={form} />
            
            {/* Auto Reply Toggle */}
            <AutoReplyToggle form={form} />
            
            {/* Knowledge Base Upload */}
            <KnowledgeBaseUpload 
              uploadedFiles={uploadedFiles}
              onFilesChange={handleKnowledgeBaseChange}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              type="button"
              onClick={() => form.reset()}
              disabled={isLoading}
            >
              Reset
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">↻</span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save & Continue
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewAgentSetup;
