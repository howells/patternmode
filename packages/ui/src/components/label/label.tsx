/**
 * Label Component
 * 
 * A semantic label component built on Base UI Field.Label for accessible
 * form labeling. Provides consistent typography and styling with support
 * for disabled states and dark mode.
 * 
 * Features:
 * - Base UI Field.Label integration for accessibility
 * - Disabled state support with visual feedback
 * - Dark mode compatible styling
 * - Proper ARIA attributes
 * - Consistent typography scaling
 * - Custom className support
 * 
 * Based on Base UI Field documentation:
 * https://base-ui.com/react/components/field
 * 
 * @example
 * ```tsx
 * // Basic form label
 * <Label htmlFor="email">Email Address</Label>
 * <input id="email" type="email" />
 * 
 * // Disabled label
 * <Label htmlFor="disabled-input" disabled>
 *   Disabled Field
 * </Label>
 * <input id="disabled-input" disabled />
 * 
 * // Custom styled label
 * <Label className="font-bold text-blue-600">
 *   Important Field
 * </Label>
 * 
 * // Form field example
 * <div className="space-y-2">
 *   <Label htmlFor="username">Username *</Label>
 *   <input 
 *     id="username" 
 *     type="text" 
 *     required 
 *     className="border rounded px-3 py-2"
 *   />
 * </div>
 * 
 * // Checkbox label
 * <div className="flex items-center space-x-2">
 *   <input id="terms" type="checkbox" />
 *   <Label htmlFor="terms">
 *     I agree to the terms and conditions
 *   </Label>
 * </div>
 * ```
 */

import { Field } from "@base-ui-components/react/field";
import React from "react";

import { cx } from "../../lib/utils";

/**
 * Props for the Label component.
 * 
 * Extends Base UI Field.Label props with additional disabled state support.
 * 
 * @interface LabelProps
 * @extends React.ComponentPropsWithoutRef<typeof Field.Label>
 */
interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof Field.Label> {
  /** Whether the label should appear disabled */
  disabled?: boolean;
}

/**
 * A semantic label component for form controls.
 * 
 * Built on Base UI Field.Label to provide accessible labeling with consistent
 * styling and disabled state support. Automatically handles ARIA attributes
 * and semantic associations with form controls.
 *
 * @param className - Additional CSS classes
 * @param disabled - Whether the label should appear disabled
 * @param props - Additional Base UI Field.Label props
 *
 *
 * @id label
 * @name Label
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Label htmlFor="email">Email Address</Label>
 * 
 * // With disabled state
 * <Label htmlFor="disabled-field" disabled>
 *   Disabled Field
 * </Label>
 * 
 * // Custom styling
 * <Label className="text-lg font-semibold">
 *   Important Field
 * </Label>
 * ```
 */
/**
 * A label component for form inputs and interactive elements with proper accessibility support.
 *
 * @id label
 * @name Label
 * @component
 */
const Label = React.forwardRef<
  React.ElementRef<typeof Field.Label>,
  LabelProps
>(({ className, disabled, ...props }, forwardedRef) => (
  <Field.Label
    ref={forwardedRef}
    className={cx(
      // base
      "text-sm leading-none",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // disabled
      {
        "text-zinc-400 dark:text-zinc-600": disabled,
      },
      className
    )}
    aria-disabled={disabled}
    {...props}
  />
));

Label.displayName = "Label";

export { Label };
