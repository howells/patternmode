# `@patternmode/verge` — adoption note for rulework

Written 2026-08-03 by the patternmode session. **Daniel relays this; patternmode
does not contact rulework directly.** Paste it whole — it is written to be read
by that repo's session, not summarised.

---

## What this is

`@patternmode/verge@0.1.1` is your `RowActions` generalised and published. It was
built by reading `packages/ui/src/components/row-actions.tsx` in your tree — its
docblock is cited in verge's own source and README, including the finding that
one of your four implementations spelled the second trigger `focus-visible`
instead of `focus-within` and so revealed the overflow menu two elements away but
not the checkbox beside it. That is the defect verge exists to make unwriteable.

**Take 0.1.1. Not 0.1.0.** 0.1.0 ships a 2px gap between controls on coarse
pointers. On touch verge makes controls permanently visible (there is no hover to
wait for), so 0.1.0 leaves two 28px controls 2px apart, always on, under a thumb.
0.1.1 gives coarse pointers an 8px gap, gated on `pointer: coarse` rather than
`hover: none` because it concerns the precision of the input, not the
availability of hover. Fine-pointer spacing is unchanged.

```bash
pnpm add @patternmode/verge@^0.1.1
```

```tsx
import { Verge } from "@patternmode/verge";
import "@patternmode/verge/styles.css";
```

You already resolve `@patternmode/scrollframe`, `stacksheet` and `tags` from the
registry, so this is one dependency line, not an install-graph change.

---

## The contract it encodes

One rule, three triggers, one guarantee — the same rule
`docs/design/specs/design-deferral.md` § "The hover contract" already states:

| | |
|---|---|
| **Pointer** | `@media (hover: hover)` + `:hover` on the root. Declared only where hover is a real input, so a touch device never enters the hidden state at all. |
| **Keyboard** | `:focus-within` on the root, unconditionally. Not `:focus-visible` — the slot is never the focus target, its children are. |
| **Touch** | `@media (hover: none)` holds the slot revealed. Nothing may hide where nothing can point. |
| **Open menus** | `[data-popup-open]`, `[data-state="open"]` **and `[aria-expanded="true"]`** all hold the slot open, so the `···` does not vanish when the pointer travels to the menu it just opened. |
| **Layout** | Only `opacity` and `pointer-events` change. Identical geometry at rest and revealed. |
| **Nesting** | Solved by inheritance, not by named groups. A nested root re-declares the properties on itself, so its subtree reads its own state. An inherited value is the weakest thing in the cascade, so the nearest root always wins. |
| **Reduced motion** | Transition dropped under `prefers-reduced-motion: reduce`. |

Two implementation choices you will recognise, because they came from you:

- **State rides custom properties, not class names.** `--patternmode-verge-reveal`
  / `--patternmode-verge-events`, never `.opacity-0` / `.pointer-events-none`.
  Immunity by construction rather than by out-ranking — your own root-cause
  writeup of why the layerless `.opacity-0` beat the reveal.
- **`pointer-events` follows visibility in the same rule.** A visible control is
  always clickable and an invisible one never is. Your `globals.css` repair fixed
  opacity only and left the revealed control visible-but-unclickable; the two
  halves fail independently and both are invisible in a screenshot of the resting
  state.

One thing your version does not do: verge declares
`@layer theme, base, components, utilities;` and puts its rules in `components`,
so your utilities still sort after it and can retune anything. It is not
layerless. That is the class of defect that produced the original bug.

**A slot used without a root renders permanently visible, not permanently
hidden.** An unreachable control is the worse of the two failures, so that is the
direction it fails in.

---

## Where your four implementations stand today

The audit found four sharing no code. Three have already been consolidated onto
`revealAtRest` (`packages/ui/src/components/row-actions.tsx:76`) and are correct
on pointer and keyboard:

| Site | State | Migrate to |
|---|---|---|
| `packages/ui/src/components/row-actions.tsx:151` — rows | on `revealAtRest`, named group `group/row-actions` | `Verge.Root` + `Verge.Slot` (keep `RowActions` as the wrapper — see below) |
| `packages/ui/src/components/panel-toggle.tsx:258` — panel headers | on `revealAtRest`, `group/panel-header` | `Verge.Root` on the header, `Verge.Slot` on the toggle rail |
| `packages/ui/src/components/surface-toolbar.tsx:192` — search qualifiers | on `revealAtRest`, plus a `group-data-filled` trigger | `Verge.Slot` **with `visible={filled}`** — verge has no `data-filled` concept, and this is exactly what `visible` is for |
| `packages/ui/src/components/sidebar.tsx:573` — vendored shadcn menu action | **still on raw class names**: `md:opacity-0` + `group-hover/menu-item:opacity-100` + `group-focus-within/menu-item:opacity-100` | leave it, or migrate — see below |

