import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { RadioLabelProps } from "../types";
import { radioLabelVariants } from "../variants";

export const RadioLabel = ({
  ref,
  className,
  size,
  children,
  ...props
}: RadioLabelProps) => {
  const labelClass = React.useMemo(
    () => cx(radioLabelVariants({ size }), className),
    [size, className]
  );
  return (
    <span
      className={labelClass}
      ref={ref as React.RefObject<HTMLSpanElement | null>}
      {...props}
    >
      {children}
    </span>
  );
};
RadioLabel.displayName = "RadioLabel";
