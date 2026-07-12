---
"@patternmode/scrollframe": patch
"@patternmode/briolette": patch
---

Replace the local hand-rolled reduced-motion checks with the shared
`prefersReducedMotion()` adapter from `@howells/motion`. ScrollFrame drops its
`getReducedMotionPreference` helper and Briolette drops its internal
`prefersReducedMotion`, so both now resolve the one-shot preference through one seam.
Briolette's live reduced-motion media-query subscription inside `useIdleMotion` is
unchanged — that is the reactive concept, not the one-shot check.
