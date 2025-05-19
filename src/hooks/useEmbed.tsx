
import { useRef } from 'react';
import { useTallyEmbed, TallyEmbedOptions } from './embed/useTallyEmbed';
import { useYouTubeEmbed, YouTubeEmbedOptions } from './embed/useYouTubeEmbed';

interface UseEmbedOptions {
  type: 'tally' | 'youtube';
  src: string;
  height?: string;
  additionalOptions?: Record<string, string>;
}

/**
 * Custom hook to handle embed initialization and loading
 * Delegates to specialized hooks based on the embed type
 * Supports both Tally forms and YouTube videos with enhanced reliability
 */
export const useEmbed = ({ type, src, height = '350', additionalOptions = {} }: UseEmbedOptions) => {
  // Delegate to appropriate specialized hook based on embed type
  if (type === 'tally') {
    const tallyOptions: TallyEmbedOptions = { src, height, additionalOptions };
    return useTallyEmbed(tallyOptions);
  } 
  else if (type === 'youtube') {
    const youtubeOptions: YouTubeEmbedOptions = { src, height, additionalOptions };
    return useYouTubeEmbed(youtubeOptions);
  }
  
  // Fallback for unknown embed types
  return { containerRef: useRef<HTMLDivElement>(null) };
};
