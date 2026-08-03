"use client";

import { joinClassNames } from "@patternmode/system";
import type { CSSProperties, ElementType } from "react";

import type { VergeRootProps, VergeSlotProps } from "./verge-types";

/**
 * The container a {@link VergeSlot} listens to — a row, a card, a list item.
 *
 * It contributes no appearance, only the hover and focus state its slots read.
 * Wrap the whole row, not just the controls: the reveal has to respond to the
 * user addressing the *row*, which is the thing they are pointing at.
 *
 * ```tsx
 * <Verge.Root as="li">
 *   <span>{item.name}</span>
 *   <Verge.Slot slots={2}>
 *     <IconButton label="Edit" />
 *     <OverflowMenu />
 *   </Verge.Slot>
 * </Verge.Root>
 * ```
 *
 * Roots may nest. A nested root re-declares the reveal state for its own
 * subtree, so an outer row being pointed at does not reveal an inner row's
 * controls.
 */
export const VergeRoot = <TElement extends ElementType = "div">({
  as,
  className,
  ...props
}: VergeRootProps<TElement>) => {
  const Tag = as ?? "div";
  return (
    <Tag
      className={joinClassNames("patternmode-verge-root", className)}
      data-slot="verge-root"
      {...props}
    />
  );
};

/**
 * A reserved slot whose controls rest hidden and reveal on hover, on focus, and
 * always on touch — holding its space throughout, so nothing moves.
 *
 * Must be inside a {@link VergeRoot}. Used without one it renders permanently
 * visible rather than permanently hidden, because an unreachable control is the
 * worse of the two failures.
 *
 * ## What it guarantees
 *
 * 1. **Focus reveals, not just hover.** The reveal is driven by
 *    `:focus-within` on the root as well as `:hover`, so tabbing into the row
 *    brings the controls up. Getting this wrong is the defect that recurs:
 *    across two codebases surveyed, eleven hand-rolled implementations of this
 *    pattern disagreed about the keyboard case and several omitted it, which
 *    reveals the overflow menu but not the checkbox beside it.
 * 2. **No layout shift.** The slot always occupies its space; only opacity and
 *    pointer-events change. A row that resizes under the pointer is worse than
 *    a row that never hid anything.
 * 3. **Touch is a first-class branch.** There is no hover on a touch surface,
 *    so on one the slot never hides. This is the branch hand-rolled versions
 *    miss, because it is invisible on the machine they were written on.
 * 4. **The resting state cannot be out-ranked.** State rides
 *    `--patternmode-verge-*` custom properties rather than utility classes, so
 *    an unrelated `opacity` rule in the host app cannot win against it.
 *
 * ## Why opacity rather than `display: none`
 *
 * The children stay in the tab order while the slot is at rest, which is what
 * lets focus arrive and trigger the reveal. Hiding with `display: none` or
 * `visibility: hidden` removes them from the tab order, so focus can never
 * reach them, so they can never reveal themselves — the keyboard path closes on
 * itself. `pointer-events: none` at rest is what stops the mouse clicking a
 * control it cannot see.
 */
export const VergeSlot = <TElement extends ElementType = "div">({
  as,
  className,
  slots,
  style,
  visible = false,
  ...props
}: VergeSlotProps<TElement>) => {
  const Tag = as ?? "div";
  const reservedStyle =
    slots === undefined
      ? style
      : ({
          minInlineSize: `calc(var(--patternmode-verge-slot-size, 1.75rem) * ${slots})`,
          ...(style as CSSProperties | undefined),
        } satisfies CSSProperties);

  return (
    <Tag
      className={joinClassNames("patternmode-verge", className)}
      data-slot="verge"
      data-visible={visible ? "" : undefined}
      style={reservedStyle}
      {...props}
    />
  );
};

/**
 * Composable parts for the reveal contract.
 *
 * Named for what it guarantees — the controls are reachable by whatever input
 * you have — rather than for hover, which is only one of its three triggers.
 */
export const Verge = {
  Root: VergeRoot,
  Slot: VergeSlot,
};
