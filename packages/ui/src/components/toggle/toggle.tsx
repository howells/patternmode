// Tremor Toggle [v1.0.0] - Base UI

"use client";

import type { VariantProps } from "tailwind-variants";

import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import React from "react";
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

type ToggleProps = {} & React.ComponentPropsWithoutRef<typeof BaseToggle> & VariantProps<typeof toggleVariants>;

/**
 * A two-state button component that toggles between pressed (on) and unpressed (off) states.
 *
 * Unlike a checkbox, Toggle is designed for immediate actions rather than form submission.
 * It provides visual feedback through pressed states and is commonly used for feature toggles,
 * view preferences, or tool activation in toolbars and settings panels.
 *
 * **Key Features:**
 * - **Two-State Interaction**: Clear visual distinction between pressed and unpressed states
 * - **Immediate Feedback**: Instant visual response to user interaction
 * - **Keyboard Accessible**: Full keyboard support with space and enter key activation
 * - **Size Variants**: Multiple sizes (sm, default, lg) for different contexts
 * - **Style Variants**: Default, outline, and ghost variants for different UI contexts
 * - **Focus Management**: Proper focus indicators and keyboard navigation.
 *
 * **Common Use Cases:**
 * - Toolbar buttons (bold, italic, underline in text editors)
 * - View toggles (list/grid view, show/hide panels)
 * - Feature flags and settings toggles
 * - Filter activation buttons
 * - Tool selection in editors or design apps.
 *
 * **Accessibility:**
 * - Uses proper ARIA states (aria-pressed) for screen readers
 * - Keyboard navigation with space and enter keys
 * - Focus management and visual focus indicators
 * - Semantic button element with toggle behavior.
 *
 * @category inputs
 * @icon ToggleLeft
 * @example
 * ```tsx
 * // Basic toggle button
 * <Toggle
 *   pressed={isBold}
 *   onPressedChange={setIsBold}
 * >
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 *
 * // Toggle with text and icon
 * <Toggle
 *   pressed={showSidebar}
 *   onPressedChange={setShowSidebar}
 *   variant="outline"
 *   size="lg"
 * >
 *   <Sidebar className="h-4 w-4" />
 *   Sidebar
 * </Toggle>
 *
 * // Ghost variant for subtle toggles
 * <Toggle
 *   pressed={isListView}
 *   onPressedChange={setIsListView}
 *   variant="ghost"
 *   size="sm"
 * >
 *   <List className="h-4 w-4" />
 * </Toggle>
 *
 * // Disabled state
 * <Toggle
 *   pressed={false}
 *   disabled
 * >
 *   <Settings className="h-4 w-4" />
 *   Settings
 * </Toggle>
 *
 * // In a toolbar context
 * <div className="flex items-center gap-1 p-1 border rounded-md">
 *   <Toggle pressed={isBold} onPressedChange={setIsBold} size="sm">
 *     <Bold className="h-4 w-4" />
 *   </Toggle>
 *   <Toggle pressed={isItalic} onPressedChange={setIsItalic} size="sm">
 *     <Italic className="h-4 w-4" />
 *   </Toggle>
 *   <Toggle pressed={isUnderline} onPressedChange={setIsUnderline} size="sm">
 *     <Underline className="h-4 w-4" />
 *   </Toggle>
 * </div>
 * ```
 */
/**
 * Toggle button component for binary state switching with visual feedback.
 *
 * @id toggle
 * @name Toggle
 * @icon ToggleLeft
 * @category inputs
 * @component
 * @param props - Component properties.
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
