
import React, { useState, useRef } from 'react';
import { FileText, Upload, X, File as FileIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

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
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
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

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText size={24} className="text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText size={24} className="text-blue-500" />;
      case 'xls':
      case 'xlsx':
      case 'csv':
        return <FileText size={24} className="text-green-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileIcon size={24} className="text-purple-500" />;
      default:
        return <FileText size={24} className="text-gray-500" />;
    }
  };

  const formatFileSize = (size: number): string => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 transition-colors',
          dragActive ? 'border-white bg-white/10' : 'border-white/50',
          'focus-within:border-white focus-within:ring-2 focus-within:ring-white/20'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Upload 
            size={36} 
            className={cn(
              'mb-2 text-white',
              dragActive ? 'text-white' : 'text-white/80'
            )} 
          />
          
          <h4 className="font-medium mb-1 text-white">Drag files here or click to upload</h4>
          <p className="text-sm text-white/80 mb-4">
            Accepts PDFs, Word documents, Excel files, CSV files, and images
          </p>
          
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            leftIcon={<Upload size={16} />}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Browse Files
          </Button>
          
          {error && (
            <p className="mt-3 text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      </div>
      
      {value && value.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-white">Uploaded Files</h4>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto p-1">
            {value.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white/10 rounded-lg group hover:bg-white/20 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.name)}
                  <div className="flex flex-col">
                    <span className="font-medium text-sm truncate max-w-[200px] text-white">
                      {file.name}
                    </span>
                    <span className="text-xs text-white/80">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors text-white"
                  aria-label="Remove file"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
