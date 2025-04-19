"use client";

import { useState, useEffect, useRef } from 'react';
import './globals.css';
import { LargeButton, SmallButton } from './UIElements';

const MinecraftWebsite = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showMainButtons, setShowMainButtons] = useState(false);
  const [showFooterButtons, setShowFooterButtons] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 500);
    setTimeout(() => setShowMainButtons(true), 1500);
    setTimeout(() => setShowFooterButtons(true), 2500);
  }, []);

  const handleButtonClick = (action) => {
    console.log(`Button clicked: ${action}`);
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
  };

  const playMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(err => console.warn("Play failed", err));
      } else {
        audioRef.current.pause();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden font-mono">
      {/* Background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/background-sakura.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="bg-black opacity-5"></div>
      </div>

      <audio ref={audioRef} loop>
        <source src="/audio/song-moogcity.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Content container */}
      <div className="minecraft-font relative z-10 h-full flex flex-col items-center justify-center">
        {/* Title */}
        <div className={`transition-opacity duration-1000 mb-16 ${showTitle ? 'opacity-100' : 'opacity-0'} flex justify-end relative`}>
          <img 
            src="/images/title.png" 
            alt="Minecraft" 
            className="w-200"
          />
          <div className="minecraft-pulse z-20 transform -rotate-20 absolute bottom-11 translate-x-1/3 translate-y-1/4">
            Who pushed to Main?
          </div>
        </div>

        {/* Main buttons */}
        <div className={`flex flex-col gap-2 items-center transition-opacity duration-1000 ${showMainButtons ? 'opacity-100' : 'opacity-0'}`}>
          <LargeButton text="Projects/Experience" onClick={() => handleButtonClick('settings')} />
          <LargeButton text="About" onClick={() => handleButtonClick('settings')} />
        </div>

        {/* Footer buttons */}
        <div className={`flex gap-4 mt-6 transition-opacity duration-1000 ${showFooterButtons ? 'opacity-100' : 'opacity-0'}`}>
          <SmallButton text="Contact" onClick={() => handleButtonClick('settings')} />
          <SmallButton text="Settings" onClick={() => handleButtonClick('settings')} />
        </div>
      </div>

      {/* Copyright */}
      <div className="minecraft-font absolute bottom-4 left-4 text-white text-sm">
        Devcraft 1.20.2
      </div>

      {/* Music toggle button */}
      <div className="border-3 hover:border-white absolute bottom-4 right-4 z-30">
        <div className="border-t-3 border-l-3 border-r-3 border-t-[#d4d4d4] border-l-[#d4d4d4] border-r-[#7d7d7d]">
          <button
            onClick={playMusic}
            className="textured-button tiny-button minecraft-font p-1"
          >
            <img 
              src="/images/icon-purple-disc.png"
              className={`w-15 h-10 z-20 relative ${audioPlaying ? '' : ''}`}
              alt="Music Disc"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinecraftWebsite;
