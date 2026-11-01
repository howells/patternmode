# @patternmode/stacksheet

## 3.1.1

### Patch Changes

- Updated dependencies [e8d30a9]
  - @patternmode/system@0.8.1

## 3.1.0

### Minor Changes

- 6203700: Sheets move like a native iOS sheet stack.

  - Drags run on Motion values instead of React state, so a drag never re-renders.
  - The release velocity carries into the spring, whether a Sheet dismisses, snaps to a Snap Point or returns to rest. `close()` and `pop()` send a Sheet out the way it came in, and interrupting one (pushing during a close, closing during an entrance) carries on from where the Sheet is.
  - The backdrop and the Sheets beneath follow the top Sheet's progress continuously: as it enters, as it is dragged and as it leaves.
  - A drag can start anywhere on a Panel, including links, buttons, `Sheet.Body` and Classic Layout content. A press that moves under 10px is still a tap, and the click after a drag is swallowed. Text fields, selects, textareas, editable content, `draggable="true"` elements and anything marked `data-stacksheet-no-drag` never start a drag. On touch, the Sheet claims the gesture before the browser starts scrolling. Pulling down on scrolled content scrolls it; once the content is at the top, the pull moves the Sheet.
  - Dragging past the most open position stretches with a short scroll-view rubber band instead of stopping dead.
  - Reduced motion is now a crossfade in place (200ms in, 150ms out). The Sheets beneath change position without travelling, and drag still works. It also follows a change to the setting while the page is open.
  - Panels are no longer translucent while moving.
  - Panels pad their edges with `env(safe-area-inset-*)`: the bottom of bottom Sheets, and the top, bottom and outer edge of side Panels.
  - `Sheet.Header` is a navigation bar by default: Back at the leading edge, the Title centred on one line, Close at the trailing edge, each placed by a data attribute (`data-stacksheet-back`, `-title`, `-close`, `-description`) whatever their order. A Description in the header gets a centred row of its own under the bar. A `Sheet.Close` inside the header joins the row instead of floating in the corner.
  - Focus returns to where it was in a Sheet when the Sheet above it is popped.
  - New `height` option (`SheetHeight`: `"full" | "fit"`). Set it per Sheet (`open(Filters, {}, { height: "fit" })`) or as a default in `createStacksheet({ height: "fit" })`. A fitted bottom Sheet sizes to its content, up to 85dvh, and animates when its content changes height. `SheetHeight` and `SheetPresentationOptions` are now exported.
  - Fix: importing `styles.css` into a Tailwind v4 app no longer overrides the app's responsive utilities, such as `hidden sm:table-cell`. The package's utilities now ship inside `@layer components`, and classes that only appeared in tests or in prose (`hidden`, `transform`, `transition` and others) are no longer generated. Tailwind v4 apps can instead skip `styles.css` and add `@source` for the package's `dist`.
  - The default layout's Back and Close sit in a navigation bar above the content, using `Sheet.Header`, instead of floating over the content's top corners, where they covered its first line.
  - Built-in controls behave like native ones on touch: no grey tap flash on the overlay or inside a Sheet, no long-press text selection or callout on Back, Close and the handles, no double-tap delay, and Back and Close brighten while pressed.

  Behaviour changes to check when upgrading: links and buttons inside a Sheet can now start a drag, and `Sheet.Body` no longer opts out of dragging. Add `data-stacksheet-no-drag` to any element that needs its own gestures. Panels now clear the safe areas, so remove any padding you added for them yourself. A bottom Sheet runs to the screen edge, and its scrolling content passes under the home indicator and ends clear of it: `Sheet.Body` and the default layout handle this, and a composable Sheet with its own scroller adds `padding-bottom: var(--stacksheet-safe-bottom)` to that scroller's content. The Panel sets `-webkit-tap-highlight-color: transparent`, which its contents inherit, so give your own buttons and links inside a Sheet an `:active` state.

## 3.0.7

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.8.0

## 3.0.6

### Patch Changes

- f45a3e1: Update @base-ui/react, focus-trap-react and zustand to the latest release.

## 3.0.5

### Patch Changes

- Rebuild the component packages with current native TypeScript 7, tsdown, and CSS tooling. Public exports and component behavior are preserved.
- Updated dependencies
  - @howells/motion@0.2.1
  - @patternmode/system@0.7.2

## 3.0.4

### Patch Changes

- 5dde69f: Accept Motion versions from 12.40.0 onward instead of blocking newer majors at installation. The development workspace now exercises Motion 13. Consumers need no API migration.

## 3.0.3

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.7.1

## 3.0.2

### Patch Changes

- 714b5ed: Make classic-layout sheet content keyboard-focusable and give its scroll region
  an accessible name.

## 3.0.1

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.7.0

## 3.0.0

### Major Changes

- 705d788: `motion` is now a peer dependency, not a regular one.

  Shipping it as a regular dependency let a consumer end up with two copies of
  the animation library in one tree. Sheet enter/exit animations run through the same context. A duplicate copy is not a second
  instance of the same thing — React context does not cross the boundary, so
  `LazyMotion` and `LayoutGroup` set up by one copy are invisible to components
  rendered against the other, and the failure is silent.

  **Migration: declare `motion` yourself.** Range `^12.40.0`. Every consumer in
  this estate already does, because the package importing patternmode imports
  motion too — so this is a version bump, not an install-graph change.

## 2.0.5

### Patch Changes

- Updated dependencies [c55e9be]
  - @patternmode/system@0.6.0

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
