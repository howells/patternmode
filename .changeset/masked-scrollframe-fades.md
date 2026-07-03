---
"@patternmode/scrollframe": minor
---

Add `fadeMode="mask"` for scroll-edge fades over non-uniform backdrops.

The default `"color"` mode paints a `fadeColor` gradient over the content,
which only matches solid surfaces. In `"mask"` mode the viewport masks its own
content at the scroll edges instead, so translucent, blurred, image, or tinted
backdrops show through the fade. Masking keeps the measured behavior of
painted fades — each edge's ramp collapses when that edge is rested against or
unreachable, animated via registered `@property` transitions — and honors the
existing `fades` edge config, `fadeSize`, both axes, and reduced motion.
`ScrollFrame.Root` now also accepts `fadeMode` and `fades` so custom
compositions can opt in; registered viewports handle the masking.

Also fixes packaging: the `"use client"` directive now survives into
`dist/index.mjs` (it previously lived on inner modules only, which tsdown
drops), so the package imports cleanly from React Server Components.
