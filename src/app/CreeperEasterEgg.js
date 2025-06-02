"use client";
import { useState, useEffect, useRef } from 'react';
import { LargeButton} from './UIElements';

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
  const videoRef = useRef(null);
  const creeperRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  // Control when 404 appears (in seconds). Set to null to wait for video end
  const SHOW_404_AT_SECONDS = .6;
  
  // Random delay between 30-90 seconds for appearances
  const getRandomDelay = () => 3000; // Random delay between 30-90 seconds
  
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
    const clickSound = new Audio('/audio/effect-creeper.mp3');
    clickSound.play();
    
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
      // Pause all audio elements on the page
      const allAudio = document.querySelectorAll('audio');
      allAudio.forEach(audio => {
        audio.dataset.wasPlaying = !audio.paused ? 'true' : 'false';
        audio.pause();
      });
      
      setIsVisible(false);
      setIsFlashing(false);
      setFrozenPosition(null); // Reset frozen position
      setIsExploding(true);
      setHasBeenClicked(true);
      
      // Play the video
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 2000);
  };
  
  const handleVideoEnd = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    setIsExploding(false);
    setShow404(true);
  };
  
  const show404Screen = () => {
    // Pause all media when death screen appears
    const allAudio = document.querySelectorAll('audio');
    allAudio.forEach(audio => {
      audio.dataset.wasPlaying = !audio.paused ? 'true' : 'false';
      audio.pause();
    });
    
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
      if (video !== videoRef.current) { // Don't pause the explosion video
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
  
  const handle404Dismiss = () => {
    setShow404(false);
    
    // Resume all previously playing media regardless of explosion state
    const allAudio = document.querySelectorAll('audio');
    allAudio.forEach(audio => {
      if (audio.dataset.wasPlaying === 'true') {
        audio.play();
      }
    });
    
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
      if (video !== videoRef.current && video.dataset.wasPlaying === 'true') {
        video.play();
      }
    });
    
    // Remove the style element to resume animations and restore cursor
    const styleElement = document.getElementById('death-screen-styles');
    if (styleElement) {
      styleElement.remove();
    }
    
    // Check if explosion is still playing
    if (videoRef.current && !videoRef.current.ended) {
      // Video is still playing, just hide 404
      return;
    }
    
    // Video has ended, clean up
    setIsExploding(false);
  };
  
  const processVideoFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas || video.paused || video.ended) {
      return;
    }
    
    // Check if we should show 404 at specific time
    if (SHOW_404_AT_SECONDS && video.currentTime >= SHOW_404_AT_SECONDS && !show404) {
      show404Screen();
    }
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Calculate scaling to cover entire viewport
    const videoAspect = video.videoWidth / video.videoHeight;
    const canvasAspect = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (videoAspect > canvasAspect) {
      // Video is wider - fit height, crop width
      drawHeight = canvas.height;
      drawWidth = drawHeight * videoAspect;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Video is taller - fit width, crop height
      drawWidth = canvas.width;
      drawHeight = drawWidth / videoAspect;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }
    
    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw current video frame to canvas (scaled to cover)
    ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
    
    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Process each pixel
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      
      // Check if pixel is greenish (adjust these values as needed)
      if (green > 100 && red < 100 && blue < 100 && (green - red) > 50 && (green - blue) > 50) {
        // Make pixel transparent
        data[i + 3] = 0; // Alpha channel
      }
    }
    
    // Put modified image data back
    ctx.putImageData(imageData, 0, 0);
    
    // Continue processing next frame
    animationFrameRef.current = requestAnimationFrame(processVideoFrame);
  };
  
  useEffect(() => {
    // Start processing when video starts playing
    if (videoRef.current && isExploding) {
      videoRef.current.addEventListener('play', () => {
        processVideoFrame();
      });
    }
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
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
        cursor: 'pointer',
        transition: 'none', // No transition when frozen
        zIndex: 9999,
        transform: transform,
      };
    }
    
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
          ref={creeperRef}
          style={getPositionStyles()}
          onClick={handleClick}
        >
          <img 
            src="/images/icon-creeper.png" 
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
                  const clickSound = new Audio('/audio/effect-button.mp3');
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
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
            style={{
              backgroundColor: 'transparent',
            }}
          />
          <video
            ref={videoRef}
            className="hidden"
            onEnded={handleVideoEnd}
            autoPlay
            playsInline
            style={{ display: 'none' }}
          >
            <source src="/videos/video-explosion.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
};

export default CreeperEasterEgg; 