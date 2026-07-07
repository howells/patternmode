# Component review — 2026-07-03

Package-by-package review of the catalog (all source, styles, tests, manifests, and built dists read).
Each finding was verified in code; file:line references are to the state at this date.
Severity: **H** high / **M** medium / **L** low.

## Cross-cutting

1. **H — `"use client"` is stripped from published bundles.** Verified zero occurrences in
   `dist/index.mjs` for **scrollframe, swatch, tags, deck, status, briolette, halo** — every
   client package except stacksheet. tsdown only preserves the directive when it sits on the
   _entry module_; per-file directives are dropped. Stacksheet's `src/index.ts:1` is the working
   in-repo pattern to copy (or add a tsdown banner). This is why foolscap needs a re-export shim
   for scrollframe. Failure: any RSC import of these packages crashes at the first hook.
2. **M — `motion` is a regular dependency, not a peer** (aperto, stacksheet, deck, swatch).
   Hosts with their own `motion` can ship two copies; `LazyMotion`/`LayoutGroup` contexts do not
   cross instances — in aperto this can break shared-element transitions outright.
3. **M — README drift.** tags and scrollframe have no README at all (homepage links point at
   one); swatch's omits `blend`, atmosphere texture, DistributionDisplay, and pin selection;
   briolette omits `maxDepth`; halo documents 2 of 5 props.
4. **M — Interaction layers are systematically untested.** Every package tests pure math and
   happy-path rendering well, but drag/gesture/keyboard/timing paths — where most of the high
   findings live — have zero coverage (aperto dismissal + focus return after navigation,
   stacksheet drag + Escape layering, deck drag threshold, briolette pointer state machine,
   swatch smooth blend, tags keyboard selection).
5. **L — Peer-dep matrix inconsistent**: swatch allows react ^18||^19, everything else ^19.
   CONTEXT.md has no vocabulary for briolette or halo — register them like Aperto/Deck.

## aperto

- **H — Focus Return violates CONTEXT.md after navigation.** `Aperto/aperto-group.tsx:283-286`
  focuses the _current_ index's thumbnail on close; the opener index is never stored. Open #1,
  arrow to #5, ESC → focus lands on thumbnail 5 (or `body` if unmounted).
- **H — Media-transition clone renders behind the overlay.** `media-transition.tsx:51` hardcodes
  `zIndex: 30`; shipped overlay is `z-[1000]` (`styles.css:27`). The open animation plays dimmed
  under `bg-black/80` while real content is `opacity-0`.
- **H — `defaultOpen` typed but broken.** `aperto-root.tsx:48` ignores it and renders Radix
  controlled; the existing test passes only because it skips `ApertoPortal`.
- **M — Clone completion is a `setTimeout` with unstable deps** (`media-transition.tsx:23-34`);
  parent re-renders during the transition restart the countdown (can wedge the dialog blank);
  spring presets fall back to a wrong 450ms constant. The test mock fires `onAnimationComplete`,
  a prop the real component never passes.
- **M — `ApertoContent` hardcodes `forceMount`** (`aperto-content.tsx:129`) — composing Content
  without Portal shows the panel permanently.
- **M — Single-item API can't set motion presets; `ApertoClassNames` exposes group-only keys;
  out-of-range controlled `index` renders `media[0]` while the counter shows the raw index.**
- **L — Internal props (`active`, `sharedLayoutId`, `fadeOut`) ship public; invisible controls
  stay clickable during transitions (`styles.css:80-83` lacks `pointer-events: none`).**

## stacksheet

- **H — `snapPointIndex` documented "(controlled)" but can never change** — config resolves once
  in `createStacksheet()` (`create.tsx:53`); `renderer.tsx:146` reads a frozen value.
- **H — `closeOnEscape: false` ignored on Chromium** — CloseWatcher is created whenever
  `dismissible` (`renderer.tsx:254-255`) without the `closeOnEscape` gate.
- **H — Escape handler ignores `defaultPrevented`** (`renderer.tsx:238-242`): closing an inner
  Radix select/popover also pops the sheet.
- **M — Background scale-down close path is dead code** (`renderer-effects.ts:60-92`): the open
  branch's cleanup wipes `transition` before the close branch runs → instant snap-back.
- **M — Composable sheets without `Sheet.Title` are unnamed dialogs**; per-sheet `ariaLabel` is
  carried through the store then ignored (`renderer-helpers.ts:37-43`).
- **M — Focus never moves into the sheet on open** (`sheet-panel-focus.tsx:67`
  `initialFocus: false`, no manual focus) — contradicts the README claim.
- **M — Unconditional `setPointerCapture` retargets clicks** (`Drag/use-drag.ts:70`): ARIA-pattern
  clickable children stop responding when `drag: true` without a `Sheet.Body`.
- **M — Swipe velocity is gesture-average, not release velocity** (`use-drag.ts:107-108`): pause
  then flick fails to dismiss.
- **L — `crypto.randomUUID()` throws on non-HTTPS LAN dev (`store-args.ts:134`); no
  `env(safe-area-inset-bottom)` anywhere; panel fallback background is hardcoded light.**

## deck

- **H — Drag threshold is effectively 0.35px.** `Deck/deck-root.tsx:317-324` reads
  `event.currentTarget` in `onDragEnd` (null by then — Motion dispatches from window,
  post-render) and falls back to `width: 1`, so `distanceThreshold: 0.35` is 0.35 of 1px. Every
  release advances; snap-back never happens. Measure via ref.
