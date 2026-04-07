import type { ComponentSize } from "@patternmode/ui/lib/size";
import { cn } from "@patternmode/ui/utils/cn";
import { focusRing } from "@patternmode/ui/utils/focus-ring";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

/**
 * ItemGridItem variants for grid items
 */
const itemGridItemVariants = cva(
  cn(
    "group/item flex flex-wrap items-center text-sm outline-none transition-colors duration-100",
    focusRing,
  ),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "rounded-3xl border border-border",
        muted: "rounded-3xl bg-muted/50",
        card: "rounded-3xl border border-border bg-card",
      },
      size: {
        "2xs": "gap-1.5 px-2 py-1.5",
        xs: "gap-2 px-3 py-2",
        sm: "gap-2.5 px-4 py-3",
        base: "gap-4 p-4",
        lg: "gap-5 p-5",
        xl: "gap-6 p-6",
        "2xl": "gap-7 p-7",
        "3xl": "gap-8 p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  },
);

export interface ItemGridItemProps
  extends React.ComponentProps<"div">,
    Omit<VariantProps<typeof itemGridItemVariants>, "size"> {
  asChild?: boolean;
  size?: ComponentSize;
}

/**
 * ItemGridItem represents a single entry in an ItemGrid.
 */
export function ItemGridItem({
  className,
  variant = "default",
  size = "base",
  asChild = false,
  ...props
}: ItemGridItemProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(itemGridItemVariants({ variant, size, className }))}
      data-component="item"
      data-size={size}
      data-slot="item"
      data-variant={variant}
      {...props}
    />
  );
}
