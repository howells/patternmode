// Tremor Tag [v1.0.0] - Base UI

import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import React from "react";

import { config } from "../../lib/config";
import { cx, iconUtils } from "../../lib/utils";
import { Avatar } from "../avatar/component";
import { DismissButton } from "../dismiss-button/component";

/**
 * Get padding classes based on avatar and dismissible state.
 */
function getPaddingClasses(
  avatar: TagProps["avatar"],
  dismissible: boolean,
): string {
  if (avatar) {
    // With avatar: less left padding since avatar provides visual weight
    return dismissible ? "pl-1 pr-1" : "pl-1 pr-3";
  }
  else {
    // No avatar: standard padding
    return dismissible ? "pl-2.5 pr-1" : "px-3";
  }
}

type TagProps = {
  /**
   * The label text (e.g., "Department", "Location").
   * When provided, displays as a subtle prefix before the main value.
   */
  label?: string;
  /**
   * The value text (e.g., "Sales", "Zurich").
   * The primary content of the tag that identifies the item or category.
   */
  value: string;
  /**
   * Optional count or secondary text to display after the value.
   * Useful for showing quantities, status indicators, or additional context.
   */
  count?: string | number;
  /**
   * Custom CSS classes for the count element.
   * Allows customization of count styling while preserving base functionality.
   */
  countClassName?: string;
  /**
   * Whether the tag can be dismissed.
   * When true, shows a dismiss button that triggers onDismiss when clicked.
   */
  dismissible?: boolean;
  /**
   * Callback when the dismiss button is clicked.
   * Required when dismissible is true. Receives the click event for handling.
   */
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Icon component (proxy for leftIcon).
   * This is essentially an alias for leftIcon, useful for single-icon tags.
   * Takes precedence over leftIcon when both are provided.
   */
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Icon component to display on the left side.
   * Used for icon-text combinations.
   */
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Stroke width for icons (defaults to config value).
   * Controls the thickness of icon strokes.
   */
  iconStrokeWidth?: number;
  /**
   * Avatar configuration for user tags.
   * When provided, displays a small avatar before the tag content.
   */
  avatar?: {
    /**
     * Avatar image source URL.
     */
    src?: string;
    /**
     * Alt text for the avatar image.
     */
    alt?: string;
    /**
     * Initials to display when no image is available.
     */
    initials?: string;
  };
  /**
   * Aria label for the dismiss button.
   * Provides accessible labeling for screen readers when tag is dismissible.
   */
  dismissAriaLabel?: string;
} & useRender.ComponentProps<"span">;

/**
 * Label component for categorizing and tagging content with removable options.
 */
const Tag = (
  { ref: forwardedRef, render = <span />, label, value, count, countClassName, dismissible = false, onDismiss, icon, leftIcon, iconStrokeWidth = config.getIconStrokeWidth(), avatar, className, dismissAriaLabel = "Remove", ...props }: TagProps,
) => {
  // Prioritize icon prop over leftIcon prop
  const effectiveIcon = icon || leftIcon;
  const defaultProps: useRender.ElementProps<"span"> & { "data-testid": string } = {
    "data-testid": "tag",
    "className": cx(
      // base
      "inline-flex items-center gap-x-2 rounded-full py-1 text-sm",
      // padding logic
      getPaddingClasses(avatar, dismissible),
      // background color
      "bg-white dark:bg-[#090E1A]",
      // text color
      "text-zinc-700 dark:text-zinc-300",
      // border
      "ring-1 ring-inset ring-zinc-200 dark:ring-zinc-800",
      className,
    ),
    "children": (
      <>
        {avatar && (
          <Avatar
            src={avatar.src}
            alt={avatar.alt}
            initials={avatar.initials}
            size="xs"
            className="size-6"
          />
        )}
        {effectiveIcon && !avatar && (
          React.createElement(effectiveIcon, {
            "className": cx(iconUtils.getIconSize("xs"), "shrink-0"),
            "strokeWidth": iconStrokeWidth,
          })
        )}
        {label && (
          <>
            <span className="text-xs text-zinc-700 dark:text-zinc-300">
              {label}
            </span>
            <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          </>
        )}
        <span className="text-xs font-medium text-zinc-900 dark:text-zinc-50">
          {value}
          {count !== undefined && count !== "" && (
            <span
              className={cx(
                // default knocked-back styling
                "ml-1.5 text-xs font-normal text-zinc-500 dark:text-zinc-400",
                countClassName,
              )}
            >
              {count}
            </span>
          )}
        </span>
        {dismissible && (
          <DismissButton
            onClick={onDismiss}
            size="xs"
            className={cx(
              // base - adjust margin based on whether there's a count
              count !== undefined && count !== "" ? "-ml-1.5" : "-ml-1",
            )}
            aria-label={dismissAriaLabel}
          />
        )}
      </>
    ) as React.ReactNode,
  };

  const element = useRender({
    render,
    ref: forwardedRef,
    props: mergeProps<"span">(defaultProps, props),
  });

  return element;
};

Tag.displayName = "Tag";

export { Tag, type TagProps };