- **M — `onAdvanceEnd` fires synchronously** (`deck-root.tsx:301-303`), not after the exit
  animation as `types.ts:91-92` documents.
- **M — Rejected controlled advances mutate `visualBaseIndex`** (`deck-root.tsx:203-210`) →
  key drift and spurious remounts in controlled decks that veto changes.
- **M — Keyboard: invisible slider with no focus indicator; `aria-valuetext` announces internal
  ids; ArrowLeft increments. Background cards are `aria-hidden` but focusable (need `inert`).**
- **L — Keyless cards in sibling fragments collide (`use-deck-children.ts:30,38`); public
  `onKeyDown` typed against the hidden input.**

## swatch

- **H — `blend="smooth"` discards `ratio` weights** (`Swatch/swatch-colors.ts:58-64`): stops are
  spaced evenly, so a 90/10 palette renders 50/50 — the proportion semantics the component
  exists for, silently dropped. Zero tests mention "smooth".
- **M — `isLightColor` parses hex only** (`swatch-colors.ts:28-39`): named/rgb/oklch colors and
  all palettes get `data-tone="dark"` → invisible selected check on light fills.
- **M — Consumer `role` silently swallowed (`swatch-root.tsx:194`).**
- **M — DistributionBar handles have no slider semantics** (no `role="slider"`/`aria-valuenow`);
  **480ms width transition fights live drag** (`styles.css:224-232`, no dragging override);
  **remove affordance invisible on touch** (hover/focus-only opacity).
- **M — CONTEXT-mandated `transparencyBackdrop` doesn't exist** — transparent values render as
  faint gray.
- **L — One shared drag-baseline ref across handles (multi-touch corruption);
  `<figure>`↔`<fieldset>` semantics flip with `onRemove`.**

## tags

- **H — The announced listbox doesn't exist.** `tags.tsx:466-476` renders a plain `<div>`;
  trigger/input claim `aria-haspopup="listbox"`, `aria-controls`, `aria-activedescendant`;
  options are `role="option"` without a listbox ancestor. Input lacks `role="combobox"`.
- **H — `TagSelector.List` replaces consumer children whenever options exist**
  (`tags.tsx:456-464`), so the exported `TagSelector.Option` part is uncomposable; standalone
  Option ids don't match the activedescendant scheme either.
- **M — Async `onCreateItem` race** (`tag-selector-root.tsx:142-160`): paste-create in flight +
  click selection → resolution overwrites with a stale snapshot, dropping the click.
- **M — Pasted duplicate labels create duplicate items; Enter commits during IME composition
  (no `isComposing` guard, `tags.tsx:284-294`); keyboard active option never scrolled into view.**
- **L — `removeProps` invites `<button>` inside `<button>`; Enter hardcoded as commit key;
  generics erased at the component boundary; `data-testid` ships in production DOM.**

## briolette

- **M — Drag can stick "active" with no button held** (`briolette-picker.tsx:369-404`): capture
  is deferred 6px and moves aren't gated on `event.buttons`; also no `event.button` check, so
  right-click starts a drag the context menu never ends.
- **M — Palette rebuilt every animation frame** (`briolette-picker.tsx:597`, unmemoized): idle
  drift re-renders at 60fps forever; `density="brilliant"` redoes 320 OKLab conversions/frame.
- **M — `preventDefault()` on pointerdown blocks click-to-focus**, so "drag or use arrow keys"
  only works after tabbing.
- **L — Selection commits before controlled parent accepts; reduced-motion sampled once;
  Escape doesn't stop propagation (clears color _and_ closes host dialog); selection unannounced
  when `showValue={false}`; dead `quatAngleBetween`.**

## halo

- **H — Keyboard-inaccessible by construction.** Hue is a `readOnly` range input with no
  `onChange` (`halo-picker.tsx:146-155`) — readonly doesn't apply to range, React reverts edits,
  arrow keys do nothing; the pad is a bare div. Shipped `:focus-visible` styles for both can
  never fire.
- **M — `event.buttons === 1` fallback accepts drags that started elsewhere** (`:253,272`);
  right-click commits a color (no button check on pointerdown).
- **L — Pad clamps lightness 3..97 undocumented; gap snap emits `h: 360`; hue track color
  diverges from selected hue mid-arc; eight legacy geometry aliases kept alive at 0.x.**

## status / system / motion / site-ui

- **status**: solid; best tests of the suite. `NaN` snaps to "known zero" progress (CONTEXT says
  Empty ≠ unknown); `size` re-declares the system union inline; tone tracks mix toward
  hardcoded `white`.
- **system**: healthy. `isResponsiveValue` misclassifies arbitrary objects when used externally;
  no `"sideEffects": false`.
- **motion**: `durations`/`durationMs` hand-duplicated; `shakeKeyframes` is a mutable exported
  array — freeze it.
- **site-ui**: `SegmentedControl` has no group semantics (bare span label, `aria-pressed`
  toggles, no roving tabindex); option keys collide across `string|number` values.

## Suggested order of attack

1. `"use client"` packaging fix (one pattern, seven packages — highest blast radius per line).
2. aperto clone z-index + focus return; deck drag threshold — user-visible correctness.
3. stacksheet Escape/CloseWatcher trio + initial focus; tags listbox role + List children.
4. swatch smooth-blend ratios; halo keyboard support.
5. Docs: READMEs for tags/scrollframe, catch swatch/halo/briolette READMEs up to their APIs;
   register Briolette/Halo vocabulary in CONTEXT.md.
6. Test the interaction layers named above (they'd have caught most of the highs).
