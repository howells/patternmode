// Field Component [v1.0.0] - Tremor Style

/**
 * Field Components.
 *
 * A collection of components for creating accessible form fields with labels,
 * controls, descriptions, and error handling. Built on Base UI Field
 * (https://base-ui.com/react/components/field) for comprehensive form validation
 * and accessibility support.
 *
 * Features:
 * - Accessible label association
 * - Built-in validation states
 * - Error and description messaging
 * - Flexible control integration
 * - ARIA attributes and screen reader support
 * - Disabled state handling.
 *
 * @example
 * ```tsx
 * // Basic field with label and input
 * <Field>
 *   <FieldLabel>Email Address</FieldLabel>
 *   <FieldControl placeholder="Enter your email" type="email" />
 * </Field>
 *
 * // Field with description
 * <Field>
 *   <FieldLabel>Username</FieldLabel>
 *   <FieldControl placeholder="Choose a username" />
 *   <FieldDescription>
 *     Your username will be visible to other users.
 *   </FieldDescription>
 * </Field>
 *
 * // Field with validation error
 * <Field>
 *   <FieldLabel>Password</FieldLabel>
 *   <FieldControl type="password" placeholder="Enter password" />
 *   <FieldError>Password must be at least 8 characters long.</FieldError>
 * </Field>
 *
 * // Complete form field
 * <Field>
 *   <FieldLabel>Full Name</FieldLabel>
 *   <FieldControl placeholder="Enter your full name" required />
 *   <FieldDescription>
 *     This will be displayed on your profile.
 *   </FieldDescription>
 *   <FieldError match="valueMissing">
 *     Please enter your full name.
 *   </FieldError>
 * </Field>
 *
 * // Custom control with render prop
 * <Field>
 *   <FieldLabel>Country</FieldLabel>
 *   <FieldControl
 *     render={(props) => (
 *       <Select {...props}>
 *         <SelectOption value="us">United States</SelectOption>
 *         <SelectOption value="ca">Canada</SelectOption>
 *       </Select>
 *     )}
 *   />
 * </Field>
 * ```
 */

import { Field as BaseField } from "@base-ui-components/react/field";
import * as React from "react";
import { cx } from "../../lib/utils";
import { Input } from "../input/input";
import { Text } from "../text/text";

/**
 * Root field component.
 *
 * Based on Base UI Field (https://base-ui.com/react/components/field),
 * provides the foundation for accessible form fields with label association,
 * validation states, and proper ARIA attributes.
 */
const Field = BaseField.Root;

/**
 * Field label component.
 *
 * Accessible label that associates with the field control for screen readers
 * and proper form semantics. Includes disabled state styling and consistent
 * typography.
 *
 * @component
 * @param className - Additional CSS classes.
 *
 * @id field
 * @name Field
 */
const FieldLabel = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseField.Label> & { ref?: React.RefObject<React.ElementRef<typeof BaseField.Label> | null> }) => (
    <BaseField.Label
      ref={ref}
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
 * Field control component.
 *
 * Form input control that integrates with field validation and accessibility.
 * Defaults to Input component but can be customized with render prop for
 * other control types like Select, Textarea, etc.
 *
 * @param className - Additional CSS classes.
 * @param render - Custom render function for different control types.
 */
const FieldControl = ({ ref, className, render, ...props }: React.ComponentPropsWithoutRef<typeof BaseField.Control> & { ref?: React.RefObject<React.ElementRef<typeof BaseField.Control> | null> }) => (
    <BaseField.Control
      ref={ref}
      className={className}
      render={render || (controlProps => <Input {...controlProps} />)}
      {...props}
    />
  );
FieldControl.displayName = "FieldControl";

/**
 * Field description component.
 *
 * Descriptive text that provides additional context or instructions for
 * the form field. Properly associated with the control for accessibility.
 *
 * @param className - Additional CSS classes.
 */
const FieldDescription = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseField.Description> & { ref?: React.RefObject<React.ElementRef<typeof BaseField.Description> | null> }) => (
    <BaseField.Description
      ref={ref}
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
 * Field error component.
 *
 * Error message display for field validation feedback. Includes error
 * styling and proper accessibility attributes for screen readers.
 *
 * @param className - Additional CSS classes.
 */
const FieldError = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseField.Error> & { ref?: React.RefObject<React.ElementRef<typeof BaseField.Error> | null> }) => (
    <BaseField.Error
      ref={ref}
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
 * Field validity component.
 *
 * Provides validation state information for custom validation logic
 * and programmatic access to field validity status.
 */
const FieldValidity = BaseField.Validity;

export {
    Field,
    FieldControl,
    FieldDescription,
    FieldError,
    FieldLabel,
    FieldValidity
};
