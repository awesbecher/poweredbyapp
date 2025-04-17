
import React from 'react';
import { CheckCircle, Mail, FileText, RotateCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ConfirmationScreenProps {
  agentData: any;
  onStartOver: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ agentData, onStartOver }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center pt-6 pb-8">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Email Agent is Ready!</h2>
        <p className="text-muted-foreground max-w-md">
          The AI email agent for {agentData.companyName} has been successfully created. 
          Next steps: Connect your Gmail and train it with your files.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Connect Email
            </CardTitle>
            <CardDescription>
              Connect your business Gmail account to start receiving emails
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Connect with Google Workspace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Knowledge Base
            </CardTitle>
            <CardDescription>
              {agentData.fileCount} files uploaded to train your agent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1 mb-4">
              {agentData.fileNames?.map((name: string, index: number) => (
                <div key={index} className="flex items-center">
                  <div className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                    <FileText className="h-3 w-3" />
                  </div>
                  <span className="truncate">{name}</span>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full">
              Upload More Files
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-md p-4 bg-muted/30 mt-8">
        <h3 className="text-sm font-medium mb-2">Agent Summary</h3>
        <ul className="space-y-2 text-sm">
          <li><span className="font-medium">Company:</span> {agentData.companyName}</li>
          <li><span className="font-medium">Email:</span> {agentData.agentEmail}</li>
          <li><span className="font-medium">Tone:</span> {agentData.tone}</li>
          <li><span className="font-medium">Auto-reply:</span> {agentData.autoReply ? 'Enabled' : 'Requires Approval'}</li>
        </ul>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onStartOver}>
          <RotateCw className="mr-2 h-4 w-4" />
          Create Another Agent
        </Button>
        
        <Button>
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
