# @patternmode/swatch

## 4.1.1

### Patch Changes

- Accept any colorscope from 3.17.0 up, rather than naming each major.

  The peer was `^3.17.0 || ^4.0.0`, so a consumer on colorscope 7 could not
  install these packages without a resolver putting a second, older copy of
  colorscope in the tree beside the one it actually uses. That is what happened
  in Samplize, which is on 7.0.0, and it blocked adoption of both `swatch` and
  `parquet` - the latter declares no colorscope peer of its own but reaches it
  through `system`.

  Naming each major means this range goes stale on every colorscope release and
  gets fixed after it has already cost someone a day. It was last widened for
  colorscope 4 in #2. The four packages between them import five functions -
  `hexLightness`, `hslToRgb`, `rgbToOklab`, `hslToHex`, `hexToOklab`,
  `oklabDistance` from `/math`, `hexToRgb`, `rgbToHex`, `oklabToHex`,
  `oklchToOklab` from `/convert`, and `fitOklabToSrgbGamut` from `/embedding` -
  and every one of those has the same signature in 7.0.0 as in 4.0.0, checked
  declaration by declaration. None of them touch `/match`, which is where
  colorscope 7's breaking change lives - and `/match` is precisely the submodule
  Samplize's own catalogue depends on, for `perceptualBand` and `ProximityBand`.
  So an open range here and a pinned 7.0.0 there coexist by construction rather
  than by luck. Anyone later reaching a patternmode package into `/match` is
  giving that up, and should widen this range back to named majors when they do.

  So the range states the real contract: these are primitive colour conversions
  and they have not moved since 3.17.0. The dev dependency moves to `^7.0.0` in
  all four packages, so the suite runs against the version consumers are on
  rather than one three majors behind.

- Updated dependencies
  - @patternmode/system@0.7.1

## 4.1.0

### Minor Changes

- Accept colorscope 4 alongside 3, and stop `system` bundling its own copy

  `@instruments/colorscope` 4.0.0 changes how colours are assigned to families:
  tans, oaks, corks and camels that used to be classified as orange are now
  brown or beige. None of these packages classify colours — they use `/math`,
  `/convert`, `/embedding` and `/extraction` only — so all four work unchanged
  on either major, and the peer ranges now say so.

  `@patternmode/system` carried colorscope as a regular dependency rather than a
  peer, so it floated its own private copy regardless of what the host
  application pinned, with nothing in a lockfile diff to draw attention to it. A
  host on colorscope 4 was silently running colorscope 3 inside `system`. It is
  now a peer dependency, matching how `swatch`, `halo` and `briolette` already
  declared it.

  Hosts must provide `@instruments/colorscope` themselves. Every current
  consumer already does.

- b512eb0: Adds `transparencyBackdrop` — a visible backdrop behind the fill so a transparent Visual Value reads as transparent.

  A partially transparent fill composites against whatever is behind it, so on a white page a 40% colour renders as a pale solid, indistinguishable from a lighter opaque colour or from an empty swatch. `transparencyBackdrop` puts a chequerboard behind it.

  CONTEXT.md has named this concept and this prop since the Swatch vocabulary was written; the code never had it.

  **Explicit, never inferred.** Alpha cannot be detected across everything a swatch accepts — a gradient, a `color-mix()`, a CSS variable or child media can all carry alpha the component cannot see — so a swatch that guessed would be right sometimes and silently wrong the rest of the time. The domain language already said as much: "depending only on automatic CSS alpha detection" is the thing to avoid.

  Three custom properties tune it — `--patternmode-swatch-backdrop-size`, `-color` and `-base` — all read at the point of use with a `var()` fallback, so a consumer can set them on any ancestor. Declaring defaults on the element itself would have beaten an inherited value and made them inert, which is exactly how verge's knobs failed. The colour defaults resolve through `--border` and `--card`, so the backdrop follows a dark theme with no work.

### Patch Changes

