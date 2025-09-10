import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Icon } from "@patternmode/icon";
import { Kbd } from "@patternmode/kbd";
import { Loader } from "@patternmode/loader";
import { cx } from "@patternmode/utils/cx";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import type { ButtonProps } from "../types";
import {
  getIconContainerSize,
  getIconSize,
  getLoaderSize,
  isSmallIconButton,
} from "../utils";
import { buttonVariants } from "../variants";

// Lazy load keyboard shortcut functionality only when needed
const KeyboardShortcutWrapper = React.lazy(() =>
  import("./keyboard-shortcut-wrapper").then((module) => ({
    default: module.KeyboardShortcutWrapper,
  }))
);

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

  // Handle keyboard shortcuts conditionally
  const kbdKeys = kbd ? (Array.isArray(kbd) ? kbd : [kbd]) : undefined;
  const hasKeyboardShortcuts = kbdKeys != null;

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
    // Handle simple cases first to reduce complexity
    if (hasCustomLayout && !LeftIcon && !hasRightIcon && !isLoading && !kbd) {
      return children;
    }

    if (
      isIconButton &&
      hasChildren &&
      !LeftIcon &&
      !hasRightIcon &&
      !isLoading &&
      !kbd
    ) {
      return children;
    }

    // Handle icon-only cases
    if (isIconButton) {
      if (effectiveLeftIconProp && !hasRightIcon && !isLoading && !kbd) {
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

      if (isLoading && !kbd) {
        return (
          <Loader
            aria-label={loadingText || "Loading"}
            size={getLoaderSize(size)}
          />
        );
      }
    }

    return renderComplexLayout();
  };

  const renderComplexLayout = () => {
    const iconButtonChildren = isIconButton && hasChildren && (
      <span className="sr-only">{effectiveChildren}</span>
    );

    // biome-ignore lint/style/noNestedTernary: Layout class determination based on multiple conditions
    let layoutClass = "justify-start gap-x-2";
    if (isSmallIconButton(size)) {
      layoutClass = "justify-center";
    } else if (
      fullWidth &&
      textAlign === "center" &&
      (hasLeftIcon || isLoading)
    ) {
      layoutClass = "justify-between";
    }

    const layoutClassName = cx(
      "flex items-center w-full transition-colors duration-150 ease-in-out",
      layoutClass
    );

    // Handle different layout scenarios
    if (!fullWidth) {
      return renderNormalWidthLayout(layoutClassName, iconButtonChildren);
    }

    if (textAlign === "center") {
      return renderCenterLayout(layoutClassName, iconButtonChildren);
    }

    if (hasRightIcon) {
      return renderRightIconLayout(iconButtonChildren);
    }

    return renderDefaultLayout(layoutClassName, iconButtonChildren);
  };

  const renderNormalWidthLayout = (
    layoutClassName: string,
    iconButtonChildren: React.ReactNode
  ) => {
    // Handle simple cases
    if (!(hasLeftIcon || hasRightIcon || isLoading || kbd)) {
      if (isIconButton && hasChildren) {
        return iconButtonChildren;
      }
      return effectiveShouldShowChildren ? effectiveChildren : null;
    }

    if (isIconButton && isLoading) {
      return null;
    }

    // Handle kbd-only case
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

    // Complex layout with icons
    return (
      <span className={layoutClassName}>
        {(isLoading || hasLeftIcon) && (
          <span className="relative flex items-center transition-all duration-150 ease-in-out">
            <div
              className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
            >
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
              {hasLeftIcon && (
                <div
                  className={cx(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-in-out",
                    // biome-ignore lint/style/noNestedTernary: Conditional opacity states for loading/icon hover
                    (() => {
                      if (isLoading) {
                        return "pointer-events-none opacity-0";
                      }
                      if (showLeftIconOnHover) {
                        return "opacity-0 group-hover/button:opacity-100";
                      }
                      return "opacity-100";
                    })()
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
  };

  const renderCenterLayout = (
    layoutClassName: string,
    iconButtonChildren: React.ReactNode
  ) => {
    if (isIconButton && isLoading) {
      return null;
    }

    return (
      <span className={layoutClassName}>
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
  };

  const renderRightIconLayout = (iconButtonChildren: React.ReactNode) => {
    if (isIconButton && isLoading) {
      return null;
    }

    return (
      <span className="flex w-full items-center gap-x-2 transition-all duration-150 ease-in-out">
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
  };

  const renderDefaultLayout = (
    layoutClassName: string,
    iconButtonChildren: React.ReactNode
  ) => {
    if (isIconButton && isLoading) {
      return null;
    }

    return (
      <span className={layoutClassName}>
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

  // biome-ignore lint/style/noNestedTernary: Complex conditional logic for button layout
  // Derive flex justification from textAlign and fullWidth
  let justifyClass = "justify-center";
  if (fullWidth) {
    if (textAlign === "left") {
      justifyClass = "justify-start";
    } else if (textAlign === "right") {
      justifyClass = "justify-end";
    } else if (textAlign === "center") {
      justifyClass = "justify-center";
    }
  }

  // Derive text alignment - only when not using fullWidth center (which has its own layout)
  let textAlignClass = "text-center";
  if (fullWidth && textAlign === "center") {
    textAlignClass = "text-center";
  } else if (textAlign === "left") {
    textAlignClass = "text-left";
  } else if (textAlign === "right") {
    textAlignClass = "text-right";
  }

  const defaultProps: useRender.ElementProps<"button"> = {
    className: cx(
      buttonVariants({ variant, size, rounded }),
      fullWidth && "w-full max-w-[95vw]",
      // Add group class when using hover effects for icons
      (showLeftIconOnHover || showRightIconOnHover) && "group/button",
      justifyClass,
      textAlignClass,
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

  // Conditionally wrap with keyboard shortcut functionality
  if (hasKeyboardShortcuts) {
    return (
      <React.Suspense fallback={element}>
        <KeyboardShortcutWrapper
          kbdKeys={kbdKeys}
          onClick={props.onClick as (() => void) | undefined}
        >
          {element}
        </KeyboardShortcutWrapper>
      </React.Suspense>
    );
  }

  return element;
};

Button.displayName = "Button";

export { Button };
export type { ButtonProps } from "../types";
