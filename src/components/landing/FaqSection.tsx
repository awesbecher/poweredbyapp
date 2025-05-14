
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-semibold text-center mb-8 text-white">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-md">
          <AccordionItem value="item-1" className="border-white/20">
            <AccordionTrigger className="px-6 py-4 hover:no-underline text-white">
              How fast can I deploy an AI agent?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-200">
              Most of our clients can go from onboarding to a fully functional AI agent in less than 48 hours. 
              Our rapid deployment process includes knowledge base setup, integration with your existing systems, 
              and testing to ensure your agent is ready to handle real interactions.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border-white/20">
            <AccordionTrigger className="px-6 py-4 hover:no-underline text-white">
              How is my business data kept secure?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-200">
              Security is our top priority. We implement bank-level encryption, GDPR compliance, 
              and SOC 2 certified infrastructure. Your data is never shared with third parties, 
              and we provide complete transparency on how your information is stored and accessed.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border-white/20">
            <AccordionTrigger className="px-6 py-4 hover:no-underline text-white">
              What kind of support do you provide?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-200">
              We offer comprehensive support including 24/7 technical assistance, dedicated account management, 
              and regular performance reviews. Our team will help you optimize your AI agent over time, 
              train on new information, and scale as your business grows.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