- d419a31: Atmosphere texture no longer narrows wide-gamut colors to sRGB.

  `withAlpha` has two branches: hex colors take an 8-bit alpha suffix, and everything else falls through to `color-mix`. That second branch mixed `in srgb`, which is the path every `oklch()` and `oklab()` value takes — so a consumer passing wide-gamut colors got them clipped to the sRGB gamut on the way through. Nothing threw and the swatch still rendered; it just rendered a duller color than the one it was handed. Now mixes `in oklab`.

  The hex branch is sRGB by construction, so this was the only path where the gamut was live. Swatch's main color path already passes values through untouched and interpolates in oklab.

- Updated dependencies
  - @patternmode/system@0.7.0

## 4.0.0

### Major Changes

- e4c81cb: `motion` is now a peer dependency, not a regular one.

  Shipping it as a regular dependency let a consumer end up with two copies of
  the animation library in one tree. The distribution bar’s drag handles are motion-driven. A duplicate copy is not a second
  instance of the same thing — React context does not cross the boundary, so
  `LazyMotion` and `LayoutGroup` set up by one copy are invisible to components
  rendered against the other, and the failure is silent.

  **Migration: declare `motion` yourself.** Range `^12.40.0`. Every consumer in
  this estate already does, because the package importing patternmode imports
  motion too — so this is a version bump, not an install-graph change.

### Minor Changes

- fbce40b: `DistributionDisplay` is no longer filed inside the editor it is not.

  The read-only sibling lived in `src/DistributionBar/`, was exported from the
  editor's barrel, and was typed on `DistributionBarSegment` — three signals
  telling readers it was the editor. Two separate consumers concluded the catalog
  had no read-only distribution strip and reported the territory unserved.
  - new `DistributionSegment` / `DistributionSegmentUpdate` types, named for the
    shape rather than for the editor. `DistributionBarSegment` and
    `DistributionBarSegmentUpdate` remain as aliases of identical shape, so
    nothing breaks.
  - `DistributionDisplay` moves to its own module; the parts both components draw
    move to a neutral `Distribution` module. No runtime, DOM, class-name or prop
    changes — the styling contract (`patternmode-distribution-bar__*`) is
    untouched.

### Patch Changes

- bdcee77: README documents all 30 exports, not 6 of them.

  `DistributionDisplay`, `getSwatchColorsBackground`,
  `getSwatchAtmosphereBackground`, `getSwatchSizeVariableStyle`,
  `getDistributionTotal`, `getDistributionBoundaryPercent` and the four
  `SWATCH_*` constants shipped undocumented, so npm actively denied they existed
  to anyone checking the first place a consumer looks. Adds a
  `DistributionDisplay` section explaining when it is the right one rather than
  the editor, and an Exports section covering every public name.

## 3.0.0

### Major Changes

- c55e9be: Require `@instruments/colorscope@^3.17.0`, and delete the workaround it makes dead

  colorscope below 3.17.0 assumed its HSL inputs were already in range. They were
  not always, and it did not say so: an unwrapped hue fell straight through
  `hslToRgb`'s `< 60`/`< 120` sector chain into the final 300–360 branch, and a
  negative saturation was used as-is. Both returned a confidently wrong colour with
  no error and no malformed output — `hsl(400, 100%, 40%)`, which is `hsl(40)`, an
  orange, came back a darker magenta. 3.17.0 fixes it at the root: hue wraps,
  saturation and lightness clamp, non-finite throws.
  - **swatch, briolette, halo** raise the colorscope peer floor to `^3.17.0`. This
    is breaking: a consumer resolving an older colorscope no longer satisfies the
    peer.
  - **halo** deletes its own hue-normalizing, 0–100-clamping wrapper around
    `hslToHex`. It existed only to patch this defect, and the guarantee now lives in
    the library. `hslToHex` is still exported and still behaves identically; the
    existing `hslToHex(720, 200, -20) === "#000000"` test passes either way, which
    is what proved the deletion safe. Two other repos had independently written the
    same wrapper — the fix was one layer down, not a shared helper.
  - **system** raises its colorscope floor. This is the package where the defect was
    actually live: `isLightColor` accepts any CSS colour string a consumer passes
    and hands `hsl()` channels straight to `hslToRgb` unguarded, and its result
    drives `data-tone`. It needed no defensive code, only the floor.
  - **parquet** drops `@instruments/colorscope` entirely. It has not imported it
    since moving to `@patternmode/system`'s `isLightColor`; the dependency was
    vestigial. Its README no longer claims contrast is computed "via colorscope"
    when the route is indirect.

  `system` keeps colorscope as a regular dependency rather than moving it to a peer.
  A peer there would force colorscope onto every consumer of stacksheet,
  scrollframe, tags, deck and status — packages that import only `joinClassNames`
  and sizing helpers and never touch colour. colorscope is pure functions, so a
  duplicated copy is wasteful rather than incorrect, unlike a React context; and
  with the floor at `^3.17.0` every version it can resolve carries the fix. The
  proper fix is to split the colour helpers out of `system`, which is a larger
  change than this one.

