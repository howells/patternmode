import { config } from "../../lib/config";
import { cx, focusRing } from "../../lib/utils";
import { componentVariants } from "../../lib/variants";
import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Icon, getIconSizeForContext } from "../icon/icon";
import { Kbd } from "../kbd/kbd";
import { useButtonKeyboardShortcut } from "../kbd/use-keyboard-shortcut";
import { Loader } from "../loader/loader";

const buttonVariants = tv({
  base: [
    // base
    "relative inline-flex items-center whitespace-nowrap rounded-md text-sm outline-hidden",
    // cursor - explicit hand pointer for all interactive buttons
    "cursor-pointer",
    // add transparent border to match input height
    "border border-transparent",
    // background transition - only animate colors and shadows, not position
    "transition-[background-color,border-color,box-shadow,color] duration-150 ease-in-out",
    // disabled
    "disabled:pointer-events-none disabled:shadow-none disabled:cursor-not-allowed",
    // focus
    focusRing,
  ],
  variants: {
    variant: componentVariants.button,
    rounded: {
      true: "rounded-full",
      false: "rounded-md",
    },
    size: {
      xs: "py-1 px-2 text-xs has-[>svg]:px-1.5",
      sm: "py-1.5 px-2.5 text-sm has-[>svg]:px-2",
      default: "py-2 px-3 text-sm has-[>svg]:px-2.5",
      lg: "py-2.5 px-4 text-base has-[>svg]:px-3",
      "icon-xs": "p-1.5",
      "icon-sm": "p-2",
      icon: "p-2.5",
      "icon-lg": "p-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    rounded: false,
  },
});

/**
 * Creates button-style variants for other components that want to look like buttons
 * but maintain their own semantic behavior (like toggles, tabs, etc.)
 * @example
 * ```tsx
 * <Button>Click me</Button>
 * ```
 */
export const createButtonStyleVariants = (
  pressedVariant: keyof typeof componentVariants.button = "destructive"
) => ({
  base: buttonVariants.base,
  variants: {
    // Map button variants to toggle states
    default: [
      ...componentVariants.button.default,
      // Add pressed state using the specified variant
      `data-[pressed]:${componentVariants.button[pressedVariant].join(
        " data-[pressed]:"
      )}`,
    ],
    secondary: [
      ...componentVariants.button.secondary,
      `data-[pressed]:${componentVariants.button[pressedVariant].join(
        " data-[pressed]:"
      )}`,
    ],
    outline: [
      ...componentVariants.button.outline,
      `data-[pressed]:${componentVariants.button[pressedVariant].join(
        " data-[pressed]:"
      )}`,
    ],
    ghost: [
      ...componentVariants.button.ghost,
      `data-[pressed]:${componentVariants.button[pressedVariant].join(
        " data-[pressed]:"
      )}`,
    ],
    destructive: [
      ...componentVariants.button.destructive,
      // When destructive is pressed, make it even more intense
      "data-[pressed]:bg-red-700 data-[pressed]:hover:bg-red-800 dark:data-[pressed]:bg-red-600 dark:data-[pressed]:hover:bg-red-700",
    ],
  },
  sizes: buttonVariants.variants.size,
});

/**
 * Utility function to render an icon with appropriate sizing for buttons
 */
function renderButtonIcon(
  IconComponent: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>,
  size: string | undefined,
  iconStrokeWidth: number
) {
  const iconSize = getIconSizeForContext(size);
  return (
    <Icon icon={IconComponent} size={iconSize} strokeWidth={iconStrokeWidth} />
  );
}

/**
 * Props for the Button component.
 *
 * @interface ButtonProps
 * @extends useRender.ComponentProps<"button">
 * @extends VariantProps<typeof buttonVariants>
 */
interface ButtonProps
  extends useRender.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Text to display when loading (defaults to children) */
  loadingText?: string;
  /** Icon component (proxy for leftIcon, useful for single-icon buttons) */
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Icon component to display on the left side */
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Icon component to display on the right side */
  rightIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Stroke width for icons (defaults to 1) */
  iconStrokeWidth?: number;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Text alignment within the button */
  textAlign?: "left" | "center" | "right";
  /** Keyboard shortcut to display */
  kbd?: string | string[];
  /** Platform for keyboard shortcut display */
  kbdPlatform?: "mac" | "pc" | "auto";
  /** Whether the button should have a shadow */
  shadow?: boolean;
}

/**
 * A versatile button component built with Base UI's useRender pattern.
 *
 * Based on Base UI's useRender hook for flexible rendering, providing multiple variants,
 * sizes, and states. Supports icons, loading states, and full-width layouts with
 * sophisticated animation and focus management.
 *
 *
 * @id button
 * @name Button
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variants and sizes
 * <Button variant="destructive">Delete</Button>
 * <Button variant="outline" size="sm">Small</Button>
 *
 * // With icons and loading
 * <Button leftIcon={PlusIcon}>Add Item</Button>
 * <Button isLoading loadingText="Saving...">Save</Button>
 *
 * // Icon-only buttons
 * <Button size="icon" leftIcon={SearchIcon} />
 *
 * // Full-width with alignment
 * <Button fullWidth textAlign="left">Left Aligned</Button>
 *
 * // As different elements
 * <Button render={<Link href="/page" />}>Navigation</Button>
 * ```
 */
