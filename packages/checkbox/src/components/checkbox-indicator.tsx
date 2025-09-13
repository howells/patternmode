import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { checkboxIndicatorVariants } from "../variants";

type CheckboxIndicatorProps = React.ComponentPropsWithoutRef<
  typeof BaseCheckbox.Indicator
> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseCheckbox.Indicator> | null>;
  /**
   * The checked state to determine which icon to show.
   * - `true`: Shows checkmark icon
   * - `false` or `undefined`: Shows nothing
   * - `"indeterminate"`: Shows dash icon
   */
  checked?: boolean | "indeterminate";
};

const CheckboxIndicator = ({
  ref,
  className,
  checked,
  ...props
}: CheckboxIndicatorProps) => (
  <BaseCheckbox.Indicator
    className={cx(checkboxIndicatorVariants(), className)}
    ref={ref}
    {...props}
  >
    {checked === "indeterminate" ? (
      <svg
        aria-hidden="true"
        fill="none"
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          x1="4"
          x2="12"
          y1="8"
          y2="8"
        />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        fill="none"
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.2 5.59998L6.79999 9.99998L4.79999 7.99998"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    )}
  </BaseCheckbox.Indicator>
);

CheckboxIndicator.displayName = "CheckboxIndicator";

export { CheckboxIndicator };
export type { CheckboxIndicatorProps };
