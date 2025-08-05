import type { DismissButtonProps } from "./types";

import { X } from "lucide-react";
import React from "react";

import { config } from "../../lib/config";
import { cx, iconUtils } from "../../lib/utils";
import { dismissButtonVariants } from "./variants";

/**
 * Close button component for dismissing modals, alerts, and temporary content.
 */
const DismissButton = (
  { ref, onClick, icon: IconComponent = X, iconStrokeWidth = config.getIconStrokeWidth(), size = "base", className, "aria-label": ariaLabel = "Remove", ...props }: DismissButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> },
) => {
  // Size-based icon sizing
  const iconSizeMap = {
    xs: "xs" as const,
    sm: "xs" as const,
    base: "xs" as const,
    lg: "sm" as const,
  };

  const iconSize = iconSizeMap[size];
  const iconSizeClass = iconUtils.getIconSize(iconSize);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      data-testid="dismiss-button"
      className={cx(dismissButtonVariants({ size }), className)}
      aria-label={ariaLabel}
      {...props}
    >
      <IconComponent
        className={cx(iconSizeClass, "shrink-0")}
        strokeWidth={iconStrokeWidth}
        aria-hidden="true"
      />
    </button>
  );
};

DismissButton.displayName = "DismissButton";

export { DismissButton };