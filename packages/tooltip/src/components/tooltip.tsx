"use client";

import { useRender } from "@base-ui-components/react/use-render";
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
}: TooltipProps) => {
  const { popup, arrow } = tooltipVariants({ variant, size });

  // Handle different render prop patterns
  if (typeof render === "function") {
    // Render prop function pattern (for AlertDialogTrigger composition)
    return (
      <TooltipRoot
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        open={open}
        {...props}
      >
        <TooltipTrigger onClick={onClick} render={render} />
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
  }

  // Default trigger element
  const defaultTriggerElement = <Button size="icon-sm" variant="ghost" />;

  // Use render prop element if provided, otherwise use default
  const triggerElement = useRender({
    render: render || defaultTriggerElement,
    props: {
      children,
      onClick,
    },
  });

  return (
    <TooltipRoot
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
      {...props}
    >
      <TooltipTrigger onClick={onClick}>{triggerElement}</TooltipTrigger>
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
