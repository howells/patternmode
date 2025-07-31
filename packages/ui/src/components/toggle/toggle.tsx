// Tremor Toggle [v1.0.0] - Base UI

"use client";

import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import React from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

import { cx, focusRing } from "../../lib/utils";

const toggleVariants = tv({
  base: [
    // base
    "group inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-md border px-2 text-sm font-medium shadow-xs transition-all duration-100 ease-in-out",
    // border
    "border-zinc-200 dark:border-zinc-800",
    // text color
    "text-zinc-700 dark:text-zinc-300",
    // background color
    "bg-white dark:bg-zinc-950",
    // hover color
    "hover:bg-zinc-50 dark:hover:bg-zinc-900/60",
    // disabled
    "disabled:pointer-events-none disabled:text-zinc-400 dark:disabled:text-zinc-600",
    // pressed state
    "data-[pressed]:bg-zinc-100 data-[pressed]:text-zinc-900 dark:data-[pressed]:bg-zinc-800 dark:data-[pressed]:text-zinc-50",
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      default: "",
      outline: [
        "border-2",
        "data-[pressed]:border-blue-500 dark:data-[pressed]:border-blue-400",
      ],
      ghost: [
        "border-transparent",
        "hover:border-zinc-200 dark:hover:border-zinc-700",
      ],
    },
    size: {
      sm: "h-8 min-w-8 px-1.5 text-xs",
      default: "h-9 min-w-9 px-2 text-sm",
      lg: "h-10 min-w-10 px-3 text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof BaseToggle>,
  VariantProps<typeof toggleVariants> {}

/**
 * A two-state button that can be either on or off.
 *
 * Toggle.
 *
 * @component
 * @id toggle
 * @name Toggle
 * @example
 * ```tsx
 * <Toggle>Content</Toggle>
 * ```
 */
const Toggle = ({ ref, className, variant, size, ...props }: ToggleProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToggle> | null> }) => (
    <BaseToggle
      ref={ref}
      className={cx(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );

Toggle.displayName = "Toggle";

// Export individual components for advanced usage
const ToggleRoot = BaseToggle;

export { Toggle, ToggleRoot, toggleVariants };

    export type { ToggleProps };
