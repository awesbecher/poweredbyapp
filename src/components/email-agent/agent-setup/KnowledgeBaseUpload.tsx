
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import FileUpload from '@/components/FileUpload';

interface KnowledgeBaseUploadProps {
  uploadedFiles: File[] | null;
  onFilesChange: (files: File[] | null) => void;
}

const KnowledgeBaseUpload: React.FC<KnowledgeBaseUploadProps> = ({ uploadedFiles, onFilesChange }) => {
  return (
    <div className="space-y-2">
      <FormLabel>Knowledge Base</FormLabel>
      <FileUpload
        value={uploadedFiles}
        onChange={onFilesChange}
        accept=".pdf,.docx,.csv,.xlsx"
        maxFiles={5}
        maxSize={10} // 10MB
      />
      <p className="text-sm text-muted-foreground">
        Upload up to 5 files (PDF, DOCX, CSV) to build your agent's knowledge base
      </p>
    </div>
  );
};

export default KnowledgeBaseUpload;
