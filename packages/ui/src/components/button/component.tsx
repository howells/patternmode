import type { IconComponent } from "../../lib/icon-utils";
import type { ButtonSize, IconButtonSize } from "./types";
import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import React from "react";
import { config } from "../../lib/config";
import { renderIcon } from "../../lib/icon-utils";
import { cx } from "../../lib/utils";
import { Kbd } from "../kbd/component";
import { useButtonKeyboardShortcut } from "../kbd/use-keyboard-shortcut";
import { Loader } from "../loader/component";
import { buttonVariants } from "./variants";

type ButtonProps = {
  /**
   * Whether the button is in a loading state.
   * Shows spinner and disables interactions when true.
   */
  isLoading?: boolean;
  /**
   * Text to display when loading (defaults to children).
   * Only shown when isLoading is true.
   */
  loadingText?: string;
  /**
   * Icon component (proxy for leftIcon).
   * This is essentially an alias for leftIcon, useful for single-icon buttons.
   * Takes precedence over leftIcon when both are provided.
   */
  icon?: IconComponent;
  /**
   * Icon component to display on the left side.
   * Used for icon-text combinations.
   */
  leftIcon?: IconComponent;
  /**
   * Icon component to display on the right side.
   * Not shown on icon-only button sizes.
   */
  rightIcon?: IconComponent;
  /**
   * Stroke width for icons (defaults to config value).
   * Controls the thickness of icon strokes.
   */
  iconStrokeWidth?: number;
  /**
   * Whether the button should take full width.
   * When true, button expands to container width.
   */
  fullWidth?: boolean;
  /**
   * Text alignment within the button.
   * Controls horizontal text positioning.
   */
  textAlign?: "left" | "center" | "right";
  /**
   * Keyboard shortcut to display.
   * Can be a single key or array of keys for combinations.
   */
  kbd?: string | string[];
  /**
   * Platform for keyboard shortcut display.
   * Auto-detects platform when set to "auto".
   */
  kbdPlatform?: "mac" | "pc" | "auto";
  /**
   * Whether the button should have a shadow.
   * Adds subtle elevation styling when true.
   */
  shadow?: boolean;
  /**
   * Visual style variant of the button.
   * Controls color scheme and visual emphasis.
   */
  variant?: "default" | "secondary" | "outline" | "outline-dashed" | "ghost" | "destructive" | "inverse-ghost" | "link" | "minimal";
  /**
   * Size variant of the button.
   * Icon sizes are for icon-only buttons without text.
   */
  size?: ButtonSize | IconButtonSize;
  /**
   * Whether to use full border radius for rounded appearance.
   * Creates pill-shaped buttons when true.
   */
  rounded?: boolean;
  /**
   * Custom element to render (defaults to button tag).
   * Enables semantic flexibility while maintaining styling.
   * When href is provided, this is automatically set to Link.
   */
  render?: useRender.RenderProp<Record<string, unknown>>;
  /**
   * URL to navigate to when clicked.
   * When provided, the button automatically renders as a Link.
   */
  href?: string;
  /**
   * Whether to show the left icon only on hover.
   * When true, the left icon has opacity-0 normally and opacity-100 on hover.
   */
  showLeftIconOnHover?: boolean;
  /**
   * Whether to show the right icon only on hover.
   * When true, the right icon has opacity-0 normally and opacity-100 on hover.
   */
  showRightIconOnHover?: boolean;
  /**
   * Ref to the button element.
   * For accessing the underlying DOM element.
   */
  ref?: React.RefObject<HTMLButtonElement | null>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Interactive button component with multiple variants and states for user actions.
 */
const Button = ({
  ref: forwardedRef,
  render,
  href,
  showLeftIconOnHover = false,
  showRightIconOnHover = false,
  isLoading = false,
  loadingText,
  className,
  disabled,
  variant,
  size,
  rounded,
  icon,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  iconStrokeWidth = config.getIconStrokeWidth(),
  children,
  fullWidth,
  textAlign,
  kbd,
  kbdPlatform = "auto",
  shadow = true,
  ...props
}: ButtonProps) => {
  // Automatically set render prop based on href
  const effectiveRender = render || (href ? <Link href={href} /> : <button type="button" />);
  const hasChildren = children != null && children !== "";
  const isIconOnly
    = size === "icon-xs"
      || size === "icon-sm"
      || size === "icon"
      || size === "icon-lg";
    // Prioritize icon prop over leftIcon prop
  const effectiveLeftIconProp = icon || LeftIcon;
  const hasLeftIcon
    = effectiveLeftIconProp != null
      || (isIconOnly && effectiveLeftIconProp == null);
  const effectiveLeftIcon
    = effectiveLeftIconProp
      || (isIconOnly && effectiveLeftIconProp == null ? MoreHorizontal : null);
  const hasRightIcon
    = RightIcon != null
      && size !== "icon-xs"
      && size !== "icon-sm"
      && size !== "icon"
      && size !== "icon-lg";
  const shouldShowChildren
    = hasChildren
      && size !== "icon-xs"
      && size !== "icon-sm"
      && size !== "icon"
      && size !== "icon-lg";
  const isIconButton
    = size === "icon-xs"
      || size === "icon-sm"
      || size === "icon"
      || size === "icon-lg";

  // Check if children is a complex element (custom layout)
  const hasCustomLayout = React.isValidElement(children);

  // Handle keyboard shortcuts
  const kbdKeys = kbd ? (Array.isArray(kbd) ? kbd : [kbd]) : undefined;
  useButtonKeyboardShortcut(kbdKeys, props.onClick as (() => void) | undefined);

  // Determine kbd variant based on button variant
  const kbdVariant
    = variant === "default" || variant === "destructive"
      ? "onDarkButton"
      : "onLightButton";

  // Icon sizing is now handled by the Icon component via renderIcon
  // Helper to get icon container size for loader positioning
  const getIconContainerSize = () => {
    const sizeStr = size as string;
    return sizeStr === "xs" || sizeStr === "icon-xs"
      ? "size-3"
      : sizeStr === "sm" || sizeStr === "icon-sm"
        ? "size-3.5"
        : sizeStr === "lg" || sizeStr === "icon-lg"
          ? "size-4"
          : "size-3.5";
  };

  // When loading, Loader replaces leftIcon, and we show loadingText or original children
  const effectiveChildren = isLoading && loadingText ? loadingText : children;
  const effectiveShouldShowChildren = shouldShowChildren;

  const renderButtonContent = () => {
    // If children is a custom React element AND we don't have explicit icon props AND no kbd, render it directly
    if (
      hasCustomLayout
      && LeftIcon == null
      && !hasRightIcon
      && !isLoading
      && !kbd
    ) {
      return children;
    }

    // For icon-only buttons with children but no explicit leftIcon, render children directly
    if (
      isIconButton
      && hasChildren
      && LeftIcon == null
      && !hasRightIcon
      && !isLoading
      && !kbd
    ) {
      return children;
    }

    // For icon-only buttons with leftIcon, render the icon directly without loading states
    if (
      isIconButton
      && effectiveLeftIconProp != null
      && !hasRightIcon
      && !isLoading
      && !kbd
    ) {
      return renderIcon(effectiveLeftIconProp, size, iconStrokeWidth);
    }

    // For icon buttons, wrap any text children in sr-only span
    const iconButtonChildren = isIconButton && hasChildren && (
      <span className="sr-only">{effectiveChildren}</span>
    );

    // Determine layout class
    const layoutClassName = cx(
      "flex items-center w-full transition-all duration-150 ease-in-out",
      // For icon-only buttons, center everything
      size === "icon-xs" || size === "icon-sm" || size === "icon"
        ? "justify-center"
        // Full width with centered text and left elements uses space-between
        : fullWidth && textAlign === "center" && (hasLeftIcon || isLoading)
          ? "justify-between"
          : "justify-start gap-x-2",
    );

    // Normal width: simple gap layout
    if (!fullWidth) {
      // Simple case: no icons, loading state, or kbd
      if (!hasLeftIcon && !hasRightIcon && !isLoading && !kbd) {
        // For icon buttons, return sr-only wrapped children
        if (isIconButton && hasChildren) {
          return iconButtonChildren;
        }
        return effectiveShouldShowChildren ? effectiveChildren : null;
      }

      // Simple case with just kbd and no icons/loading
      if (!hasLeftIcon && !hasRightIcon && !isLoading && kbd) {
        const content = effectiveShouldShowChildren ? effectiveChildren : null;
        const kbdElement = (
          <Kbd
            keys={Array.isArray(kbd) ? kbd : undefined}
            platform={kbdPlatform}
            variant={kbdVariant}
            className="ml-2"
          >
            {Array.isArray(kbd) ? undefined : kbd}
          </Kbd>
        );

        if (isIconButton && hasChildren) {
          return (
            <span className="flex items-center justify-between w-full">
              {iconButtonChildren}
              {kbdElement}
            </span>
          );
        }

        return (
          <span className="flex items-center justify-between w-full">
            {content}
            {kbdElement}
          </span>
        );
      }

      return (
        <span className={layoutClassName}>
          {/* Left icon container with CSS transitions */}
          {(isLoading || hasLeftIcon) && (
            <span
              className={cx(
                "flex items-center relative transition-all duration-150 ease-in-out",
              )}
            >
              <div
                className={`relative ${getIconContainerSize()} flex items-center justify-center`}
              >
                {/* Loader */}
                <div
                  className={cx(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-in-out",
                    isLoading ? "opacity-100" : "opacity-0 pointer-events-none",
                  )}
                >
                  <Loader
                    size={
                      size === "xs" || size === "icon-xs"
                        ? "xs"
                        : size === "sm" || size === "icon-sm"
                          ? "xs"
                          : size === "lg" || size === "icon-lg"
                            ? "base"
                            : "sm"
                    }
                    aria-label={loadingText || "Loading"}
                  />
                </div>
                {/* Left Icon */}
                {hasLeftIcon && (
                  <div
                    className={cx(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-in-out",
                                              !isLoading
                          ? showLeftIconOnHover
                            ? "opacity-0 group-hover/button:opacity-100"
                            : "opacity-100"
                          : "opacity-0 pointer-events-none",
                    )}
                  >
                    {effectiveLeftIcon
                      && renderIcon(
                        effectiveLeftIcon,
                        size,
                        iconStrokeWidth,
                      )}
                  </div>
                )}
              </div>
            </span>
          )}

          {isIconButton && hasChildren
            ? iconButtonChildren
            : effectiveShouldShowChildren && effectiveChildren}

          {/* Keyboard shortcut */}
          {kbd && !hasRightIcon && (
            <Kbd
              keys={Array.isArray(kbd) ? kbd : undefined}
              platform={kbdPlatform}
              variant={kbdVariant}
              className="ml-auto"
            >
              {Array.isArray(kbd) ? undefined : kbd}
            </Kbd>
          )}

          {/* Right icon with CSS transitions */}
          {hasRightIcon && (
            <span className="flex items-center">
              {RightIcon && (
                <span
                  className={cx(
                    "transition-opacity duration-150 ease-in-out",
                    showRightIconOnHover
                      ? "opacity-0 group-hover/button:opacity-100"
                      : "opacity-100"
                  )}
                >
                  {renderIcon(RightIcon, size, iconStrokeWidth)}
                </span>
              )}
              {kbd && (
                <Kbd
                  keys={Array.isArray(kbd) ? kbd : undefined}
                  platform={kbdPlatform}
                  variant={kbdVariant}
                  className="ml-2"
                >
                  {Array.isArray(kbd) ? undefined : kbd}
                </Kbd>
              )}
            </span>
          )}
        </span>
      );
    }

    // Full width with center alignment: spread layout
    if (textAlign === "center") {
      return (
        <span className={layoutClassName}>
          {/* Left spacer/icon */}
          {(isLoading || hasLeftIcon) && (
            <span className="flex items-center relative transition-all duration-150 ease-in-out">
              <div
                className={`relative ${getIconContainerSize()} flex items-center justify-center`}
              >
                <div
                  className={cx(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                    isLoading ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Loader
                    size={
                      size === "xs" || size === "icon-xs"
                        ? "xs"
                        : size === "sm" || size === "icon-sm"
                          ? "xs"
                          : size === "lg" || size === "icon-lg"
                            ? "base"
                            : "sm"
                    }
                    aria-label={loadingText || "Loading"}
                  />
                </div>
                {hasLeftIcon && (
                  <div
                    className={cx(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                      !isLoading ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {effectiveLeftIcon
                      && renderIcon(
                        effectiveLeftIcon,
                        size,
                        iconStrokeWidth,
                      )}
                  </div>
                )}
              </div>
            </span>
          )}

          <div className="flex-1 text-center">
            {isIconButton && hasChildren
              ? iconButtonChildren
              : effectiveShouldShowChildren && effectiveChildren}
          </div>

          {/* Right icon */}
          <span className="flex items-center">
            {RightIcon && (
              <span
                className={cx(
                  "transition-opacity duration-150 ease-in-out",
                  showRightIconOnHover
                    ? "opacity-0 group-hover/button:opacity-100"
                    : "opacity-100"
                )}
              >
                {renderIcon(RightIcon, size, iconStrokeWidth)}
              </span>
            )}
          </span>
        </span>
      );
    }

    // Full width with left/right alignment and right icon: single flex container
    if (hasRightIcon) {
      return (
        <span className="flex items-center gap-x-2 w-full transition-all duration-150 ease-in-out">
          {/* Left icon container */}
          {(isLoading || hasLeftIcon) && (
            <span className="flex items-center relative transition-all duration-150 ease-in-out">
              <div
                className={`relative ${getIconContainerSize()} flex items-center justify-center`}
              >
                <div
                  className={cx(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                    isLoading ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Loader
                    size={size === "xs" ? "xs" : size === "sm" ? "xs" : "sm"}
                    aria-label={loadingText || "Loading"}
                  />
                </div>
                {hasLeftIcon && (
                  <div
                    className={cx(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                      !isLoading ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {effectiveLeftIcon
                      && renderIcon(
                        effectiveLeftIcon,
                        size,
                        iconStrokeWidth,
                      )}
                  </div>
                )}
              </div>
            </span>
          )}

          {/* Text content */}
          {isIconButton && hasChildren
            ? iconButtonChildren
            : effectiveShouldShowChildren && effectiveChildren}

          {/* Right icon with ml-auto to push to right */}
          <span className={`flex items-center ${fullWidth ? "ml-auto" : ""}`}>
            {RightIcon && (
              <span
                className={cx(
                  "transition-opacity duration-150 ease-in-out",
                  showRightIconOnHover
                    ? "opacity-0 group-hover/button:opacity-100"
                    : "opacity-100"
                )}
              >
                {renderIcon(RightIcon, size, iconStrokeWidth)}
              </span>
            )}
          </span>
        </span>
      );
    }

    // Full width with left/right alignment without right icon: normal flow
    return (
      <span className={layoutClassName}>
        {/* Left icon container */}
        {(isLoading || hasLeftIcon) && (
          <span className="flex items-center relative transition-all duration-150 ease-in-out">
            <div
              className={`relative ${
                size === "xs" || size === "icon-xs"
                  ? "size-3"
                  : size === "sm" || size === "icon-sm"
                    ? "size-3.5"
                    : size === "lg" || size === "icon-lg"
                      ? "size-4"
                      : "size-3.5"
              } flex items-center justify-center`}
            >
              <div
                className={cx(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                  isLoading ? "opacity-100" : "opacity-0",
                )}
              >
                <Loader
                  size={size === "sm" ? "xs" : "sm"}
                  aria-label={loadingText || "Loading"}
                />
              </div>
              {hasLeftIcon && (
                <div
                  className={cx(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                    !isLoading ? "opacity-100" : "opacity-0",
                  )}
                >
                  {effectiveLeftIcon
                    && renderIcon(effectiveLeftIcon, size, iconStrokeWidth)}
                </div>
              )}
            </div>
          </span>
        )}
        {isIconButton && hasChildren
          ? iconButtonChildren
          : effectiveShouldShowChildren && effectiveChildren}
      </span>
    );
  };

  const defaultProps: useRender.ElementProps<"button"> = {
    className: cx(
      buttonVariants({ variant, size, rounded }),
      fullWidth && "w-full max-w-[95vw]",
      // Add group class when using hover effects for icons
      (showLeftIconOnHover || showRightIconOnHover) && "group/button",
      // Derive shadow from prop
      shadow ? "shadow-xs" : "shadow-none",
      // Derive flex justification from textAlign and fullWidth
      fullWidth && textAlign === "left"
        ? "justify-start"
        : fullWidth && textAlign === "right"
          ? "justify-end"
          : fullWidth && textAlign === "center"
            ? "justify-center"
            : "justify-center", // default justify for non-fullWidth or no textAlign
      // Derive text alignment - only when not using fullWidth center (which has its own layout)
      !(fullWidth && textAlign === "center") && textAlign === "left"
        ? "text-left"
        : !(fullWidth && textAlign === "center") && textAlign === "right"
            ? "text-right"
            : "text-center", // default text alignment
      className,
    ),
    disabled: disabled || isLoading,
    type: "button",
    ...({
      "data-testid": "button",
    } as React.HTMLAttributes<HTMLButtonElement>),
    children: renderButtonContent(),
  };

  const element = useRender({
    render: effectiveRender,
    ref: forwardedRef,
    props: mergeProps<"button">(defaultProps, props),
  });

  return element;
};

Button.displayName = "Button";

export { Button, type ButtonProps };
