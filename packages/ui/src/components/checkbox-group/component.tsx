// Checkbox Group Component [v1.0.0]

import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import * as React from "react";

import { cx } from "../../lib/utils";
import { Checkbox } from "../checkbox/component";

/**
 * Props for the CheckboxGroup component.
 */
type CheckboxGroupProps = {
  /**
   * Optional label text displayed above the checkbox group.
   * Provides context and improves accessibility for screen readers.
   */
  label?: string;
  /**
   * ID for the label element to establish proper ARIA relationships.
   * Used for aria-labelledby attribute on the group container.
   */
  labelId?: string;
  /**
   * Additional CSS classes to apply to the group container.
   * Allows for custom styling while maintaining accessibility.
   */
  className?: string;
  /**
   * Child checkbox elements, typically CheckboxGroupItem components.
   * Each child should have a unique value prop for proper state management.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup>;

/**
 * A powerful checkbox group component for managing multiple checkbox selections with comprehensive state management and accessibility.
 */
const CheckboxGroup = ({ ref, className, label, labelId, children, ...props }: CheckboxGroupProps & { ref?: React.RefObject<React.ElementRef<typeof BaseCheckboxGroup> | null> }) => (
  <BaseCheckboxGroup
    ref={ref}
    aria-labelledby={labelId}
    className={cx(
      "flex flex-col items-start gap-2 text-zinc-900 dark:text-zinc-50",
      className,
    )}
    data-testid="checkbox-group"
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
);
CheckboxGroup.displayName = "CheckboxGroup";

/**
 * Props for the CheckboxGroupItem component.
 */
type CheckboxGroupItemProps = {
  /**
   * Unique value identifier for this checkbox item within the group.
   * Used by the parent CheckboxGroup to track selection state.
   */
  value: string;
  /**
   * Optional name attribute for the underlying checkbox input.
   * Useful for form submission and accessibility when needed.
   */
  name?: string;
  /**
   * Label content displayed next to the checkbox.
   * Can be simple text or complex React elements for rich layouts.
   */
  children?: React.ReactNode;
  /**
   * Whether this specific checkbox item is disabled.
   * When disabled, the item becomes unclickable and visually dimmed.
   */
  disabled?: boolean;
  /**
   * Additional CSS classes to apply to the label container.
   * Allows for custom styling while maintaining accessibility.
   */
  className?: string;
};

/**
 * Individual checkbox item component designed for use within CheckboxGroup containers.
 */
const CheckboxGroupItem = ({ ref, value, name, children, disabled, className, ...props }: CheckboxGroupItemProps & { ref?: React.RefObject<HTMLLabelElement | null> }) => (
  <label
    ref={ref}
    className={cx(
      "flex items-center gap-2 cursor-pointer",
      disabled && "cursor-not-allowed opacity-50",
      className,
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
);
CheckboxGroupItem.displayName = "CheckboxGroupItem";

export {
  CheckboxGroup,
  CheckboxGroupItem,
  type CheckboxGroupItemProps,
  type CheckboxGroupProps,
};
