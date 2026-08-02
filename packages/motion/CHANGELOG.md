# @howells/motion

## 0.2.0

### Minor Changes

- f7463da: Add `prefersReducedMotion()`, an SSR-safe check of the user's reduced-motion preference
  that returns `false` when no DOM (or no `matchMedia` implementation) is present. This
  gives Patternmode a single reduced-motion adapter to import instead of each package
  hand-rolling its own `window.matchMedia` check.

## 0.1.0

### Minor Changes

- b8e0048: Publish `@howells/motion` as a public package. It provides the canonical motion
  tokens for the catalog — springs, easings (tuple + CSS), durations, scales, and
  semantic presets — as plain data with no runtime dependencies. Previously an
  internal, unpublished workspace package.
