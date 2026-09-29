# BPLUS — fashion film (Remotion)

Vertical 9:16 · 1080×1920 · 30 fps · 18.6 s (558 frames).

## Estructura

| Archivo | Qué controla |
|---|---|
| `public/photos/` | **Tus fotos reales de BPLUS** (jpg/png/webp). Único material de producto. Hoy: `negro-redondo.jpg`, `verde-rectangular.webp`. |
| `src/casting.ts` | Qué foto va en cada slot y su punto de foco (`focus: [x%, y%]`) para crops y zooms. |
| `src/timeline.ts` | El edit: duración de cada plano (frames), zoom, paneo, freeze, jump cuts, exposición, flashes. |
| `src/copy.ts` | Todo el texto en pantalla (3 intervenciones), colores y tipografías. |
| `src/components/` | Foto (object-fit: cover, nunca deforma), grid catálogo, split, tipografía, grano/analógico. |

Slots sin foto se ven como placeholder rayado con su nombre: nunca se genera producto.

## Secuencia

| Tiempo | Plano |
|---|---|
| 0:00–0:01 | `OPEN` close-up extremo, zoom lento 3.0→3.12 · `BPLUS` pequeño + `Eyewear / México` |
| 0:01–0:03 | 6 cortes: `DET_1` · `DET_2` · `GRID_3` · `DET_3` · `DET_4` (freeze) · repetición de `OPEN` |
| 0:03–0:05 | `HERO_B`, zoom out lento · serif gigante *See / different.* entra desde la derecha, cortada por el frame |
| 0:05–0:08 | `HERO_C` → `DET_5` → `HERO_D` → `DET_6` → `HERO_E` → jump cut + freeze sobre `HERO_E` |
| 0:08–0:11 | Página catálogo: 6 modelos (`GRID_1…6`) entran por cortes, jump cuts dentro de los tiles |
| 0:11–0:14 | Heroes y crops, split horizontal desigual, flash de detalle, paneo lateral |
| 0:14–0:17 | `HERO_A` a pantalla completa, 3 s, zoom 1→1.06 |
| 0:17–0:18.6 | Cierre: `BPLUS` serif + `Eyewear, Mexico` |

Tratamiento: contraste 1.08 + exposición por plano (sin tocar tono ni saturación), viñeta, flicker mínimo, gate weave de ~1 px, grano animado por frame.

## Comandos

```bash
npm install
npm run dev        # Remotion Studio
npm run render     # out/bplus-reel.mp4
```

En este contenedor cloud hay que pasar el navegador:
`--browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`

## Referencia (Ben & Frank, *Horoscotopos / Info(ver)ciales*) → qué se tomó

- Serif condensada editorial para títulos y color mostaza en momentos serif (cierre).
- Página catálogo con etiquetas que se escriben letra a letra.
- Estallidos de exposición (el frame se quema a blanco y regresa) como puntuación.
- Contraste profundo, grano y planos que respiran entre ráfagas.

No se copió: los personajes, el humor narrativo, los subtítulos ni la X roja.
