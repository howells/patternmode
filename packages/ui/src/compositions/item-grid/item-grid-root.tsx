import { cn } from "@patternmode/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

/**
 * ItemGrid variants control the overall grid style:
 * - default: Simple grid with gap
 * - divided: Grid with dividers between items (horizontal lines)
 */
const itemGridVariants = cva("group/item-grid grid", {
  variants: {
    /**
     * Visual style of the grid
     */
    variant: {
      default: "",
      divided: "divide-y divide-border",
    },
    /**
     * Number of columns in the grid
     */
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    },
    /**
     * Gap between items
     */
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      base: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: {
    variant: "default",
    columns: 2,
    gap: "base",
  },
});

export interface ItemGridProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof itemGridVariants> {}

/**
 * ItemGrid is a grid container for displaying items in a multi-column layout.
 * Use with Item components for structured content.
 *
 * @example
 * ```tsx
 * <ItemGrid columns={2} gap="sm">
 *   <Item variant="card">...</Item>
 *   <Item variant="card">...</Item>
 * </ItemGrid>
 * ```
 */
export function ItemGrid({
  className,
  variant = "default",
  columns = 2,
  gap = "base",
  ...props
}: ItemGridProps) {
  return (
    <div
      className={cn(itemGridVariants({ variant, columns, gap, className }))}
      data-component="item-grid"
      data-slot="item-grid"
      data-variant={variant}
      {...props}
    />
  );
}
