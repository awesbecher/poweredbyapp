
import React, { useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  
  const testimonials = [
    {
      quote: "Powered_by cut our support costs by 60% while improving customer satisfaction. The ROI was evident within weeks.",
      name: "Sarah Johnson",
      title: "CTO, Acme Corp",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      quote: "Our AI agent handles 80% of customer inquiries without human intervention. It's been transformational for our small team.",
      name: "Michael Chen",
      title: "Operations Director, Retail Chain",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      quote: "The transition was seamless and the results exceeded our expectations. Our agents now focus on complex scenarios while AI handles the routine tasks.",
      name: "Lisa Taylor",
      title: "Marketing VP, Tech Solutions",
      image: "/placeholder.svg" // Replace with actual image
    }
  ];

  return (
    <div className="relative max-w-4xl mx-auto">
      <Carousel
        setApi={(api) => {
          api?.on('select', () => {
            setCurrent(api.selectedScrollSnap());
          });
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-full">
              <div className="p-4">
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <div className="mb-6 mx-auto w-20 h-20 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <blockquote className="text-xl italic mb-6">"{testimonial.quote}"</blockquote>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.title}</p>
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

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === current ? 'bg-[#8B5CF6]' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
