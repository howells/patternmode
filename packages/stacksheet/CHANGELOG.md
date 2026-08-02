# @patternmode/stacksheet

## 2.0.4

### Patch Changes

- f4ad378: Declare Tailwind's canonical layer order so this stylesheet cannot invert a consuming app's cascade.

  A CSS layer is registered the first time it is seen, and a later `@layer …;` statement cannot move one that already exists. Stacksheet is the only Patternmode package that opens `@layer utilities`, so loading its stylesheet before the app's Tailwind entry registered `utilities` early and left the app's `components` appended _after_ it — inverting the cascade, with component styles beating utilities.

  The sheet now declares `@layer theme, base, components, utilities;` before its imports, which fixes the order wherever it lands. It is a no-op when the app declares the order itself, since the first declaration wins.

  This is distinct from the layerless-utilities fix in 2.0.3, which put this package's own rules into `@layer utilities`. That change was necessary but not sufficient: it could not affect where `utilities` sat relative to the app's other layers. Reported by the rulework project, who ranked this above the original fix.

  Packages that only open `@layer components` are unaffected and unchanged — registering `components` early still leaves `utilities` last.

## 2.0.3

### Patch Changes

- ae67cf0: Emit this package's Tailwind utilities inside `@layer utilities` instead of layerless.

  `src/styles.css` imported `tailwindcss/utilities` on its own. Tailwind's layer declaration lives in its main entry, so importing the utilities file directly emitted every rule **layerless** — and a layerless declaration outranks every rule in a named layer regardless of specificity.

  The practical effect: this stylesheet's `.opacity-0 { opacity: 0 }` beat a consuming application's `group-hover:opacity-100`, which sits in `@layer utilities`. **Any app loading this sheet had its hover- and focus-revealed controls silently stuck invisible** — the reveal simply never won the cascade. It did not reproduce in the package's own Storybook, because the sheet is not loaded there, and no static check could see it; it was found by measuring the live DOM in a consuming app, where it had disabled 51 controls at once.

  Reported by the rulework project, whose row controls it broke.

  If you added a workaround for this — raising specificity, `!important`, or revealing through a custom property instead of `opacity-0` — it is no longer required, though a custom-property reveal remains a robust pattern and needs no change.

## 2.0.2

### Patch Changes

- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
  - @patternmode/system@0.5.0
  - @howells/motion@0.2.0

## 2.0.1

### Patch Changes

- c105cb1: Replace regex named capture groups with indexed groups so vendored copies compile under consumer TypeScript configs targeting ES2017 (named groups require ES2018+). No behavior change.
- Updated dependencies [c105cb1]
  - @patternmode/system@0.4.1

## 2.0.0

### Major Changes

- 5985325: Migrate from Radix UI to Base UI (`@base-ui/react`). Radix is in maintenance; Base UI is its successor. Stacksheet's hand-rolled dialog behaviour (focus trap, scroll lock, escape/back handling) is unchanged — only the Radix Portal and ScrollArea it used internally, plus the `asChild` prop on sheet parts, move to Base UI.

  **Breaking — `asChild` → `render`.** Every sheet part (`Sheet.Header`, `Sheet.Body`, `Sheet.Title`, `Sheet.Close`, etc.) replaces `asChild` with Base UI's `render` prop.

  ```tsx
  // Before
  <Sheet.Close asChild>
    <MyButton>Done</MyButton>
  </Sheet.Close>

  // After
  <Sheet.Close render={<MyButton />}>Done</Sheet.Close>
  ```

  If you use the function form of `render`, spread every prop from the first argument (including `ref`) onto your element or its wiring is silently lost.

  Other changes:
  - The body scroll area now emits Base UI's ScrollArea DOM. Its viewport no longer carries a `data-radix-scroll-area-viewport` attribute or the Radix inner `display:table` wrapper — restyle any selectors that targeted those.
  - Scrollbar visibility is now CSS-driven from `data-hovering` / `data-scrolling`.
  - The internal focus-trap now also recognises Base UI overlays (`data-base-ui-focus-guard`, `[data-open]` dialogs) layered on top of a sheet; the Radix selectors are kept for third-party Radix content.

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
