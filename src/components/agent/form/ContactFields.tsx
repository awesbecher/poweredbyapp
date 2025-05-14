
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { AgentFormValues } from '../AgentFormSchema';

interface ContactFieldsProps {
  form: UseFormReturn<AgentFormValues>;
}

const ContactFields: React.FC<ContactFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-sm text-white">First Name</FormLabel>
            <FormControl>
              <Input 
                {...field}
                className="w-full py-3 px-3 border-2 border-[#DDD] rounded-md focus:ring-2 focus:ring-[#0062FF]/20 focus:border-[#0062FF] bg-black text-white"
              />
            </FormControl>
            <FormMessage className="text-red-300" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-sm text-white">Last Name</FormLabel>
            <FormControl>
              <Input 
                {...field}
                className="w-full py-3 px-3 border-2 border-[#DDD] rounded-md focus:ring-2 focus:ring-[#0062FF]/20 focus:border-[#0062FF] bg-black text-white"
              />
            </FormControl>
            <FormMessage className="text-red-300" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-sm text-white">Business Email</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                {...field}
                className="w-full py-3 px-3 border-2 border-[#DDD] rounded-md focus:ring-2 focus:ring-[#0062FF]/20 focus:border-[#0062FF] bg-black text-white"
              />
            </FormControl>
            <FormMessage className="text-red-300" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-sm text-white">Phone Number (optional)</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                {...field}
                className="w-full py-3 px-3 border-2 border-[#DDD] rounded-md focus:ring-2 focus:ring-[#0062FF]/20 focus:border-[#0062FF] bg-black text-white"
              />
            </FormControl>
            <FormMessage className="text-red-300" />
          </FormItem>
        )}
      />
    </>
  );
};

export default ContactFields;
