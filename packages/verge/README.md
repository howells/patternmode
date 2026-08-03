# @patternmode/verge

A reserved slot whose controls rest hidden and reveal on hover, on focus, and
always on touch — holding their space throughout, so nothing moves.

The pattern every dense list uses: a row shows only its data at rest, and its
edit / delete / `···` controls appear when you address it. Registries ship the
button, the dropdown and the tooltip — the things being revealed. None ships the
contract governing _when_ they appear, which is where hand-rolled versions drift
apart.

```bash
npm install @patternmode/verge
```

```tsx
import { Verge } from "@patternmode/verge";
import "@patternmode/verge/styles.css";

<Verge.Root as="li">
  <span>{item.name}</span>
  <Verge.Slot slots={2}>
    <IconButton label="Edit" />
    <OverflowMenu />
  </Verge.Slot>
</Verge.Root>;
```

Requires Tailwind CSS v4.

## What it already handles

So you don't rebuild something that is one import away:

|                      |                                                                                                                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Keyboard**         | Tabbing into the row reveals the slot, via `:focus-within` on the root. Children stay in the tab order at rest, which is what lets focus arrive at all.                                                                                           |
| **Touch**            | No hover exists, so nothing hides. Handled with `@media (hover: none)`, not a tap handler. Controls also get a wider gap on coarse pointers, because permanently-visible controls 2px apart are not separable by a thumb.                         |
| **Open menus**       | A slot holding an open menu, popover or disclosure stays revealed — `[data-popup-open]`, `[data-state="open"]` and `[aria-expanded="true"]` are all recognised, so the `···` does not vanish when the pointer travels to the menu it just opened. |
| **Layout stability** | Only `opacity` and `pointer-events` change. The slot occupies its space at rest and revealed alike.                                                                                                                                               |
| **Nesting**          | Roots may nest. A nested root shadows its ancestor's state for its own subtree, so pointing at an outer row does not reveal an inner row's controls.                                                                                              |
| **Column alignment** | `slots={n}` reserves _n_ controls' worth of width so rows carrying different numbers of controls still align on one axis.                                                                                                                         |
| **Reduced motion**   | The transition is dropped under `prefers-reduced-motion: reduce`.                                                                                                                                                                                 |
| **Semantic parents** | `as` renders the real element, so a row inside a `<ul>` can be an `<li>` and a cell can be a `<td>`.                                                                                                                                              |

## What you must handle: touch hit areas

On a touch surface verge makes the controls **permanently visible**, because
there is no hover to reveal them. That is the correct behaviour, and it hands you
an obligation: those controls are now always under a thumb, so each needs a
**48×48px minimum hit area**.

Verge reserves the slot; it does not own your button, so it cannot do this for
you. Keep the control visually small and expand its hit area on coarse pointers
only:

```tsx
<button className="relative size-7">
  <span
    className="pointer-fine:hidden absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2"
    aria-hidden="true"
  />
  <Icon className="size-4" />
</button>
```

`3rem` is 48px; `pointer-fine:hidden` drops the padded area on mouse and
trackpad where it is not needed. Define the variant once if your project does not
have it:

```css
@custom-variant pointer-fine (@media (pointer: fine));
```

## Parts

### `Verge.Root`

The container whose hover and focus state the slots read. Wrap the whole row,
not just the controls — the reveal responds to the user addressing the row,
which is the thing they are pointing at. Contributes no appearance of its own.

### `Verge.Slot`

The reserved area holding the controls.

| Prop      | Type          | Notes                                                                                                                                                                                                                    |
| --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `slots`   | `number`      | Controls' worth of width to hold open. Only needed when controls must align into a column across rows carrying different numbers of them.                                                                                |
| `visible` | `boolean`     | Keeps the slot revealed regardless of pointer or focus — for state the CSS cannot see, such as an action mid-flight. Not an escape hatch for "this row matters more"; a control drawn on every row at rest is furniture. |
| `as`      | `ElementType` | Element to render. Defaults to `div`.                                                                                                                                                                                    |

## Theming

Every knob is a custom property, so retune without forking:

| Property                        | Default                      |                                              |
| ------------------------------- | ---------------------------- | -------------------------------------------- |
| `--patternmode-verge-slot-size` | `1.75rem`                    | Width one control reserves, used by `slots`. |
| `--patternmode-verge-duration`  | `120ms`                      | Reveal transition duration.                  |
| `--patternmode-verge-easing`    | `cubic-bezier(0.2, 0, 0, 1)` | Reveal transition easing.                    |

## Why opacity rather than `display: none`

The children stay in the tab order while the slot is at rest, which is what lets
focus arrive and trigger the reveal. Hiding with `display: none` or
`visibility: hidden` removes them from the tab order, so focus can never reach
them, so they can never reveal themselves — the keyboard path closes on itself.
`pointer-events: none` at rest is what stops the mouse clicking a control it
cannot see, and it is restored in the same rule that restores opacity, so a
visible control is always clickable and an invisible one never is.

## Why a component rather than two utility classes

Surveying two unrelated codebases turned up eleven hand-rolled versions of this
pattern, and they disagreed. The recurring defect is the keyboard case: several
spelled the second trigger `focus-visible` instead of `focus-within`, which
reveals the overflow menu two elements away but not the checkbox beside it. None
handled touch, because the omission is invisible on the machine the code was
written on.

Reveal state rides `--patternmode-verge-*` custom properties rather than utility
class names, so the resting state cannot be beaten by an unrelated rule in the
host app that happens to declare `opacity: 0`. Immunity by construction rather
than by out-ranking.

## Verifying it in a browser

Two failures are independent and both are invisible in a screenshot of the
resting state, so check them separately:

1. Tab into a row — the controls must appear, and the one you have tabbed to
   must be **clickable**, not merely visible.
2. On a touch surface (or with hover emulation off), the controls must be
   visible at rest rather than unreachable.
