import { cn } from "@patternmode/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

/**
 * ItemGroup variants control the overall group style:
 * - divided: Minimal list with dividers, no card backgrounds
 * - separated: Individual elevated items with gaps between them (card-like)
 * - grouped: Items connected together in one card (no gaps, rounded corners on first/last only)
 */
const itemGroupVariants = cva("group/item-group flex flex-col", {
  variants: {
    variant: {
      divided: "divide-y divide-border",
      separated: "gap-3",
      grouped: "overflow-hidden rounded-lg border border-border bg-card",
    },
  },
  defaultVariants: {
    variant: "divided",
  },
});

export interface ItemGroupProps
  extends Omit<React.ComponentProps<"ul">, "ref">,
    VariantProps<typeof itemGroupVariants> {
  ordered?: boolean;
  ref?: React.Ref<HTMLUListElement> | React.Ref<HTMLOListElement>;
}

/**
 * ItemGroup is a semantic container for grouping related Item components.
 * Use it to display lists of items with consistent styling and spacing.
 *
 * @example
 * ```tsx
 * <ItemGroup variant="grouped">
 *   <Item>
 *     <ItemContent>
 *       <ItemTitle>First Item</ItemTitle>
 *     </ItemContent>
 *   </Item>
 *   <Item>
 *     <ItemContent>
 *       <ItemTitle>Second Item</ItemTitle>
 *     </ItemContent>
 *   </Item>
 * </ItemGroup>
 * ```
 */
export function ItemGroup({
  className,
  variant = "divided",
  ordered = false,
  ref,
  ...props
}: ItemGroupProps) {
  const Comp = ordered ? "ol" : "ul";
  return (
    <Comp
      className={cn(itemGroupVariants({ variant, className }))}
      data-component="item-group"
      data-slot="item-group"
      data-variant={variant}
      ref={ref as React.Ref<HTMLUListElement> & React.Ref<HTMLOListElement>}
      role="list"
      {...props}
    />
  );
}