/**
 * A clickable button component with multiple variants and states.
 *
 * @id button
 * @name Button
 * @component
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      render = <button />,
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
    }: ButtonProps,
    forwardedRef
  ) => {
    const hasChildren = children != null && children !== "";
    const isIconOnly =
      size === "icon-xs" || size === "icon-sm" || size === "icon" || size === "icon-lg";
    // Prioritize icon prop over leftIcon prop
    const effectiveLeftIconProp = icon || LeftIcon;
    const hasLeftIcon = effectiveLeftIconProp != null || (isIconOnly && effectiveLeftIconProp == null);
    const effectiveLeftIcon =
      effectiveLeftIconProp || (isIconOnly && effectiveLeftIconProp == null ? MoreHorizontal : null);
    const hasRightIcon =
      RightIcon != null &&
      size !== "icon-xs" &&
      size !== "icon-sm" &&
      size !== "icon" &&
      size !== "icon-lg";
    const shouldShowChildren =
      hasChildren &&
      size !== "icon-xs" &&
      size !== "icon-sm" &&
      size !== "icon" &&
      size !== "icon-lg";
    const isIconButton =
      size === "icon-xs" || size === "icon-sm" || size === "icon" || size === "icon-lg";

    // Check if children is a complex element (custom layout)
    const hasCustomLayout = React.isValidElement(children);

    // Handle keyboard shortcuts
    const kbdKeys = kbd ? (Array.isArray(kbd) ? kbd : [kbd]) : undefined;
    useButtonKeyboardShortcut(
      kbdKeys,
      props.onClick as (() => void) | undefined
    );

    // Determine kbd variant based on button variant
    const kbdVariant =
      variant === "default" || variant === "destructive"
        ? "onDarkButton"
        : "onLightButton";

    // Icon sizing is now handled by the Icon component via renderButtonIcon
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

      // For icon-only buttons with leftIcon, render the icon directly without loading states
      if (
        isIconButton &&
        effectiveLeftIconProp != null &&
        !hasRightIcon &&
        !isLoading &&
        !kbd
      ) {
        return renderButtonIcon(effectiveLeftIconProp, size, iconStrokeWidth);
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
          : // Full width with centered text and left elements uses space-between
          fullWidth && textAlign === "center" && (hasLeftIcon || isLoading)
          ? "justify-between"
          : "justify-start gap-x-2"
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
          const content = effectiveShouldShowChildren
            ? effectiveChildren
            : null;
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
                  "flex items-center relative transition-all duration-150 ease-in-out"
                )}
              >
                <div
                  className={`relative ${getIconContainerSize()} flex items-center justify-center`}
                >
                  {/* Loader */}
                  <div
                    className={cx(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-in-out",
                      isLoading
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
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
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      )}
                    >
                      {effectiveLeftIcon &&
                        renderButtonIcon(
                          effectiveLeftIcon,
                          size,
                          iconStrokeWidth
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
                {RightIcon &&
                  renderButtonIcon(RightIcon, size, iconStrokeWidth)}
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
                      isLoading ? "opacity-100" : "opacity-0"
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
                        !isLoading ? "opacity-100" : "opacity-0"
                      )}
                    >
                      {effectiveLeftIcon &&
                        renderButtonIcon(
                          effectiveLeftIcon,
                          size,
                          iconStrokeWidth
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
              {RightIcon && renderButtonIcon(RightIcon, size, iconStrokeWidth)}
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
                      isLoading ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <Loader
                      size={
                        size === "xs"
                          ? "xs" 
                          : size === "sm"
                          ? "xs"
                          : "sm"
                      }
                      aria-label={loadingText || "Loading"}
                    />
                  </div>
                  {hasLeftIcon && (
                    <div
                      className={cx(
                        "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                        !isLoading ? "opacity-100" : "opacity-0"
                      )}
                    >
                      {effectiveLeftIcon &&
                        renderButtonIcon(
                          effectiveLeftIcon,
                          size,
                          iconStrokeWidth
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
              {RightIcon && renderButtonIcon(RightIcon, size, iconStrokeWidth)}
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
                    isLoading ? "opacity-100" : "opacity-0"
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
                      !isLoading ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {effectiveLeftIcon &&
                      renderButtonIcon(
                        effectiveLeftIcon,
                        size,
                        iconStrokeWidth
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
        className
      ),
      disabled: disabled || isLoading,
      type: "button",
      ...({"data-testid": "ui-button"} as React.HTMLAttributes<HTMLButtonElement>),
      children: renderButtonContent(),
    };

    const element = useRender({
      render,
      ref: forwardedRef,
      props: mergeProps<"button">(defaultProps, props),
    });

    return element;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
