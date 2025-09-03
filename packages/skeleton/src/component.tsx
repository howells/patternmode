import { focusRing } from "@patternmode/utils/focus-ring";
import type React from "react";
import { tv } from "tailwind-variants";

const skeletonVariants = tv({
  base: [
    // animation
    "animate-pulse",
    // radius + background
    "rounded-md",
    "bg-zinc-200 dark:bg-zinc-800",
    // focus style
    focusRing,
  ],
  variants: {
    variant: {
      default: "",
      shimmer: [
        "relative",
        "overflow-hidden",
        "after:absolute",
        "after:inset-0",
        "after:-translate-x-full",
        "after:animate-[shimmer_2s_infinite]",
        "after:bg-gradient-to-r",
        "after:from-transparent",
        "after:via-white/10",
        "after:to-transparent",
      ],
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
    rounded: "md",
  },
});

type SkeletonProps = {
  /**
   * Visual style variant of the skeleton.
   * @default "default"
   */
  variant?: "default" | "shimmer";
  /**
   * Border radius style of the skeleton.
   * @default "md"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Loading placeholder that shows a skeleton of content while data is being fetched.
 */
export const Skeleton = ({
  variant,
  rounded,
  className,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={skeletonVariants({ variant, rounded, className })}
      data-testid="skeleton"
      {...props}
    />
  );
};

export { skeletonVariants };
export type { SkeletonProps };
