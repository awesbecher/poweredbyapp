
import React from 'react';
import { X } from 'lucide-react';
import FileTypeIcon from './FileIcon';
import { formatFileSize } from './utils';

interface FileItemProps {
  file: File;
  onRemove: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg group hover:bg-white/20 transition-colors">
      <div className="flex items-center space-x-3">
        <FileTypeIcon filename={file.name} />
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
        onClick={onRemove}
        className="p-1 rounded-full hover:bg-white/10 transition-colors text-white"
        aria-label="Remove file"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default FileItem;
