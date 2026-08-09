---
"@patternmode/swatch": patch
---

Atmosphere texture no longer narrows wide-gamut colors to sRGB.

`withAlpha` has two branches: hex colors take an 8-bit alpha suffix, and everything else falls through to `color-mix`. That second branch mixed `in srgb`, which is the path every `oklch()` and `oklab()` value takes — so a consumer passing wide-gamut colors got them clipped to the sRGB gamut on the way through. Nothing threw and the swatch still rendered; it just rendered a duller color than the one it was handed. Now mixes `in oklab`.

The hex branch is sRGB by construction, so this was the only path where the gamut was live. Swatch's main color path already passes values through untouched and interpolates in oklab.
