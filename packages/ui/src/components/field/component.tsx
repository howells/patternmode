import { Field as BaseField } from "@base-ui-components/react/field";
import * as React from "react";

import { cx } from "../../lib/utils";
import { Input } from "../input/component";
import { Text } from "../text/component";

/**
 * Root field component for grouping form controls with labels and validation.
 */
const Field = React.forwardRef<
  React.ElementRef<typeof BaseField.Root>,
  React.ComponentPropsWithoutRef<typeof BaseField.Root>
>(({ ...props }, ref) => (
  <BaseField.Root {...props} data-testid="field" />
));
Field.displayName = "Field";

/**
 * Props for the FieldLabel component.
 */
type FieldLabelProps = {
  /**
   * Label text content.
   * Describes the associated form control for accessibility and user guidance.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Label>;

/**
 * Field label component with consistent styling and accessibility.
 */
const FieldLabel = ({ className, ...props }: FieldLabelProps) => (
  <BaseField.Label
    className={cx(
      // base
      "block text-sm font-medium leading-6",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // disabled
      "data-disabled:text-zinc-400 dark:data-disabled:text-zinc-600",
      className,
    )}
    {...props}
  />
);
FieldLabel.displayName = "FieldLabel";

/**
 * Props for the FieldControl component.
 */
type FieldControlProps = {
  /**
   * Custom render function for different control types.
   * Allows integration with Select, Textarea, or other form controls.
   * Defaults to Input component if not provided.
   */
  render?: React.ComponentPropsWithoutRef<typeof BaseField.Control>["render"];
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Control>;

/**
 * Field control component that integrates with field validation and accessibility.
 */
const FieldControl = ({ className, render, ...props }: FieldControlProps) => (
  <BaseField.Control
    className={className}
    render={render || (({ ref, ...controlProps }) => <Input ref={ref as React.RefObject<HTMLInputElement | null>} {...controlProps} />)}
    {...props}
  />
);
FieldControl.displayName = "FieldControl";

/**
 * Props for the FieldDescription component.
 */
type FieldDescriptionProps = {
  /**
   * Description text content.
   * Provides additional context or instructions for the form field.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Description>;

/**
 * Field description component for providing help text and context.
 */
const FieldDescription = ({ className, ...props }: FieldDescriptionProps) => (
  <BaseField.Description
    render={descriptionProps => (
      <Text
        {...descriptionProps}
        size="sm"
        className={cx(
          // text color
          "text-zinc-600 dark:text-zinc-400",
          // disabled
          "data-disabled:text-zinc-400 dark:data-disabled:text-zinc-600",
          className,
        )}
      />
    )}
    {...props}
  />
);
FieldDescription.displayName = "FieldDescription";

/**
 * Props for the FieldError component.
 */
type FieldErrorProps = {
  /**
   * Error message content.
   * Displays validation errors with proper styling and accessibility.
   */
  children?: React.ReactNode;
  /**
   * Validation constraint to match for display.
   * Allows conditional error display based on specific validation rules.
   */
  match?: string;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Error>;

/**
 * Field error component for displaying validation feedback.
 */
const FieldError = ({ className, ...props }: FieldErrorProps) => (
  <BaseField.Error
    className={cx(
      // base
      "text-sm leading-6",
      // text color
      "text-red-600 dark:text-red-400",
      // disabled
      "data-disabled:text-zinc-400 dark:data-disabled:text-zinc-600",
      className,
    )}
    {...props}
  />
);
FieldError.displayName = "FieldError";

/**
 * Field validity component for accessing validation state.
 */
const FieldValidity = BaseField.Validity;

export {
  Field,
  FieldControl,
  type FieldControlProps,
  FieldDescription,
  type FieldDescriptionProps,
  FieldError,
  type FieldErrorProps,
  FieldLabel,
  type FieldLabelProps,
  FieldValidity,
};