### Patch Changes

- Updated dependencies [c55e9be]
  - @patternmode/system@0.6.0

## 2.0.0

### Major Changes

- ae67cf0: `@instruments/colorscope` moves from a regular dependency to a **required peer dependency**.

  Swatch previously installed its own copy of `@instruments/colorscope`, which meant an app that also used colorscope directly resolved two copies — Swatch's, floating on its own caret, and the app's. Swatch now shares the host application's single instance.

  **Consumers must declare `@instruments/colorscope` themselves**, satisfying `^3.7.1`. pnpm 8+ and npm 7+ auto-install missing peers, so most installs will succeed without changes; Yarn will warn or fail. Apps already depending on colorscope directly need no new dependency, only to confirm their version satisfies the range.

  This is released as a major because it transfers a dependency responsibility to consumers and changes which colorscope version executes at runtime: Swatch now runs the host's copy rather than one it controlled.

### Patch Changes

- ae67cf0: Read the standard `--border` theme variable instead of `--border-subtle`.

  `--border-subtle` was the one custom property in Patternmode's CSS vocabulary that is not part of the shadcn theme token set, so a consumer wiring up a stock shadcn theme got every other Swatch colour themed and this one silently falling back to a hardcoded hex. It now reads `--border`, which shadcn defines.

  Fallback values are unchanged, so nothing renders differently out of the box. **Consumers who set `--border-subtle` to theme Swatch must set `--border` instead** — and if they already define `--border` for shadcn, Swatch now picks it up with no configuration.

## 1.1.1

### Patch Changes

- f7463da: Align the `@instruments/colorscope` dependency range to `^3.7.1` repo-wide (matches
  the resolved version; fixes the workspace range-consistency check).
- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
  - @patternmode/system@0.5.0

## 1.1.0

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

### Patch Changes

- Updated dependencies [c105cb1]
  - @patternmode/system@0.4.1

## 1.0.0

### Major Changes

- 5985325: Migrate from Radix UI to Base UI (`@base-ui/react`). Radix is in maintenance; Base UI is its successor, and this removes the last `@radix-ui/*` dependency from Swatch.

  **Breaking — `asChild` → `render`.** Swatch's `asChild` prop is replaced by Base UI's `render` prop. This is an API _reshape_ for Swatch specifically, not a rename: previously the content lived inside the slotted child; now the `render` element must be **childless** and the content moves to Swatch's own `children`.

  ```tsx
  // Before
  <Swatch asChild color="#315c4b">
    <button type="button">A1</button>
  </Swatch>

  // After
  <Swatch color="#315c4b" render={<button type="button" />}>
    A1
  </Swatch>
  ```

  If you pass the function form of `render`, you must spread every prop from the first argument (including `ref`) onto your element, or the swatch's data attributes and styling are silently lost. A dev-mode warning fires if the `render` element carries its own children (which would override the swatch's fill layers).

  The exported type `SwatchAsChildProps` is renamed to `SwatchRenderProps`.

