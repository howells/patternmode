import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { RadioIndicatorProps } from "../types";
import { radioVariants } from "../variants";

export const RadioIndicator = ({
  ref,
  className,
  size,
  variant,
  ...props
}: RadioIndicatorProps) => {
  const classes = React.useMemo(() => {
    const variants = radioVariants({ size, variant });
    return { circle: cx(variants.circle(), className), dot: variants.dot() };
  }, [size, variant, className]);
  return (
    <div className={classes.circle}>
      <BaseRadio.Indicator
        className="absolute inset-0 flex items-center justify-center"
        ref={ref}
        {...props}
      >
        <div className={classes.dot} />
      </BaseRadio.Indicator>
    </div>
  );
};
RadioIndicator.displayName = "RadioIndicator";
