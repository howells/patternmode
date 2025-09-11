"use client";

import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Arrow component that points from the tooltip to its trigger.
 * Automatically rotates and positions based on tooltip placement.
 */
export const TooltipArrow = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Arrow> & {
  className?: string;
}) => {
  return (
    <BaseTooltip.Arrow className={cx(className)} {...props}>
      {children}
    </BaseTooltip.Arrow>
  );
};
