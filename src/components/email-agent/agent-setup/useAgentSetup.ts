
import { useState } from 'react';
import { FormValues } from './setupSchema';
import { supabase } from '@/utils/supabaseClient';
import { toast } from '@/hooks/use-toast';

interface UseAgentSetupProps {
  onComplete: (data: any) => void;
}

export function useAgentSetup({ onComplete }: UseAgentSetupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);

  const handleFilesChange = (files: File[] | null) => {
    setUploadedFiles(files);
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // Check if Supabase is initialized
      if (!supabase) {
        throw new Error('Supabase client is not initialized. Please check your environment configuration.');
      }

      // Insert new agent into the database
      const { data: agentData, error: agentError } = await supabase
        .from('agents')
        .insert({
          company_name: values.company_name,
          agent_email: values.agent_email,
          purpose: values.purpose,
          tone: values.tone,
          auto_reply: values.auto_reply,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (agentError) {
        throw new Error(`Failed to create agent: ${agentError.message}`);
      }

      // Upload knowledge base files if provided
      const uploadedFileData = [];
      if (uploadedFiles && uploadedFiles.length > 0 && agentData) {
        for (const file of uploadedFiles) {
          // Upload file to Supabase storage
          const fileName = `${Date.now()}-${file.name}`;
          const { data: fileData, error: fileError } = await supabase
            .storage
            .from('knowledge-base')
            .upload(fileName, file);

          if (fileError) {
            console.error("Error uploading file:", fileError);
            continue;
          }

          // Get the public URL
          const { data: publicUrlData } = supabase
            .storage
            .from('knowledge-base')
            .getPublicUrl(fileName);

          // Insert reference to knowledgebase_files table
          const { data: knowledgeFile, error: knowledgeError } = await supabase
            .from('knowledgebase_files')
            .insert({
              agent_id: agentData.id,
              file_name: file.name,
              file_url: publicUrlData?.publicUrl || '',
            })
            .select()
            .single();

          if (knowledgeError) {
            console.error("Error storing file reference:", knowledgeError);
          } else {
            uploadedFileData.push(knowledgeFile);
          }
        }
      }

      // Prepare complete agent info for next step
      const completeAgentData = {
        ...agentData,
        fileCount: uploadedFiles?.length || 0,
        fileNames: uploadedFiles?.map(file => file.name) || [],
        knowledgeFiles: uploadedFileData,
      };

      toast({
        title: "Agent created successfully",
        description: "Your email agent has been set up",
      });

      onComplete(completeAgentData);
    } catch (error: any) {
      console.error("Error creating agent:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create email agent",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    uploadedFiles,
    handleFilesChange,
    onSubmit
  };
}
