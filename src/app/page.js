"use client";

import { useState, useEffect, useRef} from 'react';
import './globals.css'

const MinecraftWebsite = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showMainButtons, setShowMainButtons] = useState(false);
  const [showFooterButtons, setShowFooterButtons] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Animate elements in sequence
    setTimeout(() => setShowTitle(true), 500);
    setTimeout(() => setShowMainButtons(true), 1500);
    setTimeout(() => setShowFooterButtons(true), 2500);

  }, []);


  const handleButtonClick = (action) => {
    console.log(`Button clicked: ${action}`);
    // Dummy functions for now
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

  {/* Optional overlay to darken video a little for better contrast */}
  <div className="absolute inset-0 bg-black opacity-0"></div>
</div>

<audio ref={audioRef} loop>
        <source src="/audio/song-moogcity.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
</audio>

      {/* Minecraft splash text */}
      <div className="absolute top-70 right-140 z-20 transform -rotate-24">
        <div className="minecraft-font text-yellow-300 text-xl drop-shadow-lg animate-pulse">
          Who pushed to Main?
        </div>
      </div>

      {/* Content container */}
      <div className="minecraft-font relative z-10 h-full flex flex-col items-center justify-center">
        {/* Title */}
        <div 
          className={`transition-opacity duration-1000 mb-16 ${showTitle ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src="/images/title.png" 
            alt="Minecraft" 
            className="w-150"
          />
        </div>

        {/* Main buttons */}
        <div 
          className={`flex flex-col gap-2 items-center transition-opacity duration-1000 ${showMainButtons ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Main menu buttons */}
          <button 
            onClick={() => handleButtonClick('singleplayer')}
            className="large-button"
            >
            Singleplayer
          </button>
          <button 
            onClick={() => handleButtonClick('multiplayer')}
            className="large-button"
            >
            Multiplayer
          </button>
          
          <button 
            onClick={() => handleButtonClick('realms')}
            className="large-button"
            >
            Minecraft Realms
          </button>
        </div>

        {/* Footer buttons */}
        <div 
          className={`flex gap-4 mt-8 transition-opacity duration-1000 ${showFooterButtons ? 'opacity-100' : 'opacity-0'}`}
        >
         <button 
  onClick={() => handleButtonClick('options')}
  className="small-button"
  style={{ fontFamily: 'Minecraft, monospace' }}
>
  Options...
</button>
          
          <button 
            onClick={() => handleButtonClick('quit')}
            className="small-button"
            style={{ fontFamily: 'Minecraft, monospace', fontWeight: 400 }} >
            Quit Game
          </button>
        </div>
      </div>

      {/* Copyright info */}
      <div className="absolute bottom-4 left-4 text-white text-sm">
        Devcraft 1.20.2
      </div>
      <div className="absolute bottom-4 right-4 z-30">
  <button
    onClick={() => {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play().catch(err => console.warn("Play failed", err));
        } else {
          audioRef.current.pause();
        }
        setAudioPlaying(!audioPlaying);
      }
    }}
    className="minecraft-font bg-gray-600 hover:bg-gray-500 text-white border-b-4 border-gray-800 hover:border-gray-600 px-4 py-2 text-sm"
  >
    {audioPlaying ? 'Music: On' : 'Music: Off'}
  </button>
</div>
    </div>
  );
};

export default MinecraftWebsite;