`sidebar.tsx:573` is the outlier and the one worth looking at. It is the
class-name form the layerless `.opacity-0` beat, and its touch story is
`md:opacity-0` — controls are always visible below the `md` breakpoint. That
approximates the touch branch by viewport width, which is the wrong axis: a
1024px tablet gets the hover-only path and no hover. MG made the same call for
their vendored shadcn sidebar and decided to leave it (MG-998 explicitly scopes
it out) on the grounds that a vendored file is upstream's shape. Your call —
but the defect is real, and if you keep it, keep it knowingly.

**None of the four handles touch.** Yours reaches it only through the `visible`
prop, which is per-call-site and manual; verge's is a media query that applies
everywhere at once.

---

## Migration shape

**Keep `RowActions` as your name.** Reimplement its body over verge rather than
touching ~20 call sites. Your props carry over with their semantics unchanged:

| Yours | Verge |
|---|---|
| `slots?: number` | `slots?: number` — identical meaning. Width per control is `--patternmode-verge-slot-size`, default `1.75rem` = 28px, which is your `SLOT_WIDTH` exactly. |
| `visible?: boolean` | `visible?: boolean` — identical meaning, including the "not an escape hatch for this row matters more" rule, which is in verge's own JSDoc. |
| `rowActionsGroup = "group/row-actions"` on the row | `<Verge.Root as="div">` (or `as="li"` / `as="tr"`) wrapping the row. Verge uses inheritance, so there is no group class to apply — the root **is** the mechanism. Do not reach for the raw `.patternmode-verge-root` class name; it is internal. |
| `revealAtRest` exported for non-row surfaces | `Verge.Slot` — same idea, now a component. The reason you exported it (panel rails, search qualifiers, one contract spelled once) is the reason verge exists. |

Three things to check while migrating:

1. **Easing — and take 0.1.2 if you intend to retune anything.** Verge defaults
   to `120ms` / `cubic-bezier(0.2, 0, 0, 1)`. Your `transition-micro` is 120ms
   on `--ease-settle`. If those curves differ, retune via
   `--patternmode-verge-easing` rather than forking — **but in 0.1.1 and
   earlier that does nothing.** All three knobs were declared on the slot
   element and read on the same element, and an element's own declaration beats
   an inherited one, so setting them on `:root` or on the owning list was
   silently overridden. Fixed in **0.1.2**, where the defaults live as `var()`
   fallbacks at the point of use and the knobs inherit from anywhere above the
   slot. 0.1.1 is fine if you take the defaults; 0.1.2 if you don't.
2. **`as`, not `asChild`.** Both parts render their own element and then their
   children, so there is no single child for a Slot to merge into. `as` also
   covers the case that motivates it: a row inside a real `<ul>` must be an
   `<li>`.
3. **Your consumer-side stylesheet guard.** The pin you added asserting
   `.opacity-0` sits in a utilities block and `@layer components{` is absent is a
   good idea and we said so. Verge emits **neither class name**, so the guard is
   simply not applicable to verge-covered surfaces — do not read its silence as
   coverage.

---

## What verge cannot do for you

**The 48×48px minimum hit area.** On touch verge makes controls permanently
visible, which hands you an obligation it cannot discharge: verge reserves the
slot, it does not own your button. Keep the control visually small and expand its
hit area on coarse pointers only:

```tsx
<button className="relative size-7">
  <span
    className="pointer-fine:hidden absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2"
    aria-hidden="true"
  />
  <Icon className="size-4" />
</button>
```

```css
@custom-variant pointer-fine (@media (pointer: fine));
```

---

## Verifying it

jsdom applies no stylesheet, so none of this is provable by unit tests. Two
failures are independent and both are invisible in a screenshot of the resting
state:

1. **Move the pointer, then click.** Clicking at coordinates without moving there
   first never triggers hover, so the control is still `pointer-events: none` and
   the click does nothing. That is a method error, not a defect — it cost us a
   false failure.
2. **Tab in, then click what you tabbed to.** Visible is not clickable. Assert
   the handler fires, not that the control appeared.
3. **Turn hover emulation off** (or use a real touch surface). Controls must be
   visible at rest.

One measurement trap, because it looks exactly like the defect: reading computed
`opacity` synchronously after `.focus()` returns `0` with
`pointer-events: auto` — apparently visible-but-unclickable. It is the 120ms
transition mid-flight; `pointer-events` flips instantly, `opacity` animates.
**Re-read after the transition before concluding.**

---

## Requirements

Tailwind CSS v4. React 19 (`react` / `react-dom` `^19.0.0`, peer). Node ≥ 20.
Package README: <https://github.com/howells/patternmode/tree/main/packages/verge#readme>
