"use client";

import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Trigger component that shows the tooltip when interacted with.
 * Supports hover, focus, and click interactions.
 */
type BaseTriggerProps = React.ComponentProps<typeof BaseTooltip.Trigger>;

export const TooltipTrigger = ({
  children,
  className,
  render,
  ...props
}: BaseTriggerProps & {
  /**
   * Optional render prop to compose the trigger element.
   * When provided, Tooltip will not wrap another element; instead it will
   * call Base UI's Trigger with a function and let you render the element,
   * merging the provided trigger props into your element.
   */
  render?: (triggerProps: React.HTMLProps<HTMLElement>) => React.ReactNode;
  className?: string;
}) => {
  // If a render function is provided, delegate element creation to the caller
  if (typeof render === "function") {
    return (
      <BaseTooltip.Trigger
        {...props}
        render={(triggerProps) =>
          render({ ...triggerProps, className: cx(className, triggerProps.className) })
        }
      />
    );
  }

  // Default behavior: pass an element via render so Base UI owns the element
  return (
    <BaseTooltip.Trigger
      {...props}
      render={<span className={cx(className)}>{children}</span>}
    />
  );
};
