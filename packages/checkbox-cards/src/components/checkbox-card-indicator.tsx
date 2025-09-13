import {
  CheckboxIndicator,
  type CheckboxIndicatorProps,
} from "@patternmode/checkbox";
import type React from "react";

/**
 * Visual indicator for checkbox card selection state with checkmark design.
 * Reuses the CheckboxIndicator from @checkbox package for consistency.
 */
const CheckboxCardIndicator = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof CheckboxIndicator>) => (
  <CheckboxIndicator className={className} ref={ref} {...props} />
);
CheckboxCardIndicator.displayName = "CheckboxCardIndicator";

export { CheckboxCardIndicator };
export type { CheckboxIndicatorProps as CheckboxCardIndicatorProps };
