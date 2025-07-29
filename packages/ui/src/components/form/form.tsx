"use client";

// Form Component [v1.0.0] - Base UI + Zod Integration

/**
 * Form Components
 *
 * A modern form system that integrates Base UI Form components with Zod validation
 * for type-safe, accessible forms. Provides comprehensive form building blocks
 * with automatic validation, error handling, and accessibility features.
 *
 * Features:
 * - Zod schema validation integration
 * - Base UI accessibility support
 * - Automatic error handling and display
 * - Type-safe form data
 * - HTML5 validation fallback
 * - Consistent styling and theming
 *
 * @example
 * ```tsx
 * // Basic form with Zod validation
 * const schema = z.object({
 *   name: z.string().min(1, "Name is required"),
 *   email: z.string().email("Invalid email address"),
 *   age: z.coerce.number().min(18, "Must be 18 or older")
 * });
 *
 * <Form
 *   schema={schema}
 *   onValidSubmit={(data) => {
 *     console.log('Valid data:', data);
 *   }}
 * >
 *   <FormField name="name" label="Full Name" required>
 *     <FormControl placeholder="Enter your name" />
 *   </FormField>
 *
 *   <FormField
 *     name="email"
 *     label="Email"
 *     description="We'll never share your email"
 *     required
 *   >
 *     <FormControl type="email" placeholder="your@email.com" />
 *   </FormField>
 *
 *   <FormField name="age" label="Age" required>
 *     <FormControl type="number" placeholder="18" />
 *   </FormField>
 *
 *   <button type="submit">Submit</button>
 * </Form>
 *
 * // Native HTML5 validation
 * <Form>
 *   <FormField name="website" label="Website" required>
 *     <FormControl
 *       type="url"
 *       placeholder="https://example.com"
 *       pattern="https?://.*"
 *     />
 *   </FormField>
 *
 *   <FormField name="phone" label="Phone">
 *     <FormControl
 *       type="tel"
 *       placeholder="(555) 123-4567"
 *       pattern="[0-9\s\-\(\)]+"
 *     />
 *   </FormField>
 * </Form>
 *
 * // Custom form layout
 * <Form schema={registrationSchema} onValidSubmit={handleRegistration}>
 *   <div className="grid grid-cols-2 gap-4">
 *     <FormField name="firstName" label="First Name" required>
 *       <FormControl />
 *     </FormField>
 *     <FormField name="lastName" label="Last Name" required>
 *       <FormControl />
 *     </FormField>
 *   </div>
 *
 *   <FormField name="email" label="Email" required>
 *     <FormControl type="email" />
 *   </FormField>
 *
 *   <FormField
 *     name="password"
 *     label="Password"
 *     description="Must be at least 8 characters"
 *     required
 *   >
 *     <FormControl type="password" />
 *   </FormField>
 * </Form>
 * ```
 */

import { cx } from "../../lib/utils";
import { Field as BaseField } from "@base-ui-components/react/field";
import { Form as BaseForm } from "@base-ui-components/react/form";
import * as React from "react";
import { z } from "zod";

/**
 * Props for the Form component.
 *
 * Configuration for form validation, submission handling, and behavior.
 * Integrates Base UI Form with optional Zod validation.
 *
 * @interface FormProps
 * @extends React.ComponentPropsWithoutRef<typeof BaseForm>
 */
interface FormProps extends React.ComponentPropsWithoutRef<typeof BaseForm> {
  /** Optional Zod schema for form validation */
  schema?: z.ZodSchema;
  /** Callback for successful form submission with validated data */
  onValidSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
  /** Form content including fields and submit buttons */
  children: React.ReactNode;
}

/**
 * Root form component with integrated Zod validation.
 *
 * Combines Base UI Form with Zod schema validation for type-safe forms.
 * Handles form submission, validation, and error management automatically.
 * Falls back to HTML5 validation when no schema is provided.
 *
 * @param schema - Optional Zod schema for validation
 * @param onValidSubmit - Callback for successful submission
 * @param children - Form content including fields
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * const schema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8)
 * });
 *
 * <Form
 *   schema={schema}
 *   onValidSubmit={(data) => login(data)}
 * >
 *   <FormField name="email" label="Email" required>
 *     <FormControl type="email" />
 *   </FormField>
 *   <FormField name="password" label="Password" required>
 *     <FormControl type="password" />
 *   </FormField>
 *   <button type="submit">Sign In</button>
 * </Form>
 * ```
 */
const Form = React.forwardRef<React.ElementRef<typeof BaseForm>, FormProps>(
  ({ schema, onValidSubmit, children, className, onSubmit, ...props }, ref) => {
    const [errors, setErrors] = React.useState({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData);

      // Validate with Zod if schema provided
      if (schema) {
        const result = schema.safeParse(data);

        if (!result.success) {
          setErrors(result.error.flatten().fieldErrors);
          return;
        }

        // Call onValidSubmit with validated data
        if (onValidSubmit) {
          await onValidSubmit(result.data as Record<string, unknown>);
        }
      } else {
        // No schema validation, just call onValidSubmit
        if (onValidSubmit) {
          await onValidSubmit(data as Record<string, unknown>);
        }
      }
    };

    return (
      <BaseForm
        ref={ref}
        className={cx("space-y-6", className)}
        errors={errors}
        onClearErrors={() => setErrors({})}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </BaseForm>
    );
  }
);
Form.displayName = "Form";

