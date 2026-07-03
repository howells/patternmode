# @patternmode/status

## 0.2.2

### Patch Changes

- 9902338: Treat `NaN` `value` input as unknown progress (`status="null"`) instead of
  snapping it to the known-zero Empty step.
- Updated dependencies [f35ca73]
- Updated dependencies [094bdf0]
  - @patternmode/system@0.4.0

## 0.2.1

### Patch Changes

- b8e0048: Consume the shared `@howells/motion` tokens instead of locally duplicated spring
  and easing values, so motion feel stays consistent across the catalog. No public
  API or behavior change: aperto drops its hand-copied token file, status reuses
  `easings.snappy`/`easings.smooth`, and stacksheet sources `snappy`/`subtle` from
  the shared springs while keeping its intentional `stiff` damping fork.
- Updated dependencies [2aa9530]
- Updated dependencies [b8e0048]
  - @patternmode/system@0.3.0
  - @howells/motion@0.1.0

## 0.2.0

### Minor Changes

- 4e959ec: Add animated StatusMark primitives for discrete scaled and symbolic statuses, with default fill and border layers plus optional per-instance colors.

## 0.1.0

### Minor Changes

- Add animated `StatusMark` primitives for discrete scaled and symbolic statuses.
