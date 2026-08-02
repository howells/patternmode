# @patternmode/aperto

## 2.0.0

### Major Changes

- ae67cf0: `lucide-react` moves from a regular dependency to a **required peer dependency**.

  Aperto previously installed its own copy of `lucide-react`, so an app using Lucide directly shipped two copies of the icon library. Aperto now shares the host application's single instance.

  **Consumers must declare `lucide-react` themselves**, satisfying `^1.17.0`. pnpm 8+ and npm 7+ auto-install missing peers, so most installs will succeed without changes; Yarn will warn or fail. Apps already depending on `lucide-react` need no new dependency, only to confirm their version satisfies the range.

  This is released as a major because it transfers a dependency responsibility to consumers and changes which `lucide-react` version executes at runtime.

## 1.0.1

### Patch Changes

- Updated dependencies [f7463da]
  - @howells/motion@0.2.0

## 1.0.0

### Major Changes

- 5985325: Migrate from Radix UI to Base UI (`@base-ui/react`). Radix is in maintenance; Base UI is its successor. This also removes the Radix Dialog types that previously leaked into Aperto's published `.d.ts`.

  The public component names are unchanged — `Aperto.Overlay` is now backed by Base UI's Dialog `Backdrop`, and `Aperto.Content` by its `Popup`, but the compound API is the same.

  **Breaking changes:**
  - **`asChild` → `render`** on `Aperto.Trigger`, `Aperto.Overlay`, and `Aperto.Content` (used internally to compose Motion elements). If you compose these with the function form of `render`, spread every prop from the first argument (including `ref`).
  - **`forceMount` is replaced by `keepMounted`** on `Aperto.Portal`, following Base UI's Dialog API.
  - **`onOpenChange`** now receives Base UI's `(open, eventDetails)` signature. The extra `eventDetails` argument is additive; existing one-argument handlers keep working.
  - **Data attribute change.** Base UI emits `data-open` / `data-closed` instead of Radix's `data-state="open"`; the internal `data-radix-*` attributes are gone. Update any styling or selectors that relied on them.

  **Note for Motion:** Aperto's exit animations and shared-element morph are driven by Motion, whose animations are invisible to Base UI's `getAnimations()`-based unmount detection. Aperto handles this internally (`keepMounted` portal + a `hidden` override so the content stays visible while Motion plays the exit); no consumer action is required.

### Patch Changes

- eb6d04e: Shared-element integrity: honour the declared aspect ratio, and make the flight seamless.
  - The expanded media box no longer flex-shrinks inside a height-capped panel (which silently distorted the declared `width`/`height` ratio — a 1:1 item rendered visibly non-square). Its size budget now derives from the panel's own cap minus a caption allowance, on desktop and mobile, and the mobile branch uses the item's real ratio instead of a hardcoded 3:2. New tuning vars: `--aperto-panel-max-h`, `--aperto-caption-allowance`.
  - The transition clone flies from/to the media inside the trigger (an explicit `[data-aperto-media-source]`, else the first `img`/`video`), not the whole thumbnail card — captions and badges inside `Aperto.Thumbnail` no longer distort the morph's shape.
  - The clone renders `thumbnailSrc` with `variant: "thumbnail"`, so consumer `renderImage` implementations reproduce the exact cache-hot URL already on screen; the morph never pops to a blank frame while the full-size asset loads.
  - Origin media now hides during flight at any nesting depth inside the trigger (descendant selectors, was direct-child only).

## 0.2.2

### Patch Changes

- 5eaad6b: Focus, layering, timing, and packaging fixes for Aperto from the component
  review:
  - Focus Return now targets the Thumbnail that opened the Media Transition: the
    opener index is stored when a thumbnail opens the group, and close restores
    focus to that thumbnail (falling back to the active thumbnail if the opener
    unmounted) instead of whichever item was navigated to last.
  - The shared-element transition clone now layers above the shipped overlay
    (`z-[1000]`) and content (`z-[1001]`) via
    `var(--patternmode-aperto-clone-z, 1002)` instead of a hardcoded
    `z-index: 30`, so the open/close animation no longer plays dimmed beneath the
    backdrop. Hosts can override the layer with the custom property.
  - `defaultOpen` on the primitive root now actually opens the dialog: the
    uncontrolled internal state initializes from `defaultOpen` instead of always
    starting closed.
  - The transition-completion timer holds the latest `onComplete` in a ref, so
    parent re-renders during a transition no longer restart the countdown (which
    could wedge the dialog blank). The 450ms duration fallback is unchanged.
  - Content children hidden with `opacity: 0` during `[data-aperto-transition]`
    now also get `pointer-events: none`, so invisible controls are not clickable
    mid-transition.
  - Packaging: the `"use client"` directive now survives into the built entry
    module (it previously lived on inner modules only, which the bundler drops),
    so the package imports cleanly from React Server Components.

## 0.2.1

### Patch Changes

- b8e0048: Consume the shared `@howells/motion` tokens instead of locally duplicated spring
  and easing values, so motion feel stays consistent across the catalog. No public
  API or behavior change: aperto drops its hand-copied token file, status reuses
  `easings.snappy`/`easings.smooth`, and stacksheet sources `snappy`/`subtle` from
  the shared springs while keeping its intentional `stiff` damping fork.
- Updated dependencies [b8e0048]
  - @howells/motion@0.1.0

## 0.2.0

### Minor Changes

- Align public package documentation, lint configuration, and React 19 release metadata.

## 0.1.4

### Patch Changes

- Switch package linting and formatting to the `@howells/lint` Ox lane.

## 0.1.3

### Patch Changes

- Configure `@howells/lint` across the monorepo, adopt Biome presets, and reformat source with 2-space indentation.

## 0.1.2

### Patch Changes

- Preserve expanded media aspect ratios, restore focus to the opening thumbnail on close, and use custom media renderers for transition clones.

## 0.1.1

### Patch Changes

- 8b66680: Add the new swipeable deck/card-stack package and let Aperto primitive content opt out of centered positioning with `placement="none"`.
