"use client";

import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { TooltipProps } from "../types";
import { tooltipVariants } from "../variants";
import { ArrowSvg } from "./arrow-svg";
import { TooltipArrow } from "./tooltip-arrow";
import { TooltipPopup } from "./tooltip-popup";
import { TooltipPortal } from "./tooltip-portal";
import { TooltipPositioner } from "./tooltip-positioner";
import { TooltipRoot } from "./tooltip-root";
import { TooltipTrigger } from "./tooltip-trigger";

/**
 * A tooltip component built on Base UI's Tooltip primitive for displaying contextual information.
 */
const Tooltip = ({
  ref: forwardedRef,
  children,
  className,
  content,
  delayDuration: _delayDuration = 150,
  defaultOpen,
  open,
  onClick,
  onOpenChange,
  showArrow = true,
  side = "top",
  sideOffset = 10,
  align = "center",
  alignOffset = 0,
  variant,
  size,
  render,
  ...props
}: TooltipProps & {
  ref?: React.RefObject<React.ElementRef<typeof TooltipPopup> | null>;
}) => {
  const { popup, arrow } = tooltipVariants({ variant, size });

  const defaultRender: React.ReactElement<Record<string, unknown>> = (
    <Button className="cursor-pointer" />
  );

  return (
    <TooltipRoot
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
      {...props}
    >
      <TooltipTrigger onClick={onClick} render={render || defaultRender}>
        {children}
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipPositioner
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
        >
          <TooltipPopup
            className={cx(popup(), className)}
            data-testid="tooltip"
            ref={forwardedRef}
          >
            {content}
            {showArrow && (
              <TooltipArrow className={arrow()}>
                <ArrowSvg />
              </TooltipArrow>
            )}
          </TooltipPopup>
        </TooltipPositioner>
      </TooltipPortal>
    </TooltipRoot>
  );
};

Tooltip.displayName = "Tooltip";

// Note: Base UI doesn't have a TooltipProvider component

export { Tooltip };
export type { TooltipProps } from "../types";
