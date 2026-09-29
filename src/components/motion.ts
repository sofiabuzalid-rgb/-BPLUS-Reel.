import {Easing, interpolate, spring} from 'remotion';
import type {Move} from '../timeline';

const inOut = Easing.bezier(0.45, 0, 0.2, 1);

/** Progress 0→1 of a move at `frame`, honouring freeze frames and easing. */
const progress = (frame: number, dur: number, move: Move, fps: number) => {
  const end = Math.max(1, (move.freezeAt ?? 1) * (dur - 1));
  const t = Math.min(frame, end);
  switch (move.ease) {
    case 'snap':
      // aggressive punch: a stiff, barely damped spring that lands fast
      return spring({frame: t, fps, config: {damping: 26, stiffness: 320, mass: 0.6}, durationInFrames: Math.max(4, end)});
    case 'inOut':
      return inOut(t / end);
    default:
      return t / end;
  }
};

export const resolveMove = (frame: number, dur: number, move: Move, fps: number) => {
  const p = progress(frame, dur, move, fps);
  const lerp = (r?: [number, number]) => (r ? interpolate(p, [0, 1], r) : 0);
  let scale = interpolate(p, [0, 1], move.scale);
  let x = lerp(move.x);
  let y = lerp(move.y);
  if (move.jump && frame >= move.jump.at) {
    scale *= move.jump.scale;
    x += move.jump.x ?? 0;
    y += move.jump.y ?? 0;
  }
  return {scale, x, y};
};
