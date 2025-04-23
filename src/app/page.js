// page.js
"use client";

import { useState, useRef, useEffect } from 'react';
import './globals.css';
import { Background, returnBackgroundAudio} from './background';
import { Home, SmallButton } from './home';
import { Footer } from './UIElements';
import { AboutPage, ProjectsPage, ContactPage, SettingsPage } from './pageComponents';

const MinecraftWebsite = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showMusicButton, setShowMusicButton] = useState(false);
  const audioRef = useRef(null);
  const audioSrc = returnBackgroundAudio();
  const [currentPage, setCurrentPage] = useState('home'); // Default page is home
  const [skipHomeAnimation, setSkipHomeAnimation] = useState(false);


  const handleVideoLoaded = () => {};

   const handleNavigate = (page) => {
    setCurrentPage(page);
  };

   const handleBackToHome = () => {
    // Play click sound
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
    
    // Set skip animation flag to true before navigating back to home
    setSkipHomeAnimation(true);
    setCurrentPage('home');
  };

  // Render content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onBack={handleBackToHome} />;
      case 'projects':
        return <ProjectsPage onBack={handleBackToHome} />;
      case 'contact':
        return <ContactPage onBack={handleBackToHome} />;
      case 'settings':
        return <SettingsPage onBack={handleBackToHome} />;
      case 'home':
      default:
        return <Home onNavigate={handleNavigate} skipAnimation={skipHomeAnimation} />;
    }
  };
  // Rendered Main Function
  return (
    <div className="relative h-screen w-full overflow-hidden font-mono">
      {/* Content container */}
      <div className="minecraft-font relative z-10 h-full flex flex-col items-center justify-between">
        {/* Current page content */}
        {renderContent()}
        {/* Bottom container for version and music button */}
        <Footer />
      </div>
      <Background onVideoLoaded={handleVideoLoaded} />
    </div>
  );
};

export default MinecraftWebsite;