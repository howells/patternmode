---
"@patternmode/halo": major
---

Removed exports that duplicated `@patternmode/system` or predated `placement`.

- **Breaking:** removed `HaloColor`. The value type is `HslColor` from `@patternmode/system`, which has the same shape (`{ h, s, l }`).
- **Breaking:** removed the `hslToHex` re-export. Import it from `@patternmode/system`.
- **Breaking:** removed `clampValue` and `normalizeHue`. Use `clamp` and `wrapHue` from `@patternmode/system`.
- **Breaking:** removed the bottom-placement constants `HALO_ARC_START_DEG`, `HALO_ARC_END_DEG`, `HALO_WIDTH`, `HALO_HEIGHT`, `HALO_CENTER_X`, `HALO_CENTER_Y`, `HALO_VIEWBOX` and `HALO_ARC_PATH`. Use `getHaloGeometry("bottom")`.