## 0.10.4

### Patch Changes

- f35ca73: Add a shared **Distribution Normalization** to `@patternmode/system`: `sanitizeWeight`,
  `deriveDistribution` (sanitized weights, total, and unrounded percentages), and
  `isLightColor` (the perceptual OKLab contrast decision, owning the single lightness
  threshold). Parquet and Swatch's Distribution Bar now derive their total, percentages,
  and light treatment through this one module instead of each re-implementing the math, so
  the same weighted color reads the same way in one and two dimensions.

  Zero-weight handling stays caller policy: Parquet drops zero-weight Tiles, while a
  Distribution Bar keeps an identity-bearing Distribution Segment at zero width. No public
  API or behavior change for either consumer. `@patternmode/system` now depends on
  `@instruments/colorscope` for the lightness math.

- 30a30af: Component review fixes for Swatch and DistributionBar.
  - `blend="smooth"` now respects `ratio` weights: each stop is positioned at
    the cumulative midpoint of its ratio share (a 90/10 palette centers at 45%
    and 95%) while keeping OKLab interpolation, so a Weighted Palette Swatch
    reads proportionally in smooth mode. Equal, missing, or all-zero ratios
    fall back to the previous even spacing.
  - Swatch tone detection now understands more color formats via
    `@patternmode/system`'s shared `isLightColor` (see the system changeset) —
    light fills in `rgb()`/`hsl()`/`oklch()`/named forms no longer render an
    invisible selected check.
  - A consumer-provided `role` is now applied to the rendered Swatch wrapper
    instead of being silently dropped.
  - DistributionBar boundary handles expose slider semantics: `role="slider"`,
    `aria-valuemin`/`aria-valuemax`, `aria-valuenow` (the left segment's share
    of the adjacent pair), an `aria-valuetext` like "Woody 60%, Citrus 40%",
    and `aria-orientation="horizontal"`.
  - The DistributionBar root sets `data-dragging` while a handle drag is
    active and segment width transitions are disabled under it, so Live
    Distribution Adjustment tracks the pointer instead of fighting the 480ms
    settle transition.
  - The Swatch Remove Affordance is now visible under `@media (hover: none)`
    so touch users can discover removal.
  - Packaging: the `"use client"` directive survives into `dist/index.mjs`, so
    the package imports cleanly from React Server Components.

- Updated dependencies [f35ca73]
- Updated dependencies [094bdf0]
  - @patternmode/system@0.4.0

## 0.10.3

### Patch Changes

- 2aa9530: Add `@patternmode/parquet`: a controlled, proportional color mosaic. Each tile's
  area encodes its weight via a squarified treemap, and the layout re-tiles and
  morphs (largest weight always holds the first slot) whenever the palette
  changes — the two-dimensional, read-only counterpart to Swatch's
  `DistributionBar`. Labels are contrast-aware via colorscope, with a `renderTile`
  override.

  Introduces a shared `WeightedColorSegment` (`{ color, value, label? }`) in
  `@patternmode/system` that both Parquet tiles and Swatch distribution segments
  build on; `DistributionBarSegment` now extends it (a non-breaking change).

- b8e0048: Use `@instruments/colorscope` for color math instead of hand-rolled helpers, and
  upgrade colorscope to `^3.5.0` (the previously pinned `2.0.1` was deprecated).
  Swatch now derives light/dark tone from perceptual OKLab lightness and builds
  atmosphere alpha via colorscope conversion; Halo delegates its HSL→hex
  conversion to colorscope while keeping its defensive input clamping. Halo and
  atmosphere output are unchanged; only swatch tone selection on borderline colors
  may shift to the perceptual model.
- Updated dependencies [2aa9530]
  - @patternmode/system@0.3.0

## 0.10.2

### Patch Changes

- Swatch gains a `blend` prop for multi-color fills: `"step"` (default, the existing hard bands) or `"smooth"`, which renders the colors as a continuous OKLab-interpolated gradient ramp — for surfaces that represent bounded regions of color rather than discrete swatches.