/**
 * Form item container for grouping field components.
 *
 * Provides consistent spacing and layout for form field groups.
 * Used internally by FormField but can be used standalone for custom layouts.
 *
 * @param className - Additional CSS classes
 */
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cx("space-y-2", className)} {...props} />;
});
FormItem.displayName = "FormItem";

/**
 * Form label component with consistent styling.
 *
 * Accessible label that associates with form controls using Base UI Field.
 * Includes disabled state support and proper typography.
 *
 * @param className - Additional CSS classes
 */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof BaseField.Label>,
  React.ComponentPropsWithoutRef<typeof BaseField.Label>
>(({ className, ...props }, ref) => {
  return (
    <BaseField.Label
      ref={ref}
      className={cx(
        // base
        "block text-sm font-medium leading-6",
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // disabled
        "data-disabled:text-zinc-400 dark:data-disabled:text-zinc-600",
        className
      )}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

/**
 * Form control component with styling and validation states.
 *
 * Styled wrapper for form inputs with focus, disabled, and error states.
 * Integrates with Base UI Field for proper accessibility and validation.
 *
 * @param className - Additional CSS classes
 */
const FormControl = React.forwardRef<
  React.ElementRef<typeof BaseField.Control>,
  React.ComponentPropsWithoutRef<typeof BaseField.Control>
>(({ className, ...props }, ref) => {
  return (
    <BaseField.Control
      ref={ref}
      className={cx(
        // base
        "block w-full rounded-md border px-3 py-2 text-sm transition-colors",
        // border
        "border-zinc-200 dark:border-zinc-600",
        // background
        "bg-white dark:bg-zinc-800",
        // text
        "text-zinc-900 dark:text-zinc-50",
        // placeholder
        "placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
        // focus
        "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
        // disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // invalid
        "data-invalid:border-red-500 data-invalid:focus:border-red-500 data-invalid:focus:ring-red-500/20",
        className
      )}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

/**
 * Form description component for help text.
 *
 * Provides additional context and instructions for form fields.
 * Properly associated with controls for screen reader accessibility.
 *
 * @param className - Additional CSS classes
 */
const FormDescription = React.forwardRef<
  React.ElementRef<typeof BaseField.Description>,
  React.ComponentPropsWithoutRef<typeof BaseField.Description>
>(({ className, ...props }, ref) => {
  return (
    <BaseField.Description
      ref={ref}
      className={cx(
        // base
        "text-sm leading-6",
        // text color
        "text-zinc-600 dark:text-zinc-400",
        className
      )}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

/**
 * Form error message component.
 *
 * Displays validation errors with proper styling and accessibility.
 * Automatically shows errors from Zod validation or HTML5 constraints.
 *
 * @param className - Additional CSS classes
 */
const FormError = React.forwardRef<
  React.ElementRef<typeof BaseField.Error>,
  React.ComponentPropsWithoutRef<typeof BaseField.Error>
>(({ className, ...props }, ref) => {
  return (
    <BaseField.Error
      ref={ref}
      className={cx(
        // base
        "text-sm leading-6",
        // text color
        "text-red-600 dark:text-red-400",
        className
      )}
      {...props}
    />
  );
});
FormError.displayName = "FormError";

/**
 * Props for the FormField component.
 *
 * Configuration for complete form fields with all associated elements.
 */
interface FormFieldProps {
  /** Field name for form data and validation */
  name: string;
  /** Optional label text */
  label?: string;
  /** Optional description/help text */
  description?: string;
  /** Whether field is required (adds visual indicator) */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Form control element (input, select, textarea, etc.) */
  children: React.ReactNode;
}

/**
 * Complete form field with label, control, description, and error.
 *
 * Combines all form field components into a single, easy-to-use component.
 * Automatically handles accessibility associations and validation display.
 *
 * @param name - Field name for form data
 * @param label - Optional label text
 * @param description - Optional help text
 * @param required - Whether field is required
 * @param className - Additional CSS classes
 * @param children - Form control element
 *
 * @component
 * @example
 * ```tsx
 * <FormField
 *   name="email"
 *   label="Email Address"
 *   description="We'll never share your email"
 *   required
 * >
 *   <FormControl type="email" placeholder="your@email.com" />
 * </FormField>
 * ```
 */
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, label, description, required, className, children }, ref) => {
    return (
      <BaseField.Root name={name} className={className}>
        <FormItem ref={ref}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          {children}
          {description && <FormDescription>{description}</FormDescription>}
          <FormError />
        </FormItem>
      </BaseField.Root>
    );
  }
);
FormField.displayName = "FormField";


export {
  Form,
  FormControl,
  FormDescription,
  FormError,
  FormField,
  FormItem,
  FormLabel,
};
