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

export const Footer = ({ audioSrc}) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showMusicButton, setShowMusicButton] = useState(false);
  const audioRef = useRef(null);

  const playMusic = () => {
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
    setAudioPlaying(prevAudioPlaying => !prevAudioPlaying);
  };

  useEffect(() => {
    const musicButtonTimer = setTimeout(() => setShowMusicButton(true), 3000);
    return () => clearTimeout(musicButtonTimer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (audioPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn("Audio play was prevented:", error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioSrc, audioPlaying]);

  const getDiscImageSrc = () => {
    if (!audioSrc) return "/images/icon-orange-disc.png"; // Default/fallback

    const fileName = audioSrc.split('/').pop(); // e.g., "song-aria.mp3"
    if (!fileName) return "/images/icon-orange-disc.png";

    // Remove "song-" prefix and ".mp3" suffix
    const songName = fileName.replace(/^song-/, '').replace(/\.mp3$/, ''); // e.g., "aria"
    
    if (songName) {
      return `/images/icon-${songName}-disc.png`;
    }
    return "/images/icon-orange-disc.png"; // Fallback if parsing fails
  };

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
      {/* Always show disc icon */}
      <img
        src={getDiscImageSrc()}
        className="w-15 h-10 relative z-10"
        alt="Music Disc"
      />
      
      {/* Overlay prohibit icon only when not playing */}
      {!audioPlaying && (
        <img
          src="/images/icon-prohibit.png"
          className="absolute top-1 left-0 w-15 h-10 z-20"
          alt="Prohibit Icon"
        />
      )}
    </button>
  </div>
</div>

<audio
        ref={audioRef}
        key={audioSrc} // ensures reload on src change
        loop
      >
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};