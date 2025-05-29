"use client";
import { useState, useEffect, useRef } from 'react';

const CreeperEasterEgg = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [position, setPosition] = useState({ side: 'right', offset: 50 });
  const videoRef = useRef(null);
  
  // Random delay between 30-90 seconds for appearances
  const getRandomDelay = () => 10000;
  
  // Random side and position
  const getRandomPosition = () => {
    const sides = ['top', 'right', 'bottom', 'left'];
    const side = sides[Math.floor(Math.random() * sides.length)];
    const offset = Math.floor(Math.random() * 70) + 15; // 15-85% of the side
    return { side, offset };
  };
  
  useEffect(() => {
    if (hasBeenClicked) return; // Don't show again if clicked
    
    const showCreeper = () => {
      const newPosition = getRandomPosition();
      setPosition(newPosition);
      setIsVisible(true);
      
      // Start peeking animation after a short delay
      setTimeout(() => {
        setIsPeeking(true);
      }, 100);
      
      // Hide after 5-8 seconds if not clicked
      const hideTimeout = setTimeout(() => {
        setIsPeeking(false);
        setTimeout(() => {
          setIsVisible(false);
        }, 2000); // Wait for animation to complete
      }, Math.random() * 3000 + 5000);
      
      return hideTimeout;
    };
    
    // Initial appearance
    const initialTimeout = setTimeout(showCreeper, getRandomDelay());
    
    // Set up recurring appearances
    const interval = setInterval(() => {
      if (!isVisible && !hasBeenClicked) {
        showCreeper();
      }
    }, getRandomDelay());
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [hasBeenClicked, isVisible]);
  
  const handleClick = () => {
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
    
    // Hide the creeper immediately
    setIsPeeking(false);
    setIsVisible(false);
    
    // Wait 2 seconds then play explosion
    setTimeout(() => {
      setIsExploding(true);
      setHasBeenClicked(true);
      
      // Play the video
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 2000);
  };
  
  const handleVideoEnd = () => {
    setIsExploding(false);
  };
  
  if (!isVisible && !isExploding || hasBeenClicked && !isExploding) return null;
  
  // Calculate position styles based on side
  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed',
      width: '80px',
      height: '80px',
      cursor: 'pointer',
      transition: 'all 2s ease-in-out',
      zIndex: 9999,
    };
    
    const peekDistance = '0px'; // Right at the edge
    const hiddenDistance = '-80px'; // Completely hidden
    
    switch (position.side) {
      case 'top':
        return {
          ...baseStyles,
          top: isPeeking ? peekDistance : hiddenDistance,
          left: `${position.offset}%`,
          transform: 'translateX(-50%) rotate(180deg)',
        };
      case 'right':
        return {
          ...baseStyles,
          right: isPeeking ? peekDistance : hiddenDistance,
          top: `${position.offset}%`,
          transform: 'translateY(-50%) rotate(-90deg)',
        };
      case 'bottom':
        return {
          ...baseStyles,
          bottom: isPeeking ? peekDistance : hiddenDistance,
          left: `${position.offset}%`,
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          ...baseStyles,
          left: isPeeking ? peekDistance : hiddenDistance,
          top: `${position.offset}%`,
          transform: 'translateY(-50%) rotate(90deg)',
        };
      default:
        return baseStyles;
    }
  };
  
  return (
    <>
      {isVisible && !isExploding && (
        <div
          style={getPositionStyles()}
          onClick={handleClick}
        >
          <img 
            src="/images/icon-creeper.png" 
            alt="Creeper" 
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
            }}
          />
        </div>
      )}
      
      {isExploding && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{
            backgroundColor: 'transparent',
            pointerEvents: 'none',
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
            autoPlay
            playsInline
          >
            <source src="/videos/video-explosion.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
};

export default CreeperEasterEgg; 