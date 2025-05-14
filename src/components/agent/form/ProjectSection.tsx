
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { AgentFormValues } from '../AgentFormSchema';

interface ProjectSectionProps {
  form: UseFormReturn<AgentFormValues>;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="projectDescription"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="uppercase text-sm text-white">What do you want to build?</FormLabel>
          <FormControl>
            <Input 
              placeholder="e.g. AI support chatbot" 
              {...field}
              className="w-full py-3 px-3 border-2 border-[#DDD] rounded-md focus:ring-2 focus:ring-[#0062FF]/20 focus:border-[#0062FF] bg-black text-white placeholder:text-gray-500"
            />
          </FormControl>
          <FormMessage className="text-red-300" />
        </FormItem>
      )}
    />
  );
};

export default ProjectSection;
