# @howells/motion

## 1.0.0

### Major Changes

- d960b32: Exits ease out. `presets.dialogClose`, `presets.fadeOut` and `presets.slideOut` used the ease-in `customIn` curve, which spends its first frames barely moving; they now use `customOut`.

  - **Breaking:** removed `easings.customIn` and `easingsCSS.customIn`.

### Minor Changes

- d960b32: Added `usePrefersReducedMotion` at `@howells/motion/react`: a live, SSR-safe reduced-motion hook built on `useSyncExternalStore`. It lives on its own subpath so the token entry stays importable from server code; `react` is an optional peer dependency used only by that subpath.

## 0.2.1

### Patch Changes

- Rebuild the component packages with current native TypeScript 7, tsdown, and CSS tooling. Public exports and component behavior are preserved.

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
