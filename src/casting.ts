/**
 * CASTING — which real BPLUS photo fills each slot of the edit.
 *
 * Put your photos in /public/photos and point each slot at a file.
 * `focus` is the point (in % of the photo, x/y) the crop and zoom pivot on:
 * for detail slots, aim it at the hinge, temple, lens, logo, etc.
 *
 * Several slots can reuse the same file with a different focus:
 * that's how the detail crops come out of the hero shots.
 *
 * A slot with `file: null` renders as a labelled placeholder (never a fake product).
 */

export type SlotId =
  | 'OPEN'
  | 'HERO_A'
  | 'HERO_B'
  | 'HERO_C'
  | 'HERO_D'
  | 'HERO_E'
  | 'DET_1'
  | 'DET_2'
  | 'DET_3'
  | 'DET_4'
  | 'DET_5'
  | 'DET_6'
  | 'GRID_1'
  | 'GRID_2'
  | 'GRID_3'
  | 'GRID_4'
  | 'GRID_5'
  | 'GRID_6';

export type Slot = {
  file: string | null;
  focus: [number, number];
  /** What this slot needs, shown on the placeholder. */
  role: string;
  /** 'cover' (default) crops to fill; 'width' shows the whole photo across the frame on `bg`. */
  fit?: 'cover' | 'width';
  /** Backdrop colour for 'width' fit — sampled from the photo's own seamless background. */
  bg?: string;
  /** Photo width / height (needed for 'width' fit). */
  aspect?: number;
  /** 'width' fit: vertical centre of the photo, % of frame height. */
  top?: number;
  /** Multiplies the timeline's extra zoom; <1 for low-res photos that blur when pushed. */
  zoom?: number;
};

/*
 * Photos received so far (both 900×590, seamless #F6F6F6 studio background):
 *  - negro-redondo.jpg      round black matte frame, 2 silver rivets, red dot on temple tip
 *  - verde-rectangular.webp rectangular matte green, rivets, B+D logo on temple, red dot tip
 * They're landscape and small, so vertical 'cover' is already a ~3× detail crop:
 * details use cover with tempered zoom, full shots use 'width' on the extended backdrop.
 */
const NEGRO = 'photos/negro-redondo.jpg';
const VERDE = 'photos/verde-rectangular.webp';
const STUDIO = {bg: '#F6F6F6', aspect: 900 / 590};
const full = (file: string, focus: [number, number], role: string, top = 50) =>
  ({file, focus, role, fit: 'width', top, zoom: 0.6, ...STUDIO}) as const;
const det = (file: string, focus: [number, number], role: string, zoom = 0.1) =>
  ({file, focus, role, zoom, ...STUDIO}) as const;

export const CASTING: Record<SlotId, Slot> = {
  OPEN: det(NEGRO, [70.5, 54.6], 'Remaches del frente, negro', 0.08),

  HERO_A: full(VERDE, [50, 50], 'Verde completo — respira 3s', 44),
  HERO_B: full(NEGRO, [45, 50], 'Negro completo, aire abajo para la serif', 30),
  HERO_C: full(NEGRO, [40, 50], 'Negro completo', 50),
  HERO_D: full(VERDE, [45, 50], 'Verde completo', 56),
  HERO_E: det(VERDE, [36, 45], 'Verde, frente y puente', 0.12),

  DET_1: det(NEGRO, [12.8, 39.8], 'Bisagra izq., remaches'),
  DET_2: det(NEGRO, [51.4, 37.3], 'Punta de patilla, punto rojo'),
  DET_3: det(VERDE, [80, 44], 'Acetato mate verde, patilla'),
  DET_4: det(NEGRO, [30, 55], 'Mica redonda'),
  DET_5: det(NEGRO, [39, 46.6], 'Puente'),
  DET_6: det(VERDE, [70, 51.7], 'Logo B+D en patilla'),

  GRID_1: full(NEGRO, [40, 50], 'Catálogo: negro redondo'),
  GRID_2: det(VERDE, [11.8, 33.9], 'Catálogo: verde, bisagra', 0.2),
  GRID_3: full(VERDE, [45, 50], 'Catálogo: verde rectangular'),
  GRID_4: det(NEGRO, [51.4, 37.3], 'Catálogo: punto rojo', 0.2),
  GRID_5: full(VERDE, [50, 50], 'Catálogo: verde, horizontal'),
  GRID_6: full(NEGRO, [50, 50], 'Catálogo: negro, panorámico'),
};
