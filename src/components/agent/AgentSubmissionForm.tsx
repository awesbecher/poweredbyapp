
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Form schema with validation
const formSchema = z.object({
  projectDescription: z.string().min(1, "Please describe your project"),
  budget: z.enum(["under2k", "2k-10k", "10k-50k", "over50k"], {
    required_error: "Please select a budget range",
  }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

export type AgentFormValues = z.infer<typeof formSchema>;

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

  return (
    <div className="bg-[#F9F9F9] rounded-lg shadow-md p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Description */}
          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-sm text-[#777]">What do you want to build?</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. AI support chatbot" 
                    {...field}
                    className="w-full py-3 px-3 border-2 border-[#DDD] rounded-md focus:ring-2 focus:ring-[#0062FF]/20 focus:border-[#0062FF]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Budget Selection */}
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="uppercase text-sm text-[#777]">What is your total project budget (USD)?</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => field.onChange("under2k")}
                      className={`p-2 border-2 rounded-md text-center text-sm ${field.value === "under2k" ? "bg-white border-[#0062FF]" : "border-[#DDD]"}`}
                    >
                      Under $2 K
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("2k-10k")}
                      className={`p-2 border-2 rounded-md text-center text-sm ${field.value === "2k-10k" ? "bg-white border-[#0062FF]" : "border-[#DDD]"}`}
                    >
                      $2 K–$10 K
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("10k-50k")}
                      className={`p-2 border-2 rounded-md text-center text-sm ${field.value === "10k-50k" ? "bg-white border-[#0062FF]" : "border-[#DDD]"}`}
                    >
                      $10 K–$50 K
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("over50k")}
                      className={`p-2 border-2 rounded-md text-center text-sm ${field.value === "over50k" ? "bg-white border-[#0062FF]" : "border-[#DDD]"}`}
                    >
                      Over $50 K
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Contact Information Section */}
          <div className="space-y-4 pt-2">
            <h2 className="uppercase text-sm text-[#777]">How can we reach you?</h2>
            
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm text-[#777]">First Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      className="w-full py-3 px-3 border-2 border-[#DDD] rounded-md focus:ring-2 focus:ring-[#0062FF]/20 focus:border-[#0062FF]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm text-[#777]">Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      className="w-full py-3 px-3 border-2 border-[#DDD] rounded-md focus:ring-2 focus:ring-[#0062FF]/20 focus:border-[#0062FF]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Business Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm text-[#777]">Business Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      {...field}
                      className="w-full py-3 px-3 border-2 border-[#DDD] rounded-md focus:ring-2 focus:ring-[#0062FF]/20 focus:border-[#0062FF]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm text-[#777]">Phone Number (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      {...field}
                      className="w-full py-3 px-3 border-2 border-[#DDD] rounded-md focus:ring-2 focus:ring-[#0062FF]/20 focus:border-[#0062FF]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0062FF] hover:bg-[#0056E6] text-white px-4 py-4 rounded-md font-semibold text-base mt-4 transition-colors"
          >
            Submit
          </button>
          
          {/* Legal Text */}
          <p className="text-xs text-[#999] text-center mt-3">
            By clicking 'Submit', you agree to the Botpress{" "}
            <a href="/terms" className="text-[#0062FF] hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" className="text-[#0062FF] hover:underline">Privacy Policy</a>.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default AgentSubmissionForm;
