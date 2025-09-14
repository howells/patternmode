import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import { Check, Minus } from "lucide-react";

export type CheckboxIndicatorProps = React.ComponentProps<
  typeof BaseCheckbox.Indicator
> & {
  /** Force the minus glyph (for tri-state parents). */
  indeterminate?: boolean;
  /** Merge classes on the outer box wrapper. */
  wrapperClassName?: string;
};

export const CheckboxIndicator = ({
  ref,
  className,
  wrapperClassName,
  indeterminate,
  ...props
}: CheckboxIndicatorProps) => (
  <span
    className={cx(
      // visible box at all times
      "inline-flex size-4 items-center justify-center rounded border transition-colors",
      "border-zinc-300 bg-white text-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-900",
      // tint when checked
      "group-data-[checked]:bg-zinc-900 dark:group-data-[checked]:bg-zinc-50",
      wrapperClassName
    )}
  >
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
  </span>
);
CheckboxIndicator.displayName = "CheckboxIndicator";
