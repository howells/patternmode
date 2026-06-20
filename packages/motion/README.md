# @howells/motion

Shared motion tokens for Patternmode interfaces — springs, easings, durations,
scales, and semantic presets. Plain data, no runtime dependencies; the values are
structurally compatible with [`motion`](https://motion.dev) transition props.

```tsx
import { durations, easings, presets, springs } from "@howells/motion";

<motion.div transition={springs.soft} />
<motion.div transition={presets.dialogOpen} />
<motion.div transition={{ duration: durations.quick, ease: easings.snappy }} />
```

## Exports

- `springs` — physics spring personalities (`soft`, `subtle`, `natural`,
  `playful`, `bouncy`, `snappy`, `stiff`, `swift`), each `{ type, stiffness, damping, mass }`.
- `easings` / `easingsCSS` — cubic-bezier curves as motion tuples and CSS strings.
- `durations` (seconds) / `durationMs` (milliseconds).
- `scales` — interaction transform multipliers (`press`, `hover`, …).
- `presets` — semantic transition bundles (`dialogOpen`, `fadeIn`, `slideIn`, …)
  plus `shakeKeyframes`.

These are the canonical values for the catalog. Prefer importing them over
re-declaring spring or easing numbers locally, so motion feel stays consistent
across components.
