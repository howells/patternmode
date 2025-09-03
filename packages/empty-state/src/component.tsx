import { Button } from "@patternmode/button";
import { Heading } from "@patternmode/heading";
import { IconContainer } from "@patternmode/icon-container";
import { Subheading } from "@patternmode/subheading";
import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import type { EmptyStateProps } from "./types";
import {
  emptyStateActionsVariants,
  emptyStateContentVariants,
  emptyStateVariants,
} from "./variants";

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
      className={cx(emptyStateVariants({ size }), className)}
      data-testid="empty-state"
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
        {size === "lg" ? (
          <Heading level={2}>{title}</Heading>
        ) : (
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
            hasMultipleActions,
          })}
        >
          {/* Primary Action */}
          {primaryAction &&
            (primaryAction.href ? (
              <a aria-label={primaryAction.label} href={primaryAction.href}>
                <Button
                  disabled={primaryAction.disabled}
                  size={size === "sm" ? "sm" : size === "lg" ? "lg" : "base"}
                  variant="primary"
                >
                  {primaryAction.label}
                </Button>
              </a>
            ) : (
              <Button
                disabled={primaryAction.disabled}
                onClick={primaryAction.onClick}
                size={size === "sm" ? "sm" : size === "lg" ? "lg" : "base"}
                variant="primary"
              >
                {primaryAction.label}
              </Button>
            ))}

          {/* Secondary Action */}
          {secondaryAction &&
            (secondaryAction.href ? (
              <a aria-label={secondaryAction.label} href={secondaryAction.href}>
                <Button
                  size={size === "sm" ? "sm" : size === "lg" ? "lg" : "base"}
                  variant="ghost"
                >
                  {secondaryAction.label}
                </Button>
              </a>
            ) : (
              <Button
                onClick={secondaryAction.onClick}
                size={size === "sm" ? "sm" : size === "lg" ? "lg" : "base"}
                variant="ghost"
              >
                {secondaryAction.label}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
};

EmptyState.displayName = "EmptyState";
