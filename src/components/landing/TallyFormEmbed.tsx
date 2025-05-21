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

    const container = containerRef.current;
    // Apply direct styles to container
    container.style.position = 'relative';
    container.style.minHeight = `${height}px`;
    container.style.width = '100%';
    container.style.zIndex = '9999'; // Keep z-index high for visibility
    container.style.backgroundColor = 'transparent';
    container.style.display = 'block';
    
    // Set data attributes for Tally's widget to pick up
    container.setAttribute('data-tally-src', src);
    container.setAttribute('data-tally-height', height);
    
    // Add any additional options as data-tally-* attributes
    Object.entries(additionalOptions).forEach(([key, value]) => {
      container.setAttribute(`data-tally-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
    
    let attempts = 0;
    const maxAttempts = 10; // Try for up to 5 seconds (10 * 500ms)

    const tryLoad = () => {
      if ((window as any).Tally && typeof (window as any).Tally.loadEmbeds === 'function') {
        try {
          (window as any).Tally.loadEmbeds();
          console.log(`TallyFormEmbed (${src}): Successfully called Tally.loadEmbeds().`);
        } catch (e) {
          console.error(`TallyFormEmbed (${src}): Error calling Tally.loadEmbeds():`, e);
        }
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          console.log(`TallyFormEmbed (${src}): Tally not ready, attempt ${attempts}. Retrying in 500ms.`);
          setTimeout(tryLoad, 500);
        } else {
          console.error(`TallyFormEmbed (${src}): Tally not ready after ${maxAttempts} attempts. Form may not load.`);
        }
      }
    };

    // Initial attempt to load, slightly delayed to ensure attributes are set and DOM is stable.
    setTimeout(tryLoad, 100); // Start checks after 100ms

  }, [src, height, additionalOptions]);
  
  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="tally-embed bg-transparent w-full relative z-30" // Ensure class is present for potential global styling/selection
        style={{ minHeight: `${height}px` }}
      />
    </div>
  );
};

export default TallyFormEmbed;
