# @patternmode/scrollframe

## 0.2.1

### Patch Changes

- Fix an unbounded render loop in ScrollFrame. `readEdgeState` allocated a fresh object on every measurement, so each ResizeObserver/scroll measurement forced a render even when the scroll metrics were unchanged — and because the observer fires on the very layout changes a render can cause, this could spin the renderer at 100% CPU (reproducible with an always-on, centered horizontal scrollbar). Edge-state updates now bail out when the measured metrics are identical.

## 0.2.0

### Minor Changes

- Align public package documentation, lint configuration, and React 19 release metadata.

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.2.3

## 0.1.4

### Patch Changes

- Switch package linting and formatting to the `@howells/lint` Ox lane.
- Updated dependencies
  - @patternmode/system@0.2.2

## 0.1.3

### Patch Changes

- Configure `@howells/lint` across the monorepo, adopt Biome presets, and reformat source with 2-space indentation.
- Updated dependencies
  - @patternmode/system@0.2.1

## 0.1.2

### Patch Changes

- Add optional native drag scrolling with activation thresholds, ignored descendants, cursor states, and demo documentation.

## 0.1.1

### Patch Changes

- 0e5ada8: Add shared Patternmode sizing, responsive, object sizing, and class composition utilities, then reuse them across component packages.
- Updated dependencies [0e5ada8]
  - @patternmode/system@0.2.0
