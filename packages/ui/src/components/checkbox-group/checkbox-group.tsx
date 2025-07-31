// Checkbox Group Component [v1.0.0]

import { cx } from "../../lib/utils";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import * as React from "react";
import { Checkbox } from "../checkbox/checkbox";

/**
 * Props for the CheckboxGroup component.
 *
 * @interface CheckboxGroupProps
 * @extends React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup>
 */
interface CheckboxGroupProps
  extends React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup> {
  /** Optional label for the checkbox group */
  label?: string;
  /** ID for the label element for accessibility */
  labelId?: string;
  /** Additional CSS classes */
  className?: string;
  /** Child checkbox elements */
  children?: React.ReactNode;
}

/**
 * A checkbox group component built on Base UI's CheckboxGroup primitive.
 *
 * Based on Base UI's CheckboxGroup (https://base-ui.com/react/components/checkbox-group),
 * providing shared state management for multiple checkboxes. Features proper accessibility
 * attributes, optional labeling, and support for controlled and uncontrolled modes.
 *
 * @param label - Optional label text for the group
 * @param labelId - ID for the label element for accessibility
 * @param value - Controlled selected values
 * @param defaultValue - Default selected values for uncontrolled mode
 * @param onValueChange - Handler called when selection changes
 * @param disabled - Whether the entire group is disabled
 *
 *
 * @id checkbox-group
 * @name Checkbox Group
 * @component
 * @example
 * ```tsx
 * // Basic checkbox group
 * <CheckboxGroup label="Select your preferences">
 *   <CheckboxGroupItem value="newsletter">Newsletter</CheckboxGroupItem>
 *   <CheckboxGroupItem value="updates">Product Updates</CheckboxGroupItem>
 *   <CheckboxGroupItem value="marketing">Marketing Emails</CheckboxGroupItem>
 * </CheckboxGroup>
 *
 * // Controlled checkbox group
 * <CheckboxGroup
 *   label="Features"
 *   value={selectedFeatures}
 *   onValueChange={setSelectedFeatures}
 * >
 *   <CheckboxGroupItem value="feature1">Feature 1</CheckboxGroupItem>
 *   <CheckboxGroupItem value="feature2">Feature 2</CheckboxGroupItem>
 *   <CheckboxGroupItem value="feature3">Feature 3</CheckboxGroupItem>
 * </CheckboxGroup>
 *
 * // With default values
 * <CheckboxGroup
 *   label="Default Selections"
 *   defaultValue={['option1', 'option3']}
 * >
 *   <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
 *   <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
 *   <CheckboxGroupItem value="option3">Option 3</CheckboxGroupItem>
 * </CheckboxGroup>
 *
 * // Disabled group
 * <CheckboxGroup label="Disabled Options" disabled>
 *   <CheckboxGroupItem value="disabled1">Disabled 1</CheckboxGroupItem>
 *   <CheckboxGroupItem value="disabled2">Disabled 2</CheckboxGroupItem>
 * </CheckboxGroup>
 * ```
 *
 * @see https://base-ui.com/react/components/checkbox-group - Base UI documentation
 */
const CheckboxGroup = React.forwardRef<
  React.ElementRef<typeof BaseCheckboxGroup>,
  CheckboxGroupProps
>(({ className, label, labelId, children, ...props }, ref) => (
  <BaseCheckboxGroup
    ref={ref}
    aria-labelledby={labelId}
    className={cx(
      "flex flex-col items-start gap-2 text-zinc-900 dark:text-zinc-50",
      className
    )}
    {...props}
  >
    {label && (
      <div
        className="font-medium text-sm text-zinc-900 dark:text-zinc-50"
        id={labelId}
      >
        {label}
      </div>
    )}
    {children}
  </BaseCheckboxGroup>
));
CheckboxGroup.displayName = "CheckboxGroup";

/**
 * Props for the CheckboxGroupItem component.
 *
 * @interface CheckboxGroupItemProps
 */
interface CheckboxGroupItemProps {
  /** Unique value for this checkbox item */
  value: string;
  /** Optional name attribute for the checkbox */
  name?: string;
  /** Label content for the checkbox */
  children: React.ReactNode;
  /** Whether this specific item is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Individual checkbox item within a CheckboxGroup.
 *
 * Provides a complete checkbox with label that integrates with the parent
 * CheckboxGroup's state management. Features proper accessibility attributes,
 * disabled state styling, and consistent visual design.
 *
 * @param value - Unique value for this checkbox item
 * @param name - Optional name attribute for the checkbox
 * @param children - Label content for the checkbox
 * @param disabled - Whether this specific item is disabled
 *
 * @example
 * ```tsx
 * <CheckboxGroupItem value="newsletters">Subscribe to newsletters</CheckboxGroupItem>
 * <CheckboxGroupItem value="updates" disabled>Product updates (disabled)</CheckboxGroupItem>
 * <CheckboxGroupItem value="marketing">
 *   <div>
 *     <span>Marketing emails</span>
 *     <span className="text-xs text-zinc-500">Weekly promotions</span>
 *   </div>
 * </CheckboxGroupItem>
 * ```
 */
const CheckboxGroupItem = React.forwardRef<
  HTMLLabelElement,
  CheckboxGroupItemProps
>(({ value, name, children, disabled, className, ...props }, ref) => (
  <label
    ref={ref}
    className={cx(
      "flex items-center gap-2 cursor-pointer",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}
    {...props}
  >
    <Checkbox
      name={name}
      value={value}
      disabled={disabled}
      className="size-4"
    />
    <span className="text-sm font-medium select-none">{children}</span>
  </label>
));
CheckboxGroupItem.displayName = "CheckboxGroupItem";

export {
  CheckboxGroup,
  CheckboxGroupItem,
  type CheckboxGroupItemProps,
  type CheckboxGroupProps,
};
