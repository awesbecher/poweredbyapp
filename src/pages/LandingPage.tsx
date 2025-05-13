
import React, { useState, useRef } from 'react';
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import StickyHeader from "@/components/landing/StickyHeader";
import HeroSection from "@/components/landing/HeroSection";
import DynamicProofStrip from "@/components/landing/DynamicProofStrip";
import FeatureSpotlight from "@/components/landing/FeatureSpotlight";
import RoiCalculator from "@/components/landing/RoiCalculator";
import FaqSection from "@/components/landing/FaqSection";
import ExitIntentModal from "@/components/landing/ExitIntentModal";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
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

  // Exit intent detection for desktop
  React.useEffect(() => {
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
      <HeroSection 
        form={form} 
        formStep={formStep} 
        onSubmit={onSubmit} 
        industries={industries} 
      />

      {/* Dynamic Proof Strip */}
      <DynamicProofStrip />

      {/* Feature Spotlight */}
      <FeatureSpotlight />

      {/* Interactive ROI Calculator */}
      <RoiCalculator 
        form={form}
        formStep={formStep}
        onSubmit={onSubmit}
        industries={industries}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
      />

      {/* FAQ Accordion */}
      <FaqSection />

      {/* Exit Intent Overlay (for desktop) */}
      <ExitIntentModal isOpen={showExitModal} onClose={() => setShowExitModal(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
