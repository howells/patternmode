import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Icon } from "@patternmode/icon";
import { Kbd } from "@patternmode/kbd";
import { useButtonKeyboardShortcut } from "@patternmode/kbd/use-keyboard-shortcut";
import { Loader } from "@patternmode/loader";
import { cx } from "@patternmode/utils/cx";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import type { ButtonProps } from "./types";
import {
  getIconContainerSize,
  getIconSize,
  getLoaderSize,
  isSmallIconButton,
} from "./utils";
import { buttonVariants } from "./variants";

// Link component is provided via LinkProvider; fallback is a plain anchor.
type LinkProps = {
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;
};

const _Link = ({ href, children, ...props }: LinkProps) => (
  <a href={href} {...props}>
    {children}
  </a>
);

/**
 * Interactive button component with multiple variants and states for user actions.
 */
const Button = ({
  ref: forwardedRef,
  render = <button type="button" />,
  showLeftIconOnHover = false,
  showRightIconOnHover = false,
  isLoading = false,
  loadingText,
  className,
  disabled,
  variant,
  size = "base",
  rounded,
  icon,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  children,
  fullWidth,
  textAlign,
  kbd,
  kbdPlatform = "auto",
  ...restProps
}: ButtonProps) => {
  // Strip unsupported Radix-style slot prop that may be injected upstream.
  const { asChild: _ignoreAsChild, ...props } = restProps as {
    asChild?: unknown;
  } & typeof restProps;

  const hasChildren = children != null && children !== "";

  const isIconOnly = size?.includes("icon") ?? false;

  // Prioritize icon prop over leftIcon prop
  const effectiveLeftIconProp = icon || LeftIcon;

  const hasLeftIcon =
    effectiveLeftIconProp != null ||
    (isIconOnly && effectiveLeftIconProp == null);

  const effectiveLeftIcon =
    effectiveLeftIconProp ||
    (isIconOnly && effectiveLeftIconProp == null ? MoreHorizontal : null);

  const hasRightIcon = RightIcon != null && !isIconOnly;

  const shouldShowChildren = hasChildren && !isIconOnly;

  const isIconButton = isIconOnly;

  // Check if children is a complex element (custom layout)
  const hasCustomLayout = React.isValidElement(children);

  // Handle keyboard shortcuts
  const kbdKeys = kbd ? (Array.isArray(kbd) ? kbd : [kbd]) : undefined;
  useButtonKeyboardShortcut(kbdKeys, props.onClick as (() => void) | undefined);

  // Determine kbd variant based on button variant
  const kbdVariant =
    variant === "primary" || variant === "destructive"
      ? "onDarkButton"
      : "onLightButton";

  // Icon sizing is handled by the Icon component

  // When loading, Loader replaces leftIcon, and we show loadingText or original children
  const effectiveChildren = isLoading && loadingText ? loadingText : children;
  const effectiveShouldShowChildren = shouldShowChildren;

  const renderButtonContent = () => {
    // If children is a custom React element AND we don't have explicit icon props AND no kbd, render it directly
    if (
      hasCustomLayout &&
      LeftIcon == null &&
      !hasRightIcon &&
      !isLoading &&
      !kbd
    ) {
      return children;
    }

    // For icon-only buttons with children but no explicit leftIcon, render children directly
    if (
      isIconButton &&
      hasChildren &&
      LeftIcon == null &&
      !hasRightIcon &&
      !isLoading &&
      !kbd
    ) {
      return children;
    }

    // For icon-only buttons with leftIcon, render the icon within the same
    // sized container used by text buttons so visual size matches the
    // corresponding non-icon variant (e.g., icon-sm == sm).
    if (
      isIconButton &&
      effectiveLeftIconProp != null &&
      !hasRightIcon &&
      !isLoading &&
      !kbd
    ) {
      return (
        <span
          className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
        >
          <Icon
            icon={effectiveLeftIconProp}
            size={getIconSize(size)}
            strokeWidth={iconStrokeWidth}
          />
        </span>
      );
    }

    // For icon-only buttons in loading state, render centered loader
    if (isIconButton && isLoading && !kbd) {
      return (
        <Loader
          aria-label={loadingText || "Loading"}
          size={
            size === "icon-xs"
              ? "xs"
              : size === "icon-sm"
                ? "xs"
                : size === "icon-lg"
                  ? "base"
                  : "sm"
          }
        />
      );
    }

    // For icon buttons, wrap any text children in sr-only span
    const iconButtonChildren = isIconButton && hasChildren && (
      <span className="sr-only">{effectiveChildren}</span>
    );

    // Determine layout class
    const layoutClassName = cx(
      "flex items-center w-full transition-colors duration-150 ease-in-out",
      // For icon-only buttons, center everything
      isSmallIconButton(size)
        ? "justify-center"
        : // Full width with centered text and left elements uses space-between
          fullWidth && textAlign === "center" && (hasLeftIcon || isLoading)
          ? "justify-between"
          : "justify-start gap-x-2"
    );

    // Normal width: simple gap layout
    if (!fullWidth) {
      // Simple case: no icons, loading state, or kbd
      if (!(hasLeftIcon || hasRightIcon || isLoading || kbd)) {
        // For icon buttons, return sr-only wrapped children
        if (isIconButton && hasChildren) {
          return iconButtonChildren;
        }
        return effectiveShouldShowChildren ? effectiveChildren : null;
      }

      // Icon-only buttons in loading state should not go through normal layout
      if (isIconButton && isLoading) {
        return null; // This case is handled above
      }

      // Simple case with just kbd and no icons/loading
      if (!(hasLeftIcon || hasRightIcon || isLoading) && kbd) {
        const content = effectiveShouldShowChildren ? effectiveChildren : null;
        const kbdElement = (
          <Kbd
            className="ml-2"
            keys={Array.isArray(kbd) ? kbd : undefined}
            platform={kbdPlatform}
            variant={kbdVariant}
          >
            {Array.isArray(kbd) ? undefined : kbd}
          </Kbd>
        );

        if (isIconButton && hasChildren) {
          return (
            <span className="flex w-full items-center justify-between">
              {iconButtonChildren}
              {kbdElement}
            </span>
          );
        }

        return (
          <span className="flex w-full items-center justify-between">
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
                "relative flex items-center transition-all duration-150 ease-in-out"
              )}
            >
              <div
                className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
              >
                {/* Loader */}
                <div
                  className={cx(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-in-out",
                    isLoading ? "opacity-100" : "pointer-events-none opacity-0"
                  )}
                >
                  <Loader
                    aria-label={loadingText || "Loading"}
                    size={getLoaderSize(size)}
                  />
                </div>
                {/* Left Icon */}
                {hasLeftIcon && (
                  <div
                    className={cx(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-in-out",
                      isLoading
                        ? "pointer-events-none opacity-0"
                        : showLeftIconOnHover
                          ? "opacity-0 group-hover/button:opacity-100"
                          : "opacity-100"
                    )}
                  >
                    {effectiveLeftIcon && (
                      <Icon
                        icon={effectiveLeftIcon}
                        size={getIconSize(size)}
                        strokeWidth={iconStrokeWidth}
                      />
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
              className="ml-auto"
              keys={Array.isArray(kbd) ? kbd : undefined}
              platform={kbdPlatform}
              variant={kbdVariant}
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
                  <Icon
                    icon={RightIcon}
                    size={getIconSize(size)}
                    strokeWidth={iconStrokeWidth}
                  />
                </span>
              )}
              {kbd && (
                <Kbd
                  className="ml-2"
                  keys={Array.isArray(kbd) ? kbd : undefined}
                  platform={kbdPlatform}
                  variant={kbdVariant}
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
      // Icon-only buttons in loading state should not go through normal layout
      if (isIconButton && isLoading) {
        return null; // This case is handled above
      }

      return (
        <span className={layoutClassName}>
          {/* Left spacer/icon */}
          {(isLoading || hasLeftIcon) && (
            <span className="relative flex items-center transition-all duration-150 ease-in-out">
              <div
                className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
              >
                <div
                  className={cx(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                    isLoading ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Loader
                    aria-label={loadingText || "Loading"}
                    size={getLoaderSize(size)}
                  />
                </div>
                {hasLeftIcon && (
                  <div
                    className={cx(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                      isLoading ? "opacity-0" : "opacity-100"
                    )}
                  >
                    {effectiveLeftIcon && (
                      <Icon
                        icon={effectiveLeftIcon}
                        size={getIconSize(size)}
                        strokeWidth={iconStrokeWidth}
                      />
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
                <Icon
                  icon={RightIcon}
                  size={getIconSize(size)}
                  strokeWidth={iconStrokeWidth}
                />
              </span>
            )}
          </span>
        </span>
      );
    }

    // Full width with left/right alignment and right icon: single flex container
    if (hasRightIcon) {
      // Icon-only buttons in loading state should not go through normal layout
      if (isIconButton && isLoading) {
        return null; // This case is handled above
      }

      return (
        <span className="flex w-full items-center gap-x-2 transition-all duration-150 ease-in-out">
          {/* Left icon container */}
          {(isLoading || hasLeftIcon) && (
            <span className="relative flex items-center transition-all duration-150 ease-in-out">
              <div
                className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
              >
                <div
                  className={cx(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                    isLoading ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Loader
                    aria-label={loadingText || "Loading"}
                    size={getLoaderSize(size)}
                  />
                </div>
                {hasLeftIcon && (
                  <div
                    className={cx(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                      isLoading ? "opacity-0" : "opacity-100"
                    )}
                  >
                    {effectiveLeftIcon && (
                      <Icon
                        icon={effectiveLeftIcon}
                        size={getIconSize(size)}
                        strokeWidth={iconStrokeWidth}
                      />
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
                <Icon
                  icon={RightIcon}
                  size={getIconSize(size)}
                  strokeWidth={iconStrokeWidth}
                />
              </span>
            )}
          </span>
        </span>
      );
    }

    // Full width with left/right alignment without right icon: normal flow
    // Icon-only buttons in loading state should not go through normal layout
    if (isIconButton && isLoading) {
      return null; // This case is handled above
    }

    return (
      <span className={layoutClassName}>
        {/* Left icon container */}
        {(isLoading || hasLeftIcon) && (
          <span className="relative flex items-center transition-all duration-150 ease-in-out">
            <div
              className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
            >
              <div
                className={cx(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                  isLoading ? "opacity-100" : "opacity-0"
                )}
              >
                <Loader
                  aria-label={loadingText || "Loading"}
                  size={getLoaderSize(size)}
                />
              </div>
              {hasLeftIcon && (
                <div
                  className={cx(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                    isLoading ? "opacity-0" : "opacity-100"
                  )}
                >
                  {effectiveLeftIcon && (
                    <Icon
                      icon={effectiveLeftIcon}
                      size={getIconSize(size)}
                      strokeWidth={iconStrokeWidth}
                    />
                  )}
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
      className
    ),
    disabled: disabled || isLoading,
    type: "button",
    ...({
      "data-testid": "button",
      "data-variant": variant,
    } as React.HTMLAttributes<HTMLButtonElement>),
    children: renderButtonContent(),
  };

  const element = useRender({
    render,
    ref: forwardedRef ?? undefined,
    props: mergeProps<"button">(defaultProps, props),
  });

  return element;
};

Button.displayName = "Button";

export { Button };
export type { ButtonProps } from "./types";
