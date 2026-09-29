import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, COPY, FONTS} from '../copy';
import type {EndShot, GridShot, PhotoShot, SplitShot} from '../timeline';
import {WIDTH, HEIGHT} from '../timeline';
import {resolveMove} from './motion';
import {Photo} from './Photo';

export const PhotoShotView: React.FC<{shot: PhotoShot}> = ({shot}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const m = resolveMove(frame, shot.dur, shot.move, fps);
  // overexposure pulse: blows out on the frame, burns back over ~4 frames
  const burn = Math.max(0, ...(shot.strobe ?? []).map((s) => [0.95, 0.55, 0.25, 0.08][frame - s] ?? 0));
  return (
    <AbsoluteFill>
      <Photo slot={shot.slot} width={WIDTH} height={HEIGHT} scale={m.scale} x={m.x} y={m.y} exposure={(shot.exposure ?? 1) * (1 + burn)} />
      {burn > 0 && <AbsoluteFill style={{background: '#F3F0E6', opacity: burn * 0.4}} />}
    </AbsoluteFill>
  );
};

/** Two crops stacked, sliding in opposite directions: an off-kilter editorial frame. */
export const SplitShotView: React.FC<{shot: SplitShot}> = ({shot}) => {
  const frame = useCurrentFrame();
  const p = frame / (shot.dur - 1);
  const gap = 8;
  const h = (HEIGHT - gap) / 2;
  const topH = h + 140; // uneven split feels less templated
  const botH = HEIGHT - gap - topH;
  return (
    <AbsoluteFill style={{background: COLORS.ink}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: WIDTH, height: topH, overflow: 'hidden'}}>
        <Photo slot={shot.slots[0]} width={WIDTH} height={topH} scale={1.22} x={interpolate(p, [0, 1], [90, -90])} exposure={shot.exposure} />
      </div>
      <div style={{position: 'absolute', left: 0, top: topH + gap, width: WIDTH, height: botH, overflow: 'hidden'}}>
        <Photo slot={shot.slots[1]} width={WIDTH} height={botH} scale={1.3} x={interpolate(p, [0, 1], [-110, 110])} exposure={(shot.exposure ?? 1) * 0.97} />
      </div>
    </AbsoluteFill>
  );
};

/**
 * Catalogue page built only from crops of the real photos.
 * Tiles arrive on hard cuts (no fades); one tile jump-cuts to a tighter crop.
 */
const TILES = [
  {x: 64, y: 210, w: 600, h: 770, at: 0},
  {x: 700, y: 210, w: 316, h: 410, at: 6},
  {x: 700, y: 656, w: 316, h: 324, at: 10},
  {x: 64, y: 1020, w: 300, h: 390, at: 14},
  {x: 400, y: 1020, w: 616, h: 390, at: 18},
  {x: 64, y: 1450, w: 952, h: 280, at: 24},
];

export const GridShotView: React.FC<{shot: GridShot}> = ({shot}) => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, shot.dur], [1, 1.035]);
  return (
    <AbsoluteFill style={{background: COLORS.paper}}>
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '40% 45%'}}>
        {TILES.map((t, i) => {
          if (frame < t.at) return null;
          const local = frame - t.at;
          let scale = interpolate(local, [0, shot.dur], [1.04, 1.12]);
          // jump cut inside the big tile, then again on the panoramic one
          if (i === 0 && frame >= 52) scale *= 1.55;
          if (i === 5 && frame >= 66) scale *= 1.4;
          return (
            <React.Fragment key={i}>
              <div style={{position: 'absolute', left: t.x, top: t.y, width: t.w, height: t.h, overflow: 'hidden'}}>
                <Photo slot={shot.slots[i]} width={t.w} height={t.h} scale={scale} compactPlaceholder />
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: t.x,
                  top: t.y + t.h + 10,
                  fontFamily: FONTS.mono,
                  fontSize: 17,
                  letterSpacing: '0.08em',
                  color: '#2a2724',
                }}
              >
                {`Nº0${i + 1}`.slice(0, Math.max(0, Math.floor((local - 3) / 2)))}
              </div>
            </React.Fragment>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Clean close: brand in serif, off-centre, small line in mono. */
export const EndShotView: React.FC<{shot: EndShot}> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: COLORS.ink}}>
      {frame >= 5 && (
        <div
          style={{
            position: 'absolute',
            left: 58,
            bottom: 320,
            fontFamily: FONTS.serif,
            fontSize: 380,
            lineHeight: 0.8,
            letterSpacing: '-0.02em',
            color: COLORS.accent,
          }}
        >
          {COPY.brand}
        </div>
      )}
      {frame >= 15 && (
        <div
          style={{
            position: 'absolute',
            left: 66,
            bottom: 250,
            fontFamily: FONTS.mono,
            fontSize: 22,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#b9b2a7',
          }}
        >
          {COPY.endTag}
        </div>
      )}
    </AbsoluteFill>
  );
};
