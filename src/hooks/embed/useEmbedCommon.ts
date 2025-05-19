
import { useEffect, useRef } from 'react';

export interface EmbedOptions {
  src: string;
  height?: string;
  additionalOptions?: Record<string, string>;
}

/**
 * Common functionality shared between different types of embeds
 */
export const useEmbedCommon = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const applyBaseStyles = () => {
    if (!containerRef.current) return;
    
    containerRef.current.style.position = 'relative';
    containerRef.current.style.zIndex = '9990';
    containerRef.current.style.backgroundColor = 'transparent';
  };

  const createDirectIframe = (src: string, height: string = '350px') => {
    if (!containerRef.current) return null;
    
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.width = '100%';
    iframe.height = height;
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.minHeight = height;
    iframe.style.position = 'relative';
    iframe.style.zIndex = '9999';
    iframe.style.opacity = '1';
    iframe.style.visibility = 'visible';
    iframe.style.display = 'block';
    
    return iframe;
  };

  return {
    containerRef,
    applyBaseStyles,
    createDirectIframe
  };
};
