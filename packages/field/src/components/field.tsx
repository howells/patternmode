import { Field as BaseField } from "@base-ui-components/react/field";
import { Input } from "@patternmode/input";
import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

const Field = ({
  ref: _ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseField.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseField.Root> | null>;
}) => <BaseField.Root {...props} data-testid="field" />;
Field.displayName = "Field";

type FieldLabelProps = {
  children?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Label>;

const FieldLabel = ({ className, ...props }: FieldLabelProps) => (
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
FieldLabel.displayName = "FieldLabel";

type FieldControlProps = {
  render?: React.ComponentPropsWithoutRef<typeof BaseField.Control>["render"];
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Control>;

const FieldControl = ({ className, render, ...props }: FieldControlProps) => (
  <BaseField.Control
    className={className}
    render={
      render ||
      (({ ref, ...controlProps }) => (
        <Input {...controlProps} externalRef={ref} />
      ))
    }
    {...props}
  />
);
FieldControl.displayName = "FieldControl";

type FieldDescriptionProps = {
  children?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Description>;

const FieldDescription = ({ className, ...props }: FieldDescriptionProps) => (
  <BaseField.Description
    render={(descriptionProps) => (
      <Text
        {...descriptionProps}
        className={cx(
          "text-zinc-600 dark:text-zinc-400",
          "data-disabled:text-zinc-400 dark:data-disabled:text-zinc-600",
          className
        )}
        size="sm"
      />
    )}
    {...props}
  />
);
FieldDescription.displayName = "FieldDescription";

type FieldErrorProps = {
  children?: React.ReactNode;
  match?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseField.Error>;

const FieldError = ({ className, ...props }: FieldErrorProps) => (
  <BaseField.Error
    className={cx(
      "text-sm leading-6",
      "text-red-600 dark:text-red-400",
      "data-disabled:text-zinc-400 dark:data-disabled:text-zinc-600",
      className
    )}
    {...props}
  />
);
FieldError.displayName = "FieldError";

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

