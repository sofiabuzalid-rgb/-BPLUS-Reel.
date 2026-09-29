import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';

/** Fine animated grain: new noise every frame, grayscale, soft overlay. */
export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.16}) => {
  const frame = useCurrentFrame();
  const seed = frame % 120;
  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'overlay', opacity}}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves={2} seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Deep-ish blacks at the edges + a barely-there exposure flicker. Hue untouched. */
export const Analog: React.FC = () => {
  const frame = useCurrentFrame();
  const flicker = 0.012 + random(`flicker-${frame}`) * 0.022;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 80% 70% at 50% 48%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.16) 100%)'}} />
      <AbsoluteFill style={{background: '#000', opacity: flicker}} />
    </AbsoluteFill>
  );
};

/** Tiny gate weave: the whole frame shifts a pixel or so, like film in a projector. */
export const useGateWeave = () => {
  const frame = useCurrentFrame();
  const x = (random(`wx-${frame}`) - 0.5) * 2.2;
  const y = (random(`wy-${frame}`) - 0.5) * 1.6;
  return `translate(${x}px, ${y}px) scale(1.006)`;
};

/** Analog flash on a cut: 2 frames of warm white burning out. */
export const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  const o = frame === 0 ? 0.78 : frame === 1 ? 0.22 : 0;
  if (!o) return null;
  return <AbsoluteFill style={{background: '#F6F1E7', opacity: o, mixBlendMode: 'screen'}} />;
};
