
import React from 'react';
import FileItem from './FileItem';

interface FileListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-medium text-white">Uploaded Files</h4>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto p-1">
        {files.map((file, index) => (
          <FileItem
            key={`${file.name}-${index}`}
            file={file}
            onRemove={() => onRemoveFile(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FileList;
