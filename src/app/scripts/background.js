// background.js
"use client";

import { useRef, useEffect, useState } from 'react';
import { getAssetUrl, getClickAudio } from './get-asset';

function returnBackgroundAudio() {
    const songNames = ['moogcity','mice','haggstorm','minecraft','aria'];
    const index = Math.floor(Math.random() * songNames.length);
    const name = songNames[index];
    return getAssetUrl('audio', `song-${name}.mp3`);
}

function returnBackgroundVideo() {
  const videoNames = ['sakura.mov', 'jungle.mp4', 'coral.mp4', 'canyon.mp4', 'village.mp4'];
  const index = Math.floor(Math.random() * videoNames.length);
  const name = videoNames[index];
  const videoUrl = getAssetUrl('video', `background-${name}`);
  const imagePath = getAssetUrl('image', `background-${name}.jpg`);
  return [videoUrl, imagePath];
}

const Background = ({ videoSrc, currentPage, setBackgroundAudio }) => {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(videoSrc);
  const [isPortalActive, setIsPortalActive] = useState(false);

  // Preload the video
  useEffect(() => {
    if (currentVideo) {
      // Create a link element for preloading
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = currentVideo;
      document.head.appendChild(link);

      // Cleanup
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [currentVideo]);

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

  const handlePortalClick = () => {
    const clickSound = getClickAudio();
    clickSound.play();
    const portalSound = new Audio(getAssetUrl('audio', 'effect-portal.mp3'));
    portalSound.play();
    
    // Stop current music
    const currentAudio = document.querySelector('audio');
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    
    // Change to portal video
    const portalVideo = getAssetUrl('video', 'background-portal.mov');
    setCurrentVideo(portalVideo);
    setIsPortalActive(true);
  };

  const handleVideoEnded = () => {
    if (isPortalActive) {
      // Switch to nether video
      const netherVideo = getAssetUrl('video', 'background-neather.mov');
      setCurrentVideo(netherVideo);
      setIsPortalActive(false);
      
      // Update the main background video
      if (videoRef.current) {
        videoRef.current.src = netherVideo;
        videoRef.current.load();
        videoRef.current.play();
      }
      setBackgroundAudio(getAssetUrl('audio', 'song-neather.mp3'));
    }
  };

  return (
    <>
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

      {/* Portal video container - outside background div */}
      {isPortalActive && (
        <div 
          className="fixed inset-0 w-full h-full"
          style={{
            zIndex: 9999
          }}
        >
          <video
            key={currentVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            onEnded={handleVideoEnded}
          >
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div 
            className="absolute inset-0 flex items-start justify-center pt-20"
            style={{
              fontFamily: 'Minecraft',
              fontSize: '2rem',
              color: '#ffffff',
              textShadow: '2px 2px #000',
              letterSpacing: '2px'
            }}
          >
            Loading Nether...
          </div>
        </div>
      )}

      {/* Portal clickable area - only on home page */}
      {videoSrc && videoSrc.includes('sakura.mov') && currentPage === 'home' && !isPortalActive && (
        <div
          style={{
            position: 'fixed',
            left: '28px',
            bottom: '60px',
            width: '95px',
            height: '70px',
            zIndex: 2,
            transform: 'rotate(170deg)',
            cursor: 'pointer'
          }}
          onClick={handlePortalClick}
        />
      )}
    </>
  );
};

export { Background, returnBackgroundAudio, returnBackgroundVideo};