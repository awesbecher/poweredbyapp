
import React, { useRef, useEffect } from 'react';

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set up the video to autoplay, muted, and looping
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg mt-6">
      {/* Using a placeholder video for now. In a real implementation, you'd replace with your own video */}
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
      >
        {/* Sample video source - replace with actual AI agent demo */}
        <source 
          src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
        AI agent demo
      </div>
    </div>
  );
};

export default VideoSection;
