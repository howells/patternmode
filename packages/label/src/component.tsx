import { Field } from "@base-ui-components/react/field";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Props for the Label component.
 * Extends Base UI Field.Label props with additional disabled state support.
 */
export type LabelProps = {
  /** Whether the label should appear disabled. */
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<typeof Field.Label>;

/**
 * Form label component providing accessible labeling for input elements.
 */
export const Label = ({
  ref: forwardedRef,
  className,
  disabled,
  ...props
}: LabelProps & { ref?: React.RefObject<React.ElementRef<typeof Field.Label> | null> }) => (
  <Field.Label
    data-testid="label"
    ref={forwardedRef}
    className={cx(
      // base
      "text-sm leading-none",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // disabled
      { "text-zinc-400 dark:text-zinc-600": disabled },
      className,
    )}
    aria-disabled={disabled}
    {...props}
  />
);

Label.displayName = "Label";

