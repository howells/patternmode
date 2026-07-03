---
"@patternmode/briolette": patch
---

Review fixes for the sphere's pointer, motion, and keyboard behavior.

- Drag sessions only start for the primary button, and a move arriving with
  no button held ends the session — a missed pointerup (or a right-click's
  context menu) can no longer leave the sphere rotating on hover.
- The palette is memoized on `(faces, activeView)` instead of being rebuilt
  on every idle-drift frame (320 OKLab conversions per frame at
  `density="brilliant"`).
- Pointerdown now focuses the keyboard stage, so "drag or use arrow keys"
  works right after a click instead of only after tabbing.
- `prefers-reduced-motion` is tracked live: enabling it while mounted stops
  idle drift and inertia and snaps any in-flight centering tween.
- Escape is consumed (preventDefault + stopPropagation) only when it clears
  a selection, so one press can't clear the color and close a containing
  dialog at the same time; with nothing selected it propagates to the host.
- README: documented the missing `maxDepth` prop.

Also includes the packaging fix already applied on `src/index.ts`: the
`"use client"` directive survives into `dist/index.mjs`, so the package
imports cleanly from React Server Components.
