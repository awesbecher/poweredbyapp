
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EmailLog } from "@/lib/types";
import { convertEmailLogsToJSONL, downloadJSONL, anonymizeTrainingData } from "@/lib/fine-tuning-utils";
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

interface FineTuningExportProps {
  agentId?: string;
}

const FineTuningExport: React.FC<FineTuningExportProps> = ({ agentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("You are an AI email agent for a SaaS company.");
  const [previewData, setPreviewData] = useState<string>("");
  const [fileName, setFileName] = useState("fine-tuning-data.jsonl");

  // Initialize Supabase client
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL || '',
    import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  );

  const generatePreview = async () => {
    if (!agentId) {
      toast({
        title: "Error",
        description: "No agent selected",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Fetch high-rated email interactions for this agent
      const { data: emailLogs, error } = await supabase
        .from('email_logs')
        .select('*')
        .eq('agent_id', agentId)
        .eq('status', 'replied')
        .gte('user_rating', 4)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        throw new Error(error.message);
      }

      if (!emailLogs || emailLogs.length === 0) {
        setPreviewData("No suitable email interactions found. You need replied emails with ratings of 4 or higher.");
        return;
      }

      // Generate JSONL data
      const jsonlData = convertEmailLogsToJSONL(emailLogs as EmailLog[], systemPrompt);
      
      // Show preview of first few entries
      const previewLines = jsonlData.split('\n').slice(0, 3);
      setPreviewData(previewLines.join('\n') + 
        (previewLines.length < jsonlData.split('\n').length ? '\n...' : ''));
      
      // Store full data for download
      setPreviewData(jsonlData);
      
      toast({
        title: "Success",
        description: `Generated training data from ${emailLogs.length} email interactions`,
      });
    } catch (error: any) {
      console.error('Error generating fine-tuning data:', error);
      toast({
        title: "Error",
        description: error.message || 'Failed to generate training data',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!previewData) {
      toast({
        title: "Error",
        description: "No data to download. Generate preview first.",
        variant: "destructive"
      });
      return;
    }

    downloadJSONL(previewData, fileName);
    
    toast({
      title: "Success",
      description: `Downloaded ${fileName}`,
    });
  };

  const applyAnonymization = () => {
    if (!previewData) {
      toast({
        title: "Error",
        description: "No data to anonymize. Generate preview first.",
        variant: "destructive"
      });
      return;
    }

    const anonymized = anonymizeTrainingData(previewData);
    setPreviewData(anonymized);
    
    toast({
      title: "Success",
      description: "Applied basic anonymization to the data",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fine-Tuning Data Export</CardTitle>
        <CardDescription>
          Export your email interactions as training data for fine-tuning your AI model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="system-prompt">System Prompt</Label>
          <Textarea 
            id="system-prompt"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="System prompt for fine-tuning"
            className="min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground">
            This prompt will be included with each example to provide context to the model
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file-name">File Name</Label>
          <Input 
            id="file-name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="fine-tuning-data.jsonl"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="preview-data">Data Preview</Label>
            <Button 
              variant="outline" 
              size="sm"
              onClick={applyAnonymization}
              disabled={!previewData}
            >
              Anonymize Data
            </Button>
          </div>
          <Textarea 
            id="preview-data"
            value={previewData}
            readOnly
            placeholder="Preview of JSONL data will appear here after generation"
            className="min-h-[200px] font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Preview of the JSONL format data for fine-tuning
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={generatePreview}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Preview'}
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!previewData}
          variant="secondary"
        >
          Download JSONL
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FineTuningExport;
