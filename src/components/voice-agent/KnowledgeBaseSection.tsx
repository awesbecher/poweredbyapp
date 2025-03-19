
import React from 'react';
import ConfigSection from '@/components/ConfigSection';
import FileUpload from '@/components/FileUpload';

interface KnowledgeBaseSectionProps {
  knowledgeBase: File[] | null;
  onKnowledgeBaseChange: (files: File[] | null) => void;
}

const KnowledgeBaseSection: React.FC<KnowledgeBaseSectionProps> = ({
  knowledgeBase,
  onKnowledgeBaseChange,
}) => {
  return (
    <ConfigSection
      title="Knowledge Base"
      description="Upload files for your agent to reference (optional)"
    >
      <FileUpload
        value={knowledgeBase}
        onChange={onKnowledgeBaseChange}
        label="Upload files for your agent to use as reference"
        accept=".pdf,.docx,.xlsx,.csv,.jpg,.jpeg,.png"
      />
    </ConfigSection>
  );
};

export default KnowledgeBaseSection;
