# @patternmode/halo

## 0.6.0

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

## 0.5.1

### Patch Changes

- d12a6d0: `HaloPicker` now moves focus to the control you pressed, so the keyboard keeps working after a click.

  Both pointer handlers call `preventDefault` — the pad to stop text selection mid-drag, the arc likewise — and that suppresses the compatibility `mousedown` along with the default action that moves focus. The pad advertises arrow-key adjustment through `role="slider"` and `tabIndex={0}`, and the arc through a visually hidden range input; neither was reachable after a pointer interaction. Click the pad, press an arrow key, nothing happened. Nothing was thrown and nothing appeared in the console.

  The pad now focuses itself on pointerdown and the arc focuses its range input. Pointer capture was not the cause — an uncaptured `preventDefault` loses focus the same way, which was measured both ways in a browser. `BriolettePicker` already did this; halo is catching up with its sibling.

## 0.5.0

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

## 0.4.0

### Minor Changes

- ae67cf0: `@instruments/colorscope` moves from a regular dependency to a **required peer dependency**.

  Halo previously installed its own copy of `@instruments/colorscope`, so an app using colorscope directly resolved two copies. Halo now shares the host application's single instance.

  **Consumers must declare `@instruments/colorscope` themselves**, satisfying `^3.7.1`. pnpm 8+ and npm 7+ auto-install missing peers, so most installs will succeed without changes; Yarn will warn or fail. Apps already depending on colorscope directly need no new dependency, only to confirm their version satisfies the range.

### Patch Changes

- ae67cf0: Read `--font-mono` instead of `--mono` for the numeric readout's font stack.

  `--mono` is not part of the shadcn or Tailwind theme vocabulary; `--font-mono` is, and Tailwind v4 already defines it. Halo's readout now picks up a host application's mono stack with no configuration.

  The fallback font list is unchanged, so nothing renders differently out of the box. **Consumers who set `--mono` to style the readout must set `--font-mono` instead.**

  This token escaped the earlier vocabulary migration because it is written as a multi-line `var()` call, which the repository's token check could not see. That check has been fixed in the same change.

## 0.3.1

### Patch Changes

- f7463da: Align the `@instruments/colorscope` dependency range to `^3.7.1` repo-wide (matches
  the resolved version; fixes the workspace range-consistency check).

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

## 0.2.2

### Patch Changes

- a45df85: Review fixes: real keyboard support, pointer guards, and canonical red.
  - The hue slider is now functional — the range input's dead `readOnly` (which
    doesn't apply to range inputs) is replaced with an `onChange` that updates
    hue, so its arrow keys work.
  - The saturation/lightness pad is keyboard-operable: focusable
    (`tabIndex={0}`), `role="slider"` with an `aria-valuetext` announcing
    "Saturation X%, Lightness Y%", ArrowLeft/Right adjust saturation and
    ArrowUp/Down adjust lightness (Shift for 10× steps), clamped to the pad's
    pointer range. The shipped `:focus-visible` styles now actually fire — the
    arc's ring is drawn when its hidden slider has focus.
  - Pointer guards: pointerdown ignores non-primary buttons (right-click no
    longer commits a color), and the move handlers drop the `buttons === 1`
    fallback — pointer capture already delivers legitimate drags, so drags
    that started elsewhere are ignored.
  - `haloAngleToHue` emits the canonical `0` instead of `360` at the arc's red
    end and in the gap snap, so consumers see one red and `aria-valuenow`
    stays within 0–359.
  - README: documented the full prop surface (`value`, `onChange`,
    `placement`, `label`, `showValue`).

  Also includes the packaging fix already applied on `src/index.ts`: the
  `"use client"` directive survives into `dist/index.mjs`, so the package
  imports cleanly from React Server Components.

## 0.2.1

### Patch Changes

- b8e0048: Use `@instruments/colorscope` for color math instead of hand-rolled helpers, and
  upgrade colorscope to `^3.5.0` (the previously pinned `2.0.1` was deprecated).
  Swatch now derives light/dark tone from perceptual OKLab lightness and builds
  atmosphere alpha via colorscope conversion; Halo delegates its HSL→hex
  conversion to colorscope while keeping its defensive input clamping. Halo and
  atmosphere output are unchanged; only swatch tone selection on borderline colors
  may shift to the perceptual model.

## 0.2.0

### Minor Changes

- Add a `placement` prop to HaloPicker ("bottom" | "top" | "left" | "right") that rotates the hue arc to any side of the pad. The value readout follows the arc for "top". Geometry helpers gain an optional placement parameter (back-compatible defaults), and `getHaloGeometry` / `HaloPlacement` / `HaloGeometry` are exported.

## 0.1.1

### Patch Changes

- 73001b8: Fix the saturation/lightness pad being undraggable: the hue arc's svg overlays the whole stage and its blank root swallowed the pad's pointer events in every browser. The svg is now pointer-transparent except for the arc path and handle.
