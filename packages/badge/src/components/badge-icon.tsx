"use client";

import type { Size } from "@patternmode/config/sizes";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Icon } from "@patternmode/icon";
import type { IconComponent } from "@patternmode/icon/types";
import { getIconComponent } from "@patternmode/icons";
import { badgeToIconSizeMap } from "../variants";

/**
 * Icon component for badges
 * Handles both left and right positioned icons with proper sizing
 */
export type BadgeIconProps = {
  icon: IconComponent | string;
  position: "left" | "right";
  size?: Size;
  strokeWidth?: number;
};

export function BadgeIcon({
  icon,
  size = "base",
  strokeWidth = DEFAULT_ICON_STROKE_WIDTH,
}: BadgeIconProps) {
  const iconSize = badgeToIconSizeMap[size];
  const ResolvedIconComponent =
    typeof icon === "string" ? getIconComponent(icon) : icon;

  if (!ResolvedIconComponent) {
    return null;
  }

  return (
    <Icon
      icon={ResolvedIconComponent}
      size={iconSize}
      strokeWidth={strokeWidth}
    />
  );
}
