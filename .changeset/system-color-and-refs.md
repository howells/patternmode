---
"@patternmode/system": minor
---

- New `assignRef(ref, value)` helper, with its `AssignableRef` type, for components that merge a forwarded ref with their own.
- `getSizeVariableStyle` accepts the extended size scale as well as the base one.
- `isLightColor` and `getColorLightness` now live with the other colour helpers. Their exports are unchanged. Malformed hex such as `#12` or `#ggg` now returns `null` instead of a guessed value.
- The light/dark threshold moved from OKLab L 0.62 to 0.5637, the point where black and white text have equal WCAG contrast. Mid tones between the two values now get dark text.
- The cache of gamut chroma limits is bounded at 4096 entries.
