import type { VariantProps } from "tailwind-variants";

import { Separator as BaseSeparator } from "@base-ui-components/react/separator";
import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

const separatorVariants = tv({
  base: [
    // base
    "shrink-0 border-none",
    // background color
    "bg-zinc-200 dark:bg-zinc-800",
  ],
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
    variant: {
      default: "bg-zinc-200 dark:bg-zinc-800",
      subtle: "bg-zinc-100 dark:bg-zinc-900",
      strong: "bg-zinc-200 dark:bg-zinc-800",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    // Horizontal sizes
    {
      orientation: "horizontal",
      size: "sm",
      class: "h-px",
    },
    {
      orientation: "horizontal",
      size: "md",
      class: "h-px",
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: "h-0.5",
    },
    // Vertical sizes
    {
      orientation: "vertical",
      size: "sm",
      class: "w-px",
    },
    {
      orientation: "vertical",
      size: "md",
      class: "w-px",
    },
    {
      orientation: "vertical",
      size: "lg",
      class: "w-0.5",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
    size: "md",
  },
});

// Container variants for text labels
const separatorContainerVariants = tv({
  base: [
    "flex items-center justify-between gap-3 text-sm",
    "text-zinc-500 dark:text-zinc-500",
  ],
  variants: {
    orientation: {
      horizontal: "flex-row w-full",
      vertical: "flex-col h-full w-auto",
    },
    spacing: {
      none: "my-0",
      sm: "my-4",
      md: "my-6",
      lg: "my-8",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    spacing: "md",
  },
});

/**
 * Props for the Separator component.
 */
type SeparatorProps = {
  /**
   * Optional text content to display in the center of the separator.
   * When provided, creates a labeled separator with text between two separator lines.
   */
  children?: React.ReactNode;
  /**
   * Spacing around the separator when used with text labels.
   * Controls vertical margin for horizontal separators and horizontal margin for vertical separators.
   */
  spacing?: "none" | "sm" | "md" | "lg";
  /**
   * Direction of the separator line.
   * - "horizontal": Creates a horizontal dividing line (default)
   * - "vertical": Creates a vertical dividing line.
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Visual style variant affecting color intensity.
   * - "default": Standard separator color
   * - "subtle": Lighter, more subdued appearance
   * - "strong": Darker, more prominent appearance.
   */
  variant?: "default" | "subtle" | "strong";
  /**
   * Thickness/size of the separator line.
   * - "sm": Thinnest line (1px)
   * - "md": Standard thickness (1px)
   * - "lg": Thicker line (2px).
   */
  size?: "sm" | "md" | "lg";
} & React.ComponentPropsWithoutRef<typeof BaseSeparator> & VariantProps<typeof separatorVariants>;

/**
 * A visual separator component built on Base UI's Separator primitive for content division.
 */
const Separator = (
  { ref, className, orientation = "horizontal", variant, size, children, spacing, ...props }: SeparatorProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSeparator> | null> },
) => {
  // If children are provided, render as a container with text label
  if (children) {
    return (
      <div
        className={cx(
          separatorContainerVariants({ orientation, spacing }),
          className,
        )}
      >
        <BaseSeparator
          ref={ref}
          orientation={orientation}
          className={cx(separatorVariants({ orientation, variant, size }))}
          {...props}
        />
        <div className="whitespace-nowrap text-inherit">{children}</div>
        <BaseSeparator
          orientation={orientation}
          className={cx(separatorVariants({ orientation, variant, size }))}
        />
      </div>
    );
  }

  // Default separator without text
  return (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      className={cx(
        separatorVariants({ orientation, variant, size }),
        className,
      )}
      data-testid="separator"
      {...props}
    />
  );
};

Separator.displayName = "Separator";

export { Separator, type SeparatorProps, separatorVariants };
