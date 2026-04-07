import type { ComponentSize } from "@patternmode/ui/lib/size";
import { cn } from "@patternmode/ui/utils/cn";
import { focusRing } from "@patternmode/ui/utils/focus-ring";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

/**
 * Item variants control the item styling:
 * - default: Transparent background
 * - outline: Border around the item
 * - muted: Subtle muted background
 * - card: Card-like appearance with border and background
 *
 * When inside an ItemGroup, Item automatically adapts its styling:
 * - In "divided" groups: minimal styling, relies on dividers
 * - In "separated" groups: full card styling with elevation
 * - In "grouped" groups: borders between items, part of parent card frame
 */
const itemVariants = cva(
  cn(
    "group/item flex flex-wrap items-center text-sm outline-none transition-colors duration-100",
    focusRing,
  ),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-border",
        muted: "bg-muted/50",
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
    compoundVariants: [
      // Divided group: minimal styling, no borders/backgrounds
      {
        className:
          "group-data-[variant=divided]/item-group:rounded-none group-data-[variant=divided]/item-group:border-0 group-data-[variant=divided]/item-group:bg-transparent",
      },
      // Separated group with default variant: full card styling
      {
        variant: "default",
        className:
          "group-data-[variant=separated]/item-group:rounded-3xl group-data-[variant=separated]/item-group:border group-data-[variant=separated]/item-group:border-border group-data-[variant=separated]/item-group:bg-card",
      },
      // Separated group with outline variant: card with rounded corners
      {
        variant: "outline",
        className:
          "group-data-[variant=separated]/item-group:rounded-3xl group-data-[variant=separated]/item-group:bg-card",
      },
      // Separated group with muted variant: card styling
      {
        variant: "muted",
        className:
          "group-data-[variant=separated]/item-group:rounded-3xl group-data-[variant=separated]/item-group:border group-data-[variant=separated]/item-group:border-border group-data-[variant=separated]/item-group:bg-card",
      },
      // Grouped: borders between items, parent provides card frame
      {
        className:
          "group-data-[variant=grouped]/item-group:rounded-none group-data-[variant=grouped]/item-group:border-0 group-data-[variant=grouped]/item-group:border-border group-data-[variant=grouped]/item-group:border-b group-data-[variant=grouped]/item-group:bg-transparent group-data-[variant=grouped]/item-group:last:border-b-0",
      },
    ],
  },
);

export interface ItemProps
  extends React.ComponentProps<"div">,
    Omit<VariantProps<typeof itemVariants>, "size"> {
  asChild?: boolean;
  size?: ComponentSize;
}

/**
 * Item is a standalone component for displaying a single piece of content.
 * Use with ItemContent, ItemTitle, ItemDescription, etc. for structured content.
 *
 * @example
 * ```tsx
 * <Item variant="card" size="sm">
 *   <ItemContent>
 *     <ItemTitle>Title</ItemTitle>
 *     <ItemDescription>Description</ItemDescription>
 *   </ItemContent>
 * </Item>
 * ```
 */
export function Item({
  className,
  variant = "default",
  size = "base",
  asChild = false,
  ...props
}: ItemProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(itemVariants({ variant, size, className }))}
      data-component="item"
      data-size={size}
      data-slot="item"
      data-variant={variant}
      {...props}
    />
  );
}
