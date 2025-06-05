// page.js
"use client";

import { useState, useEffect } from 'react';
import { Background, returnBackgroundAudio, returnBackgroundVideo} from './scripts/background';
import { Home } from './pages/home-page';
import { Footer } from './components/UIElements';
import { AboutPage, ProjectsPage, ContactPage, SettingsPage } from './pages/components-page';
import MinecraftCursor from './scripts/minecraft-cursor';
import CreeperEasterEgg from './scripts/creeper-easter-egg';

const splashTextOptions = ['Who pushed to main?', 'Built with HTML and bedrock!', 'Now with 73 unused npm packages!', "git commit -m 'final FINAL version'", 
  "Trust me, it's asynchronous", "404: Splash text not found", "Works on my machine",  "Welcome to dependency hell",  "Using AI to fix AI-generated bugs", "Linter says no.", 
  "Not a bug, an undocumented feature", "Agile until the deadline", "Splashy splash text", "Press Meeeee!!!!", "Legacy code whisperer", "Hotfixing the hotfix", "Runs best on localhost", 
  "Definitely not written in production", "Smells like merge conflict spirit", "Please don't inspect the element", "Documented in ancient runes", "Insert Stack Overflow solution here"];

const MinecraftWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home'); // Default page is home
  const [skipHomeAnimation, setSkipHomeAnimation] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [splashText, setSplashText] = useState(() => {
    const randomIndex = Math.floor(Math.random() * splashTextOptions.length);
    return splashTextOptions[randomIndex];
  });
  const [usedSplashTexts, setUsedSplashTexts] = useState(() => {
    return new Set();
  });
  const [backgroundVideo, setBackgroundVideo] = useState(() => returnBackgroundVideo());
  const [backgroundAudio, setBackgroundAudio] = useState(() => returnBackgroundAudio());
  
  useEffect(() => {
    setUsedSplashTexts(new Set([splashText]));
  }, []); // Only run once on mount

  const handleSplashTextClick = () => {
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
    
    if (usedSplashTexts.size >= splashTextOptions.length) {
      setUsedSplashTexts(new Set());
    }
    
    const availableTexts = splashTextOptions.filter(text => 
      !usedSplashTexts.has(text) && text !== splashText
    );
    
    const textsToChooseFrom = availableTexts.length > 0 ? availableTexts : 
      splashTextOptions.filter(text => text !== splashText);
    
    const randomIndex = Math.floor(Math.random() * textsToChooseFrom.length);
    const newText = textsToChooseFrom[randomIndex];
    
    setSplashText(newText);
    setUsedSplashTexts(prev => new Set([...prev, newText]));
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page !== 'home') {
      setIsBlurred(true);
    }
  };

  const handleBackToHome = () => {
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();

    setSkipHomeAnimation(true);
    setCurrentPage('home');
    setIsBlurred(false);
  };

  const handleSongEndAndSelectNext = () => {
    let nextAudio = returnBackgroundAudio();
    while (nextAudio === backgroundAudio) {
      nextAudio = returnBackgroundAudio();
    }
    setBackgroundAudio(nextAudio);
  };

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
          currentBackgroundVideoPath={backgroundVideo[0]}
          currentBackgroundAudioPath={backgroundAudio}
        />;
      case 'home':
      default:
        return <Home onNavigate={handleNavigate} skipAnimation={skipHomeAnimation} splashText={splashText} onSplashClick={handleSplashTextClick} />;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden font-mono">
      {isBlurred && <div className="fixed inset-0 z-1 backdrop-blur-sm" />}

      <div className="minecraft-font relative z-2 h-full flex flex-col items-center justify-between">
        {renderContent()}
        <Footer audioSrc={backgroundAudio} onSongEnd={handleSongEndAndSelectNext}/>
      </div>
      <Background
        videoSrc={backgroundVideo[0]}
        fallbackImageSrc={backgroundVideo[1]}
      />
      <MinecraftCursor />
      <CreeperEasterEgg />
    </div>
  );
};

export default MinecraftWebsite;