## 0.10.1

### Patch Changes

- Distribution segment selection is now a pin, not a frame: the selected segment shows a small white ring with its own color through the middle — the same gesture as the bar's drag handles — instead of a hard 2px accent inset that read as a box.

## 0.10.0

### Minor Changes

- Add an `asChild` prop to `Swatch`. When set, the swatch renders through its single child element (Radix Slot pattern) — merging its className, style (including the size and fill CSS variables), `data-*` attributes, and remaining props onto the child and injecting the fill/scrim layers inside it — instead of emitting its own `<figure>` wrapper. Use it when the swatch must be an interactive element such as a `<button>` cell in a color matrix. `asChild` requires a single element child and does not support `onRemove`.

## 0.9.3

### Patch Changes

- Align public package documentation, lint configuration, and React 19 release metadata.
- Updated dependencies
  - @patternmode/system@0.2.3

## 0.9.2

### Patch Changes

- Switch package linting and formatting to the `@howells/lint` Ox lane.
- Updated dependencies
  - @patternmode/system@0.2.2

## 0.9.1

### Patch Changes

- Configure `@howells/lint` across the monorepo, adopt Biome presets, and reformat source with 2-space indentation.
- Updated dependencies
  - @patternmode/system@0.2.1

## 0.9.0

### Minor Changes

- `Swatch` gains an `atmosphere` texture for qualitative color blending, with density and gravity controls for shaping the color pools.

## 0.8.0

### Minor Changes

- `Swatch` gains a `flat` prop that renders a precise color block — no scrim gradient and no drop shadow — for data-visualisation cells where the fill must read as the exact color value.

## 0.7.1

### Patch Changes

- Fix `block` shape collapsing to zero width: it now fills its container (display:block, 100% width/height) so callers can size it with a single dimension (e.g. a height utility) or a flex utility.

## 0.7.0

### Minor Changes

- `Swatch` gains a `block` shape — an unconstrained swatch that fills the box the caller gives it (full-width rows, flex band segments, hero fills), with size and corner radius controlled via className/parent.

## 0.6.0

### Minor Changes

- `DistributionBar` accepts a `legend` prop (`"segments" | false`) to hide the per-segment legend, matching `DistributionDisplay`.

## 0.5.0

### Minor Changes

- `DistributionBar` and `DistributionDisplay` track height and segment corner radius are now themeable via `--patternmode-distribution-height` (default 40px) and `--patternmode-distribution-radius` (default 999px), so consumers can render compact or square-cornered bars without overriding internals.

## 0.4.1

### Patch Changes

- `DistributionDisplay` renders the selectable variant as a semantic `fieldset` (implicit group role) instead of a `div[role=group]`.

## 0.4.0

### Minor Changes

- `DistributionDisplay` gains optional segment selection: pass `onSegmentSelect` to render segments as buttons and `selectedSegmentId` to mark one with a ring. Segment width changes now animate (respecting `prefers-reduced-motion`), so distribution updates reveal smoothly.

## 0.3.0

### Minor Changes

- Add `DistributionDisplay` for non-interactive weighted distribution visuals.

## 0.2.1

### Patch Changes

- Update `DistributionBar` boundary handles so segment values and dimensions change continuously while dragging.

## 0.2.0

### Minor Changes

- Add `DistributionBar` for controlled weighted visual distributions with draggable boundary handles.
- Add distribution helpers for moving boundaries, updating segment metadata, and removing segments.
- Extend Swatch sizes through `7xl`.

### Patch Changes

- Make removable swatches expose an accessible remove request affordance.
- Document Swatch and Distribution Bar domain terms in `CONTEXT.md`.

## 0.1.1

### Patch Changes

- 0e5ada8: Add shared Patternmode sizing, responsive, object sizing, and class composition utilities, then reuse them across component packages.
- Updated dependencies [0e5ada8]
  - @patternmode/system@0.2.0
