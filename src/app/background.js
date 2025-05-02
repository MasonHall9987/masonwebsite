// background.js
"use client";

import { useState, useEffect, useRef } from 'react';

function returnBackgroundAudio() {
    const songNames = ['moogcity'];

    const index = Math.floor(Math.random() * songNames.length);
    const name = songNames[index];
    return `/audio/song-${name}.mp3`;
}

const Background = ({ onVideoLoaded }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const videoLoadTimeoutRef = useRef(null);
  const videoNames = ['sakura','jungle','coral','cave','village','canyon'];

  useEffect(() => {
    const cleanup = setupVideoFallback();
    return cleanup;
  }, []);

  // Set up video fallback timer
  const setupVideoFallback = () => {
    videoLoadTimeoutRef.current = setTimeout(() => {
      if (!videoLoaded && !videoError) {
        console.log("Video load timeout reached, showing video anyway");
        handleVideoLoaded();
      }
    }, 3000);
    
    return () => {
      if (videoLoadTimeoutRef.current) {
        clearTimeout(videoLoadTimeoutRef.current);
      }
    };
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    if (onVideoLoaded) {
      onVideoLoaded();
    }
  };

  const handleVideoCanPlay = () => {
    if (videoLoadTimeoutRef.current) {
      clearTimeout(videoLoadTimeoutRef.current);
    }
    // Slightly delay setting videoLoaded to ensure the video has fully rendered
    setTimeout(() => {
      handleVideoLoaded();
      setVideoError(false);
    }, 100);
  };
  
  const handleVideoError = (e) => {
    console.error("Video loading error:", e);
    setVideoError(true);
    if (videoLoadTimeoutRef.current) {
      clearTimeout(videoLoadTimeoutRef.current);
    }
  };
  
  // Try to load video again if it's stalled
  const handleVideoStalled = () => {
    if (videoRef.current) {
      console.log("Video stalled, attempting to reload");
      // Check current time - if it's 0, the video hasn't started playing yet
      if (videoRef.current.currentTime === 0) {
        videoRef.current.load();
      }
    }
  };

  // Monitor video loading progress
  const handleVideoProgress = () => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      // ReadyState 3 means enough data is available for current and next frame
      handleVideoCanPlay();
    }
  };



  function returnBackgroundVideo() {
    const index = Math.floor(Math.random() * videoNames.length);
    const name = videoNames[index];
    const videoUrl = `/videos/background-${name}.mp4`;
    const imagePath = `/images/background-${name}.jpg`;
    return [videoUrl, imagePath];
  }

  const [videoSrc, fallbackImageSrc] = returnBackgroundVideo();
  const audioSrc = returnBackgroundAudio();

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Use a container with absolute positioning for both elements */}
      <div className="absolute inset-0 w-full h-full">
        {/* Placeholder image */}
        <div 
          className={`absolute inset-0 w-full h-full transition-opacity duration-3000 ${
            videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img 
            src={fallbackImageSrc} 
            alt="Loading background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Video element */}
        <div 
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            onCanPlay={handleVideoCanPlay}
            onError={handleVideoError}
            onStalled={handleVideoStalled}
            onProgress={handleVideoProgress}
            onLoadedData={handleVideoCanPlay}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      
      {/* Overlay for darkening */}
      <div className="absolute inset-0 bg-black opacity-5"></div>
    </div>
  );
};

export { Background, returnBackgroundAudio };