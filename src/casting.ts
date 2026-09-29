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
};

export const CASTING: Record<SlotId, Slot> = {
  OPEN: {file: null, focus: [50, 50], role: 'Apertura: close-up extremo de mica / borde del armazón'},

  HERO_A: {file: null, focus: [50, 50], role: 'LA mejor foto: respira a pantalla completa 3s'},
  HERO_B: {file: null, focus: [50, 50], role: 'Hero con aire para la tipografía serif grande'},
  HERO_C: {file: null, focus: [50, 50], role: 'Plano completo, modelo 1'},
  HERO_D: {file: null, focus: [50, 50], role: 'Plano completo, otro color'},
  HERO_E: {file: null, focus: [50, 50], role: 'Plano completo / editorial'},

  DET_1: {file: null, focus: [50, 50], role: 'Detalle: bisagra'},
  DET_2: {file: null, focus: [50, 50], role: 'Detalle: patilla'},
  DET_3: {file: null, focus: [50, 50], role: 'Detalle: textura del acetato / material'},
  DET_4: {file: null, focus: [50, 50], role: 'Detalle: mica / reflejo'},
  DET_5: {file: null, focus: [50, 50], role: 'Detalle de HERO_C'},
  DET_6: {file: null, focus: [50, 50], role: 'Detalle de HERO_D'},

  GRID_1: {file: null, focus: [50, 50], role: 'Catálogo: modelo 1 (tile grande)'},
  GRID_2: {file: null, focus: [50, 50], role: 'Catálogo: modelo 2'},
  GRID_3: {file: null, focus: [50, 50], role: 'Catálogo: modelo 3'},
  GRID_4: {file: null, focus: [50, 50], role: 'Catálogo: modelo 4'},
  GRID_5: {file: null, focus: [50, 50], role: 'Catálogo: modelo 5 (horizontal)'},
  GRID_6: {file: null, focus: [50, 50], role: 'Catálogo: modelo 6 (panorámico)'},
};
