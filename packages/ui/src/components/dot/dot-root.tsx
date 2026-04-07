import { cn } from "@patternmode/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

/**
 * dotVariants variant class helper for Dot.
 * Import from "@patternmode/ui/components/dot".
 * Uses variant-based styling via class-variance-authority.
 */
const dotVariants = cva("inline-block shrink-0 rounded-full", {
  variants: {
    variant: {
      default: "bg-muted-foreground",
      secondary: "bg-secondary-foreground",
      affirmative: "bg-affirmative-accent",
      warning: "bg-warning-accent",
      info: "bg-info-accent",
      destructive: "bg-destructive",
      brand: "bg-brand-accent",
    },
    size: {
      "2xs": "size-1",
      xs: "size-1.5",
      sm: "size-2",
      base: "size-2.5",
      lg: "size-3",
      xl: "size-3.5",
      "2xl": "size-4",
      "3xl": "size-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
  },
});

export interface DotProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof dotVariants> {
  /**
   * Custom color override. When provided, overrides the variant color.
   * Can be any valid CSS color value.
   */
  color?: string;
}

/**
 * Dot component for indicating status, color, or presence.
 * Uses semantic design token variants by default, with optional custom color override.
 *
 * @example
 * ```tsx
 * // Using semantic variants
 * <Dot variant="affirmative" />
 * <Dot variant="warning" size="sm" />
 *
 * // Using custom color override
 * <Dot color="hsl(200, 80%, 85%)" size="sm" />
 * ```
 */
export function Dot({
  className,
  variant,
  size,
  color,
  style,
  ...props
}: DotProps) {
  return (
    <span
      className={cn(dotVariants({ variant, size }), className)}
      data-component="dot"
      style={color ? { backgroundColor: color, ...style } : style}
      {...props}
    />
  );
}

export { dotVariants };
