import {
  IconBox,
  type IconBoxProps,
} from "@patternmode/ui/compositions/icon-box";
import { cn } from "@patternmode/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start",
  {
    variants: {
      variant: {
        default: "",
        icon: "",
        image:
          "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ItemMediaProps
  extends Omit<React.ComponentProps<"div">, keyof IconBoxProps>,
    Omit<Partial<IconBoxProps>, "variant">,
    VariantProps<typeof itemMediaVariants> {}

/**
 * ItemMedia UI component.
 * Import from "@patternmode/ui/compositions/item".
 * Uses variant-based styling via class-variance-authority.
 */
export function ItemMedia({
  className,
  variant = "default",
  icon,
  iconSize = "xs",
  iconClassName,
  ...props
}: ItemMediaProps) {
  // If variant is "icon" and an icon is provided, use IconBox
  if (variant === "icon" && icon) {
    return (
      <IconBox
        className={cn(
          "group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start",
          className,
        )}
        data-component="item-media"
        data-slot="item-media"
        data-variant={variant}
        icon={icon}
        iconClassName={iconClassName}
        iconSize={iconSize}
        size="sm"
        variant="default"
      />
    );
  }

  // Otherwise render as a regular div (for image variant or custom children)
  return (
    <div
      className={cn(itemMediaVariants({ variant, className }))}
      data-component="item-media"
      data-slot="item-media"
      data-variant={variant}
      {...props}
    />
  );
}
