import React, { useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TallyFormEmbedProps {
  src: string;
  height?: string;
  additionalOptions?: Record<string, string>;
}

/**
 * TallyFormEmbed component for embedding Tally forms.
 * Relies on data-attributes for Tally's main script to initialize the embed.
 */
const TallyFormEmbed = ({ 
  src, 
  height = '350', 
  additionalOptions = {} 
}: TallyFormEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Apply direct styles to container
    containerRef.current.style.position = 'relative';
    containerRef.current.style.minHeight = `${height}px`;
    containerRef.current.style.width = '100%';
    containerRef.current.style.zIndex = '9999'; // Keep z-index high for visibility
    containerRef.current.style.backgroundColor = 'transparent';
    containerRef.current.style.display = 'block';
    
    // Set data attributes for Tally's widget to pick up
    containerRef.current.setAttribute('data-tally-src', src);
    containerRef.current.setAttribute('data-tally-height', height);
    
    // Add any additional options as data-tally-* attributes
    Object.entries(additionalOptions).forEach(([key, value]) => {
      containerRef.current?.setAttribute(`data-tally-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
    
    // Attempt to trigger Tally's loadEmbeds if Tally object is present and has not been done by main.tsx yet.
    // This is a safety net, main.tsx should ideally handle this.
    if ((window as any).Tally && typeof (window as any).Tally.loadEmbeds === 'function') {
      // Delay slightly to ensure DOM attributes are set and Tally script has a chance to run from main.tsx
      setTimeout(() => {
        try {
          console.log('TallyFormEmbed: Attempting to call Tally.loadEmbeds() as a fallback.');
          (window as any).Tally.loadEmbeds();
        } catch (e) {
          console.error('TallyFormEmbed: Error calling Tally.loadEmbeds():', e);
        }
      }, 50); // Short delay
    }

  }, [src, height, additionalOptions]);
  
  // Handle manual reload button click
  const handleManualReload = () => {
    if (!containerRef.current) return;
    
    // Clear container
    containerRef.current.innerHTML = '';
    
    // Create new iframe with proper attributes
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.width = '100%';
    iframe.height = height;
    iframe.title = 'Tally Form';
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.minHeight = height + 'px';
    iframe.style.backgroundColor = 'transparent';
    iframe.style.position = 'relative';
    iframe.style.zIndex = '9999';
    iframe.style.opacity = '1';
    iframe.style.visibility = 'visible';
    
    // Add the iframe to container
    containerRef.current.appendChild(iframe);
    console.log('Manual form reload executed');
  };
  
  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="tally-embed bg-transparent w-full relative z-30" // Ensure class is present for potential global styling/selection
        style={{ minHeight: `${height}px` }}
      />
      
      {/* Emergency reload button */}
      <Button
        onClick={handleManualReload}
        variant="outline"
        size="sm"
        className="absolute top-0 right-0 bg-white/10 hover:bg-white/20 text-white text-xs p-2 z-50"
        title="Force reload form"
      >
        <RefreshCw className="h-4 w-4" />
        <span className="sr-only">Reload Form</span>
      </Button>
    </div>
  );
};

export default TallyFormEmbed;
