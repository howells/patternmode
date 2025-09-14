import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import { Check, Minus } from "lucide-react";

export type CheckboxIndicatorProps = React.ComponentProps<
  typeof BaseCheckbox.Indicator
> & {
  /** Pass true to render the indeterminate glyph explicitly. Otherwise, uses data-state. */
  indeterminate?: boolean;
};

export const CheckboxIndicator = ({
  ref,
  className,
  indeterminate,
  ...props
}: CheckboxIndicatorProps) => {
  return (
    <BaseCheckbox.Indicator
      className={cx("flex items-center justify-center text-current", className)}
      ref={ref}
      {...props}
    >
      {indeterminate ? (
        <Minus aria-hidden="true" className="h-3.5 w-3.5" />
      ) : (
        <Check aria-hidden="true" className="h-3.5 w-3.5" />
      )}
    </BaseCheckbox.Indicator>
  );
};
CheckboxIndicator.displayName = "CheckboxIndicator";

