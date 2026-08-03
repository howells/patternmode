import type { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from "react";

/**
 * Props common to both Verge parts.
 *
 * `as` rather than Radix-style `asChild`: both parts render their own element
 * and then their children, so there is no single child for a Slot to merge
 * into — `asChild` would be either broken or misleading. `as` also covers the
 * case that motivates it, which is rendering into a semantic parent: a row
 * inside a real `<ul>` must be an `<li>`, and a `<div>` child breaks that
 * silently, because the list still looks right and only a screen reader knows.
 */
interface VergeSharedProps<TElement extends ElementType> {
  /** Element or component to render as. Defaults to `"div"`. */
  as?: TElement;
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLElement>;
}

/** Props for {@link VergeRoot}. */
export type VergeRootProps<TElement extends ElementType = "div"> = VergeSharedProps<TElement> &
  Omit<ComponentPropsWithoutRef<TElement>, keyof VergeSharedProps<TElement>>;

/** Props for {@link VergeSlot}. */
export type VergeSlotProps<TElement extends ElementType = "div"> = VergeSharedProps<TElement> &
  Omit<ComponentPropsWithoutRef<TElement>, keyof VergeSharedProps<TElement>> & {
    /**
     * How many controls' worth of width to hold open.
     *
     * Children reserve their own width already, so this is only needed when
     * the controls must align into a *column* across rows that carry
     * different numbers of them — a heading row with three controls above
     * item rows with one. Without it the column is ragged; with it every
     * row's controls land on the same axis.
     *
     * Width per control comes from `--patternmode-verge-slot-size`
     * (default `1.75rem`), so a consumer with larger controls retunes it once
     * rather than passing pixel counts.
     */
    slots?: number;
    /**
     * Keeps the slot revealed regardless of pointer or focus.
     *
     * For state the CSS cannot see: a row whose action is mid-flight, a
     * long-press reveal on a touch surface, a documentation example that has
     * to show the revealed state.
     *
     * Not an escape hatch for "this row matters more". A control drawn on
     * every row at rest is furniture, and the reason to reach for this
     * component at all is to stop shipping furniture.
     */
    visible?: boolean;
  };
