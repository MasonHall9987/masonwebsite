// home.js
"use client";

import { useState, useEffect } from 'react';
import { LargeButton, SmallButton } from './UIElements';

const Home = ({ onNavigate, skipAnimation, splashText = false }) => {
  const [showTitle, setShowTitle] = useState(skipAnimation);
  const [showMainButtons, setShowMainButtons] = useState(skipAnimation);
  const [showFooterButtons, setShowFooterButtons] = useState(skipAnimation);
  const clickSound = new Audio('/audio/effect-button.mp3');

  
  useEffect(() => {
    
    // Skip animations if requested
    if (skipAnimation) {
      return; // Exit early if animations should be skipped
    }
    
    const titleTimer = setTimeout(() => setShowTitle(true), 500);
    const buttonsTimer = setTimeout(() => setShowMainButtons(true), 1500);
    const footerTimer = setTimeout(() => setShowFooterButtons(true), 2500);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(buttonsTimer);
      clearTimeout(footerTimer);
    };
  }, [skipAnimation]);

 

  const handleButtonClick = (page) => {
    clickSound.play();
    
    // Navigate to the selected page
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
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
        <LargeButton text="Projects/Experience" onClick={() => handleButtonClick('projects')} />
        <LargeButton text="About" onClick={() => handleButtonClick('about')} />
      </div>

      {/* Footer buttons */}
      <div
        className={`flex gap-4 mt-6 transition-opacity duration-1000 ${showFooterButtons ? 'opacity-100' : 'opacity-0'}`}
      >
        <SmallButton text="Contact" onClick={() => handleButtonClick('contact')} />
        <SmallButton text="Settings" onClick={() => handleButtonClick('settings')} />
      </div>
    </div>
  );
};

export { Home, SmallButton };