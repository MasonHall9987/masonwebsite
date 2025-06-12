// background.js
"use client";

import { useRef, useEffect } from 'react';
import { getAssetUrl } from './get-asset';

function returnBackgroundAudio() {
    const songNames = ['moogcity','mice','haggstorm','minecraft','aria'];
    const index = Math.floor(Math.random() * songNames.length);
    const name = songNames[index];
    return getAssetUrl('audio', `song-${name}.mp3`);
}

function returnBackgroundVideo() {
  const videoNames = ['jungle','coral','village','canyon'];
  const index = Math.floor(Math.random() * videoNames.length);
  const name = videoNames[index];
  const videoUrl = getAssetUrl('video', `background-${name}.mp4`);
  const imagePath = getAssetUrl('image', `background-${name}.jpg`);
  return [videoUrl, imagePath];
}

const Background = ({ videoSrc }) => {
  const videoRef = useRef(null);

  // Preload the video
  useEffect(() => {
    if (videoSrc) {
      // Create a link element for preloading
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = videoSrc;
      document.head.appendChild(link);

      // Cleanup
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [videoSrc]);

  const handleVideoError = (e) => {
    console.error("Video loading error:", e);
  };
  
  const handleVideoStalled = () => {
    if (videoRef.current) {
      console.log("Video stalled, attempting to reload");
      if (videoRef.current.currentTime === 0) {
        videoRef.current.load();
      }
    }
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 w-full h-full">
          <video
            key={videoSrc}
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            onError={handleVideoError}
            onStalled={handleVideoStalled}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-5"></div>
    </div>
  );
};

export { Background, returnBackgroundAudio, returnBackgroundVideo};