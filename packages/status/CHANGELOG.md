# @patternmode/status

## 0.3.0

### Minor Changes

- eda5188: Component CSS now reads the standard shadcn theme variable vocabulary instead of this project's earlier ad hoc token names. The previous hex defaults are preserved as fallback values on every `var(...)` reference, so nothing renders differently out of the box — only the custom property names that drive the look changed.

  | Old name         | New name             |
  | ---------------- | -------------------- |
  | `--ink`          | `--foreground`       |
  | `--muted`        | `--muted-foreground` |
  | `--accent`       | `--ring`             |
  | `--accent-soft`  | `--accent`           |
  | `--surface`      | `--card`             |
  | `--surface-soft` | `--muted`            |
  | `--border-soft`  | `--border-subtle`    |
  | `--quiet`        | `--muted-foreground` |

  Consumers who set any of the old custom properties (`--ink`, `--muted`, `--accent`, `--surface`, `--surface-soft`, `--border-soft`, `--quiet`) to theme these components must migrate to the new names above. Consumers already using shadcn's own theme variables (`--foreground`, `--muted-foreground`, `--ring`, `--accent`, `--card`, `--muted`, `--border-subtle`) will now pick these components up automatically with no changes required.

- a1e43f1: `StatusMark` now reads correctly on a dark ground.

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

  One default moves: the `neutral` tone's track was the literal `oklch(0.9 0.012 88)` and is now derived like the others, resolving to `oklch(0.904 0.006 92)` on white — the same pale grey to the eye (lightness within 0.004), slightly less chroma. Note that `neutral`'s _arc_ colour remains a fixed dark default, so a dark UI using `neutral` should still set `--patternmode-status-color` (or `color`) itself.

### Patch Changes

- Updated dependencies [c105cb1]
  - @patternmode/system@0.4.1

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
