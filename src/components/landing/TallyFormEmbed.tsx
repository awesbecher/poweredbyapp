
import React, { useRef, useEffect } from 'react';
import { useEmbed } from "@/hooks/useEmbed";
import { forceEmbedsVisibility, initializeAllEmbeds } from "@/utils/embedManager/embedInitializer";

interface TallyFormEmbedProps {
  src: string;
  height: string;
  additionalOptions?: Record<string, string>;
}

const TallyFormEmbed = ({ src, height, additionalOptions }: TallyFormEmbedProps) => {
  const tallyOptions = {
    src,
    type: 'tally' as const,
    height,
    additionalOptions: additionalOptions || {}
  };
  
  const { containerRef } = useEmbed(tallyOptions);
  
  // Force iframe visibility after component mount with multiple attempts
  useEffect(() => {
    const forceVisibility = () => {
      if (containerRef.current) {
        const iframe = containerRef.current.querySelector('iframe');
        if (iframe) {
          iframe.style.position = 'relative';
          iframe.style.zIndex = '9999';
          iframe.style.opacity = '1';
          iframe.style.visibility = 'visible';
          iframe.style.display = 'block';
          iframe.style.background = 'transparent';
          
          // Hide any loader once iframe is loaded
          const loader = containerRef.current.querySelector('.tally-loader');
          if (loader) {
            loader.remove();
          }
        } else {
          // If no iframe exists, create one directly
          const directIframe = document.createElement('iframe');
          directIframe.src = tallyOptions.src;
          directIframe.width = '100%';
          directIframe.height = tallyOptions.height;
          directIframe.style.border = 'none';
          directIframe.style.width = '100%';
          directIframe.style.minHeight = `${tallyOptions.height}px`;
          directIframe.style.position = 'relative';
          directIframe.style.zIndex = '9999';
          directIframe.style.opacity = '1';
          directIframe.style.visibility = 'visible';
          directIframe.style.display = 'block';
          
          // Remove any existing content and add the iframe
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(directIframe);
          console.log('Emergency direct iframe creation for Tally form');
        }
      }
    };
    
    // Add emergency button after a delay if iframe still doesn't appear
    const addEmergencyButton = () => {
      if (containerRef.current && !containerRef.current.querySelector('iframe')) {
        const button = document.createElement('button');
        button.className = 'bg-purple-600 text-white px-4 py-2 rounded-md mt-4';
        button.textContent = 'Click to Load Form';
        button.onclick = () => {
          // Create iframe directly
          const directIframe = document.createElement('iframe');
          directIframe.src = tallyOptions.src;
          directIframe.width = '100%';
          directIframe.height = tallyOptions.height;
          directIframe.style.border = 'none';
          directIframe.style.width = '100%';
          directIframe.style.minHeight = `${tallyOptions.height}px`;
          directIframe.style.position = 'relative';
          directIframe.style.zIndex = '9999';
          
          // Add the iframe to container
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(directIframe);
          }
          
          // Remove the button
          button.remove();
        };
        
        // Add button to container
        containerRef.current.appendChild(button);
      }
    };
    
    // Apply multiple times to ensure it catches
    setTimeout(forceVisibility, 300);
    setTimeout(forceVisibility, 800);
    setTimeout(forceVisibility, 1500);
    setTimeout(forceVisibility, 3000);
    setTimeout(forceVisibility, 6000);
    
    // Make sure global embed visibility is also triggered
    setTimeout(forceEmbedsVisibility, 500);
    setTimeout(forceEmbedsVisibility, 2000);
    setTimeout(forceEmbedsVisibility, 5000);
    
    // Add emergency button as a last resort
    setTimeout(addEmergencyButton, 7000);
    
    // Also trigger global embed initialization
    setTimeout(initializeAllEmbeds, 1000);
    setTimeout(initializeAllEmbeds, 4000);
  }, [containerRef, tallyOptions.src, tallyOptions.height]);

  // Function to handle manual reload of form
  const handleManualReload = () => {
    if (containerRef.current) {
      const iframe = document.createElement('iframe');
      iframe.src = tallyOptions.src;
      iframe.width = '100%';
      iframe.height = tallyOptions.height;
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.minHeight = `${tallyOptions.height}px`;
      iframe.style.position = 'relative';
      iframe.style.zIndex = '9999';
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      iframe.style.display = 'block';
      
      // Clear container and add new iframe
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(iframe);
      console.log('Manual Tally form reload executed');
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="tally-embed bg-transparent min-h-[350px] w-full relative z-30"
      style={{ 
        position: 'relative',
        zIndex: 30,
        backgroundColor: 'transparent'
      }}
      data-tally-src={tallyOptions.src}
      data-tally-height={tallyOptions.height}
    >
      {/* Emergency reload button */}
      <button 
        onClick={handleManualReload}
        className="embed-emergency-button"
      >
        Force Reload Form
      </button>
    </div>
  );
};

export default TallyFormEmbed;
