"use client";

import { Field as BaseField } from "@base-ui-components/react/field";
import { Form as BaseForm } from "@base-ui-components/react/form";
import { cx } from "@patternmode/utils/cx";
import React, { useState } from "react";

type ZodishResult =
  | { success: true; data: Record<string, unknown> }
  | {
      success: false;
      error: { flatten: () => { fieldErrors: Record<string, string[]> } };
    };
type Zodish = { safeParse: (data: Record<string, unknown>) => ZodishResult };

type FormProps = {
  schema?: Zodish;
  onValidSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  onSubmit?: React.ComponentPropsWithoutRef<typeof BaseForm>["onSubmit"];
} & React.ComponentPropsWithoutRef<typeof BaseForm>;

const Form = ({
  schema,
  onValidSubmit,
  children,
  className,
  onSubmit,
  ...props
}: FormProps) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    if (schema) {
      const result = schema.safeParse(data);
      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
        return;
      }
      if (onValidSubmit) {
        await onValidSubmit(result.data as Record<string, unknown>);
      }
    } else if (onValidSubmit) {
      await onValidSubmit(data as Record<string, unknown>);
    }
  };

  return (
    <BaseForm
      className={cx("space-y-6", className)}
      data-testid="form"
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

type FormItemProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const FormItem = ({ className, ...props }: FormItemProps) => {
  return <div className={cx("space-y-3", className)} {...props} />;
};
FormItem.displayName = "FormItem";

type FormLabelProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Label>;
const FormLabel = ({ className, ...props }: FormLabelProps) => {
  return (
    <BaseField.Label
      className={cx(
        "block font-medium text-sm leading-6",
        "text-zinc-900 dark:text-zinc-50",
        "data-disabled:text-zinc-400 dark:data-disabled:text-zinc-600",
        className
      )}
      {...props}
    />
  );
};
FormLabel.displayName = "FormLabel";

type FormControlProps = {
  type?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Control>;

const FormControl = ({
  className,
  children,
  ...props
}: FormControlProps & { children?: React.ReactNode }) => {
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

  return (
    <BaseField.Control
      className={cx(
        "block w-full rounded-md border px-3 py-2 text-sm transition-colors",
        "dark:border-zinc-600",
        "bg-white dark:bg-zinc-800",
        "text-zinc-900 dark:text-zinc-50",
        "placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
        "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-invalid:border-red-500 data-invalid:focus:border-red-500 data-invalid:focus:ring-red-500/20",
        className
      )}
      {...props}
    />
  );
};
FormControl.displayName = "FormControl";

type FormDescriptionProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Description>;
const FormDescription = ({ className, ...props }: FormDescriptionProps) => {
  return (
    <BaseField.Description
      className={cx(
        "text-sm leading-6",
        "text-zinc-600 dark:text-zinc-400",
        className
      )}
      {...props}
    />
  );
};
FormDescription.displayName = "FormDescription";

type FormErrorProps = {
  children?: React.ReactNode;
  match?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Error>;

const FormError = ({ className, ...props }: FormErrorProps) => {
  return (
    <BaseField.Error
      className={cx(
        "text-sm leading-6",
        "text-red-600 dark:text-red-400",
        className
      )}
      {...props}
    />
  );
};
FormError.displayName = "FormError";

type FormFieldProps = {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  orientation?: "vertical" | "horizontal";
} & React.ComponentPropsWithoutRef<"div">;

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
      <BaseField.Root className={className} name={name}>
        <FormItem>
          <div className="flex items-start gap-3">
            <div className="mt-1">{children}</div>
            <div className="space-y-1">
              {label && (
                <FormLabel className="cursor-pointer">
                  {label}
                  {required && <span className="ml-1 text-red-500">*</span>}
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
    <BaseField.Root className={className} name={name}>
      <FormItem>
        {label && (
          <FormLabel>
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
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
