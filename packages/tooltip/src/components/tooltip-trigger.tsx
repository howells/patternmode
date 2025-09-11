"use client";

import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Trigger component that shows the tooltip when interacted with.
 * Supports hover, focus, and click interactions.
 */
export const TooltipTrigger = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Trigger> & {
  className?: string;
}) => {
  return (
    <BaseTooltip.Trigger className={cx(className)} {...props}>
      {children}
    </BaseTooltip.Trigger>
  );
};
