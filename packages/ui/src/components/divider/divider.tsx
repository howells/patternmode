// Divider Component [v1.0.0] - Pure Implementation

/**
 * Divider Component
 *
 * A versatile divider component for visually separating content sections.
 * Supports both horizontal and vertical orientations with optional text labels.
 * Built with tailwind-variants for consistent styling and theming.
 *
 * Features:
 * - Horizontal and vertical orientations
 * - Optional text labels with centered positioning
 * - Customizable spacing options
 * - Dark mode support
 * - Responsive design
 *
 * @example
 * ```tsx
 * // Basic horizontal divider
 * <Divider />
 *
 * // Divider with text label
 * <Divider>or</Divider>
 * <Divider>Continue with</Divider>
 *
 * // Vertical divider
 * <div className="flex h-20">
 *   <div>Left content</div>
 *   <Divider orientation="vertical" />
 *   <div>Right content</div>
 * </div>
 *
 * // Custom spacing
 * <Divider spacing="lg">Section Break</Divider>
 *
 * // Between form sections
 * <form>
 *   <fieldset>
 *     <input type="email" placeholder="Email" />
 *     <input type="password" placeholder="Password" />
 *   </fieldset>
 *
 *   <Divider>or</Divider>
 *
 *   <button>Sign in with Google</button>
 * </form>
 *
 * // In navigation menus
 * <nav className="flex items-center">
 *   <a href="/home">Home</a>
 *   <Divider orientation="vertical" className="mx-4" />
 *   <a href="/about">About</a>
 *   <Divider orientation="vertical" className="mx-4" />
 *   <a href="/contact">Contact</a>
 * </nav>
 * ```
 */

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx } from "../../lib/utils";

/**
 * Style variants for the divider container.
 *
 * Defines layout, orientation, and spacing options for divider components.
 * Handles both horizontal and vertical orientations with responsive spacing.
 */
const dividerVariants = tv({
  base: [
    // base
    "mx-auto my-6 flex w-full items-center justify-between gap-3 text-sm",
    // text color
    "text-zinc-500 dark:text-zinc-500",
  ],
  variants: {
    /** Divider orientation */
    orientation: {
      /** Horizontal divider (default) */
      horizontal: "flex-row",
      /** Vertical divider for sidebar layouts */
      vertical: "flex-col h-full w-auto mx-0 my-0",
    },
    /** Vertical spacing around divider */
    spacing: {
      /** No spacing */
      none: "my-0",
      /** Small spacing (16px) */
      sm: "my-4",
      /** Medium spacing (24px) - default */
      md: "my-6",
      /** Large spacing (32px) */
      lg: "my-8",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    spacing: "md",
  },
});

/**
 * Style variants for the divider line element.
 *
 * Defines the visual line that creates the separation effect.
 * Adjusts dimensions based on orientation.
 */
const dividerLineVariants = tv({
  base: [
    // background color
    "bg-zinc-200 dark:bg-zinc-800",
  ],
  variants: {
    /** Line orientation */
    orientation: {
      /** Horizontal line (1px height, full width) */
      horizontal: "h-[1px] w-full",
      /** Vertical line (1px width, full height) */
      vertical: "w-[1px] h-full",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

/**
 * Props for the Divider component.
 *
 * Configuration for divider appearance and behavior including
 * orientation, spacing, and optional text content.
 *
 * @interface DividerProps
 * @extends React.ComponentPropsWithoutRef<"div">
 * @extends VariantProps<typeof dividerVariants>
 */
interface DividerProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof dividerVariants> {
  /** Optional text content to display in the center of the divider */
  children?: React.ReactNode;
}

/**
 * A versatile divider component for visually separating content sections.
 *
 * Provides clean visual separation between content areas with support for
 * both horizontal and vertical orientations. Can include optional text labels
 * positioned in the center of the divider line.
 *
 * @param className - Additional CSS classes
 * @param children - Optional text content to display in the center
 * @param orientation - Divider orientation (horizontal or vertical)
 * @param spacing - Vertical spacing around the divider
 *
 * @component
 * @example
 * ```tsx
 * // Basic horizontal divider
 * <Divider />
 *
 * // Divider with text label
 * <Divider>or</Divider>
 * <Divider>Continue with</Divider>
 *
 * // Vertical divider
 * <div className="flex h-20">
 *   <div>Left content</div>
 *   <Divider orientation="vertical" />
 *   <div>Right content</div>
 * </div>
 *
 * // Custom spacing
 * <Divider spacing="lg">Section Break</Divider>
 *
 * // Between form sections
 * <form>
 *   <fieldset>
 *     <input type="email" placeholder="Email" />
 *     <input type="password" placeholder="Password" />
 *   </fieldset>
 *
 *   <Divider>or</Divider>
 *
 *   <button>Sign in with Google</button>
 * </form>
 *
 * // In navigation menus
 * <nav className="flex items-center">
 *   <a href="/home">Home</a>
 *   <Divider orientation="vertical" className="mx-4" />
 *   <a href="/about">About</a>
 *   <Divider orientation="vertical" className="mx-4" />
 *   <a href="/contact">Contact</a>
 * </nav>
 * ```
 */
const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    { className, children, orientation = "horizontal", spacing, ...props },
    forwardedRef
  ) => (
    <div
      ref={forwardedRef}
      className={cx(dividerVariants({ orientation, spacing }), className)}
      {...props}
    >
      {children ? (
        <>
          <div className={cx(dividerLineVariants({ orientation }))} />
          <div className="whitespace-nowrap text-inherit">{children}</div>
          <div className={cx(dividerLineVariants({ orientation }))} />
        </>
      ) : (
        <div className={cx(dividerLineVariants({ orientation }))} />
      )}
    </div>
  )
);

Divider.displayName = "Divider";

export { Divider, dividerVariants, type DividerProps };
