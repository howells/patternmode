# @patternmode/status

## 0.4.1

### Patch Changes

- d419a31: `data-testid` no longer ships in the rendered DOM; `data-slot` is the hook.

  Five packages emitted test hooks into every consumer's production markup. In halo, scrollframe and tags the attribute sat directly beside a `data-slot` carrying the same value, so it was pure duplication. In briolette and status there was no slot at all, so those elements now gain the `data-slot` they should always have had: `briolette-sphere`, `status-mark-fill`, `status-mark-border`, `status-mark-fill-sweep`, `status-mark-null`.

  ScrollFrame's fade parts lose `data-testid="scrollframe-fade-<axis>-<edge>"`, which only ever restated the `data-axis` and `data-edge` attributes they already carry — query those instead.

  **If you select any of these in your own tests, switch to `data-slot`.** It is the documented convention across this catalog and the one to rely on. `@patternmode/tags` is the single case with no direct replacement: the selected-tag scroll region passed its hook through to `ScrollFrame`, which sets its own `data-slot` after spreading consumer props, so the value never survived to the DOM. Target `.patternmode-tag-selector__scroll`, which is part of the published styling contract.

- Updated dependencies
  - @patternmode/system@0.7.0

## 0.4.0

### Major Changes

- bfd41cb: `motion` is now a peer dependency, not a regular one.

  Shipping it as a regular dependency let a consumer end up with two copies of
  the animation library in one tree. The progress mark’s transitions are motion-driven. A duplicate copy is not a second
  instance of the same thing — React context does not cross the boundary, so
  `LazyMotion` and `LayoutGroup` set up by one copy are invisible to components
  rendered against the other, and the failure is silent.

  **Migration: declare `motion` yourself.** Range `^12.40.0`. Every consumer in
  this estate already does, because the package importing patternmode imports
  motion too — so this is a version bump, not an install-graph change.

## 0.3.2

### Patch Changes

- Updated dependencies [c55e9be]
  - @patternmode/system@0.6.0

## 0.3.1

### Patch Changes

- Republish. The 0.3.0 tarball was cut with `npm publish`, which does not rewrite pnpm's `workspace:*` and `catalog:` protocols, so its manifest shipped `"@howells/motion": "workspace:*"`, `"@patternmode/system": "workspace:*"` and `"motion": "catalog:"` — unresolvable for anyone installing it. 0.3.0 is deprecated; this release carries the same code with a correct manifest.
- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
  - @patternmode/system@0.5.0
  - @howells/motion@0.2.0

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
