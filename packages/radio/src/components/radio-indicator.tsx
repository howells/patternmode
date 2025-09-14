import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { cx } from "@patternmode/utils/cx";
import React from "react";

export type RadioIndicatorProps = React.ComponentProps<
  typeof BaseRadio.Indicator
>;

export const RadioIndicator = ({ ref, className, ...props }: RadioIndicatorProps) => (
  <BaseRadio.Indicator
    className={cx("absolute inset-0 flex items-center justify-center", className)}
    ref={ref}
    {...props}
  >
    <span className="block size-2 rounded-full bg-white dark:bg-zinc-50" />
  </BaseRadio.Indicator>
);
RadioIndicator.displayName = "RadioIndicator";

