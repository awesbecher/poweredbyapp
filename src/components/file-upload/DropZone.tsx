
import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/Button';

interface DropZoneProps {
  onFilesSelected: (files: FileList) => void;
  accept: string;
}

const DropZone: React.FC<DropZoneProps> = ({ onFilesSelected, accept }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
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
      onFilesSelected(e.target.files);
    }
  };

  return (
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
      </div>
    </div>
  );
};

export default DropZone;
