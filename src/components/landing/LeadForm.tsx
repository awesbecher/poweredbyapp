import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

interface LeadFormProps {
  form: UseFormReturn<any>;
  formStep: number;
  onSubmit: (data: any) => void;
  industries: string[];
}

const LeadForm = ({ form, formStep, onSubmit, industries }: LeadFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h3 className="text-2xl font-semibold mb-6 text-white">
          {formStep === 1 ? "Get Started" : "Complete Your Profile"}
        </h3>
        
        {/* Step 1: Email Only */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center border border-white/20 rounded-lg focus-within:ring-2 focus-within:ring-[#8B5CF6] focus-within:border-[#8B5CF6] bg-black/50">
                  <Mail className="ml-3 h-5 w-5 text-gray-400" />
                  <Input 
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-white placeholder:text-gray-400" 
                    placeholder="Your email address" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />
        
        {/* Step 2: Additional Fields */}
        {formStep === 2 && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center border border-white/20 rounded-lg focus-within:ring-2 focus-within:ring-[#8B5CF6] focus-within:border-[#8B5CF6] bg-black/50">
                      <User className="ml-3 h-5 w-5 text-gray-400" />
                      <Input 
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-white placeholder:text-gray-400" 
                        placeholder="Your name" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center border border-white/20 rounded-lg focus-within:ring-2 focus-within:ring-[#8B5CF6] focus-within:border-[#8B5CF6] bg-black/50">
                      <Input 
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-white placeholder:text-gray-400" 
                        placeholder="Company name" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center border border-white/20 rounded-lg focus-within:ring-2 focus-within:ring-[#8B5CF6] focus-within:border-[#8B5CF6] bg-black/50">
                      <select
                        className="w-full p-3 rounded-lg focus:outline-none bg-transparent text-white"
                        {...field}
                      >
                        <option value="" className="bg-black text-white">Select your industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry} className="bg-black text-white">
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
          </>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-[#8B5CF6] hover:bg-[#7c4fee] text-white py-3"
        >
          {formStep === 1 ? (
            <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>
          ) : (
            "Book My Demo"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LeadForm;
