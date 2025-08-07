"use client";

import type { DotProps } from "./types";

import { cx } from "@patternmode/ui/cx";
import React from "react";
import { getColorClasses } from "../../lib/variants";
import { dotIndicatorVariants, dotVariants } from "./variants";

/**
 * Small circular indicator component for status, notifications, or decorative purposes.
 */
const Dot = (
  { ref, variant = "default", label, animated = false, size = "default", className, ...props }: DotProps & { ref?: React.RefObject<HTMLSpanElement | null> },
) => {
  const colorClasses = getColorClasses(variant);

  return (
    <span
      ref={ref}
      data-testid="dot"
      className={cx(dotVariants({ size }), colorClasses.text, className)}
      {...props}
    >
      <span
        className={cx(
          dotIndicatorVariants({ size, animated }),
          colorClasses.bgSolid,
          // Add dynamic before: color for animation
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
