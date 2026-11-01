---
"@patternmode/status": patch
---

Null and zero marks are now visible. They were drawn in the track colour, which measured about 1.2:1 against the page, so an empty mark all but disappeared. They now draw in the mark's own colour, at the same contrast as the rest of the mark (4.6:1 for the default muted grey on white). Null stays a dashed ring. Zero is a thin solid outline, lighter than a full border ring, so it still reads as empty and stays distinct from both null and complete. `trackColor` now only styles the track behind partial progress.
