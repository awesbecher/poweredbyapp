
import React, { useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TallyFormEmbedProps {
  src: string;
  height?: string;
  additionalOptions?: Record<string, string>;
}

/**
 * TallyFormEmbed component for embedding Tally forms with direct iframe approach
 * Uses multiple embedding strategies for maximum reliability
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
    containerRef.current.style.zIndex = '9999';
    containerRef.current.style.backgroundColor = 'transparent';
    containerRef.current.style.display = 'block';
    
    // First attempt - Add data attributes for Tally's widget
    containerRef.current.setAttribute('data-tally-src', src);
    containerRef.current.setAttribute('data-tally-height', height);
    
    // Add any additional options
    Object.entries(additionalOptions).forEach(([key, value]) => {
      containerRef.current?.setAttribute(`data-tally-${key}`, value);
    });
    
    // Attempt to use global Tally object directly
    if ((window as any).Tally) {
      try {
        (window as any).Tally.loadEmbeds();
        console.log('Tally form initialized via global object');
      } catch (e) {
        console.error('Error loading Tally via global object:', e);
      }
    }
    
    // Direct iframe injection as a reliable fallback
    const directInject = () => {
      if (!containerRef.current) return;
      
      // Check if iframe already exists and is working
      const existingIframe = containerRef.current.querySelector('iframe');
      if (existingIframe && existingIframe.contentWindow) {
        existingIframe.style.opacity = '1';
        existingIframe.style.visibility = 'visible';
        return;
      }
      
      // Clear container for fresh iframe
      containerRef.current.innerHTML = '';
      
      // Create iframe with all necessary attributes
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.width = '100%';
      iframe.height = height;
      iframe.title = 'Tally Form';
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.minHeight = height + 'px';
      iframe.style.overflow = 'hidden';
      iframe.style.position = 'relative';
      iframe.style.zIndex = '9999';
      iframe.style.backgroundColor = 'transparent';
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      iframe.style.display = 'block';
      
      // Add the iframe to container
      containerRef.current.appendChild(iframe);
      console.log('Direct iframe injection completed');
    };
    
    // Multiple attempts with increasing delays
    setTimeout(directInject, 100);
    setTimeout(directInject, 1000);
    setTimeout(directInject, 2500);
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
        className="tally-embed bg-transparent w-full relative z-30"
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
