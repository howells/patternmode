import type { IconContainerProps } from "./types";

import React from "react";
import { cx } from "../../lib/utils";
import { getColorClasses } from "../../lib/variants";
import { Icon } from "../icon/component";
import { iconContainerVariants } from "./variants";

/**
 * Container component for icons with consistent padding and background styling.
 */
export const IconContainer = ({
  icon,
  size,
  variant,
  color,
  iconSize = "base",
  centered = false,
  className,
  iconClassName,
  ...props
}: IconContainerProps) => {
  // Get color classes if custom color is provided
  const colorClasses = color ? getColorClasses(color) : null;

  return (
    <div
      data-testid="icon-container"
      className={cx(
        iconContainerVariants({ size, variant }),
        colorClasses && colorClasses.bgMuted,
        centered && "mx-auto",
        className,
      )}
      {...props}
    >
      <Icon
        icon={icon}
        size={iconSize}
        className={cx(colorClasses && colorClasses.textLight, iconClassName)}
      />
    </div>
  );
}
