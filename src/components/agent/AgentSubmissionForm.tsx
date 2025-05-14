
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { formSchema, AgentFormValues } from './AgentFormSchema';
import FormSection from './form/FormSection';
import ProjectSection from './form/ProjectSection';
import BudgetSection from './form/BudgetSection';
import ContactFields from './form/ContactFields';
import SubmitButton from './form/SubmitButton';
import LegalText from './form/LegalText';

interface AgentSubmissionFormProps {
  onSubmit: (values: AgentFormValues) => Promise<void>;
}

const AgentSubmissionForm: React.FC<AgentSubmissionFormProps> = ({ onSubmit }) => {
  // Initialize form
  const form = useForm<AgentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDescription: "",
      budget: undefined,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const handleSubmit = async (values: AgentFormValues) => {
    await onSubmit(values);
  };

  return (
    <div className="bg-black rounded-lg shadow-md p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Project Description */}
          <ProjectSection form={form} />
          
          {/* Budget Selection */}
          <BudgetSection form={form} />
          
          {/* Contact Information Section */}
          <FormSection title="How can we reach you?">
            <ContactFields form={form} />
          </FormSection>
          
          {/* Submit Button */}
          <SubmitButton />
          
          {/* Legal Text */}
          <LegalText />
        </form>
      </Form>
    </div>
  );
};

export default AgentSubmissionForm;
