import {React,useState,useRef,useEffect} from 'react';
import { returnBackgroundAudio} from './background';
// Shared border class variables
const borderRight = 'border-r-3 border-r-[#6b6b6b]';
const borderOthers = 'border-t-3 border-l-3 border-t-[#c7c7c7] border-l-[#c7c7c7]';

// Main reusable button component
export const LargeButton = ({ text, onClick }) => {
  return (
    <div className="border-3 hover:border-white">
      <div className={`${borderOthers} ${borderRight}`}>
        <button onClick={onClick} className="textured-button large-button minecraft-font">
          {text}
        </button>
      </div>
    </div>
  );
};

export const SmallButton = ({ text, onClick }) => {
  return (
    <div className="border-3 hover:border-white">
      <div className={`${borderOthers} ${borderRight}`}>
        <button onClick={onClick} className="textured-button small-button minecraft-font">
          {text}
        </button>
      </div>
    </div>
  );
};

export const Footer = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showMusicButton, setShowMusicButton] = useState(false);
  const audioRef = useRef(null);
  const audioSrc = returnBackgroundAudio();

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

  useEffect(() => {
    const musicButtonTimer = setTimeout(() => setShowMusicButton(true), 3000);
    return () => clearTimeout(musicButtonTimer);
  }, []);

  return (
    <div
      className={`w-full z-10 px-4 py-4 flex justify-between items-center transition-opacity duration-1000 ${
        showMusicButton ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="minecraft-font text-white text-sm">
        {/* PlaceHolder Text */}
      </div>

      <div className="border-3 hover:border-white z-30">
         <div className={`${borderOthers} ${borderRight}`}>
          <button
            onClick={playMusic}
            className="relative textured-button tiny-button minecraft-font p-1 overflow-hidden"
          >
            <img
              src={
                audioPlaying
                  ? '/images/icon-purple-disc.png'
                  : '/images/icon-not-playing.png'
              }
              className="w-15 h-10 relative z-20"
              alt="Music Disc"
            />
          </button>
        </div>
      </div>

      <audio ref={audioRef} loop>
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};