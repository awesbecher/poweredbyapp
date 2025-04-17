
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface KnowledgeBaseCardProps {
  fileCount: number;
  fileNames?: string[];
}

const KnowledgeBaseCard: React.FC<KnowledgeBaseCardProps> = ({ fileCount, fileNames = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Knowledge Base
        </CardTitle>
        <CardDescription>
          {fileCount} files uploaded to train your agent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-1 mb-4">
          {fileNames.map((name: string, index: number) => (
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
  );
};

export default KnowledgeBaseCard;
