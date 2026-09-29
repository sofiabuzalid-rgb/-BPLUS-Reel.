import React from 'react';
import {Img, staticFile} from 'remotion';
import {CASTING, type SlotId} from '../casting';
import {FONTS} from '../copy';

type Props = {
  slot: SlotId;
  width: number;
  height: number;
  scale: number;
  x?: number;
  y?: number;
  exposure?: number;
  /** Hide the placeholder label (e.g. tiny grid tiles). */
  compactPlaceholder?: boolean;
};

/** Keep the pan inside the photo so an edge never shows. */
const clamp = (t: number, s: number, origin: number, size: number) => {
  const max = (s - 1) * origin;
  const min = -(s - 1) * (size - origin);
  return Math.min(max, Math.max(min, t));
};

/**
 * A real photo, object-fit: cover (never stretched), cropped and zoomed
 * around its focus point. The grade only touches contrast/exposure,
 * never hue or saturation, so the frame colours stay true.
 */
export const Photo: React.FC<Props> = ({slot, width, height, scale, x = 0, y = 0, exposure = 1, compactPlaceholder}) => {
  const {file, focus, role, fit = 'cover', bg = '#111', aspect = 1, top = 50, zoom = 1} = CASTING[slot];
  // `zoom` tempers the timeline's punch-ins for photos that can't take them (low res)
  const s = Math.max(1, 1 + (scale - 1) * zoom);
  // 'width' fit: whole photo across the frame, seamless studio backdrop extended around it
  const imgH = width / aspect;
  const ox = (focus[0] / 100) * width;
  const oy = fit === 'width' ? (top / 100) * height + (focus[1] / 100 - 0.5) * imgH : (focus[1] / 100) * height;
  const tx = clamp(x, s, ox, width);
  const ty = clamp(y, s, oy, height);

  const transform = `translate(${tx}px, ${ty}px) scale(${s})`;
  const transformOrigin = `${ox}px ${oy}px`;

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#111'}}>
      {file ? (
        <div style={{position: 'absolute', inset: 0, background: bg, transformOrigin, transform, filter: `contrast(1.08) brightness(${exposure})`}}>
          {fit === 'width' ? (
            <Img src={staticFile(file)} style={{position: 'absolute', left: 0, width: '100%', height: imgH, top: (top / 100) * height - imgH / 2}} />
          ) : (
            <Img
              src={staticFile(file)}
              style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${focus[0]}% ${focus[1]}%`}}
            />
          )}
        </div>
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transformOrigin,
              transform,
              background:
                'repeating-linear-gradient(135deg, #1b1a19 0 22px, #211f1d 22px 44px)',
              filter: `brightness(${exposure})`,
            }}
          >
            {/* focus crosshair, so the crop intent is visible */}
            <div style={{position: 'absolute', left: `${focus[0]}%`, top: `${focus[1]}%`, width: 60, height: 1, background: '#8a8278', transform: 'translate(-50%, 0)'}} />
            <div style={{position: 'absolute', left: `${focus[0]}%`, top: `${focus[1]}%`, width: 1, height: 60, background: '#8a8278', transform: 'translate(0, -50%)'}} />
          </div>
          {!compactPlaceholder && (
            <div style={{position: 'absolute', left: 24, top: '50%', right: 24, fontFamily: FONTS.mono, color: '#a39a8e', fontSize: 22, lineHeight: 1.5, letterSpacing: '0.04em'}}>
              <div style={{color: '#e4ddd2'}}>FOTO · {slot}</div>
              <div>{role}</div>
            </div>
          )}
          {compactPlaceholder && (
            <div style={{position: 'absolute', left: 12, bottom: 10, fontFamily: FONTS.mono, color: '#a39a8e', fontSize: 16}}>{slot}</div>
          )}
        </>
      )}
    </div>
  );
};
