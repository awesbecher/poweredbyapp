
import React from 'react';
import { useTallyEmbed } from "@/hooks/embed/useTallyEmbed";
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';

interface TallyFormEmbedProps {
  src: string;
  height?: string;
  additionalOptions?: Record<string, string>;
}

/**
 * TallyFormEmbed component for embedding Tally forms
 * Uses specialized useTallyEmbed hook for handling iframe embedding
 */
const TallyFormEmbed = ({ 
  src, 
  height = '350', 
  additionalOptions = {} 
}: TallyFormEmbedProps) => {
  const { containerRef, handleManualReload } = useTallyEmbed({ 
    src, 
    height, 
    additionalOptions 
  });
  
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
