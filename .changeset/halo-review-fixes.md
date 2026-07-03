---
"@patternmode/halo": patch
---

Review fixes: real keyboard support, pointer guards, and canonical red.

- The hue slider is now functional — the range input's dead `readOnly` (which
  doesn't apply to range inputs) is replaced with an `onChange` that updates
  hue, so its arrow keys work.
- The saturation/lightness pad is keyboard-operable: focusable
  (`tabIndex={0}`), `role="slider"` with an `aria-valuetext` announcing
  "Saturation X%, Lightness Y%", ArrowLeft/Right adjust saturation and
  ArrowUp/Down adjust lightness (Shift for 10× steps), clamped to the pad's
  pointer range. The shipped `:focus-visible` styles now actually fire — the
  arc's ring is drawn when its hidden slider has focus.
- Pointer guards: pointerdown ignores non-primary buttons (right-click no
  longer commits a color), and the move handlers drop the `buttons === 1`
  fallback — pointer capture already delivers legitimate drags, so drags
  that started elsewhere are ignored.
- `haloAngleToHue` emits the canonical `0` instead of `360` at the arc's red
  end and in the gap snap, so consumers see one red and `aria-valuenow`
  stays within 0–359.
- README: documented the full prop surface (`value`, `onChange`,
  `placement`, `label`, `showValue`).

Also includes the packaging fix already applied on `src/index.ts`: the
`"use client"` directive survives into `dist/index.mjs`, so the package
imports cleanly from React Server Components.
