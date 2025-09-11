"use client";

import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import type React from "react";

/**
 * Portal component that renders the tooltip in a portal.
 * Useful for rendering tooltips outside the DOM hierarchy of their trigger.
 */
export const TooltipPortal = ({
  children,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Portal>) => {
  return <BaseTooltip.Portal {...props}>{children}</BaseTooltip.Portal>;
};
