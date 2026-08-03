---
"@patternmode/verge": minor
---

New package: `@patternmode/verge` — the reveal contract

A reserved slot whose controls rest hidden and reveal on hover, on focus, and
always on touch, holding their space throughout.

Registries ship the button, the dropdown and the tooltip — the things being
revealed. None ships the contract governing *when* they appear, which is why
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
