import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { RadioGroupItemProps } from "../types";
import { radioGroupItemVariants } from "../variants";

export const RadioGroupItem = ({
  ref,
  className,
  size,
  variant,
  color,
  highContrast,
  children,
  value,
  ...props
}: RadioGroupItemProps) => {
  const itemClass = React.useMemo(
    () =>
      cx(
        radioGroupItemVariants({ size, variant, color, highContrast }),
        className
      ),
    [size, variant, color, highContrast, className]
  );

  return (
    <div className={itemClass} ref={ref}>
      <BaseRadio.Root nativeButton={false} value={value} {...props}>
        <div className="relative inline-flex size-4 shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-950">
          <BaseRadio.Indicator className="absolute inset-0 flex items-center justify-center">
            <div className="size-2 rounded-full bg-zinc-50 dark:bg-zinc-50" />
          </BaseRadio.Indicator>
        </div>
        {children}
      </BaseRadio.Root>
    </div>
  );
};
RadioGroupItem.displayName = "RadioGroup.Item";

export type { RadioGroupItemProps };
