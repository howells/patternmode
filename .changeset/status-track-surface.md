---
"@patternmode/status": minor
---

`StatusMark` now reads correctly on a dark ground.

The inactive track was tinted toward a hardcoded `white`, which is only right while the mark sits on white. On a dark ground that track resolved to near-white and outshone the arc, so every mark read as full whatever its progress — the component was effectively unusable in dark mode without passing `trackColor` to every instance.

The ground is now a custom property, `--patternmode-status-surface`, and one formula derives the track for all three tones:

```css
--patternmode-status-surface: var(--background, white);
--patternmode-status-track: color-mix(
  in oklch,
  var(--patternmode-status-color) 12%,
  var(--patternmode-status-surface)
);
```

- A themed UI needs no wiring: the surface resolves from the shadcn `--background` canvas token, so light and dark are both correct.
- An unthemed light UI is unchanged — the fallback is still `white`.
- Any other UI can set `--patternmode-status-surface` directly, and a mark on a raised surface can point it at that surface (`--patternmode-status-surface: var(--card)`).

The `trackColor` prop still overrides everything, per instance.

One default moves: the `neutral` tone's track was the literal `oklch(0.9 0.012 88)` and is now derived like the others, resolving to `oklch(0.904 0.006 92)` on white — the same pale grey to the eye (lightness within 0.004), slightly less chroma. Note that `neutral`'s *arc* colour remains a fixed dark default, so a dark UI using `neutral` should still set `--patternmode-status-color` (or `color`) itself.
