import { Field } from "@base-ui-components/react/field";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

export type LabelProps = {
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<typeof Field.Label>;

export const Label = ({
  ref: forwardedRef,
  className,
  disabled,
  ...props
}: LabelProps & {
  ref?: React.RefObject<React.ElementRef<typeof Field.Label> | null>;
}) => (
  <Field.Label
    aria-disabled={disabled}
    className={cx(
      "text-sm leading-none",
      "text-zinc-900 dark:text-zinc-50",
      { "text-zinc-400 dark:text-zinc-600": disabled },
      className
    )}
    data-testid="label"
    ref={forwardedRef}
    {...props}
  />
);

Label.displayName = "Label";
