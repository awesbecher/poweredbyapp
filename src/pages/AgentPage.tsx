
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const AgentPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
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

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success state
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="max-w-[480px] w-full rounded-2xl shadow-md bg-white p-8">
        {!isSubmitted ? (
          <>
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Link to="/">
                <img 
                  src="/lovable-uploads/83a3f394-4c25-41ec-abf4-fa47df5cb6f3.png" 
                  alt="Powered_by Logo" 
                  className="h-10"
                  loading="lazy"
                />
              </Link>
            </div>
            
            {/* Heading */}
            <h1 className="text-xl font-semibold text-center mb-8">Tell us about your project.</h1>
            
            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Project Description */}
                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What do you want to build?</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. AI support chatbot" 
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-[#8B5CF6]"
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
                      <FormLabel>What is your total project budget (USD)?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="under2k" id="under2k" />
                            <Label htmlFor="under2k">Under $2 K</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2k-10k" id="2k-10k" />
                            <Label htmlFor="2k-10k">$2 K–$10 K</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="10k-50k" id="10k-50k" />
                            <Label htmlFor="10k-50k">$10 K–$50 K</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="over50k" id="over50k" />
                            <Label htmlFor="over50k">Over $50 K</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Contact Information Section */}
                <div className="space-y-4 pt-2">
                  <h2 className="font-medium">How can we reach you?</h2>
                  
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            className="border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-[#8B5CF6]"
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
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            className="border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-[#8B5CF6]"
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
                        <FormLabel>Business Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            {...field}
                            className="border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-[#8B5CF6]"
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
                        <FormLabel>Phone Number (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            {...field}
                            className="border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-[#8B5CF6]"
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
                  className="w-full bg-[#8B5CF6] hover:bg-[#7c4fee] text-white px-6 py-3 rounded-md shadow-sm transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  Submit
                </button>
                
                {/* Legal Text */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  By clicking 'Submit', you agree to our{" "}
                  <a href="/terms" className="text-[#8B5CF6] hover:underline">ToS</a>
                  {" "}and{" "}
                  <a href="/privacy" className="text-[#8B5CF6] hover:underline">Privacy Policy</a>.
                </p>
              </form>
            </Form>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Thank you for submitting your request.</h2>
            <p className="text-gray-600">
              We'll be in touch shortly to connect you with the best builder for your project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentPage;
