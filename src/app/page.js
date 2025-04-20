"use client";

import { useState, useEffect, useRef } from 'react';
import './globals.css';
import { LargeButton, SmallButton, MusicButton } from './UIElements';

const MinecraftWebsite = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showMainButtons, setShowMainButtons] = useState(false);
  const [showFooterButtons, setShowFooterButtons] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [splashText, setSplashText] = useState('Bruh');
  const audioRef = useRef(null);
  const videoNames = ['sakura'];
  const songNames = ['moogcity'];
  const splashTextOptions = ['Who pushed to main?', 'Built with HTML and bedrock!', 'Now with 73 unused npm packages!', "git commit -m 'final final FINAL version'", "Trust me, it’s asynchronous"];

useEffect(() => {
  setSplashText(returnSplashText());
  setTimeout(() => setShowTitle(true), 500);
  setTimeout(() => setShowMainButtons(true), 1500);
  setTimeout(() => setShowFooterButtons(true), 2500);
}, []);  // This effect will run once when the component mounts

  const handleButtonClick = (action) => {
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
  };

  const playMusic = () => {
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch((err) => console.warn("Play failed", err));
      } else {
        audioRef.current.pause();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  function returnBackgroundAudio()
  {
    const index = Math.floor(Math.random() * songNames.length);
    const name = songNames[index];
    return `https://ezaujbltyppiqzzsoxae.supabase.co/storage/v1/object/public/assets/music/song-${name}.mp3`;
  }

  function returnBackgroundVideo()
  {
    const index = Math.floor(Math.random() * videoNames.length);
    const name = videoNames[index];
    return `https://ezaujbltyppiqzzsoxae.supabase.co/storage/v1/object/public/assets/videos/background-${name}.mp4`;
  }

    function returnSplashText()
  {
    const index = Math.floor(Math.random() * splashTextOptions.length);
    const text = splashTextOptions[index];
    return text;
  }


function renderBackgroundMedia(videoSrc, audioSrc, audioRef) {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="bg-black opacity-5"></div>
      </div>

      <audio ref={audioRef} loop>
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}
  //Rendered Main Function
  return (
    <div className="relative h-screen w-full overflow-hidden font-mono">
      {/* Content container */}
      <div className="minecraft-font relative z-1 h-full flex flex-col items-center justify-between">
        <div className="flex-grow flex flex-col items-center justify-center">
          {/* Title */}
          <div
            className={`transition-opacity duration-1000 mb-16 ${showTitle ? 'opacity-100' : 'opacity-0'} flex justify-end relative`}
          >
            <img
              src="/images/title.png"
              alt="Minecraft"
              className="w-200"
            />
            <div className="minecraft-splash-text z-2 transform -rotate-19 absolute bottom-11 translate-x-1/3 translate-y-1/4">
              {splashText}
            </div>
          </div>

          {/* Main buttons */}
          <div
            className={`flex flex-col gap-2 items-center transition-opacity duration-1000 ${showMainButtons ? 'opacity-100' : 'opacity-0'}`}
          >
            <LargeButton text="Projects/Experience" onClick={() => handleButtonClick('settings')} />
            <LargeButton text="About" onClick={() => handleButtonClick('settings')} />
          </div>

          {/* Footer buttons */}
          <div
            className={`flex gap-4 mt-6 transition-opacity duration-1000 ${showFooterButtons ? 'opacity-100' : 'opacity-0'}`}
          >
            <SmallButton text="Contact" onClick={() => handleButtonClick('settings')} />
            <SmallButton text="Settings" onClick={() => handleButtonClick('settings')} />
          </div>
        </div>
        
        {/* Bottom container for version and music button */}
        <div className={`w-full px-4 py-4 flex justify-between items-center transition-opacity duration-1000 ${showFooterButtons ? 'opacity-100' : 'opacity-0'}`}>
          <div className="minecraft-font text-white text-sm">
            {/* PlaceHolder Text */}
          </div>
          <MusicButton audioPlaying={audioPlaying} onClick={playMusic} />
        </div>
      </div>
    {/* Background video */}
    {renderBackgroundMedia(returnBackgroundVideo(), returnBackgroundAudio(), audioRef)}
    </div>
  );
};

export default MinecraftWebsite;