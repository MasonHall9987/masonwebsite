import {useState,useRef,useEffect} from 'react';
import { getClickAudio, getAssetUrl } from '../scripts/get-asset';
// Shared border class variables
const borderRight = 'border-r-3 border-r-[#6b6b6b]';
const borderOthers = 'border-t-3 border-l-3 border-t-[#c7c7c7] border-l-[#c7c7c7]';

// Main reusable button component
export const LargeButton = ({ text, onClick }) => {
  return (
    <div className="border-3 border-black hover:border-white">
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
    <div className="border-3 border-black hover:border-white">
      <div className={`${borderOthers} ${borderRight}`}>
        <button onClick={onClick} className="textured-button small-button minecraft-font">
          {text}
        </button>
      </div>
    </div>
  );
};

export const Footer = ({ audioSrc, onSongEnd }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showMusicButton, setShowMusicButton] = useState(false);
  const audioRef = useRef(null);

  const playMusic = () => {
    const clickSound = getClickAudio();
    clickSound.play();
    setAudioPlaying(prevAudioPlaying => !prevAudioPlaying);
  };

  useEffect(() => {
    const musicButtonTimer = setTimeout(() => setShowMusicButton(true), 3000);
    return () => clearTimeout(musicButtonTimer);
  }, []);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (audioEl) {
      const handleAudioEnded = () => {
        if (audioPlaying) {
          onSongEnd();
        }
      };

      audioEl.addEventListener('ended', handleAudioEnded);

      return () => {
        audioEl.removeEventListener('ended', handleAudioEnded);
      };
    }
  }, [audioSrc, audioPlaying, onSongEnd]);

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
    if (!audioSrc) return getAssetUrl('image', 'icon-orange-disc.png');

    const fileName = audioSrc.split('/').pop();
    if (!fileName) return getAssetUrl('image', 'icon-orange-disc.png');

    const songName = fileName.replace(/^song-/, '').replace(/\.mp3$/, '');
    
    if (songName) {
      return getAssetUrl('image', `icon-${songName}-disc.png`);
    }
    return getAssetUrl('image', 'icon-orange-disc.png');
  };

  return (
    <div
      className={`w-full z-10 px-4 py-4 flex justify-between items-center transition-opacity duration-1000 ${
        showMusicButton ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="minecraft-font text-white text-sm" />

      <div className="border-3 border-black hover:border-white z-30">
        <div className={`${borderOthers} ${borderRight}`}>
          <button
            onClick={playMusic}
            className="relative textured-button tiny-button minecraft-font p-1 overflow-hidden"
          >
            <img
              src={getDiscImageSrc()}
              className="w-15 h-10 relative z-10"
              alt="Music Disc"
            />
            
            {!audioPlaying && (
              <img
                src={getAssetUrl('image', 'icon-prohibit.png')}
                className="absolute top-1 left-0 w-15 h-10 z-20"
                alt="Prohibit Icon"
              />
            )}
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        key={audioSrc}
      >
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};