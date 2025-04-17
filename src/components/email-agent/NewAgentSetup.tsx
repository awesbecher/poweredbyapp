
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Building, MessageSquare, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from '@/components/FileUpload';
import { toast } from '@/hooks/use-toast';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

// Define tone options
const toneOptions = [
  { value: 'friendly', label: 'Friendly' },
  { value: 'professional', label: 'Professional' },
  { value: 'witty', label: 'Witty' },
  { value: 'formal', label: 'Formal' },
];

// Define form schema
const formSchema = z.object({
  company_name: z.string().min(2, { message: 'Company name is required' }),
  agent_email: z.string().email({ message: 'Valid email address is required' }),
  purpose: z.string().min(10, { message: 'Purpose must be at least 10 characters' }),
  tone: z.string({ required_error: 'Please select a tone' }),
  auto_reply: z.boolean().default(false),
  files: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface NewAgentSetupProps {
  onComplete: (data: any) => void;
}

const NewAgentSetup: React.FC<NewAgentSetupProps> = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);
  const navigate = useNavigate();

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

  const handleFilesChange = (files: File[] | null) => {
    setUploadedFiles(files);
    form.setValue('files', files);
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">New Agent Setup</h2>
        <p className="text-muted-foreground mt-2">
          Complete the form below to create your AI email agent
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            {/* Company Name */}
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Enter your company name" 
                        className="pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Agent Email */}
            <FormField
              control={form.control}
              name="agent_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="agent@yourcompany.com" 
                        className="pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Purpose */}
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose of this Agent</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea 
                        placeholder="Describe what this email agent will do" 
                        className="min-h-28 pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tone */}
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone of Voice</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {toneOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Auto Reply Toggle */}
            <FormField
              control={form.control}
              name="auto_reply"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Auto-reply Mode</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Turn on to let the agent reply automatically without approval
                    </div>
                  </div>
                  <FormControl>
                    <div>
                      <label className="cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="peer sr-only"
                        />
                        <div className="relative h-6 w-11 rounded-full bg-muted transition-colors peer-checked:bg-primary">
                          <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
                        </div>
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* File Upload */}
            <div className="space-y-2">
              <FormLabel>Knowledge Base</FormLabel>
              <FileUpload
                value={uploadedFiles}
                onChange={handleFilesChange}
                accept=".pdf,.docx,.csv,.xlsx"
                maxFiles={5}
                maxSize={10} // 10MB
              />
              <p className="text-sm text-muted-foreground">
                Upload up to 5 files (PDF, DOCX, CSV) to build your agent's knowledge base
              </p>
            </div>
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
