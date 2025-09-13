import { Radio as BaseRadio } from "@base-ui-components/react/radio";
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
    className={
      "relative inline-flex size-4 shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-950" +
      (className ? ` ${className}` : "")
    }
  >
    <BaseRadio.Indicator
      className="absolute inset-0 flex items-center justify-center"
      ref={ref}
      {...props}
    >
      <div className="size-2 rounded-full bg-zinc-50 dark:bg-zinc-50" />
    </BaseRadio.Indicator>
  </div>
);
RadioCardIndicator.displayName = "RadioCardIndicator";

export { RadioCardIndicator };
export type RadioCardIndicatorProps = React.ComponentProps<
  typeof BaseRadio.Indicator
>;
