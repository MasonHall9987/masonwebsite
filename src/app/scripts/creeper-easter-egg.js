"use client";
import { useState, useEffect, useRef } from 'react';
import { LargeButton} from '../components/UIElements';
import { useCursor } from './cursor-context';
import { getClickAudio, getAssetUrl, getCreeperAudio} from './get-asset';

const CreeperEasterEgg = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashIntensity, setFlashIntensity] = useState(0);
  const [show404, setShow404] = useState(false);
  const [position, setPosition] = useState({ side: 'right', offset: 50 });
  const [frozenPosition, setFrozenPosition] = useState(null);
  const [isClickDisabled, setIsClickDisabled] = useState(false);
  const preloadVideoRef = useRef(null);
  const explosionVideoRef = useRef(null);
  const creeperRef = useRef(null);
  const creeperAudioRef = useRef(null);
  const { setIs404Active } = useCursor();
  
  // Control when 404 appears (in seconds). Set to null to wait for video end
  const SHOW_404_AT_SECONDS = .4;
  
  // Preload assets
  useEffect(() => {
    // Preload creeper audio
    const preloadCreeperAudio = () => {
      const audio = getCreeperAudio();
      creeperAudioRef.current = audio;
      audio.load(); // Force load
      console.log('Preloading creeper audio');
    };
    
    // Preload explosion video
    const preloadExplosionVideo = () => {
      if (preloadVideoRef.current) {
        preloadVideoRef.current.load(); // Force load
        console.log('Preloading explosion video');
      }
    };
    
    // Preload both assets
    preloadCreeperAudio();
    preloadExplosionVideo();
    
    // Cleanup
    return () => {
      if (creeperAudioRef.current) {
        creeperAudioRef.current.pause();
        creeperAudioRef.current = null;
      }
      if (preloadVideoRef.current) {
        preloadVideoRef.current.pause();
      }
    };
  }, []);
  
  // Random delay between 30-90 seconds for appearances
  const getRandomDelay = () => Math.floor(Math.random() * 60000) + 120000; // Random delay between 60-120 seconds
  
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
    // Prevent multiple clicks
    if (isClickDisabled || hasBeenClicked) return;
    
    // Immediately disable further clicks but don't set hasBeenClicked yet
    setIsClickDisabled(true);
    
    const creeperAudio = getCreeperAudio();
    creeperAudioRef.current = creeperAudio; // Store reference
    console.log('Playing creeper audio:', creeperAudio.src);
    creeperAudio.play().catch(err => console.error('Error playing creeper audio:', err));
    
    // Log audio duration when metadata loads
    creeperAudio.addEventListener('loadedmetadata', () => {
      console.log('Creeper audio duration:', creeperAudio.duration, 'seconds');
    });
    
    // Capture current position and freeze it
    if (creeperRef.current) {
      const rect = creeperRef.current.getBoundingClientRect();
      setFrozenPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        side: position.side // Keep track of which side for rotation
      });
    }
    
    // Stop the peeking animation immediately
    setIsPeeking(false);
    
    // Start flashing effect
    setIsFlashing(true);
    
    // Animate flash intensity over 2 seconds
    const startTime = Date.now();
    const flashInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / 2000; // 2 seconds total
      
      if (progress >= 1) {
        clearInterval(flashInterval);
        setFlashIntensity(1);
        return;
      }
      
      // Exponential increase for more dramatic effect
      setFlashIntensity(Math.pow(progress, 2));
    }, 16); // ~60fps
    
    // Wait 2 seconds then play explosion
    setTimeout(() => {
      console.log('Starting explosion phase');
      console.log('Creeper audio still playing?', !creeperAudioRef.current.paused);
      console.log('Creeper audio current time:', creeperAudioRef.current.currentTime);
      
      // Pause all audio elements on the page EXCEPT the creeper audio
      const allAudio = document.querySelectorAll('audio');
      console.log('Total audio elements found:', allAudio.length);
      allAudio.forEach(audio => {
        // Don't pause the creeper audio effect - check by reference
        if (audio !== creeperAudioRef.current) {
          console.log('Pausing audio:', audio.src);
          audio.dataset.wasPlaying = !audio.paused ? 'true' : 'false';
          audio.pause();
        } else {
          console.log('NOT pausing creeper audio - let it play fully');
        }
      });
      
      // Now set hasBeenClicked and hide the creeper
      setHasBeenClicked(true);
      setIsVisible(false);
      setIsFlashing(false);
      setFrozenPosition(null); // Reset frozen position
      setIsExploding(true);
      
      // Play the video
      if (explosionVideoRef.current) {
        console.log('Attempting to play video:', explosionVideoRef.current.src);
        explosionVideoRef.current.load(); // Force reload
        explosionVideoRef.current.play().then(() => {
          console.log('Video playing successfully');
        }).catch(err => {
          console.error('Error playing video:', err);
          console.log('Video readyState:', explosionVideoRef.current.readyState);
          console.log('Video networkState:', explosionVideoRef.current.networkState);
        });
      }
    }, 2000);
  };
  
  const handleVideoEnd = () => {
    if (explosionVideoRef.current && !explosionVideoRef.current.paused) {
      explosionVideoRef.current.pause();
    }
    setIsExploding(false);
    setShow404(true);
  };
  
  const show404Screen = () => {
    // Update cursor context
    setIs404Active(true);
    
    // Pause all media when death screen appears
    const allAudio = document.querySelectorAll('audio');
    allAudio.forEach(audio => {
      audio.dataset.wasPlaying = !audio.paused ? 'true' : 'false';
      audio.pause();
    });
    
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
      if (video !== explosionVideoRef.current) { // Don't pause the explosion video
        video.dataset.wasPlaying = !video.paused ? 'true' : 'false';
        video.pause();
      }
    });
    
    // Try to find and pause animations more specifically
    console.log('Looking for animated elements...');
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.animationName && computedStyle.animationName !== 'none') {
        console.log('Found animated element:', element, 'with animation:', computedStyle.animationName);
        element.style.animationPlayState = 'paused';
      }
    });
    
    // Pause ALL animations on the page
    const style = document.createElement('style');
    style.id = 'death-screen-styles';
    style.textContent = `
      *, *::before, *::after {
        animation-play-state: paused !important;
        -webkit-animation-play-state: paused !important;
        animation: none !important;
        -webkit-animation: none !important;
      }
      #death-screen-overlay {
        cursor: auto !important;
      }
      #death-screen-overlay * {
        cursor: auto !important;
      }
    `;
    document.head.appendChild(style);
    
    // Just show the 404 without stopping the video
    setShow404(true);
  };
  
  useEffect(() => {
    // Add video event listeners for debugging
    if (explosionVideoRef.current && isExploding) {
      const video = explosionVideoRef.current;
      
      // Add debugging event listeners
      video.addEventListener('loadstart', () => console.log('Video: loadstart'));
      video.addEventListener('loadedmetadata', () => {
        console.log('Video: loadedmetadata', {
          duration: video.duration,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight
        });
      });
      video.addEventListener('canplay', () => console.log('Video: canplay'));
      video.addEventListener('play', () => {
        console.log('Video: play event fired');
      });
      video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        if (video.error) {
          console.error('Video error code:', video.error.code);
          console.error('Video error message:', video.error.message);
        }
      });
      video.addEventListener('stalled', () => console.log('Video: stalled'));
      video.addEventListener('suspend', () => console.log('Video: suspend'));
      video.addEventListener('waiting', () => console.log('Video: waiting'));
    }
  }, [isExploding]);
  
  if (!isVisible && !isExploding && !show404 || hasBeenClicked && !isExploding && !show404) return null;
  
  // Calculate position styles based on side
  const getPositionStyles = () => {
    // If we have a frozen position, use that instead
    if (frozenPosition) {
      // Get the rotation based on the original side
      let transform = '';
      switch (frozenPosition.side) {
        case 'top':
          transform = 'rotate(180deg)';
          break;
        case 'right':
          transform = 'rotate(-90deg)';
          break;
        case 'bottom':
          transform = ''; // No rotation
          break;
        case 'left':
          transform = 'rotate(90deg)';
          break;
      }
      
      return {
        position: 'fixed',
        top: `${frozenPosition.top}px`,
        left: `${frozenPosition.left}px`,
        width: `${frozenPosition.width}px`,
        height: `${frozenPosition.height}px`,
        cursor: isClickDisabled ? 'default' : 'pointer', // Change cursor when disabled
        transition: 'none', // No transition when frozen
        zIndex: 9999,
        transform: transform,
        pointerEvents: isClickDisabled ? 'none' : 'auto', // Disable pointer events when clicked
      };
    }
    
    const baseStyles = {
      position: 'fixed',
      width: '80px',
      height: '80px',
      cursor: isClickDisabled ? 'default' : 'pointer', // Change cursor when disabled
      transition: 'all 2s ease-in-out',
      zIndex: 9999,
      pointerEvents: isClickDisabled ? 'none' : 'auto', // Disable pointer events when clicked
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
      {/* Hidden preload video */}
      <video
        ref={preloadVideoRef}
        style={{ display: 'none' }}
        preload="auto"
        muted
      >
        {navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1 ? (
          <source src={getAssetUrl('video', 'explosion.mov')} type="video/quicktime"/>
        ) : (
          <source src={getAssetUrl('video', 'explosion.webm')} type="video/webm"/>
        )}
      </video>
      
      {isVisible && !isExploding && (
        <div
          ref={creeperRef}
          style={getPositionStyles()}
          onClick={handleClick}
        >
          <img 
            src={getAssetUrl('image', 'icon-creeper.png')} 
            alt="Creeper" 
            className="w-full h-full object-contain"
            style={{
              filter: `drop-shadow(2px 2px 4px rgba(0,0,0,0.5)) ${
                isFlashing 
                  ? `brightness(${1 + flashIntensity * 2}) contrast(${1 - flashIntensity * 0.5})` 
                  : ''
              }`,
              mixBlendMode: isFlashing && flashIntensity > 0.5 ? 'screen' : 'normal',
            }}
          />
        </div>
      )}
      
      {show404 && (
        <div 
          id="death-screen-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red tint overlay
          }}
        >
          <div className="text-center">
            <h1 
              className="text-7xl font-bold mb-8 minecraft-font"
              style={{
                color: '#FFFFFF',
                textShadow: '3px 3px 0px #000000',
              }}
            >
              You Died!
            </h1>
            <p 
              className="text-xl mb-8 minecraft-font"
              style={{
                color: '#FFFFFF',
                textShadow: '2px 2px 0px #000000',
              }}
            >
              Steve was blown up by a creeper
            </p>
            <p 
              className="text-2xl mb-12 minecraft-font"
              style={{
                color: '#FFFFFF',
                textShadow: '2px 2px 0px #000000',
              }}
            >
              Score: <span style={{ color: '#FFFF55' }}>404</span>
            </p>
            <div className="flex justify-center">
              <LargeButton
                text="Respawn"
                onClick={(e) => {
                  const clickSound = getClickAudio();
                  e.stopPropagation();
                  clickSound.addEventListener('ended', () => {
                    window.location.reload();
                  });
                  clickSound.play();
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      {isExploding && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{
            pointerEvents: 'none',
          }}
        >
          <video
            ref={explosionVideoRef}
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
            autoPlay
            playsInline
            muted
            onTimeUpdate={(e) => {
              // Check if we should show 404 at specific time
              if (SHOW_404_AT_SECONDS && e.target.currentTime >= SHOW_404_AT_SECONDS && !show404) {
                show404Screen();
              }
            }}
            style={{
              backgroundColor: 'transparent',
            }}
          >
            {navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1 ? (
              <source src={getAssetUrl('video', 'explosion.mov')} type="video/quicktime"/>
            ) : (
              <source src={getAssetUrl('video', 'explosion.webm')} type="video/webm"/>
            )}
          </video>
        </div>
      )}
    </>
  );
};

export default CreeperEasterEgg;