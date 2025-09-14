import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { ButtonProps } from "../types";
import {
  getButtonJustifyClass,
  getButtonTextAlignClass,
} from "../utils/button-utils";
import { buttonVariants } from "../variants";
import { ButtonContentRenderer } from "./button-content-renderer";

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
  leftIcon,
  rightIcon,
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

  // Handle keyboard shortcuts conditionally
  const kbdKeys = kbd ? (Array.isArray(kbd) ? kbd : [kbd]) : undefined;
  const hasKeyboardShortcuts = kbdKeys != null;

  // Derive flex justification and text alignment classes
  const justifyClass = getButtonJustifyClass(fullWidth, textAlign);
  const textAlignClass = getButtonTextAlignClass(fullWidth, textAlign);

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
    children: (
      <ButtonContentRenderer
        fullWidth={fullWidth}
        icon={icon}
        iconStrokeWidth={iconStrokeWidth}
        isLoading={isLoading}
        kbd={kbd}
        kbdPlatform={kbdPlatform}
        leftIcon={leftIcon}
        loadingText={loadingText}
        rightIcon={rightIcon}
        showLeftIconOnHover={showLeftIconOnHover}
        showRightIconOnHover={showRightIconOnHover}
        size={size}
        textAlign={textAlign}
        variant={variant}
      >
        {children}
      </ButtonContentRenderer>
    ),
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
