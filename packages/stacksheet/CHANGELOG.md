# @patternmode/stacksheet

## 1.4.0

### Minor Changes

- 6db8aae: Keyboard-aware bottom sheets, handle placement, and a lighter default chrome.
  - **`repositionInputs`** (default `true`): when a field inside a mobile bottom
    sheet is focused, the sheet clears the on-screen keyboard instead of relying
    on the browser's native scroll-into-view. Plain sheets stay anchored at the
    bottom and pad their content up — the panel surface extends under the
    keyboard so no backdrop gap shows above iOS Safari's floating chrome.
    Snap-point sheets lift via `bottom` and keep their viewport-driven sizing.
    Focus-gated (fields inside the sheet only) and rAF-throttled.
  - **`handle: "inside" | "outside"`** (default `"inside"`): `"outside"` floats
    the bottom sheet's drag handle above the panel on the backdrop.
  - **Header bar removed.** Classic mode now renders floating corner controls
    (close top-right, back top-left when nested) instead of a bordered header
    row; `Sheet.Header` loses its fixed height and divider, and `Sheet.Close`
    floats in the panel corner by default. `classNames.header` is deprecated and
    ignored.
  - `Sheet.Handle` is side-aware: it renders nothing on left/right sheets, whose
    handle lives on the interior-facing edge. The auto bottom handle no longer
    renders in composable layout — `Sheet.Handle` owns the pill there.
  - The panel container no longer shows a focus outline when focused
    programmatically on open.

## 1.3.8

### Patch Changes

- fd7e708: Accessibility, dismissal, and drag fixes from the component review:
  - Respect `closeOnEscape: false` on Chromium — the CloseWatcher is no longer created when Escape dismissal is disabled (this also disables Android back-gesture dismissal in that configuration, since CloseWatcher cannot distinguish sources).
  - Ignore Escape presses already consumed by an inner layer (popover, select) instead of also dismissing the sheet, and only `preventDefault()` when the sheet actually dismisses.
  - Animate the background un-scale on close — the `shouldScaleBackground` close path previously snapped back instantly; it now transitions out with a `transitionend` listener plus timeout fallback.
  - Composable sheets without a `Sheet.Title` are no longer unnamed dialogs: `Sheet.Title` now registers its presence, and a sheet's `ariaLabel` option is used as `aria-label` when no title is mounted (no more dangling `aria-labelledby`).
  - Move initial focus into the sheet panel on open so screen readers announce the dialog.
  - Defer `setPointerCapture` until a drag actually commits past the dead zone, so plain taps on non-native clickable children keep their clicks.
  - Compute swipe release velocity from a sliding ~100ms window of pointer samples instead of the whole-gesture average, so pause-then-flick gestures dismiss as expected.
  - Memoize the sheet panel context so `Sheet.Description`/`Sheet.Title` effects stop re-running on every drag re-render.
  - Fall back to a generated id when `crypto.randomUUID` is unavailable (non-secure origins such as plain-HTTP LAN dev servers).
  - Correct the `snapPointIndex` docs: it is resolved once at `createStacksheet()` and cannot be changed after creation (it is not a controlled prop).

- Updated dependencies [f35ca73]
- Updated dependencies [094bdf0]
  - @patternmode/system@0.4.0

## 1.3.7

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

## 1.3.6

### Patch Changes

- Align public package documentation, lint configuration, and React 19 release metadata.
- Updated dependencies
  - @patternmode/system@0.2.3

## 1.3.5

### Patch Changes

- Switch package linting and formatting to the `@howells/lint` Ox lane.
- Updated dependencies
  - @patternmode/system@0.2.2

## 1.3.4

### Patch Changes

- Configure `@howells/lint` across the monorepo, adopt Biome presets, and reformat source with 2-space indentation.
- Updated dependencies
  - @patternmode/system@0.2.1

## 1.3.3

### Patch Changes

- 0e5ada8: Add shared Patternmode sizing, responsive, object sizing, and class composition utilities, then reuse them across component packages.
- Updated dependencies [0e5ada8]
  - @patternmode/system@0.2.0
