# @patternmode/aperto

## 0.2.1

### Patch Changes

- b8e0048: Consume the shared `@howells/motion` tokens instead of locally duplicated spring
  and easing values, so motion feel stays consistent across the catalog. No public
  API or behavior change: aperto drops its hand-copied token file, status reuses
  `easings.snappy`/`easings.smooth`, and stacksheet sources `snappy`/`subtle` from
  the shared springs while keeping its intentional `stiff` damping fork.
- Updated dependencies [b8e0048]
  - @howells/motion@0.1.0

## 0.2.0

### Minor Changes

- Align public package documentation, lint configuration, and React 19 release metadata.

## 0.1.4

### Patch Changes

- Switch package linting and formatting to the `@howells/lint` Ox lane.

## 0.1.3

### Patch Changes

- Configure `@howells/lint` across the monorepo, adopt Biome presets, and reformat source with 2-space indentation.

## 0.1.2

### Patch Changes

- Preserve expanded media aspect ratios, restore focus to the opening thumbnail on close, and use custom media renderers for transition clones.

## 0.1.1

### Patch Changes

- 8b66680: Add the new swipeable deck/card-stack package and let Aperto primitive content opt out of centered positioning with `placement="none"`.
