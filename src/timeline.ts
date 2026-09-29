import type {SlotId} from './casting';

/**
 * TIMELINE — the edit, in frames at 30 fps.
 * Pure cuts: every shot starts on a hard cut, no crossfades.
 *
 * Move:
 *  - scale / x / y: [from, to] over the shot (x, y in px)
 *  - ease: 'linear' (slow breath), 'inOut' (hero), 'snap' (aggressive spring punch-in)
 *  - freezeAt: fraction of the shot where the motion stops dead (freeze frame)
 *  - jump: jump cut inside the same photo at `at` frames, new scale multiplier
 * exposure: small per-shot exposure variation (brightness only, never hue)
 * flash: 1-frame analog flash on the cut into this shot
 */

export type Ease = 'linear' | 'inOut' | 'snap';

export type Move = {
  scale: [number, number];
  x?: [number, number];
  y?: [number, number];
  ease?: Ease;
  freezeAt?: number;
  jump?: {at: number; scale: number; x?: number; y?: number};
};

export type PhotoShot = {
  kind: 'photo';
  dur: number;
  slot: SlotId;
  move: Move;
  exposure?: number;
  flash?: boolean;
};

export type SplitShot = {
  kind: 'split';
  dur: number;
  slots: [SlotId, SlotId];
  exposure?: number;
  flash?: boolean;
};

export type GridShot = {
  kind: 'grid';
  dur: number;
  slots: [SlotId, SlotId, SlotId, SlotId, SlotId, SlotId];
  flash?: boolean;
};

export type EndShot = {kind: 'end'; dur: number; flash?: boolean};

export type Shot = PhotoShot | SplitShot | GridShot | EndShot;

export const TIMELINE: Shot[] = [
  // 0:00–0:01 — open strong: extreme close-up, very slow zoom. Small BPLUS.
  {kind: 'photo', dur: 30, slot: 'OPEN', move: {scale: [3.0, 3.12], ease: 'linear'}, exposure: 0.94},

  // 0:01–0:03 — fast cuts between details.
  {kind: 'photo', dur: 13, slot: 'DET_1', move: {scale: [2.55, 2.35], x: [-24, 0], ease: 'snap'}, flash: true},
  {kind: 'photo', dur: 11, slot: 'DET_2', move: {scale: [2.8, 2.8], x: [36, -36], ease: 'linear'}, exposure: 1.04},
  {kind: 'photo', dur: 9, slot: 'GRID_3', move: {scale: [1.18, 1.08], ease: 'snap'}},
  {kind: 'photo', dur: 12, slot: 'DET_3', move: {scale: [3.2, 3.36], ease: 'linear'}, exposure: 0.97},
  {kind: 'photo', dur: 8, slot: 'DET_4', move: {scale: [2.1, 2.3], ease: 'snap', freezeAt: 0.35}},
  // brief repeat of the opening image, tighter crop
  {kind: 'photo', dur: 7, slot: 'OPEN', move: {scale: [1.9, 1.9]}, exposure: 1.05},

  // 0:03–0:05 — hero, slow move. Big serif enters from the side (overlay).
  {kind: 'photo', dur: 60, slot: 'HERO_B', move: {scale: [1.09, 1.03], y: [0, -24], ease: 'inOut'}, flash: true},

  // 0:05–0:08 — full → detail → other colour → detail → full → freeze.
  {kind: 'photo', dur: 20, slot: 'HERO_C', move: {scale: [1.05, 1.0], ease: 'inOut'}},
  {kind: 'photo', dur: 10, slot: 'DET_5', move: {scale: [2.6, 2.72], ease: 'linear'}, exposure: 0.96},
  {kind: 'photo', dur: 16, slot: 'HERO_D', move: {scale: [1.02, 1.06], x: [40, 0], ease: 'inOut'}},
  {kind: 'photo', dur: 10, slot: 'DET_6', move: {scale: [3.0, 3.0], x: [-50, 50], ease: 'linear'}, exposure: 1.04},
  {kind: 'photo', dur: 18, slot: 'HERO_E', move: {scale: [1.14, 1.04], ease: 'snap'}},
  {kind: 'photo', dur: 16, slot: 'HERO_E', move: {scale: [1.9, 1.98], ease: 'snap', freezeAt: 0.3}, exposure: 0.95},

  // 0:08–0:11 — editorial catalogue composition from the real photos.
  {kind: 'grid', dur: 90, slots: ['GRID_1', 'GRID_2', 'GRID_3', 'GRID_4', 'GRID_5', 'GRID_6'], flash: true},

  // 0:11–0:14 — back to heroes, crops and zooms.
  {kind: 'photo', dur: 15, slot: 'HERO_B', move: {scale: [1.75, 1.68], ease: 'snap'}},
  {kind: 'photo', dur: 20, slot: 'HERO_C', move: {scale: [1.0, 1.04], ease: 'linear'}, exposure: 1.03},
  {kind: 'photo', dur: 12, slot: 'DET_3', move: {scale: [4.0, 4.12], ease: 'linear'}, exposure: 0.95},
  {kind: 'split', dur: 25, slots: ['HERO_D', 'HERO_E']},
  {kind: 'photo', dur: 6, slot: 'DET_2', move: {scale: [2.4, 2.4]}, exposure: 1.06},
  {kind: 'photo', dur: 12, slot: 'HERO_D', move: {scale: [1.16, 1.16], x: [70, -70], ease: 'linear'}},

  // 0:14–0:17 — slow down. The best photo, full screen, breathing.
  {kind: 'photo', dur: 90, slot: 'HERO_A', move: {scale: [1.0, 1.06], ease: 'inOut'}},

  // 0:17–end — clean close.
  {kind: 'end', dur: 48},
];

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const TOTAL_FRAMES = TIMELINE.reduce((a, s) => a + s.dur, 0);

/** Start frame of each shot, handy for placing the type overlays. */
export const SHOT_STARTS = TIMELINE.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + TIMELINE[i - 1].dur);
  return acc;
}, []);
