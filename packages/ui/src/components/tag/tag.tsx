// Tremor Tag [v1.0.0] - Base UI

import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { X } from "lucide-react";
import React from "react";

import { config } from "../../lib/config";
import { cx, iconUtils } from "../../lib/utils";
import { Avatar } from "../avatar/avatar";

/**
 * Get padding classes based on avatar and dismissible state.
 * @example
 * ```tsx
 * <InlineTagDismissButton>Content</InlineTagDismissButton>
 * ```
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

/**
 * Label component for categorizing and tagging content with removable options.
 *
 * @id tag
 * @name Tag
 * @icon Tag
 * @category utility
 * @component
 * @param props - Component properties.
 */
const InlineTagDismissButton = (
  { ref, onClick, icon: IconComponent = X, iconStrokeWidth = config.getIconStrokeWidth(), size = "base", className, "aria-label": ariaLabel = "Remove" }: {
    "onClick"?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    "icon"?: React.ComponentType<{
      className?: string;
      strokeWidth?: number;
    }>;
    "iconStrokeWidth"?: number;
    "size"?: "sm" | "base" | "lg";
    "className"?: string;
    "aria-label"?: string;
  } & { ref?: React.RefObject<HTMLButtonElement | null> },
) => {
  // Size-based icon sizing
  const iconSizeMap = {
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
      className={cx(
        // Base button styling
        "flex items-center justify-center rounded-full transition-colors",
        // Size-based dimensions
        size === "sm" && "size-4",
        size === "base" && "size-5",
        size === "lg" && "size-6",
        // Color styling (subtle, context-aware)
        "text-zinc-500 dark:text-zinc-400",
        // Hover states
        "hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200",
        // Focus states
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
        className,
      )}
      aria-label={ariaLabel}
    >
      <IconComponent
        className={cx(iconSizeClass, "shrink-0")}
        strokeWidth={iconStrokeWidth}
        aria-hidden="true"
      />
    </button>
  );
};

type TagProps = {
  /**
   * The label text (e.g., "Department", "Location").
   */
  label?: string;
  /**
   * The value text (e.g., "Sales", "Zurich").
   */
  value: string;
  /**
   * Optional count or secondary text to display after the value.
   */
  count?: string | number;
  /**
   * Custom CSS classes for the count element.
   */
  countClassName?: string;
  /**
   * Whether the tag can be dismissed.
   */
  dismissible?: boolean;
  /**
   * Callback when the dismiss button is clicked.
   */
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Avatar configuration for user tags.
   */
  avatar?: {
    src?: string;
    alt?: string;
    initials?: string;
  };
  /**
   * Aria label for the dismiss button.
   */
  dismissAriaLabel?: string;
} & useRender.ComponentProps<"span">;

/**
 * Label component for categorizing and tagging content with removable options.
 *
 * @id tag
 * @name Tag
 * @icon Tag
 * @category utility
 * @component
 * @param props - Component properties.
 */
const Tag = (
  { ref: forwardedRef, render = <span />, label, value, count, countClassName, dismissible = false, onDismiss, avatar, className, dismissAriaLabel = "Remove", ...props }: TagProps,
) => {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: cx(
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
    children: (
      <>
        {avatar && (
          <Avatar
            src={avatar.src}
            alt={avatar.alt}
            initials={avatar.initials}
            className="size-6"
          />
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
          <InlineTagDismissButton
            onClick={onDismiss}
            size="base"
            className={cx(
              // base - adjust margin based on whether there's a count
              count !== undefined && count !== "" ? "-ml-1.5" : "-ml-1",
            )}
            aria-label={dismissAriaLabel}
          />
        )}
      </>
    ),
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
