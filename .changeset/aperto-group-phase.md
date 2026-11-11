---
"@patternmode/aperto": major
---

Media Transitions now finish when the animation does. The transition clone used to finish on a timer that assumed 450ms whenever a transition had no `duration`, so the spring `bouncy` preset was cut mid-flight: the Expanded Media was revealed, or the clone removed, before the spring settled. The clone now finishes on Motion's animation-complete callback, including under reduced motion.

`Aperto.Group` now tracks one explicit phase (closed, opening, open, closing) instead of several flags that could disagree. A controlled `index` is no longer written to internal state when navigating or opening.

Breaking type changes:

- The `MotionProp` type export is removed. Use `MotionPresetName | MotionVariants`.
- `MotionVariants.backdrop` is removed. It was never applied: the overlay always uses its own gentle fade.
