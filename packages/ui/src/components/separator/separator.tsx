// Separator Component [v1.0.0] - Base UI Implementation

import { cx } from "../../lib/utils";
import { Separator as BaseSeparator } from "@base-ui-components/react/separator";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

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
      default: "bg-zinc-300 dark:bg-zinc-700",
      subtle: "bg-zinc-300 dark:bg-zinc-700",
      strong: "bg-zinc-400 dark:bg-zinc-600",
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
 *
 * @interface SeparatorProps
 * @extends React.ComponentPropsWithoutRef<typeof BaseSeparator>
 * @extends VariantProps<typeof separatorVariants>
 */
interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof BaseSeparator>,
    VariantProps<typeof separatorVariants> {
  /** Optional text content to display in the center of the separator */
  children?: React.ReactNode;
  /** Spacing around the separator when used with text labels */
  spacing?: "none" | "sm" | "md" | "lg";
}

/**
 * A visual separator component built on Base UI's Separator primitive.
 *
 * Based on Base UI's Separator (https://base-ui.com/react/components/separator),
 * providing accessible visual division elements for structuring content and interfaces.
 * Features horizontal and vertical orientations with multiple styling variants and sizes.
 * Now supports optional text labels positioned in the center of the separator.
 *
 * @param orientation - Direction of the separator (horizontal or vertical)
 * @param variant - Visual style variant (default, subtle, strong)
 * @param size - Thickness/size of the separator (sm, md, lg)
 * @param children - Optional text content to display in the center
 * @param spacing - Vertical spacing around the separator (when used with text)
 *
 * @component
 * @example
 * ```tsx
 * // Basic horizontal separator
 * <Separator />
 *
 * // Separator with text label
 * <Separator>or</Separator>
 * <Separator>Continue with</Separator>
 *
 * // Vertical separator
 * <Separator orientation="vertical" />
 *
 * // Different variants
 * <Separator variant="subtle" />
 * <Separator variant="strong" />
 *
 * // Different sizes
 * <Separator size="sm" />
 * <Separator size="lg" />
 *
 * // Custom spacing with text
 * <Separator spacing="lg">Section Break</Separator>
 *
 * // Vertical separator with styling
 * <Separator
 *   orientation="vertical"
 *   variant="strong"
 *   size="lg"
 *   className="mx-4"
 * />
 *
 * // In navigation menus
 * <nav className="flex items-center space-x-4">
 *   <a href="/home">Home</a>
 *   <Separator orientation="vertical" className="h-4" />
 *   <a href="/about">About</a>
 *   <Separator orientation="vertical" className="h-4" />
 *   <a href="/contact">Contact</a>
 * </nav>
 *
 * // In content sections
 * <div>
 *   <h2>Section 1</h2>
 *   <p>Content here...</p>
 *   <Separator className="my-4" />
 *   <h2>Section 2</h2>
 *   <p>More content...</p>
 * </div>
 *
 * // Between form sections
 * <form>
 *   <fieldset>
 *     <input type="email" placeholder="Email" />
 *     <input type="password" placeholder="Password" />
 *   </fieldset>
 *   <Separator>or</Separator>
 *   <button>Sign in with Google</button>
 * </form>
 * ```
 *
 * @see https://base-ui.com/react/components/separator - Base UI documentation
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof BaseSeparator>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      variant,
      size,
      children,
      spacing,
      ...props
    },
    ref
  ) => {
    // If children are provided, render as a container with text label
    if (children) {
      return (
        <div
          className={cx(
            separatorContainerVariants({ orientation, spacing }),
            className
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
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator, separatorVariants, type SeparatorProps };
