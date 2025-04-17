
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TemplateCard, { AgentTemplateData } from './TemplateCard';

// Sample template data
const templateData: AgentTemplateData[] = [
  {
    id: 'template-1',
    name: 'Real-Estate SMS Agent',
    description: 'Automate property inquiries and schedule viewings via SMS',
    tags: ['SMS', 'Real Estate'],
    image: '/placeholder.svg',
  },
  {
    id: 'template-2',
    name: 'B2B Demo Bot',
    description: 'Present your products and answer questions automatically',
    tags: ['Voice', 'Sales'],
    image: '/placeholder.svg',
  },
  {
    id: 'template-3',
    name: 'Customer Support Email',
    description: 'Respond to common support requests with intelligent AI',
    tags: ['Email', 'Support'],
    image: '/placeholder.svg',
  },
  {
    id: 'template-4',
    name: 'Appointment Scheduler',
    description: 'Book appointments and send reminders automatically',
    tags: ['SMS', 'Calendar'],
    image: '/placeholder.svg',
  },
  {
    id: 'template-5',
    name: 'Lead Qualifier',
    description: 'Pre-qualify leads before sending them to your sales team',
    tags: ['Voice', 'Email', 'Sales'],
    image: '/placeholder.svg',
  },
];

interface TemplateCarouselProps {
  onUseTemplate: (templateId: string) => void;
}

const TemplateCarousel: React.FC<TemplateCarouselProps> = ({ onUseTemplate }) => {
  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Agent Templates</h2>
        <p className="text-sm text-muted-foreground">Get started quickly with pre-configured templates</p>
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {templateData.map((template) => (
            <CarouselItem key={template.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <TemplateCard template={template} onUseTemplate={onUseTemplate} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex">
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default TemplateCarousel;
