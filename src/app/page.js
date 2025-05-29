// page.js
"use client";

import { useState, useEffect } from 'react';
import './globals.css';
import { Background, returnBackgroundAudio, returnBackgroundVideo} from './background';
import { Home } from './home';
import { Footer } from './UIElements';
import { AboutPage, ProjectsPage, ContactPage, SettingsPage } from './pageComponents';
import MinecraftCursor from './MinecraftCursor';
import CreeperEasterEgg from './CreeperEasterEgg';

const MinecraftWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home'); // Default page is home
  const [skipHomeAnimation, setSkipHomeAnimation] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [splashText, setSplashText] = useState(() => {
    const splashTextOptions = ['Who pushed to main?', 'Built with HTML and bedrock!', 'Now with 73 unused npm packages!', "git commit -m 'final FINAL version'", 
      "Trust me, it's asynchronous", "404: Splash text not found", "Works on my machine™",  "Welcome to dependency hell",  "Using AI to fix AI-generated bugs", "Linter says no.", 
      "Not a bug, an undocumented feature", "Agile until the deadline", "Splashy splash text", "Press Meeeee!!!!", "Legacy code whisperer", "Hotfixing the hotfix", "Runs best on localhost", 
      "Definitely not written in production", "Smells like merge conflict spirit", "Please don't inspect the element", "Documented in ancient runes", "Insert Stack Overflow solution here"];
    const randomIndex = Math.floor(Math.random() * splashTextOptions.length);
    return splashTextOptions[randomIndex];
  });
  const [usedSplashTexts, setUsedSplashTexts] = useState(() => {
    // We'll initialize this with the actual splash text in useEffect
    return new Set();
  });
  const [backgroundVideo, setBackgroundVideo] = useState(() => returnBackgroundVideo());
  const [backgroundAudio, setBackgroundAudio] = useState(() => returnBackgroundAudio());
  
  // Initialize usedSplashTexts with the initial splash text
  useEffect(() => {
    setUsedSplashTexts(new Set([splashText]));
  }, []); // Only run once on mount



   const splashTextOptions = ['Who pushed to main?', 'Built with HTML and bedrock!', 'Now with 73 unused npm packages!', "git commit -m 'final FINAL version'", 
      "Trust me, it's asynchronous", "404: Splash text not found", "Works on my machine™",  "Welcome to dependency hell",  "Using AI to fix AI-generated bugs", "Linter says no.", 
      "Not a bug, an undocumented feature", "Agile until the deadline", "Splashy splash text", "Press Meeeee!!!!", "Legacy code whisperer", "Hotfixing the hotfix", "Runs best on localhost", 
      "Definitely not written in production", "Smells like merge conflict spirit", "Please don't inspect the element", "Documented in ancient runes", "Insert Stack Overflow solution here"];

   function returnSplashText (){
    const randomIndex = Math.floor(Math.random() * splashTextOptions.length);
    return splashTextOptions[randomIndex];
   };

  const handleSplashTextClick = () => {
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
    
    // Create a shuffled array of all splash texts if we've used them all
    if (usedSplashTexts.size >= splashTextOptions.length) {
      setUsedSplashTexts(new Set());
    }
    
    // Find available splash texts (not yet used in this cycle)
    const availableTexts = splashTextOptions.filter(text => 
      !usedSplashTexts.has(text) && text !== splashText
    );
    
    // If no available texts (shouldn't happen with the reset above), reset and use all
    const textsToChooseFrom = availableTexts.length > 0 ? availableTexts : 
      splashTextOptions.filter(text => text !== splashText);
    
    // Pick a random text from available options
    const randomIndex = Math.floor(Math.random() * textsToChooseFrom.length);
    const newText = textsToChooseFrom[randomIndex];
    
    // Update state
    setSplashText(newText);
    setUsedSplashTexts(prev => new Set([...prev, newText]));
  };

  const handleVideoLoaded = () => {};

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
    // Ensure the next song is different from the current one
    while (nextAudio === backgroundAudio) {
      nextAudio = returnBackgroundAudio();
    }
    setBackgroundAudio(nextAudio);
    // The audio should automatically play due to the useEffect in Footer reacting to audioSrc change
    // and audioPlaying likely being true if the song ended naturally.
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
        currentBackgroundVideoPath={backgroundVideo[0]}
        currentBackgroundAudioPath={backgroundAudio}
      />;
      case 'home':
      default:
        return <Home onNavigate={handleNavigate} skipAnimation={skipHomeAnimation} splashText={splashText} onSplashClick={handleSplashTextClick} />;
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
        <Footer audioSrc={backgroundAudio} onSongEnd={handleSongEndAndSelectNext}/>
      </div>
      <Background
    videoSrc={backgroundVideo[0]}
    fallbackImageSrc={backgroundVideo[1]}
    onVideoLoaded={handleVideoLoaded}
  />
      <MinecraftCursor />
      <CreeperEasterEgg />
    </div>
  );
};

export default MinecraftWebsite;