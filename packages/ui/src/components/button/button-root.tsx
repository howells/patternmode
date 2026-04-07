/** biome-ignore-all lint/performance/noBarrelFile: intentional package or module entrypoint */
"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  useRef,
} from "react";
import { isDevelopmentBrowser } from "../../lib/is-development-browser";
import { springs } from "../../lib/motion";
import type { ComponentSize } from "../../lib/size";
import type { WithTestId } from "../../lib/types";
import { Dot } from "../dot";
import { Icon } from "../icon";
import { Spinner } from "../spinner";
import {
  buttonSizeToIconSize,
  buttonVariants,
  getBaseSize,
  isIconSize,
} from "./button-variants";

/**
 * Button component with configurable variants, sizes, and states.
 *
 * @param variant - Visual style: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "brand"
 * @param appearance - Optional modifier: "solid" | "outline" | "ghost" | "input" | "dashed" | "transparent"
 * @param size - Size including icon variants: "2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "icon-2xs" | "icon-xs" | "icon-sm" | "icon-base" | "icon-lg" | "icon-xl" | "icon-2xl" | "icon-3xl"
 * @param focused - Force focus ring display (for documentation/testing)
 * @param hovered - Force hover state display (for documentation/testing)
 * @param pressed - Force pressed/active state display. Defaults to true for click animation.
 * @param radius - Border radius: "rounded" (default) | "rounded" | "square"
 * @param asChild - Merge props onto child element using Slot. Defaults to false.
 * @param loading - Show loading spinner and disable button. Defaults to false.
 * @param loadingLabel - Label text to show during loading.
 * @param icon - Icon component (LucideIcon or SVG component).
 * @param iconClassName - Additional CSS classes for the icon.
 * @param suffixIcon - Icon component for end position (LucideIcon or SVG component).
 * @param suffixIconClassName - Additional CSS classes for the suffix icon.
 * @param dot - Dot color indicator (CSS color value).
 * @param dotPlacement - Dot position: "start" (default) | "end"
 * @param disabled - Disable the button. Defaults to false.
 * @param className - Additional CSS classes.
 * @param testId - Test ID for testing purposes.
 * @param children - Button content.
 *
 * @example
 * ```tsx
 * // Standard variants
 * <Button variant="default">Primary</Button>
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="destructive">Delete</Button>
 * <Button variant="outline">Outline</Button>
 * <Button variant="ghost">Ghost</Button>
 * <Button variant="link">Link</Button>
 *
 * // Variant + appearance combinations
 * <Button variant="destructive" appearance="ghost">Ghost Destructive</Button>
 * <Button variant="destructive" appearance="outline">Outline Destructive</Button>
 *
 * // Icon buttons (use icon-* sizes)
 * <Button size="icon-base" icon={Settings} />
 * <Button size="icon-sm" icon={X} variant="ghost" />
 *
 * // With icons and text
 * <Button icon={Search}>Search</Button>
 * <Button suffixIcon={ArrowRight}>Next</Button>
 *
 * // State props (for Storybook)
 * <Button focused>Focused</Button>
 * <Button hovered>Hovered</Button>
 * <Button pressed>Pressed</Button>
 * ```
 */
function Button({
  className,
  pressed,
  variant,
  appearance,
  radius,
  size,
  align,
  square,
  focused,
  hovered,
  asChild = false,
  loading = false,
  loadingLabel,
  icon,
  iconClassName,
  suffixIcon,
  suffixIconClassName,
  dot,
  dotPlacement = "start",
  disabled,
  children,
  testId,
  ...props
}: WithTestId<
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      loading?: boolean;
      loadingLabel?: string;
      icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
      iconClassName?: string;
      suffixIcon?:
        | LucideIcon
        | React.ComponentType<React.SVGProps<SVGSVGElement>>;
      suffixIconClassName?: string;
      dot?: string;
      dotPlacement?: "start" | "end";
      /** Force focus ring display (for documentation/testing) */
      focused?: boolean;
      /** Force hover state display (for documentation/testing) */
      hovered?: boolean;
    }
