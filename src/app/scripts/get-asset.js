export function getAssetUrl(type, filename) {
  if (!filename) return null;
  
  const assetTypes = {
    image: '/images/',
    video: '/videos/',
    audio: '/audio/'
  };

  const prefix = assetTypes[type];
  if (!prefix) return null;
  
  return `${prefix}${filename}`;
}

export function getClickAudio() {
  const clickAudio = new Audio(getAssetUrl('audio', 'effect-button.mp3'));
  return clickAudio;
}

export function getCreeperAudio() {
  const creeperAudio = new Audio(getAssetUrl('audio', 'effect-creeper.mp3'));
  return creeperAudio;
}
