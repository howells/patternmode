import React from "react";

import { cx } from "../../lib/utils";
import { Button } from "../button/component";
import { Heading } from "../heading/component";
import { IconContainer } from "../icon-container/component";
import { Subheading } from "../subheading/component";
import { Text } from "../text/component";

/**
 * Props for the EmptyState component.
 */
type EmptyStateProps = {
  /**
   * The main heading/title of the empty state.
   * Displayed prominently to identify what is missing or empty.
   */
  title: string;
  /**
   * Optional description text below the title.
   * Provides additional context or guidance for users.
   */
  description?: string;
  /**
   * Optional icon component to display above the title.
   * Should be a Lucide React icon component with className support.
   */
  icon?: React.ComponentType<{ className?: string }>;
  /**
   * Primary action button configuration.
   * The main call-to-action for resolving the empty state.
   */
  primaryAction?: {
    /**
     * Button label text.
     */
    label: string;
    /**
     * Click handler for button action.
     */
    onClick?: () => void;
    /**
     * URL for link action (alternative to onClick).
     */
    href?: string;
    /**
     * Whether the button is disabled.
     */
    disabled?: boolean;
  };
  /**
   * Secondary action button configuration.
   * Optional secondary action for alternative paths.
   */
  secondaryAction?: {
    /**
     * Button label text.
     */
    label: string;
    /**
     * Click handler for button action.
     */
    onClick?: () => void;
    /**
     * URL for link action (alternative to onClick).
     */
    href?: string;
  };
  /**
   * Visual variant of the empty state.
   * Default shows background for icon, minimal is text-only.
   */
  variant?: "default" | "minimal";
  /**
   * Size variant affecting spacing and icon size.
   * Controls overall scale and visual hierarchy.
   */
  size?: "sm" | "default" | "lg";
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * A component for displaying empty states when there's no content to show.
 */
export function EmptyState({
  title,
  description,
  icon: Icon,
  primaryAction,
  secondaryAction,
  variant = "default",
  size = "default",
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cx(
        // Base styles
        "flex flex-col items-center justify-center text-center",
        // Spacing based on size
        size === "sm" && "gap-3 py-8 px-4",
        size === "default" && "gap-4 py-12 px-6",
        size === "lg" && "gap-6 py-16 px-12",
        // Max width
        "max-w-md mx-auto",
        className,
      )}
      {...props}
    >
      {/* Icon */}
      {Icon && (
        <IconContainer
          icon={Icon}
          size={
            size === "sm"
              ? "sm"
              : size === "default"
                ? "lg"
                : "xl"
          }
          variant={variant === "minimal" ? "neutral" : "neutral"}
        />
      )}

      {/* Title */}
      <div className="space-y-2">
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
          className={cx(
            "flex flex-col items-center",
            size === "sm" && "gap-2 mt-2",
            size === "default" && "gap-3 mt-4",
            size === "lg" && "gap-4 mt-6",
            // Stack on mobile, inline on larger screens if both actions exist
            primaryAction && secondaryAction && "sm:flex-row sm:gap-3",
          )}
        >
          {/* Primary Action */}
          {primaryAction && (
            <Button
              variant="default"
              size={size === "sm" ? "sm" : "default"}
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
              size={size === "sm" ? "sm" : "default"}
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

export { type EmptyStateProps };
