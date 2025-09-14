import type { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { CheckboxIndicator } from "@patternmode/checkbox";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Visual indicator for checkbox card selection state with checkmark design.
 * Reuses the CheckboxIndicator from @checkbox package for consistency.
 */
const CheckboxCardIndicator = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Indicator>) => (
  <div
    aria-hidden="true"
    className={cx(
      "inline-flex size-4 items-center justify-center rounded border transition-colors",
      "border-zinc-300 bg-white text-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-900",
      "group-data-[checked]:bg-zinc-900 dark:group-data-[checked]:bg-zinc-50",
      className
    )}
    role="presentation"
  >
    <CheckboxIndicator ref={ref} {...props} />
  </div>
);
CheckboxCardIndicator.displayName = "CheckboxCardIndicator";

export { CheckboxCardIndicator };
export type CheckboxCardIndicatorProps = React.ComponentProps<
  typeof BaseCheckbox.Indicator
>;
