// page.js
"use client";

import { useState, useRef, useEffect } from 'react';
import './globals.css';
import { Background, returnBackgroundAudio, returnBackgroundVideo} from './background';
import { Home, SmallButton } from './home';
import { Footer } from './UIElements';
import { AboutPage, ProjectsPage, ContactPage, SettingsPage } from './pageComponents';
import MinecraftCursor from './MinecraftCursor';

const MinecraftWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home'); // Default page is home
  const [skipHomeAnimation, setSkipHomeAnimation] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [splashText, setSplashText] = useState(() => returnSplashText());
  const [backgroundVideo, setBackgroundVideo] = useState(() => returnBackgroundVideo());
  const [backgroundAudio, setBackgroundAudio] = useState(() => returnBackgroundAudio());
  



   function returnSplashText (){
    const splashTextOptions = ['Who pushed to main?', 'Built with HTML and bedrock!', 'Now with 73 unused npm packages!', "git commit -m 'final FINAL version'", "Trust me, it's asynchronous"];
    const index = Math.floor(Math.random() * splashTextOptions.length);
    return splashTextOptions[index];
   };

  const handleVideoLoaded = () => {};

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page !== 'home') {
      setIsBlurred(true); // 👈 Enable blur
    }
  };

  const handleBackToHome = () => {
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();

    setSkipHomeAnimation(true);
    setCurrentPage('home');
    setIsBlurred(false); // 👈 Disable blur
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
        return  <SettingsPage
        onBack={handleBackToHome}
        setBackgroundVideo={setBackgroundVideo}
        setBackgroundAudio={setBackgroundAudio}
      />;
      case 'home':
      default:
        return <Home onNavigate={handleNavigate} skipAnimation={skipHomeAnimation} splashText={splashText}/>;
    }
  };
  // Rendered Main Function
  return (
    <div className="relative h-screen w-full overflow-hidden font-mono">
      {isBlurred && <div className="fixed inset-0 z-1 backdrop-blur-sm" />}

      {/* Content container */}
      <div className="minecraft-font relative z-2 h-full flex flex-col items-center justify-between">
        {/* Current page content */}
        {renderContent()}
        {/* Bottom container for version and music button */}
        <Footer />
      </div>
      <Background
    videoSrc={backgroundVideo[0]}
    fallbackImageSrc={backgroundVideo[1]}
    onVideoLoaded={handleVideoLoaded}
  />
      <MinecraftCursor />
    </div>
  );
};

export default MinecraftWebsite;