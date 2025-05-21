import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TallyFormEmbedProps {
  src: string;
  height: string;
  additionalOptions?: Record<string, string>;
}

const TallyFormEmbed: React.FC<TallyFormEmbedProps> = ({ src, height, additionalOptions = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [attempt, setAttempt] = useState(0);
  const maxAttempts = 10;

  useEffect(() => {
    const tryLoad = () => {
      if ((window as any).Tally && typeof (window as any).Tally.loadEmbeds === 'function') {
        console.log(`TallyFormEmbed (${src}): Successfully called Tally.loadEmbeds().`);
        (window as any).Tally.loadEmbeds();
      } else if (attempt < maxAttempts) {
        console.log(`TallyFormEmbed (${src}): Tally not ready, attempt ${attempt + 1}. Retrying in 500ms.`);
        setTimeout(() => {
          setAttempt(prevAttempt => prevAttempt + 1);
        }, 500);
      } else {
        console.warn(`TallyFormEmbed (${src}): Tally not ready after ${maxAttempts} attempts. Form may not load.`);
      }
    };

    // Initial attempt
    tryLoad();

  }, [src, attempt, maxAttempts]); // Rerun if src or attempt changes

  // Construct data attributes
  const dataAttributes: Record<string, string> = {
    'data-tally-src': src,
    'data-tally-height': height,
    'data-tally-width': '100%', // Default to 100% width
    'data-tally-align-left': additionalOptions.alignLeft || '1',
    'data-tally-hide-title': additionalOptions.hideTitle || '0',
    'data-tally-emoji-text': additionalOptions.emojiText || '👋',
    'data-tally-emoji-animation': additionalOptions.emojiAnimation || 'wave',
    // Add other common Tally options if needed, ensuring they are strings
    'data-tally-transparent-background': additionalOptions.transparentBackground || '0', // Explicitly set to 0 unless overridden
    'data-tally-dynamic-height': additionalOptions.dynamicHeight || '0', // Explicitly set to 0 unless overridden
  };

  // Filter out any additionalOptions that are not standard or might conflict if not explicitly handled
  for (const key in additionalOptions) {
    if (key.startsWith('data-tally-')) { // Allow any custom data-tally-* attributes
      dataAttributes[key] = additionalOptions[key];
    } else if (['alignLeft', 'hideTitle', 'emojiText', 'emojiAnimation', 'transparentBackground', 'dynamicHeight'].includes(key)) {
      // Already handled, do nothing
    } else {
      // For other known Tally params that don't start with data-tally-, map them
      // Example: if Tally had a param like 'layout', it would be: 'data-tally-layout': additionalOptions.layout
      // For now, we only handle explicitly known ones or pass through data-tally-*
    }
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="tally-embed w-full relative z-30" // Removed bg-transparent, Tally should handle this
        style={{ minHeight: `${height}px` }} // Keep minHeight for layout purposes
        {...dataAttributes} // Spread all Tally data attributes here
      >
        {/* Tally script will replace this div's content or an iframe will be inserted here */}
        {/* Placeholder content removed to allow Tally to fully control this div */}
      </div>
    </div>
  );
};

export default TallyFormEmbed;
