import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { RadioItemProps } from "../types";
import { radioVariants } from "../variants";

export const RadioItem = ({
  ref,
  className,
  size,
  variant,
  nativeButton = true,
  ...props
}: RadioItemProps) => {
  const classes = React.useMemo(() => {
    const variants = radioVariants({ size, variant });
    return {
      root: cx(variants.root(), className),
      circle: variants.circle(),
      dot: variants.dot(),
    };
  }, [size, variant, className]);
  return (
    <BaseRadio.Root
      className={classes.root}
      nativeButton={nativeButton}
      ref={ref}
      {...props}
    >
      <div className={classes.circle}>
        <BaseRadio.Indicator className="absolute inset-0 flex items-center justify-center">
          <div className={classes.dot} />
        </BaseRadio.Indicator>
      </div>
    </BaseRadio.Root>
  );
};
RadioItem.displayName = "RadioItem";
