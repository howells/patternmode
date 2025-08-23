"use client";

import { cx } from "@patternmode/utils/cx";
import { getColorClasses } from "@patternmode/constants/variants";
import type * as React from "react";
import type { DotProps } from "./types";
import { dotIndicatorVariants, dotVariants } from "./variants";

const Dot = ({
  ref,
  variant = "default",
  label,
  animated = false,
  size = "default",
  className,
  ...props
}: DotProps & { ref?: React.RefObject<HTMLSpanElement | null> }) => {
  const colorClasses = getColorClasses(variant);
  return (
    <span ref={ref} data-testid="dot" className={cx(dotVariants({ size }), colorClasses.text, className)} {...props}>
      <span
        className={cx(
          dotIndicatorVariants({ size, animated }),
          colorClasses.bgSolid,
          animated && `before:bg-${colorClasses.color}-500`,
        )}
        aria-hidden="true"
      />
      {label && <span>{label}</span>}
    </span>
  );
};

Dot.displayName = "Dot";

export { Dot };

