# @patternmode/briolette

## 0.7.1

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

## 0.7.0

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

### Patch Changes

- d419a31: `data-testid` no longer ships in the rendered DOM; `data-slot` is the hook.

  Five packages emitted test hooks into every consumer's production markup. In halo, scrollframe and tags the attribute sat directly beside a `data-slot` carrying the same value, so it was pure duplication. In briolette and status there was no slot at all, so those elements now gain the `data-slot` they should always have had: `briolette-sphere`, `status-mark-fill`, `status-mark-border`, `status-mark-fill-sweep`, `status-mark-null`.

  ScrollFrame's fade parts lose `data-testid="scrollframe-fade-<axis>-<edge>"`, which only ever restated the `data-axis` and `data-edge` attributes they already carry — query those instead.

  **If you select any of these in your own tests, switch to `data-slot`.** It is the documented convention across this catalog and the one to rely on. `@patternmode/tags` is the single case with no direct replacement: the selected-tag scroll region passed its hook through to `ScrollFrame`, which sets its own `data-slot` after spreading consumer props, so the value never survived to the DOM. Target `.patternmode-tag-selector__scroll`, which is part of the published styling contract.

## 0.6.0

### Minor Changes

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

## 0.5.0

### Minor Changes

- ae67cf0: `@instruments/colorscope` moves from a regular dependency to a **required peer dependency**.

  Briolette previously installed its own copy of `@instruments/colorscope`, so an app using colorscope directly resolved two copies. Briolette now shares the host application's single instance.

  **Consumers must declare `@instruments/colorscope` themselves**, satisfying `^3.7.1`. pnpm 8+ and npm 7+ auto-install missing peers, so most installs will succeed without changes; Yarn will warn or fail. Apps already depending on colorscope directly need no new dependency, only to confirm their version satisfies the range.

  Briolette imports `fitOklabToSrgbGamut` from `@instruments/colorscope/embedding`, so the `^3.7.1` floor is a real API requirement rather than a nominal one.

### Patch Changes

- ae67cf0: Read `--font-mono` instead of `--mono` for the numeric readout's font stack.

  `--mono` is not part of the shadcn or Tailwind theme vocabulary; `--font-mono` is, and Tailwind v4 already defines it. Briolette's readout now picks up a host application's mono stack with no configuration.

  The fallback font list is unchanged, so nothing renders differently out of the box. **Consumers who set `--mono` to style the readout must set `--font-mono` instead.**

  This token escaped the earlier vocabulary migration because it is written as a multi-line `var()` call, which the repository's token check could not see. That check has been fixed in the same change.

## 0.4.1

### Patch Changes

- f7463da: Replace the local hand-rolled reduced-motion checks with the shared
  `prefersReducedMotion()` adapter from `@howells/motion`. ScrollFrame drops its
  `getReducedMotionPreference` helper and Briolette drops its internal
  `prefersReducedMotion`, so both now resolve the one-shot preference through one seam.
  Briolette's live reduced-motion media-query subscription inside `useIdleMotion` is
  unchanged — that is the reactive concept, not the one-shot check.
- f7463da: Align the `@instruments/colorscope` dependency range to `^3.7.1` repo-wide (matches
  the resolved version; fixes the workspace range-consistency check).
- Updated dependencies [f7463da]
  - @howells/motion@0.2.0

## 0.4.0

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

## 0.3.2

### Patch Changes

- ee4b7c4: Review fixes for the sphere's pointer, motion, and keyboard behavior.
  - Drag sessions only start for the primary button, and a move arriving with
    no button held ends the session — a missed pointerup (or a right-click's
    context menu) can no longer leave the sphere rotating on hover.
  - The palette is memoized on `(faces, activeView)` instead of being rebuilt
    on every idle-drift frame (320 OKLab conversions per frame at
    `density="brilliant"`).
  - Pointerdown now focuses the keyboard stage, so "drag or use arrow keys"
    works right after a click instead of only after tabbing.
  - `prefers-reduced-motion` is tracked live: enabling it while mounted stops
    idle drift and inertia and snaps any in-flight centering tween.
  - Escape is consumed (preventDefault + stopPropagation) only when it clears
    a selection, so one press can't clear the color and close a containing
    dialog at the same time; with nothing selected it propagates to the host.
  - README: documented the missing `maxDepth` prop.

  Also includes the packaging fix already applied on `src/index.ts`: the
  `"use client"` directive survives into `dist/index.mjs`, so the package
  imports cleanly from React Server Components.

## 0.3.1

### Patch Changes

- b8e0048: Use `@instruments/colorscope` for color math instead of hand-rolled helpers, and
  upgrade colorscope to `^3.5.0` (the previously pinned `2.0.1` was deprecated).
  Swatch now derives light/dark tone from perceptual OKLab lightness and builds
  atmosphere alpha via colorscope conversion; Halo delegates its HSL→hex
  conversion to colorscope while keeping its defensive input clamping. Halo and
  atmosphere output are unchanged; only swatch tone selection on borderline colors
  may shift to the perceptual model.

## 0.3.0

### Minor Changes

- Two selection fixes. A controlled value present at mount (e.g. restored from a URL) now anchors and centers its facet exactly like a later external change, instead of being absorbed as the baseline. And clicking far from the current anchor now travels — opening a fresh depth-1 neighborhood around the new color — instead of refining deeper, so exploring outward never tightens the spread; near clicks still refine. New `maxDepth` prop caps refinement depth, and `nextBrioletteDepth` / `BRIOLETTE_TRAVEL_ANGLE` are exported.

## 0.2.0

### Minor Changes

- e7876dc: Add facet density and seam control props to BriolettePicker. `density` chooses the geodesic cut (coarse 20, base 80, fine 180, brilliant 320 facets) and animates between cuts — the finer geometry grows out of (or collapses back into) the coarser one. `seamOpacity` fades the facet seams from full lines to a seamless gem without antialiasing cracks, and `seamColor` recolors them. Palettes now also guarantee every facet a distinct hex, escaping gamut-corner quantization collisions deterministically. The value prop is now fully controllable: hexes supplied from outside re-anchor the sphere around the nearest facet and glide it to center.
