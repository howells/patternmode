"use client";

import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Popup component that contains the tooltip content.
 * This is the visible part of the tooltip with the actual content.
 */
export const TooltipPopup = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Popup> & {
  className?: string;
}) => {
  return (
    <BaseTooltip.Popup className={cx(className)} {...props}>
      {children}
    </BaseTooltip.Popup>
  );
};
