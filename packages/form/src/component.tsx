"use client";

import { Field as BaseField } from "@base-ui-components/react/field";
import { Form as BaseForm } from "@base-ui-components/react/form";
import { cx } from "@patternmode/utils/cx";
import * as React from "react";
import type { ZodSchema } from "zod";

/**
 * Props for the Form component.
 */
type FormProps = {
	/**
	 * Optional Zod schema for form validation.
	 * When provided, enables type-safe validation with automatic error handling.
	 */
	schema?: ZodSchema;
	/**
	 * Callback for successful form submission with validated data.
	 * Called only when validation passes (if schema provided) or form is valid.
	 */
	onValidSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
	/**
	 * Form content including fields and submit buttons.
	 * Should contain FormField components and form controls.
	 */
	children: React.ReactNode;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
	/**
	 * Custom submit handler (overrides default validation).
	 * When provided, bypasses automatic Zod validation.
	 */
	onSubmit?: React.ComponentPropsWithoutRef<typeof BaseForm>["onSubmit"];
} & React.ComponentPropsWithoutRef<typeof BaseForm>;

/**
 * Root form component with integrated Zod validation.
 */
const Form = ({
	schema,
	onValidSubmit,
	children,
	className,
	onSubmit,
	...props
}: FormProps) => {
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
			data-testid="form"
			className={cx("space-y-6", className)}
			errors={errors}
			onClearErrors={() => setErrors({})}
			onSubmit={onSubmit || handleSubmit}
			{...props}
		>
			{children}
		</BaseForm>
	);
};
Form.displayName = "Form";

/**
 * Props for the FormItem component.
 */
type FormItemProps = {
	/**
	 * Form item content.
	 * Should contain form field components like labels and controls.
	 */
	children: React.ReactNode;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Form item container for grouping field components.
 */
const FormItem = ({ className, ...props }: FormItemProps) => {
	return <div className={cx("space-y-3", className)} {...props} />;
};
FormItem.displayName = "FormItem";

/**
 * Props for the FormLabel component.
 */
type FormLabelProps = {
	/**
	 * Label text content.
	 * Describes the associated form control for accessibility.
	 */
	children: React.ReactNode;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Label>;

/**
 * Form label component with consistent styling.
 */
const FormLabel = ({ className, ...props }: FormLabelProps) => {
	return (
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
};
FormLabel.displayName = "FormLabel";

/**
 * Props for the FormControl component.
 */
type FormControlProps = {
	/**
	 * Input type for the form control.
	 * Determines the type of input element rendered.
	 */
	type?: string;
	/**
	 * Placeholder text for the input.
	 * Provides guidance on expected input format.
	 */
	placeholder?: string;
	/**
	 * Whether the field is required.
	 * Adds HTML5 validation constraint.
	 */
	required?: boolean;
	/**
	 * Input pattern for validation.
	 * HTML5 pattern attribute for input validation.
	 */
	pattern?: string;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Control>;

/**
 * Form control component with styling and validation states.
 */
const FormControl = ({
	className,
	children,
	...props
}: FormControlProps & { children?: React.ReactNode }) => {
	// If children are provided, use BaseField.Control as a wrapper (render prop pattern)
	if (children) {
		return (
			<BaseField.Control
				render={(controlProps) => (
					<div className={className}>
						{React.isValidElement(children)
							? React.cloneElement(children, {
									...controlProps,
									...(typeof children.props === "object" &&
									children.props !== null
										? children.props
										: {}),
								})
							: children}
					</div>
				)}
				{...props}
			/>
		);
	}

	// If no children, render as input element (legacy behavior)
	return (
		<BaseField.Control
			className={cx(
				// base
				"block w-full rounded-md border px-3 py-2 text-sm transition-colors",
				// border
				" dark:border-zinc-600",
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
				className,
			)}
			{...props}
		/>
	);
};
FormControl.displayName = "FormControl";

/**
 * Props for the FormDescription component.
 */
type FormDescriptionProps = {
	/**
	 * Description text content.
	 * Provides additional context and instructions for form fields.
	 */
	children: React.ReactNode;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Description>;

/**
 * Form description component for help text.
 */
const FormDescription = ({ className, ...props }: FormDescriptionProps) => {
	return (
		<BaseField.Description
			className={cx(
				// base
				"text-sm leading-6",
				// text color
				"text-zinc-600 dark:text-zinc-400",
				className,
			)}
			{...props}
		/>
	);
};
FormDescription.displayName = "FormDescription";

/**
 * Props for the FormError component.
 */
type FormErrorProps = {
	/**
	 * Error message content.
	 * Displays validation errors with proper styling.
	 * Optional - when not provided, displays automatic validation errors from form state.
	 */
	children?: React.ReactNode;
	/**
	 * Validation constraint to match for display.
	 * Allows conditional error display based on validation rules.
	 */
	match?: string;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Error>;

/**
 * Form error message component.
 */
const FormError = ({ className, ...props }: FormErrorProps) => {
	return (
		<BaseField.Error
			className={cx(
				// base
				"text-sm leading-6",
				// text color
				"text-red-600 dark:text-red-400",
				className,
			)}
			{...props}
		/>
	);
};
FormError.displayName = "FormError";

/**
 * Props for the FormField component.
 */
type FormFieldProps = {
	/**
	 * Field name for form data and validation.
	 * Used to identify the field in form submission and error handling.
	 */
	name: string;
	/**
	 * Optional label text.
	 * Displayed above the form control for user guidance.
	 */
	label?: string;
	/**
	 * Optional description/help text.
	 * Provides additional context below the control.
	 */
	description?: string;
	/**
	 * Whether field is required (adds visual indicator).
	 * Shows an asterisk next to the label when true.
	 */
	required?: boolean;
	/**
	 * Layout orientation for the field.
	 * Controls the arrangement of label and control elements.
	 */
	orientation?: "vertical" | "horizontal";
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Complete form field with label, control, description, and error.
 */
const FormField = ({
	name,
	label,
	description,
	required,
	className,
	children,
	orientation = "vertical",
}: FormFieldProps) => {
	if (orientation === "horizontal") {
		return (
			<BaseField.Root name={name} className={className}>
				<FormItem>
					<div className="flex items-start gap-3">
						<div className="mt-1">{children}</div>
						<div className="space-y-1">
							{label && (
								<FormLabel className="cursor-pointer">
									{label}
									{required && <span className="text-red-500 ml-1">*</span>}
								</FormLabel>
							)}
							{description && <FormDescription>{description}</FormDescription>}
						</div>
					</div>
					<FormError>Invalid input</FormError>
				</FormItem>
			</BaseField.Root>
		);
	}

	return (
		<BaseField.Root name={name} className={className}>
			<FormItem>
				{label && (
					<FormLabel>
						{label}
						{required && <span className="text-red-500 ml-1">*</span>}
					</FormLabel>
				)}
				{children}
				{description && <FormDescription>{description}</FormDescription>}
				<FormError>Invalid input</FormError>
			</FormItem>
		</BaseField.Root>
	);
};
FormField.displayName = "FormField";

export {
	Form,
	FormControl,
	type FormControlProps,
	FormDescription,
	type FormDescriptionProps,
	FormError,
	type FormErrorProps,
	FormField,
	type FormFieldProps,
	FormItem,
	type FormItemProps,
	FormLabel,
	type FormLabelProps,
	type FormProps,
};
