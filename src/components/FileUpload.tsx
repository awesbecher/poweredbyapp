
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import DropZone from './file-upload/DropZone';
import FileList from './file-upload/FileList';

interface FileUploadProps {
  value: File[] | null;
  onChange: (files: File[] | null) => void;
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  label = 'Upload Files',
  accept = '.pdf,.docx,.xlsx,.csv,.jpg,.jpeg,.png',
  maxSize = 10, // 10MB default
  maxFiles = 10,
  className,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (files: FileList) => {
    setError(null);
    
    const fileArray = Array.from(files);
    
    // Check file count
    if (fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }
    
    // Check file sizes
    const oversizedFiles = fileArray.filter(file => file.size > maxSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the ${maxSize}MB limit`);
      return;
    }
    
    // Combine with existing files if any
    const newFiles = value ? [...value, ...fileArray] : fileArray;
    
    // Check if combined files exceed max
    if (newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }
    
    onChange(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    if (!value) return;
    
    const newFiles = [...value];
    newFiles.splice(index, 1);
    
    if (newFiles.length === 0) {
      onChange(null);
    } else {
      onChange(newFiles);
    }
    
    setError(null);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      
      <DropZone 
        onFilesSelected={handleFiles}
        accept={accept}
      />
      
      {error && (
        <p className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}
      
      {value && value.length > 0 && (
        <FileList 
          files={value}
          onRemoveFile={handleRemoveFile}
        />
      )}
    </div>
  );
};

export default FileUpload;
