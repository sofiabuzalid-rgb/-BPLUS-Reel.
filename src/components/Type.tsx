import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, COPY, FONTS} from '../copy';

/** Intervention 1 — small brand mark + tiny tag, cut in (no fades). */
export const OpenMark: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {frame >= 3 && (
        <div style={{position: 'absolute', left: 64, top: 96, fontFamily: FONTS.sans, fontWeight: 500, fontSize: 30, letterSpacing: '0.42em', color: COLORS.bone}}>
          {COPY.brand}
        </div>
      )}
      {frame >= 12 && (
        <div style={{position: 'absolute', right: 64, bottom: 118, fontFamily: FONTS.mono, fontSize: 19, letterSpacing: '0.16em', textTransform: 'uppercase', color: COLORS.bone}}>
          {COPY.openTag}
        </div>
      )}
    </AbsoluteFill>
  );
};

/** Intervention 2 — oversized serif sliding in from the right, running off the frame. */
export const BigLine: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inA = spring({frame, fps, config: {damping: 200, stiffness: 90}});
  const inB = spring({frame: frame - 5, fps, config: {damping: 200, stiffness: 90}});
  const drift = interpolate(frame, [0, 60], [0, -46]);
  const base: React.CSSProperties = {
    position: 'absolute',
    fontFamily: FONTS.serif,
    color: COLORS.bone,
    lineHeight: 0.82,
    whiteSpace: 'nowrap',
    letterSpacing: '-0.025em',
  };
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{...base, left: 70, top: 1080, fontSize: 250, transform: `translateX(${interpolate(inA, [0, 1], [1100, 0]) + drift}px)`}}>
        {COPY.bigLine1}
      </div>
      <div style={{...base, left: 300, top: 1290, fontSize: 330, fontStyle: 'italic', transform: `translateX(${interpolate(inB, [0, 1], [1200, 0]) + drift * 1.6}px)`}}>
        {COPY.bigLine2}
      </div>
    </AbsoluteFill>
  );
};
