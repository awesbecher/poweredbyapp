
import React, { useState } from 'react';
import { ArrowRight, ListCheck, Save, TrendingUp, Bell, Calendar, Mail, User, Copyright } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LandingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form schema
  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email."),
    company: z.string().min(1, "Company name is required."),
    industry: z.string().min(1, "Please select an industry.")
  });

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      industry: ""
    }
  });

  // Form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // In a real app, you'd send this data to your backend
      console.log("Form data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to thank you page
      window.location.href = "https://poweredby.agency/thank-you";
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Industry options
  const industries = [
    "Auto Dealers", 
    "Real Estate", 
    "Retail", 
    "Hospitality", 
    "SaaS", 
    "Healthcare", 
    "Education", 
    "Financial Services", 
    "Other"
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "Working with Powered_by cut our response time in half.",
      name: "Sarah Johnson",
      title: "CTO, Acme Corp",
      image: "/placeholder.svg"
    },
    {
      quote: "Our AI agent handles 80% of customer inquiries without human intervention.",
      name: "Michael Chen",
      title: "Operations Director, Retail Chain",
      image: "/placeholder.svg"
    },
    {
      quote: "The ROI on our Powered_by agent exceeded expectations within the first month.",
      name: "Lisa Taylor",
      title: "Marketing VP, Tech Solutions",
      image: "/placeholder.svg"
    }
  ];

  // Use cases data
  const useCases = [
    {
      industry: "Auto Dealers",
      description: "24/7 lead qualification and appointment scheduling"
    },
    {
      industry: "Real Estate",
      description: "Automated property inquiries and showings coordination"
    },
    {
      industry: "Retail",
      description: "Instant customer support and product recommendations"
    },
    {
      industry: "Hospitality",
      description: "Seamless booking and guest experience management"
    },
    {
      industry: "SaaS",
      description: "Efficient onboarding and technical support automation"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center" 
        style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80')"}}
      >
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <img src="/lovable-uploads/83a3f394-4c25-41ec-abf4-fa47df5cb6f3.png" alt="Powered_by Logo" className="h-10 md:h-12" />
        </div>
        
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Custom AI Agents for SMBs</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Deploy bespoke voice, email, and SMS-text agents in minutes to automate support, sales & scheduling.
          </p>
          <a 
            href="https://cal.com/team-powered-by-dfbtbb/get-started-today" 
            className="inline-flex items-center bg-[#8B5CF6] hover:bg-[#7c4fee] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started <ArrowRight className="ml-2" />
          </a>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Feature Highlights</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <ListCheck className="mr-3 text-[#8B5CF6] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold">Multi-channel AI</h3>
                    <p className="text-gray-600">Voice, phone, email, and SMS capabilities in one platform</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ListCheck className="mr-3 text-[#8B5CF6] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold">Custom-trained on your business data</h3>
                    <p className="text-gray-600">Agents that understand your products, services, and processes</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ListCheck className="mr-3 text-[#8B5CF6] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold">24/7 autonomous support with human escalation</h3>
                    <p className="text-gray-600">Never miss a customer inquiry with smart handoff protocols</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ListCheck className="mr-3 text-[#8B5CF6] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold">CRM & Slack integrations</h3>
                    <p className="text-gray-600">Seamless workflows with your existing business tools</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-xl">
                <AspectRatio ratio={16/9}>
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                    alt="AI Agent Dashboard" 
                    className="object-cover h-full w-full"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Save Time */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#8B5CF6]/10 rounded-full">
                  <Save size={32} className="text-[#8B5CF6]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Save Time</h3>
              <p className="text-gray-600">Automate repetitive tasks and free up your team for high-value work</p>
            </div>
            
            {/* Increase Revenue */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#8B5CF6]/10 rounded-full">
                  <TrendingUp size={32} className="text-[#8B5CF6]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Increase Revenue</h3>
              <p className="text-gray-600">Capture every lead and never miss a sales opportunity, day or night</p>
            </div>
            
            {/* Always On */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#8B5CF6]/10 rounded-full">
                  <Bell size={32} className="text-[#8B5CF6]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Always On</h3>
              <p className="text-gray-600">24/7 Customer Engagement without increasing staffing costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Carousel */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Industry Use Cases</h2>
          
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {useCases.map((useCase, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <div className="rounded-xl border border-gray-200 p-6 text-center h-full flex flex-col justify-between">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-[#8B5CF6] mb-2">{useCase.industry}</h3>
                        <p className="text-gray-600">{useCase.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12" />
              <CarouselNext className="absolute -right-12" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Our Clients Say</h2>
          
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-4">
                  <blockquote className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col">
                    <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                    <div className="mt-auto flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-gray-500 text-sm">{testimonial.title}</p>
                      </div>
                    </div>
                  </blockquote>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12" />
              <CarouselNext className="absolute -right-12" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Ready to empower your business with AI?</h2>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-[#8B5CF6] focus-within:border-[#8B5CF6]">
                          <User className="ml-3 h-5 w-5 text-gray-400" />
                          <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Your name" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-[#8B5CF6] focus-within:border-[#8B5CF6]">
                          <Mail className="ml-3 h-5 w-5 text-gray-400" />
                          <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="your.email@company.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-[#8B5CF6] focus-within:border-[#8B5CF6]">
                          <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Your company name" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-[#8B5CF6] focus-within:border-[#8B5CF6]">
                          <select
                            className="w-full px-3 py-2 rounded-md focus:outline-none"
                            {...field}
                          >
                            <option value="">Select your industry</option>
                            {industries.map((industry) => (
                              <option key={industry} value={industry}>
                                {industry}
                              </option>
                            ))}
                          </select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#8B5CF6] hover:bg-[#7c4fee] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                    ) : null}
                    Request My Demo
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <img src="/lovable-uploads/83a3f394-4c25-41ec-abf4-fa47df5cb6f3.png" alt="Powered_by Logo" className="h-8" />
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <Copyright className="mr-2 h-4 w-4" />
              <span>{new Date().getFullYear()} Powered_by Agency. All rights reserved.</span>
            </div>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-[#8B5CF6] transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
