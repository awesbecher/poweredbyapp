import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Lock, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import VideoSection from "@/components/landing/VideoSection";
import DynamicProofStrip from "@/components/landing/DynamicProofStrip";
import FeatureCard from "@/components/landing/FeatureCard";
import TrustedLogos from "@/components/landing/TrustedLogos";
import LeadForm from "@/components/landing/LeadForm";
import ExitIntentModal from "@/components/landing/ExitIntentModal";
import StickyHeader from "@/components/landing/StickyHeader";

const LandingPage = () => {
  // State for the ROI calculator
  const [leadsPerMonth, setLeadsPerMonth] = useState(100);
  const [revGrowth, setRevGrowth] = useState(12);
  const [showExitModal, setShowExitModal] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const exitIntentTriggered = useRef(false);

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

  // Form schema
  const formSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    name: z.string().min(2, "Name must be at least 2 characters.").optional(),
    company: z.string().min(1, "Company name is required.").optional(),
    industry: z.string().min(1, "Please select an industry.").optional()
  });

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
      industry: ""
    }
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (formStep === 1 && data.email) {
      setFormStep(2);
      return;
    }

    try {
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
    }
  };

  // Calculate ROI based on leads
  useEffect(() => {
    setRevGrowth(Math.round(leadsPerMonth * 0.12));
  }, [leadsPerMonth]);

  // Exit intent detection for desktop
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered.current) {
        setShowExitModal(true);
        exitIntentTriggered.current = true;
        
        // Reset after 30 minutes
        setTimeout(() => {
          exitIntentTriggered.current = false;
        }, 30 * 60 * 1000);
      }
    };

    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <StickyHeader onDemoClick={() => setIsFormOpen(true)} />

      {/* Hero Section with Video */}
      <section className="pt-24 pb-16 px-4 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left column: Headline and Video */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                Custom AI Agents for SMBs
              </h1>
              <p className="text-xl text-gray-600 max-w-xl">
                Automate support, sales & scheduling across voice, email & SMS
              </p>
              
              {/* Video Demo */}
              <VideoSection />
            </div>
            
            {/* Right column: Two-step Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <LeadForm 
                form={form} 
                formStep={formStep}
                onSubmit={onSubmit}
                industries={industries}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Proof Strip */}
      <DynamicProofStrip />

      {/* Feature Spotlight */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Powerful Features, Simple Setup</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="messages-square" 
              title="Multi-Channel AI" 
              description="Voice, Email & SMS in one unified agent" 
            />
            <FeatureCard 
              icon="plug" 
              title="Plug-&-Play Integrations" 
              description="CRM, Slack, Calendar - seamless connection" 
            />
            <FeatureCard 
              icon="user" 
              title="Human-Fallback" 
              description="Seamless escalation to live agents when needed" 
            />
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-2">Calculate Your ROI</h2>
            <p className="text-gray-600">See how our AI agents can impact your business</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">Leads per month</label>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">0</span>
                <Slider
                  value={[leadsPerMonth]}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={(value) => setLeadsPerMonth(value[0])}
                  className="flex-1"
                />
                <span className="text-gray-500">1,000</span>
              </div>
              <div className="text-right text-sm text-gray-500 mt-1">Current: {leadsPerMonth} leads</div>
            </div>
            
            <div className="text-center">
              <div className="mb-6">
                <div className="text-[#8B5CF6] text-sm font-medium mb-1">ESTIMATED</div>
                <div className="text-4xl font-bold mb-2">+{revGrowth}% Revenue Growth</div>
                <p className="text-gray-500 text-sm">Based on average conversion rate improvements</p>
              </div>
              
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#8B5CF6] hover:bg-[#7c4fee] text-white px-8 py-6 rounded-lg text-lg">
                    See Your Numbers
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <div className="p-4">
                    <h3 className="text-2xl font-semibold mb-4">Get Your Personalized ROI Report</h3>
                    <LeadForm 
                      form={form}
                      formStep={formStep}
                      onSubmit={onSubmit}
                      industries={industries}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Logos */}
      <TrustedLogos />

      {/* FAQ Accordion - Removed testimonials section and kept the rest */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="bg-white rounded-xl shadow-md">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                How fast can I deploy an AI agent?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Most of our clients can go from onboarding to a fully functional AI agent in less than 48 hours. 
                Our rapid deployment process includes knowledge base setup, integration with your existing systems, 
                and testing to ensure your agent is ready to handle real interactions.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                How is my business data kept secure?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Security is our top priority. We implement bank-level encryption, GDPR compliance, 
                and SOC 2 certified infrastructure. Your data is never shared with third parties, 
                and we provide complete transparency on how your information is stored and accessed.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                What kind of support do you provide?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                We offer comprehensive support including 24/7 technical assistance, dedicated account management, 
                and regular performance reviews. Our team will help you optimize your AI agent over time, 
                train on new information, and scale as your business grows.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Exit Intent Overlay (for desktop) */}
      <ExitIntentModal isOpen={showExitModal} onClose={() => setShowExitModal(false)} />

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <img src="/lovable-uploads/83a3f394-4c25-41ec-abf4-fa47df5cb6f3.png" alt="Powered_by Logo" className="h-8" />
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Powered_by Agency. All rights reserved.
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
