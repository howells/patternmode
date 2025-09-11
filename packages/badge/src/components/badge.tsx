"use client";

import { useRender } from "@base-ui-components/react/use-render";
import type { Size } from "@patternmode/config/sizes";
import type { IconComponent } from "@patternmode/icon/types";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type { BadgeVariant } from "../types";
import { badgeVariants } from "../variants";
import { BadgeContent } from "./badge-content";
import { BadgeIcon } from "./badge-icon";
import { BadgeStatusDot } from "./badge-status-dot";
import { DismissButton } from "./dismiss-button";

export type BadgeProps = {
  border?: boolean;
  rounded?: boolean;
  statusDot?: boolean;
  statusAnimated?: boolean;
  dismissible?: boolean;
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dismissIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  variant?: BadgeVariant;
  size?: Size;
  leftIcon?: IconComponent | string;
  rightIcon?: IconComponent | string;
  iconStrokeWidth?: number;
} & useRender.ComponentProps<"span">;

/**
 * Main Badge component composed of logical sub-components
 * - BadgeStatusDot: Status indicator dot
 * - BadgeIcon: Left and right icons
 * - BadgeContent: Main text content
 * - DismissButton: Dismissible functionality
 */
const Badge = ({
  ref: forwardedRef,
  render = <span />,
  variant,
  size = "base",
  border,
  rounded,
  leftIcon,
  rightIcon,
  iconStrokeWidth,
  children,
  dismissible: _dismissible = false,
  onDismiss,
  dismissIcon,
  statusDot,
  statusAnimated = false,
  className,
  ...otherProps
}: BadgeProps & { ref?: React.RefObject<HTMLSpanElement | null> }) => {
  const effectiveVariant = variant || "default";

  const hasLeftIcon = leftIcon && !statusDot;
  const hasRightIcon = rightIcon && !statusDot;
  const hasDismissButton = Boolean(_dismissible || onDismiss);
  const hasStatusDot = Boolean(statusDot);

  const renderBadgeContent = () => (
    <>
      {hasStatusDot && (
        <BadgeStatusDot
          animated={statusAnimated}
          size={size}
          variant={effectiveVariant}
        />
      )}
      {hasLeftIcon && leftIcon && (
        <BadgeIcon
          icon={leftIcon}
          position="left"
          size={size}
          strokeWidth={iconStrokeWidth}
        />
      )}
      <BadgeContent>{children}</BadgeContent>
      {hasRightIcon && rightIcon && (
        <BadgeIcon
          icon={rightIcon}
          position="right"
          size={size}
          strokeWidth={iconStrokeWidth}
        />
      )}
      {hasDismissButton && (
        <DismissButton
          className={cx(
            size === "2xs" && "-ml-0.5",
            size === "xs" && "-ml-0.5",
            size === "sm" && "-ml-1",
            size === "base" && "-ml-1",
            size === "lg" && "-ml-1.5"
          )}
          icon={dismissIcon}
          iconStrokeWidth={iconStrokeWidth}
          onClick={onDismiss}
          size={size}
        />
      )}
    </>
  );

  const defaultProps: useRender.ElementProps<"span"> & {
    "data-testid": string;
  } = {
    className: cx(
      badgeVariants({ variant: effectiveVariant, size, border, rounded }),
      className
    ),
    children: renderBadgeContent(),
    "data-testid": "badge",
  };

  const element = useRender({
    render,
    ref: forwardedRef ?? undefined,
    props: { ...defaultProps, ...otherProps },
  });
  return element;
};

Badge.displayName = "Badge";

export { Badge };
export type { BadgeVariant } from "../types";
export { badgeVariants } from "../variants";
