// Tremor SelectNative [v1.0.0]

import type { VariantProps } from "tailwind-variants";

import React from "react";
import { tv } from "tailwind-variants";

import { cx, focusInput, hasErrorInput } from "../../lib/utils";

/**
 * Style variants for native HTML select elements.
 *
 * Provides consistent styling for native select dropdowns with
 * Tremor design system colors, hover states, focus rings,
 * and error handling.
 *
 * @category inputs
 * @icon ChevronDown
 * @example
 * ```tsx
 * <SelectNative>Content</SelectNative>
 * ```
 */
const selectNativeStyles = tv({
  base: [
    // base
    "peer w-full cursor-pointer appearance-none truncate rounded-md border py-2 pl-3 pr-7 shadow-xs outline-hidden transition-all sm:text-sm",
    // background color
    "bg-white dark:bg-zinc-950",
    // border color
    "border-zinc-200 dark:border-zinc-800",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // placeholder color
    "placeholder-zinc-400 dark:placeholder-zinc-500",
    // hover
    "hover:bg-zinc-50 dark:hover:bg-zinc-950/50",
    // disabled
    "disabled:pointer-events-none",
    "disabled:bg-zinc-100 disabled:text-zinc-400",
    "dark:disabled:border-zinc-700 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500",
    // focus
    focusInput,
    // invalid (optional)
    // "dark:aria-invalid:ring-red-400/20 aria-invalid:ring-2 aria-invalid:ring-red-200 aria-invalid:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
  ],
  variants: {
    /**
     * Whether to show error styling.
     */
    hasError: {
      true: hasErrorInput,
    },
  },
});

/**
 * Props for the SelectNative component.
 *
 * Extends standard HTML select attributes with styling variants
 * for consistent appearance across the design system.
 *
 * @interface SelectNativeProps
 * @augments React.InputHTMLAttributes<HTMLSelectElement>
 * @augments VariantProps<typeof selectNativeStyles>
 */
type SelectNativeProps = {} & React.InputHTMLAttributes<HTMLSelectElement> & VariantProps<typeof selectNativeStyles>;

/**
 * A styled native HTML select component.
 *
 * Provides a consistent, accessible select dropdown using the native HTML
 * select element with Tremor design system styling. Ideal when you need
 * platform-native behavior, mobile optimization, or simpler dropdown needs
 * without custom rendering.
 *
 * @param hasError - Whether to show error styling.
 * @param disabled - Whether the select is disabled.
 * @param value - Currently selected value.
 * @param onChange - Callback when selection changes.
 * @param children - Option elements to render.
 *
 *
 * @id select-native
 * @name Select Native
 * @component
 * @example
 * ```tsx
 * // Basic select
 * <SelectNative value={size} onChange={(e) => setSize(e.target.value)}>
 *   <option value="">Select size...</option>
 *   <option value="xs">Extra Small</option>
 *   <option value="sm">Small</option>
 *   <option value="md">Medium</option>
 *   <option value="lg">Large</option>
 *   <option value="xl">Extra Large</option>
 * </SelectNative>
 *
 * // With error state
 * <SelectNative
 *   hasError
 *   value={country}
 *   onChange={(e) => setCountry(e.target.value)}
 *   aria-invalid
 * >
 *   <option value="">Choose country...</option>
 *   <option value="us">United States</option>
 *   <option value="ca">Canada</option>
 *   <option value="uk">United Kingdom</option>
 * </SelectNative>
 *
 * // Disabled select
 * <SelectNative disabled value={lockedOption}>
 *   <option value="locked">Locked Option</option>
 * </SelectNative>
 *
 * // With form integration
 * <SelectNative
 *   name="priority"
 *   value={formData.priority}
 *   onChange={handleChange}
 *   required
 * >
 *   <option value="">Select priority...</option>
 *   <option value="low">Low</option>
 *   <option value="medium">Medium</option>
 *   <option value="high">High</option>
 *   <option value="urgent">Urgent</option>
 * </SelectNative>
 * ```
 *
 * @note Use this component when you need native select behavior.
 *       For custom-styled selects with search, use the Select component instead.
 */
/**
 * Native HTML select element with consistent styling and accessibility features.
 *
 * @id select-native
 * @name SelectNative
 * @icon ChevronDown
 * @category inputs
 * @component
 * @param props - Component properties.
 * @param props.hasError - Whether to show error styling.
 * @param props.disabled - Whether the select is disabled.
 * @param props.value - Currently selected value.
 * @param props.onChange - Callback when selection changes.
 * @param props.children - Option elements to render.
 * @param props.className - Additional CSS classes.
 */
const SelectNative = ({ ref: forwardedRef, className, hasError, ...props }: SelectNativeProps & { ref?: React.RefObject<HTMLSelectElement | null> }) => {
  return (
    <select
      ref={forwardedRef}
      className={cx(selectNativeStyles({ hasError }), className)}
      tremor-id="tremor-raw"
      {...props}
    />
  );
};

SelectNative.displayName = "SelectNative";

export { SelectNative, type SelectNativeProps, selectNativeStyles };
