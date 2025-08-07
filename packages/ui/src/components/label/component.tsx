import { Field } from "@base-ui-components/react/field";
import { cx } from "../../utils/cx";

import React from "react";

/**
 * Props for the Label component.
 *
 * Extends Base UI Field.Label props with additional disabled state support.
 */
type LabelProps = {
  /**
   * Whether the label should appear disabled.
   * Applies muted text color to indicate the associated form control is disabled.
   */
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<typeof Field.Label>;

/**
 * Form label component providing accessible labeling for input elements.
 */
const Label = ({
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
      {
        "text-zinc-400 dark:text-zinc-600": disabled,
      },
      className,
    )}
    aria-disabled={disabled}
    {...props}
  />
);

Label.displayName = "Label";

export { Label, type LabelProps };
