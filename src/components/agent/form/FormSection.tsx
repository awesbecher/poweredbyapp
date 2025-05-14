
import React, { ReactNode } from 'react';

interface FormSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children, className }) => {
  return (
    <div className={`space-y-4 ${className || ''}`}>
      {title && <h2 className="uppercase text-sm text-white">{title}</h2>}
      {children}
    </div>
  );
};

export default FormSection;
