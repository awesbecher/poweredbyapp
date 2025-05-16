
/**
 * Utilities for handling YouTube video embeds
 */

/**
 * Refreshes YouTube embeds by temporarily removing and restoring their src
 */
export function refreshYouTube() {
  console.log('EmbedManager: Refreshing YouTube videos');
  document.querySelectorAll('iframe[src*="youtube"]').forEach((iframe) => {
    try {
      // Cast to HTMLIFrameElement to access src property
      const ytIframe = iframe as HTMLIFrameElement;
      const currentSrc = ytIframe.src;
      if (currentSrc) {
        ytIframe.src = '';
        setTimeout(() => {
          ytIframe.src = currentSrc;
          console.log(`Refreshed YouTube iframe: ${currentSrc}`);
        }, 100);
      }
    } catch (e) {
      console.error('Error refreshing YouTube iframe:', e);
    }
  });
}
