"use client";

import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import type React from "react";

/**
 * Root component for the tooltip system.
 * Manages tooltip state and provides context to child components.
 */
export const TooltipRoot = ({
  children,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Root>) => {
  return <BaseTooltip.Root {...props}>{children}</BaseTooltip.Root>;
};
