# @patternmode/verge

## 0.1.3

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.7.0

## 0.1.2

### Patch Changes

- 774afa0: The theming knobs actually work now.

  `--patternmode-verge-slot-size`, `-duration` and `-easing` were declared on
  `.patternmode-verge` and then read on the same element. A declaration on an
  element always beats a value inherited from an ancestor, so all three were
  inert: a consumer setting them on `:root`, or on the list that owns the rows,
  was silently overridden. The README promised retuning without forking and the
  CSS refused it. `verge.tsx` already read the slot size with a `var()` fallback
  and never saw it fire.

  The defaults now live as `var()` fallbacks at the point of use and nothing is
  declared on the slot, so the knobs inherit from anywhere above it. Written as
  plain declarations rather than `@apply`, because Tailwind's `duration-(--var)`
  shorthand takes no fallback and Tailwind drops utilities it cannot resolve
  without failing the build. Verified in the emitted stylesheet, not by exit code.

  No visual change at defaults: the rendered duration still resolves to 120ms and
  the slot to 1.75rem.

## 0.1.1

### Patch Changes

- Separate the controls on coarse pointers, and name the hit-area obligation

  Found by a design pass over the shipped component rather than by a bug report.

  On touch, verge makes the controls **permanently visible**, because there is no
  hover to reveal them. That is correct, and it has a consequence the first release
  did not answer: the 2px resting gap is right for a mouse — where the controls
  appear only while pointed at and the cursor is precise — but on touch it leaves
  two always-on tap targets a thumb cannot reliably separate. Measured in a
  browser: 28px controls, 2px apart, permanently visible.

  The touch reveal is what creates the exposure, so the correction belongs in the
  component rather than in every consumer. Coarse pointers now get an 8px gap.
  Gated on `pointer: coarse` rather than `hover: none`, because this is about the
  precision of the input rather than the availability of hover; the fine-pointer
  gap is unchanged.

  What this cannot fix, and the README now says so with a worked example: the
  48×48px minimum hit area for the controls themselves. Verge reserves the slot, it
  does not own the button. Keep the control visually small and expand its hit area
  on coarse pointers only.

## 0.1.0

### Minor Changes

- 6ad024f: New package: `@patternmode/verge` — the reveal contract

  A reserved slot whose controls rest hidden and reveal on hover, on focus, and
  always on touch, holding their space throughout.

  Registries ship the button, the dropdown and the tooltip — the things being
  revealed. None ships the contract governing _when_ they appear, which is why
  surveying two unrelated codebases turned up eleven hand-rolled versions of this
  pattern that disagreed with each other. The recurring defect is the keyboard
  case: several spelled the second trigger `focus-visible` rather than
  `focus-within`, which reveals the overflow menu two elements away but not the
  checkbox beside it. None handled touch, because that omission is invisible on
  the machine the code was written on.

  Three triggers, one guarantee — the control is reachable by whatever input you
  have. Named for the guarantee rather than for hover, which is only one of them.
  - **Keyboard.** `:focus-within` on the root. Children stay in the tab order at
    rest, which is what lets focus arrive to trigger the reveal; hiding with
    `display: none` would remove them from the tab order, so focus could never
    reach them and they could never reveal themselves.
  - **Touch.** `@media (hover: none)` keeps the slot revealed, because a slot
    waiting for a hover that cannot happen waits forever.
  - **Open menus.** `[data-popup-open]`, `[data-state="open"]` and
    `[aria-expanded="true"]` hold the slot open, so the `···` does not vanish when
    the pointer travels to the menu it just opened.
  - **No layout shift.** Only `opacity` and `pointer-events` change.
  - **Nesting.** Reveal state is inherited from the nearest root, so an outer row
    being pointed at does not reveal an inner row's controls. Done through
    inheritance rather than `@scope` or a complex `:not()`, both of which drop the
    whole rule when unsupported — which would leave the controls permanently
    invisible, failing closed on an accessibility affordance.

  State rides `--patternmode-verge-*` custom properties rather than utility class
  names, so the resting state cannot be beaten by an unrelated `opacity: 0` in the
  host app. `Verge.Root` and `Verge.Slot` both take `as` rather than `asChild`:
  each renders its own element and then its children, so there is no single child
  for a Slot to merge into, and the motivating case is semantic nesting — a row
  inside a real `<ul>` has to be an `<li>`.
