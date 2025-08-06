import type { EmptyStateProps } from "./types";

import React from "react";

import { cx } from "../../lib/utils";
import { Button } from "../button/component";
import { Heading } from "../heading/component";
import { IconContainer } from "../icon-container/component";
import { Subheading } from "../subheading/component";
import { Text } from "../text/component";
import { emptyStateActionsVariants, emptyStateContentVariants, emptyStateVariants } from "./variants";

/**
 * A component for displaying empty states when there's no content to show.
 */
export const EmptyState = ({
  title,
  description,
  icon: Icon,
  primaryAction,
  secondaryAction,
  variant = "default",
  size = "base",
  className,
  ...props
}: EmptyStateProps) => {
  const hasMultipleActions = !!(primaryAction && secondaryAction);

  return (
    <div
      data-testid="empty-state"
      className={cx(emptyStateVariants({ size }), className)}
      {...props}
    >
      {/* Icon */}
      {Icon && (
        <IconContainer
          icon={Icon}
          size={
            size === "xs"
              ? "sm"
              : size === "sm"
                ? "sm"
                : size === "base"
                  ? "lg"
                  : "xl"
          }
          variant={variant === "minimal" ? "neutral" : "neutral"}
        />
      )}

      {/* Title */}
      <div className={emptyStateContentVariants()}>
        {size === "lg"
          ? (
              <Heading level={2}>{title}</Heading>
            )
          : (
              <Subheading>{title}</Subheading>
            )}

        {/* Description */}
        {description && <Text>{description}</Text>}
      </div>

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div
          className={emptyStateActionsVariants({
            size,
            hasMultipleActions
          })}
        >
          {/* Primary Action */}
          {primaryAction && (
            <Button
              variant="primary"
              size={size === "sm" ? "sm" : size === "lg" ? "lg" : "base"}
              disabled={primaryAction.disabled}
              onClick={primaryAction.onClick}
              render={
                primaryAction.href
                  ? (
                      <a href={primaryAction.href} />
                    )
                  : undefined
              }
            >
              {primaryAction.label}
            </Button>
          )}

          {/* Secondary Action */}
          {secondaryAction && (
            <Button
              variant="ghost"
              size={size === "sm" ? "sm" : size === "lg" ? "lg" : "base"}
              onClick={secondaryAction.onClick}
              render={
                secondaryAction.href
                  ? (
                      <a href={secondaryAction.href} />
                    )
                  : undefined
              }
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

EmptyState.displayName = "EmptyState";