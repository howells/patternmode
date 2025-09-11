"use client";

import { getColorClasses } from "@patternmode/config/variants";
import { cx } from "@patternmode/utils/cx";
import { getStatusDotColor } from "../badge-utils";
import type { BadgeVariant } from "../types";
import { dotIndicatorVariants } from "../variants";

/**
 * Status dot indicator for badges
 * Shows a small colored dot to indicate status (online, offline, etc.)
 */
export type BadgeStatusDotProps = {
  variant?: BadgeVariant;
  size?: "2xs" | "xs" | "sm" | "base" | "lg";
  animated?: boolean;
};

export function BadgeStatusDot({
  variant,
  size = "base",
  animated = false,
}: BadgeStatusDotProps) {
  const statusDotSize: "sm" | "default" | "lg" =
    size === "lg" ? "default" : "sm";

  return (
    <span
      aria-hidden="true"
      className={cx(
        dotIndicatorVariants({
          size: statusDotSize,
          animated,
        }),
        getColorClasses(getStatusDotColor(variant)).bgSolid,
        animated &&
          `before:bg-${getColorClasses(getStatusDotColor(variant)).color}-500`
      )}
    />
  );
}
