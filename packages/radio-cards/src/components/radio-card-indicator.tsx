import type { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { RadioIndicator } from "@patternmode/radio";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Visual indicator for radio card selection state with circular design.
 * Local implementation using Base UI primitives to avoid cross-package coupling.
 */
const RadioCardIndicator = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseRadio.Indicator>) => (
  <div
    aria-hidden="true"
    className={cx(
      "group relative inline-flex size-4 items-center justify-center rounded-full border-2",
      "border-zinc-300 bg-white text-zinc-50 dark:border-zinc-600 dark:bg-zinc-950",
      "group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500",
      className
    )}
    role="presentation"
  >
    <RadioIndicator ref={ref} {...props} />
  </div>
);
RadioCardIndicator.displayName = "RadioCardIndicator";

export { RadioCardIndicator };
export type RadioCardIndicatorProps = React.ComponentProps<
  typeof BaseRadio.Indicator
>;
