"use client";
import { useState } from 'react';
import { LargeButton } from "../components/UIElements";
import { getClickAudio, getAssetUrl } from '../scripts/get-asset';

// Helper function to determine initial carousel indices
const getInitialCarouselIndices = (dataArray, currentPath, pathKey = "filepath") => {
  if (!dataArray || dataArray.length === 0) return [0, 0, 0];
  
  const defaultIndices = [
    0, 
    Math.min(1, dataArray.length - 1), 
    Math.min(2, dataArray.length - 1)
  ];
  
  if (dataArray.length === 1) return [0, 0, 0];

  const currentIndex = dataArray.findIndex(item => item[pathKey] === currentPath);

  if (currentIndex !== -1) {
    const middle = currentIndex;
    const left = (middle - 1 + dataArray.length) % dataArray.length;
    const right = (middle + 1) % dataArray.length;
    return [left, middle, right];
  } else {
    if (dataArray.length >= 3) return [0, 1, 2];
    if (dataArray.length === 2) return [0, 1, 0];
    return defaultIndices;
  }
};

const SettingsPage = ({ onBack, setBackgroundVideo, setBackgroundAudio, currentBackgroundVideoPath, currentBackgroundAudioPath }) => {
  const backgroundsData = [
    { name: "Canyon", image: getAssetUrl('image', 'framed-canyon.png'), filepath: getAssetUrl('video', 'background-canyon.mp4')},
    { name: "Coral", image: getAssetUrl('image', 'framed-coral.png'), filepath: getAssetUrl('video', 'background-coral.mp4')},
    { name: "Jungle", image: getAssetUrl('image', 'framed-jungle.png'), filepath: getAssetUrl('video', 'background-jungle.mp4')},
    { name: "Village", image: getAssetUrl('image', 'framed-village.png'), filepath: getAssetUrl('video', 'background-village.mp4')},
  ];
  
  const musicData = [
    { name: "Moogcity", image: getAssetUrl('image', 'icon-moogcity-disc.png'), filepath: getAssetUrl('audio', 'song-moogcity.mp3')},
    { name: "Haggstorm", image: getAssetUrl('image', 'icon-haggstorm-disc.png'), filepath: getAssetUrl('audio', 'song-haggstorm.mp3')},
    { name: "Mice On Venus", image: getAssetUrl('image', 'icon-mice-disc.png'), filepath: getAssetUrl('audio', 'song-mice.mp3')},
    { name: "Minecraft", image: getAssetUrl('image', 'icon-minecraft-disc.png'), filepath: getAssetUrl('audio', 'song-minecraft.mp3')},
    { name: "Aria Math", image: getAssetUrl('image', 'icon-aria-disc.png'), filepath: getAssetUrl('audio', 'song-aria.mp3')},
  ];
  
  const [visibleBackgroundIndices, setVisibleBackgroundIndices] = useState(() => 
    getInitialCarouselIndices(backgroundsData, currentBackgroundVideoPath, "filepath")
  );
  const [visibleMusicIndices, setVisibleMusicIndices] = useState(() =>
    getInitialCarouselIndices(musicData, currentBackgroundAudioPath, "filepath")
  );

  const clickSound = getClickAudio();
  
  const shiftBackgroundsRight = () => {
    clickSound.play();
    setVisibleBackgroundIndices(prevIndices => {
      return prevIndices.map(index => 
        (index + 1) % backgroundsData.length
      );
    });
  };
  
  const shiftBackgroundsLeft = () => {
    clickSound.play();
    setVisibleBackgroundIndices(prevIndices => {
      return prevIndices.map(index => 
        (index - 1 + backgroundsData.length) % backgroundsData.length
      );
    });
  };
  
  const shiftMusicRight = () => {
    clickSound.play();
    setVisibleMusicIndices(prevIndices => {
      return prevIndices.map(index => 
        (index + 1) % musicData.length
      );
    });
  };
  
  const shiftMusicLeft = () => {
    clickSound.play();
    setVisibleMusicIndices(prevIndices => {
      return prevIndices.map(index => 
        (index - 1 + musicData.length) % musicData.length
      );
    });
  };
  
  const selectedBackground = backgroundsData[visibleBackgroundIndices[1]];
  const selectedMusic = musicData[visibleMusicIndices[1]];
  
  const handleSave = (videoPath, musicPath) => {
    clickSound.play();
    setBackgroundVideo([videoPath, getAssetUrl('image', 'background-jungle.jpg')]);
    setBackgroundAudio(musicPath);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen py-12 space-y-3 overflow-hidden">
      <h2 className="text-3xl font-semibold text-center text-white">Setting</h2>
      <div className="translucent-container px-20 overflow-y-auto">
        <div className="scrollbar-3d ">
          <div className="space-y-12 py-4">
            <div className="mb-10">
              <h3 className="text-2xl font-medium mb-8 text-center">Background</h3>
              <div className="flex items-center justify-center gap-4">
                <button 
                  onClick={shiftBackgroundsLeft}
                  className="text-white text-2xl opacity-70 hover:opacity-100"
                >
                  <img 
                    src={getAssetUrl('image', 'icon-next.png')} 
                    alt="Shift Left" 
                    className="w-10 h-10"
                    style={{ transform: 'rotate(180deg) scaleY(-1)' }} 
                  />
                </button>
                <div className="flex items-center justify-center gap-3">
                  <div className="transition-all duration-300 opacity-40 scale-90">
                    <img 
                      src={backgroundsData[visibleBackgroundIndices[0]].image} 
                      alt={backgroundsData[visibleBackgroundIndices[0]].name}
                      className="w-50 h-32 object-cover"
                    />
                  </div>
                  <div className="transition-all duration-300 transform scale-110 opacity-100 z-10">
                    <img 
                      src={backgroundsData[visibleBackgroundIndices[1]].image} 
                      alt={backgroundsData[visibleBackgroundIndices[1]].name}
                      className="w-50 h-32 object-cover"
                    />
                  </div>
                  <div className="transition-all duration-300 opacity-40 scale-90">
                    <img 
                      src={backgroundsData[visibleBackgroundIndices[2]].image} 
                      alt={backgroundsData[visibleBackgroundIndices[2]].name}
                      className="w-50 h-32 object-cover"
                    />
                  </div>
                </div>
                <button 
                  onClick={shiftBackgroundsRight}
                  className="text-white text-2xl opacity-70 hover:opacity-100"
                >
                  <img 
                    src={getAssetUrl('image', 'icon-next.png')} 
                    alt="Shift Right" 
                    className="w-10 h-10"
                  />
                </button>
              </div>
              <p className="text-xl text-center mt-6">{selectedBackground.name}</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium mb-6 text-center">Music</h3>
              <div className="flex items-center justify-center gap-4">
                <button 
                  onClick={shiftMusicLeft}
                  className="text-white text-2xl opacity-70 hover:opacity-100"
                >
                  <img 
                    src={getAssetUrl('image', 'icon-next.png')} 
                    alt="Shift Left" 
                    className="w-10 h-10"
                    style={{ transform: 'rotate(180deg) scaleY(-1)' }} 
                  />
                </button>
                <div className="flex items-center justify-center gap-3">
                  <img 
                    src={musicData[visibleMusicIndices[0]].image} 
                    alt={musicData[visibleMusicIndices[0]].name}
                    className="w-32 h-32 object-cover rounded-full transition-all duration-300 opacity-50 scale-90 brightness-75 saturate-50"
                  />
                  <img 
                    src={musicData[visibleMusicIndices[1]].image} 
                    alt={musicData[visibleMusicIndices[1]].name}
                    className="w-32 h-32 object-cover rounded-full transition-all duration-300 opacity-100 scale-110 brightness-100 saturate-100 z-10"
                  />
                  <img 
                    src={musicData[visibleMusicIndices[2]].image} 
                    alt={musicData[visibleMusicIndices[2]].name}
                    className="w-32 h-32 object-cover rounded-full transition-all duration-300 opacity-50 scale-90 brightness-75 saturate-50"
                  />
                </div>
                <button 
                  onClick={shiftMusicRight}
                  className="text-white text-2xl opacity-70 hover:opacity-100"
                >
                  <img 
                    src={getAssetUrl('image', 'icon-next.png')} 
                    alt="Shift Right" 
                    className="w-10 h-10" 
                  />
                </button>
              </div>
              <p className="text-xl text-center mt-6">{selectedMusic.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <LargeButton text="Back" onClick={onBack} />
        <LargeButton text="Save" onClick={() => handleSave(selectedBackground.filepath, selectedMusic.filepath)} />
      </div>
    </div>
  );
};

export default SettingsPage; 