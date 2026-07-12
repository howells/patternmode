---
"@howells/motion": minor
---

Add `prefersReducedMotion()`, an SSR-safe check of the user's reduced-motion preference
that returns `false` when no DOM (or no `matchMedia` implementation) is present. This
gives Patternmode a single reduced-motion adapter to import instead of each package
hand-rolling its own `window.matchMedia` check.
