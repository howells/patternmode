"use client";

import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Positioner component that handles tooltip positioning and collision detection.
 * Manages where the tooltip appears relative to its trigger.
 */
export const TooltipPositioner = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Positioner> & {
  className?: string;
}) => {
  return (
    <BaseTooltip.Positioner className={cx(className)} {...props}>
      {children}
    </BaseTooltip.Positioner>
  );
};
