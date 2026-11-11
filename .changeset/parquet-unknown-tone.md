---
"@patternmode/parquet": minor
---

A tile can set `isLight` to override the tone analysis. A tile color the analysis cannot parse (`var()`, `color-mix()`, most named colors) still renders as not light, as before; set `isLight` when such a tile is light. Tiles with 4- or 8-digit hex now get a tone from their channels.
