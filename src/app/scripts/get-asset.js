
const CLOUDFLARE_URL = 'https://pub-f3ed1098080a4128adc7fb10cb429333.r2.dev';

export function getAssetUrl(type, filename) {
  if (!filename) return null;
  
  const assetTypes = {
    image: '/images/',
    video: '/videos/',
    audio: '/audio/'
  };

  const prefix = assetTypes[type];
  if (!prefix) return null;

  console.log(`${CLOUDFLARE_URL}${prefix}${filename}`);
  
  return `${CLOUDFLARE_URL}${prefix}${filename}`;
}
export const getClickAudio = () => {
  const clickAudio = new Audio(getAssetUrl('audio', 'effect-button.mp3'));
  return clickAudio;
};

export const getCreeperAudio = () => {
  const creeperAudio = new Audio(getAssetUrl('audio', 'creeper-sound.mp3'));
  return creeperAudio;
};
