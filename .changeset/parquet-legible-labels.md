---
"@patternmode/parquet": patch
---

Make the built-in tile labels legible: they now use solid ink at 11px instead of a translucent 10px name over a further-dimmed 9px percentage, which measured as low as 2.2:1 on mid-tone tiles. On touch screens, which have no hover to reveal them, the labels are now always shown.

With `showLabels`, each labelled tile is now a tab stop. Keyboard focus reveals its label, and screen readers hear the tile as an image named by its label and share, such as "Terracotta, 42%". Before, the stylesheet revealed labels on focus, but no tile could take focus. The focus ring is drawn inside the tile, in the theme ring with a light band within it, so it shows on any tile colour. The README and the `showLabels` doc comment now describe what happens: labels show on hover, on keyboard focus, and always on touch screens. They used to say hover only.
