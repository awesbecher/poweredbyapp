
import React, { useEffect } from 'react';
import { useEmbed } from "@/hooks/useEmbed";
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';

interface TallyFormEmbedProps {
  src: string;
  height?: string;
  additionalOptions?: Record<string, string>;
}

/**
 * TallyFormEmbed component for embedding Tally forms with enhanced reliability
 * Leverages specialized hooks and utilities for handling embeds
 */
const TallyFormEmbed = ({ 
  src, 
  height = '350', 
  additionalOptions = {} 
}: TallyFormEmbedProps) => {
  const tallyOptions = {
    type: 'tally' as const,
    src,
    height,
    additionalOptions
  };
  
  // Use the refactored embed hook for better maintainability
  const { containerRef } = useEmbed(tallyOptions);
  
  // Handle manual reload of form
  const handleManualReload = () => {
    if (containerRef.current) {
      // Clear container and create a fresh iframe
      containerRef.current.innerHTML = '';
      
      // Create new iframe with proper attributes
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.width = '100%';
      iframe.height = height;
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.minHeight = `${height}px`;
      iframe.style.position = 'relative';
      iframe.style.zIndex = '9999';
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      iframe.style.display = 'block';
      
      // Add the iframe to container
      containerRef.current.appendChild(iframe);
      console.log('Manual Tally form reload executed');
    }
  };

  return (
    <div 
      className="relative"
    >
      <div
        ref={containerRef}
        className="tally-embed bg-transparent w-full relative z-30"
        style={{ minHeight: `${height}px` }}
        data-tally-src={src}
        data-tally-height={height}
        {...Object.entries(additionalOptions).reduce((acc, [key, value]) => {
          return { ...acc, [`data-tally-${key}`]: value };
        }, {})}
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
