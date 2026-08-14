# @patternmode/parquet

## 0.1.5

### Patch Changes

- 0312577: Component styles now sit in `@layer components` instead of shipping layerless, so a consumer can override them.

  Both packages emitted their rules outside every cascade layer — 51 style rules in aperto, 12 in parquet, counted by brace depth in the published `dist/styles.css`. A layerless declaration outranks every rule in a named layer regardless of specificity, so a consumer's own Tailwind utility lost to the component rule no matter what they tried, and no amount of extra specificity on their side would have helped. This is the same defect stacksheet carried until 2.0.4.

  Both stylesheets now declare `@layer theme, base, components, utilities;` before `@reference` — the position is load-bearing, because a layer is registered the first time it is seen and a later statement cannot move one that already exists — and wrap their rules in `@layer components`.

  Measured rather than assumed. In a browser, a `.rounded-none` rule in `@layer utilities` now overrides `.patternmode-parquet`'s radius (8px → 0px); against a layerless rule of identical specificity the same utility loses and the radius stays 8px. Rule counts across the change went 103 → 104 and 26 → 27, the single added brace, so nothing moved or was dropped, and aperto's `@media (max-width: 560px)` block is confirmed still inside the layer and still parsing in the page.

- Updated dependencies
  - @patternmode/system@0.7.0

## 0.1.4

### Patch Changes

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

- Updated dependencies [c55e9be]
  - @patternmode/system@0.6.0

## 0.1.3

### Patch Changes

- f7463da: Align the `@instruments/colorscope` dependency range to `^3.7.1` repo-wide (matches
  the resolved version; fixes the workspace range-consistency check).
- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
  - @patternmode/system@0.5.0

## 0.1.2

### Patch Changes

- Updated dependencies [c105cb1]
  - @patternmode/system@0.4.1

## 0.1.1

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

- Updated dependencies [f35ca73]
- Updated dependencies [094bdf0]
  - @patternmode/system@0.4.0

## 0.1.0

### Minor Changes

- 2aa9530: Add `@patternmode/parquet`: a controlled, proportional color mosaic. Each tile's
  area encodes its weight via a squarified treemap, and the layout re-tiles and
  morphs (largest weight always holds the first slot) whenever the palette
  changes — the two-dimensional, read-only counterpart to Swatch's
  `DistributionBar`. Labels are contrast-aware via colorscope, with a `renderTile`
  override.

  Introduces a shared `WeightedColorSegment` (`{ color, value, label? }`) in
  `@patternmode/system` that both Parquet tiles and Swatch distribution segments
  build on; `DistributionBarSegment` now extends it (a non-breaking change).

### Patch Changes

- Updated dependencies [2aa9530]
  - @patternmode/system@0.3.0
