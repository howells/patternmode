import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { cx } from "@patternmode/utils/cx";
import React from "react";

export type RadioIndicatorProps = React.ComponentProps<
  typeof BaseRadio.Indicator
> & {
  /** When provided, merges extra classes on the outer circle wrapper */
  wrapperClassName?: string;
};

export const RadioIndicator = ({
  ref,
  className,
  wrapperClassName,
  ...props
}: RadioIndicatorProps) => (
  <span
    className={cx(
      // outer circle is always visible
      "inline-flex size-4 items-center justify-center rounded-full border-2",
      "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-950",
      // selected state
      "group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500",
      wrapperClassName
    )}
  >
    <BaseRadio.Indicator
      className={cx("flex items-center justify-center", className)}
      ref={ref}
      {...props}
    >
      <span className="block size-2 rounded-full bg-white dark:bg-zinc-50" />
    </BaseRadio.Indicator>
  </span>
);
RadioIndicator.displayName = "RadioIndicator";
