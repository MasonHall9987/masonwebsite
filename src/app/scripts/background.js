// background.js
"use client";

import { useRef } from 'react';

function returnBackgroundAudio() {
    const songNames = ['moogcity','mice','haggstorm','minecraft','aria'];
    const index = Math.floor(Math.random() * songNames.length);
    const name = songNames[index];
    return `audio/song-${name}.mp3`;
}

function returnBackgroundVideo() {
  const videoNames = ['jungle','coral','village','canyon'];
  const index = Math.floor(Math.random() * videoNames.length);
  const name = videoNames[index];
  const videoUrl = `/videos/background-${name}.mp4`;
  const imagePath = `/images/background-${name}.jpg`;
  return [videoUrl, imagePath];
}

const Background = ({ videoSrc }) => {
  const videoRef = useRef(null);

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