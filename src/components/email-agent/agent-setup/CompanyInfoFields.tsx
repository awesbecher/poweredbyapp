
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Building, Mail } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormValues } from './setupSchema';

interface CompanyInfoFieldsProps {
  form: UseFormReturn<FormValues>;
}

const CompanyInfoFields: React.FC<CompanyInfoFieldsProps> = ({ form }) => {
  return (
    <>
      {/* Company Name */}
      <FormField
        control={form.control}
        name="company_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Enter your company name" 
                  className="pl-10" 
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Agent Email */}
      <FormField
        control={form.control}
        name="agent_email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agent Email Address</FormLabel>
            <FormControl>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="agent@yourcompany.com" 
                  className="pl-10" 
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CompanyInfoFields;