>) {
  const Comp = asChild ? Slot : "button";
  const hasChildren = Children.count(children) > 0;

  // Determine if this is an icon-only button (icon size or icon without children)
  const effectiveSize = size ?? "base";
  const isIconButton =
    isIconSize(effectiveSize) || (icon && !hasChildren && !loading);

  // Dev-mode warning: icon-only buttons must have an accessible name
  if (
    isDevelopmentBrowser() &&
    isIconButton &&
    !props["aria-label"] &&
    !props["aria-labelledby"]
  ) {
    console.warn(
      "Button: Icon-only button is missing `aria-label` or `aria-labelledby`. " +
        "Screen readers will announce this as an unlabelled button. " +
        `Icon: ${icon?.displayName ?? icon?.name ?? "unknown"}`,
    );
  }

  const spinnerSize = getBaseSize(effectiveSize);
  const iconSize: ComponentSize = buttonSizeToIconSize(effectiveSize);
  const dotSize: ComponentSize = buttonSizeToIconSize(effectiveSize);

  // Get stable keys for icons (use displayName or name)
  const iconKey = icon?.displayName ?? icon?.name ?? "no-icon";
  const suffixIconKey =
    suffixIcon?.displayName ?? suffixIcon?.name ?? "no-suffix-icon";

  // Track whether each icon has ever changed — skip AnimatePresence for static icons
  const prevIconKeyRef = useRef(iconKey);
  const hasIconChanged = useRef(false);
  if (prevIconKeyRef.current !== iconKey) {
    hasIconChanged.current = true;
    prevIconKeyRef.current = iconKey;
  }

  const prevSuffixIconKeyRef = useRef(suffixIconKey);
  const hasSuffixIconChanged = useRef(false);
  if (prevSuffixIconKeyRef.current !== suffixIconKey) {
    hasSuffixIconChanged.current = true;
    prevSuffixIconKeyRef.current = suffixIconKey;
  }

  /** Static icon (no animation overhead) */
  function renderStaticIcon(
    iconProp: typeof icon,
    extraClassName: string | undefined,
    containerClassName?: string,
  ) {
    if (!iconProp) {
      return null;
    }
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center",
          containerClassName,
        )}
      >
        <Icon className={extraClassName} icon={iconProp} size={iconSize} />
      </span>
    );
  }

  /** Animated icon wrapper for smooth vertical transitions */
  function renderAnimatedIcon(containerClassName?: string) {
    return (
      <AnimatePresence initial={false} mode="popLayout">
        {icon ? (
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "inline-flex items-center justify-center",
              containerClassName,
            )}
            exit={{ opacity: 0, y: "-100%" }}
            initial={{ opacity: 0, y: "100%" }}
            key={iconKey}
            transition={springs.snappy}
          >
            <Icon className={iconClassName} icon={icon} size={iconSize} />
          </motion.span>
        ) : null}
      </AnimatePresence>
    );
  }

  /** Animated suffix icon wrapper for smooth vertical transitions */
  function renderAnimatedSuffixIcon(containerClassName?: string) {
    return (
      <AnimatePresence initial={false} mode="popLayout">
        {suffixIcon ? (
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "inline-flex items-center justify-center",
              containerClassName,
            )}
            exit={{ opacity: 0, y: "-100%" }}
            initial={{ opacity: 0, y: "100%" }}
            key={suffixIconKey}
            transition={springs.snappy}
          >
            <Icon
              className={suffixIconClassName}
              icon={suffixIcon}
              size={iconSize}
            />
          </motion.span>
        ) : null}
      </AnimatePresence>
    );
  }

  /** Render the leading icon — animated only when it has changed or loading */
  function renderIcon(containerClassName?: string) {
    if (!icon) {
      return null;
    }
    if (hasIconChanged.current || loading) {
      return renderAnimatedIcon(containerClassName);
    }
    return renderStaticIcon(icon, iconClassName, containerClassName);
  }

  /** Render the suffix icon — animated only when it has changed */
  function renderSuffixIcon(containerClassName?: string) {
    if (!suffixIcon) {
      return null;
    }
    if (hasSuffixIconChanged.current) {
      return renderAnimatedSuffixIcon(containerClassName);
    }
    return renderStaticIcon(
      suffixIcon,
      suffixIconClassName,
      containerClassName,
    );
  }

  /** Animated spinner for loading state */
  function renderAnimatedSpinner() {
    return (
      <AnimatePresence initial={false} mode="popLayout">
        {loading ? (
          <motion.span
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            className="inline-flex items-center justify-center"
            exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
            initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
            key="spinner"
            transition={springs.snappy}
          >
            <Spinner size={spinnerSize} />
          </motion.span>
        ) : null}
      </AnimatePresence>
    );
  }

  function renderDecorations(dotElement: ReactNode): ReactNode {
    return (
      <>
        {dotPlacement === "start" ? dotElement : null}
        {icon ? renderIcon() : null}
        {dotPlacement === "end" ? dotElement : null}
      </>
    );
  }

  function renderLoadingContent(): ReactNode {
    return (
      <>
        {renderAnimatedSpinner()}
        {isIconButton ? null : (loadingLabel ?? children)}
      </>
    );
  }

  function renderIconButtonContent(dotElement: ReactNode): ReactNode {
    if (!icon) {
      return null;
    }

    return renderDecorations(dotElement);
  }

  function renderDecoratedChildContent(dotElement: ReactNode): ReactNode {
    const child = Children.only(children);

    if (!isValidElement<{ children?: ReactNode }>(child)) {
      return children;
    }

    return cloneElement(
      child,
      {},
      <>
        {dotPlacement === "start" ? dotElement : null}
        {icon ? renderIcon() : null}
        {child.props.children}
        {renderSuffixIcon()}
        {dotPlacement === "end" ? dotElement : null}
      </>,
    );
  }

  function renderStandardContent(dotElement: ReactNode): ReactNode {
    return (
      <>
        {dotPlacement === "start" ? dotElement : null}
        {icon ? renderIcon() : null}
        {children}
        {renderSuffixIcon()}
        {dotPlacement === "end" ? dotElement : null}
      </>
    );
  }

  function renderContent(): ReactNode {
    const dotElement = dot ? <Dot color={dot} size={dotSize} /> : null;

    if (loading) {
      return renderLoadingContent();
    }

    if (isIconButton) {
      return renderIconButtonContent(dotElement);
    }

    if (!hasChildren) {
      return children;
    }

    const hasDecorations = Boolean(icon || suffixIcon || dot);
    if (asChild && !hasDecorations) {
      return children;
    }

    if (asChild) {
      return renderDecoratedChildContent(dotElement);
    }

    return renderStandardContent(dotElement);
  }

  return (
    <Comp
      className={cn(
        buttonVariants({
          pressed,
          variant,
          appearance,
          radius,
          size,
          align,
          square,
          className,
        }),
      )}
      data-component="button"
      data-focused={focused || undefined}
      data-hovered={hovered || undefined}
      data-pressed={pressed || undefined}
      data-slot="button"
      data-testid={testId}
      disabled={loading || disabled}
      {...props}
    >
      {renderContent()}
    </Comp>
  );
}

/** Button props type */
type ButtonProps = WithTestId<
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      loading?: boolean;
      loadingLabel?: string;
      icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
      iconClassName?: string;
      suffixIcon?:
        | LucideIcon
        | React.ComponentType<React.SVGProps<SVGSVGElement>>;
      suffixIconClassName?: string;
      dot?: string;
      dotPlacement?: "start" | "end";
      focused?: boolean;
      hovered?: boolean;
    }
>;

export {
  BUTTON_APPEARANCES,
  BUTTON_VARIANTS,
  type ButtonAppearance,
  type ButtonSize,
  type ButtonVariant,
  buttonVariants,
} from "./button-variants";
export { Button, type ButtonProps };
