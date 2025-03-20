
import React from 'react';
import { FileText, File as FileIcon } from 'lucide-react';

interface FileIconProps {
  filename: string;
  size?: number;
}

const FileTypeIcon: React.FC<FileIconProps> = ({ filename, size = 24 }) => {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return <FileText size={size} className="text-red-500" />;
    case 'doc':
    case 'docx':
      return <FileText size={size} className="text-blue-500" />;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <FileText size={size} className="text-green-500" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
      return <FileIcon size={size} className="text-purple-500" />;
    default:
      return <FileText size={size} className="text-gray-500" />;
  }
};

export default FileTypeIcon;
