import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/inter/500.css';
import '@fontsource/jetbrains-mono/400.css';
import {continueRender, delayRender} from 'remotion';

const handle = delayRender('Loading fonts');
Promise.all([
  document.fonts.load('400 100px "Instrument Serif"'),
  document.fonts.load('italic 400 100px "Instrument Serif"'),
  document.fonts.load('500 40px "Inter"'),
  document.fonts.load('400 20px "JetBrains Mono"'),
])
  .catch(() => undefined)
  .then(() => continueRender(handle));
