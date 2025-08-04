"use client";

// Tremor Input [v2.0.0] - Base UI

import type { VariantProps } from "tailwind-variants";

import { Input as BaseInput } from "@base-ui-components/react/input";
import { Eye, EyeOff, Search } from "lucide-react";
import React from "react";
import { tv } from "tailwind-variants";

import { config } from "../../lib/config";
import { cx, focusInput, focusRing, hasErrorInput } from "../../lib/utils";

const inputStyles = tv({
  base: [
    // base
    "relative block w-full max-w-sm appearance-none rounded-md border shadow-xs outline-hidden transition",
    // border color
    "border-zinc-200 dark:border-zinc-800",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // placeholder color
    "placeholder-zinc-400 dark:placeholder-zinc-500",
    // background color
    "bg-white dark:bg-zinc-950",
    // disabled
    "data-disabled:border-zinc-200 data-disabled:bg-zinc-100 data-disabled:text-zinc-400",
    "dark:data-disabled:border-zinc-700 dark:data-disabled:bg-zinc-800 dark:data-disabled:text-zinc-500",
    // focus
    focusInput,
    // invalid - Base UI uses data-invalid
    "data-invalid:ring-2 data-invalid:ring-red-200 data-invalid:border-red-500 dark:data-invalid:ring-red-400/20",
    // remove search cancel button (optional)
    "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
  ],
  variants: {
    size: {
      xs: [
        "h-control-xs text-xs",
        // file styles for xs
        "file:-my-1.5 file:-ml-1.5 file:px-1.5 file:py-1 file:[margin-inline-end:0.375rem]",
      ],
      sm: [
        "h-control-sm text-sm",
        // file styles for sm
        "file:-my-2 file:-ml-2 file:px-2 file:py-1.5 file:[margin-inline-end:0.5rem]",
      ],
      base: [
        "h-control-base text-sm",
        // file styles for base
        "file:-my-2.5 file:-ml-2.5 file:px-3 file:py-2 file:[margin-inline-end:0.75rem]",
      ],
      lg: [
        "h-control-lg text-base",
        // file styles for lg
        "file:-my-3 file:-ml-3 file:px-4 file:py-2.5 file:[margin-inline-end:1rem]",
      ],
    },
    hasError: {
      true: hasErrorInput,
    },
    // number input
    enableStepper: {
      false:
        "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
    },
  },
  defaultVariants: {
    size: "base",
  },
  compoundVariants: [
    // File input styles that are shared across all sizes
    {
      class: [
        "file:cursor-pointer file:rounded-l-[5px] file:rounded-r-none file:border-0 file:outline-hidden focus:outline-hidden data-disabled:pointer-events-none file:data-disabled:pointer-events-none",
        "file:border-solid file:border-zinc-200 file:bg-zinc-50 file:text-zinc-500 file:hover:bg-zinc-100 dark:file:border-zinc-800 dark:file:bg-zinc-950 dark:file:hover:bg-zinc-900/20 dark:file:data-disabled:border-zinc-700",
        "file:[border-inline-end-width:1px]",
        "file:data-disabled:bg-zinc-100 file:data-disabled:text-zinc-500 dark:file:data-disabled:bg-zinc-800",
      ],
    },
  ],
});

type InputProps = {
  /**
   * Additional CSS classes for the input element.
   * Applied directly to the input element for custom styling.
   */
  inputClassName?: string;

  /**
   * Input type (text, email, password, etc.).
   * Supports all standard HTML input types with enhanced behavior for password and search types.
   */
  type?: string;

  /**
   * Custom prefix content.
   * Can be any React node including icons, text, or complex components.
   */
  prefix?: React.ReactNode;

  /**
   * Custom suffix content.
   * Can be any React node including icons, text, or complex components.
   */
  suffix?: React.ReactNode;

  /**
   * Prefix text content.
   * Simple text that appears before the input field.
   */
  prefixText?: string;

  /**
   * Prefix icon component.
   * Lucide React icon or similar icon component that accepts className and strokeWidth props.
   */
  prefixIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;

  /**
   * Suffix text content.
   * Simple text that appears after the input field.
   */
  suffixText?: string;

  /**
   * Suffix icon component.
   * Lucide React icon or similar icon component that accepts className and strokeWidth props.
   */
  suffixIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;

  /**
   * Whether to apply prefix styling.
   * When true, adds background and border styling to prefix content.
   */
  prefixStyling?: boolean;

  /**
   * Whether to apply suffix styling.
   * When true, adds background and border styling to suffix content.
   */
  suffixStyling?: boolean;

  /**
   * Stroke width for icons (defaults to 1).
   * Controls the thickness of icon strokes for consistent visual weight.
   */
  iconStrokeWidth?: number;

  /**
   * Minimal variant for command palettes - removes border, shadow, focus ring.
   * Perfect for search interfaces and command palettes where minimal styling is preferred.
   */
  minimal?: boolean;

  /**
   * Remove all styling and return bare input element.
   * Provides maximum customization flexibility by removing all component styling.
   */
  unstyled?: boolean;

  /**
   * Size variant of the input.
   * Controls height, text size, and overall dimensions of the input field.
   */
  size?: "xs" | "sm" | "base" | "lg";

  /**
   * Whether to display error styling for form validation.
   * Adds red border and error state styling to indicate validation errors.
   */
  hasError?: boolean;

  /**
   * Whether to show number input steppers.
   * When false, hides the up/down arrows on number inputs for cleaner appearance.
   */
  enableStepper?: boolean;
} & Omit<
      React.ComponentPropsWithoutRef<typeof BaseInput>,
      "size" | "prefix"
    > & VariantProps<typeof inputStyles>;

/**
 * Single-line text input field with validation support and various styling options.
 */
const Input = (
  { ref: forwardedRef, className, inputClassName, hasError, enableStepper = true, size = "base", type, prefix, suffix, prefixText, prefixIcon: PrefixIcon, suffixText, suffixIcon: SuffixIcon, prefixStyling = true, suffixStyling = true, iconStrokeWidth = config.getIconStrokeWidth(), minimal, unstyled, ...props }: InputProps & { ref?: React.RefObject<React.ElementRef<typeof BaseInput> | null> },
) => {
  const [typeState, setTypeState] = React.useState(type);

  const isPassword = type === "password";
  const isSearch = type === "search";

  // Icon size and color based on input size (like Button component)
  const iconSize = {
    "size-3.5": size === "sm",
    "size-4": size === "base",
    "size-5": size === "lg",
  };
  const iconClassName = cx(
    "shrink-0 text-zinc-500 dark:text-zinc-400",
    iconSize,
  );

  // Gap size based on input size
  const gapSize = {
    "gap-0.5": size === "sm", // 2px gap for small
    "gap-1": size === "base", // 4px gap for base
    "gap-1.5": size === "lg", // 6px gap for large
  };
  const gapClassName = cx(gapSize);

  // Resolve prefix - can be explicit prefix prop, or combination of prefixText/prefixIcon
  const resolvedPrefix
      = prefix || (prefixText && PrefixIcon)
        ? (
            <div className={cx("flex items-center", gapClassName)}>
              {PrefixIcon && (
                <PrefixIcon
                  className={iconClassName}
                  strokeWidth={iconStrokeWidth}
                />
              )}
              {prefixText && <span>{prefixText}</span>}
            </div>
          )
        : PrefixIcon
          ? (
              <PrefixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
            )
          : (
              prefixText || undefined
            );

  // Resolve suffix - can be explicit suffix prop, or combination of suffixText/suffixIcon
  const resolvedSuffix
      = suffix || (suffixText && SuffixIcon)
        ? (
            <div className={cx("flex items-center", gapClassName)}>
              {suffixText && <span>{suffixText}</span>}
              {SuffixIcon && (
                <SuffixIcon
                  className={iconClassName}
                  strokeWidth={iconStrokeWidth}
                />
              )}
            </div>
          )
        : SuffixIcon
          ? (
              <SuffixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
            )
          : (
              suffixText || undefined
            );

  // Auto-add search icon as prefix when type="search" (unless custom prefix provided)
  const effectivePrefix
      = isSearch && !resolvedPrefix
        ? (
            <Search className={iconClassName} />
          )
        : (
            resolvedPrefix
          );

  // Auto-add password toggle as suffix when type="password" (unless custom suffix provided)
  const effectiveSuffix
      = isPassword && !resolvedSuffix
        ? (
            <button
              aria-label="Change password visibility"
              className={cx(
                "h-fit w-fit rounded-xs outline-hidden transition-all",
                "text-zinc-500 dark:text-zinc-400",
                "hover:text-zinc-600 dark:hover:text-zinc-300",
                focusRing,
              )}
              type="button"
              onClick={() => {
                setTypeState(typeState === "password" ? "text" : "password");
              }}
            >
              <span className="sr-only">
                {typeState === "password" ? "Show password" : "Hide password"}
              </span>
              {typeState === "password"
                ? (
                    <Eye
                      className={cx("shrink-0", {
                        "size-3.5": size === "sm",
                        "size-4": size === "base",
                        "size-5": size === "lg",
                      })}
                      aria-hidden="true"
                    />
                  )
                : (
                    <EyeOff
                      className={cx("shrink-0", {
                        "size-3.5": size === "sm",
                        "size-4": size === "base",
                        "size-5": size === "lg",
                      })}
                      aria-hidden="true"
                    />
                  )}
            </button>
          )
        : (
            resolvedSuffix
          );

  // Determine if we have custom prefix/suffix or built-in ones
  const hasCustomPrefix
      = effectivePrefix !== undefined
        && effectivePrefix !== null
        && effectivePrefix !== "";
  const hasCustomSuffix
      = effectiveSuffix !== undefined
        && effectiveSuffix !== null
        && effectiveSuffix !== "";
  const hasBuiltInPrefix = false; // Now handled via effectivePrefix
  const hasBuiltInSuffix = false; // Now handled via effectiveSuffix

  // Calculate padding adjustments - only apply when prefix/suffix exists
  const shouldApplyLeftPadding = hasCustomPrefix || hasBuiltInPrefix;
  const shouldApplyRightPadding = hasCustomSuffix || hasBuiltInSuffix;

  // Simple padding logic - reduce padding only for UNSTYLED prefix/suffix
  const hasUnstyledPrefix = hasCustomPrefix && !prefixStyling;
  const hasUnstyledSuffix = hasCustomSuffix && !suffixStyling;

  // Calculate left padding
  const leftPadding = hasUnstyledPrefix
    ? size === "sm"
      ? "pl-1.5"
      : size === "base"
        ? "pl-2"
        : "pl-2.5"
    : size === "sm"
      ? "pl-2.5"
      : size === "base"
        ? "pl-3"
        : "pl-3.5";

  // Calculate right padding
  const rightPadding = hasUnstyledSuffix
    ? size === "sm"
      ? "pr-1.5"
      : size === "base"
        ? "pr-2"
        : "pr-2.5"
    : size === "sm"
      ? "pr-2.5"
      : size === "base"
        ? "pr-3"
        : "pr-3.5";

  const paddingClasses = cx(leftPadding, rightPadding);

  // If unstyled, return just the bare input element
  if (unstyled) {
    return (
      <BaseInput
        ref={forwardedRef}
        type={isPassword ? typeState : type}
        className={cx(
          // Basic input styling
          "flex w-full bg-transparent text-sm outline-none transition-colors",
          // text color
          "text-zinc-900 dark:text-zinc-50",
          // placeholder color
          "placeholder-zinc-400 dark:placeholder-zinc-500",
          // disabled
          "data-disabled:text-zinc-400 dark:data-disabled:text-zinc-500",
          // remove all borders, shadows, and focus rings
          "border-0 shadow-none focus:outline-none focus:ring-0",
          inputClassName,
        )}
        {...props}
      />
    );
  }

  return (
    <div
      data-testid="input"
      className={cx(
        "relative flex items-stretch w-full rounded-md border shadow-xs transition",
        // Border and background colors
        "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950",
        // Error states
        hasError && "border-red-500 dark:border-red-500",
        // Focus-within for container focus
        "focus-within:ring-2 focus-within:ring-blue-200 dark:focus-within:ring-blue-700/30 focus-within:border-blue-500 dark:focus-within:border-blue-700",
        // Minimal variant overrides
        minimal
        && "!border-0 !shadow-none !rounded-none !bg-transparent focus-within:!ring-0 focus-within:!border-0",
        className,
      )}
    >
      {/* Custom Prefix */}
      {hasCustomPrefix && (
        <div
          className={cx(
            "flex items-center shrink-0 order-1",
            // Font size based on input size
            {
              "text-xs": size === "sm",
              "text-sm": size === "base" || size === "lg",
            },
            // Styling controls background and border
            prefixStyling && [
              "bg-zinc-50 dark:bg-zinc-900/50 border-r border-zinc-200 dark:border-zinc-700",
              "rounded-l-md",
            ],
            // Padding - less when unstyled (no container to pad)
            prefixStyling
              ? {
                  "px-2": size === "sm",
                  "px-2.5": size === "base",
                  "px-3": size === "lg",
                }
              : {
                  "pl-2": size === "sm",
                  "pl-2.5": size === "base",
                  "pl-3": size === "lg",
                },
          )}
        >
          {effectivePrefix}
        </div>
      )}

      <BaseInput
        ref={forwardedRef}
        type={isPassword ? typeState : type}
        className={cx(
          // Remove all border/background styles - container handles this
          "flex-1 bg-transparent border-0 outline-none shadow-none ring-0 focus:ring-0 focus:border-0 order-2",
          // Size-based padding and text
          {
            "py-1.5 text-sm": size === "sm",
            "py-2 text-sm": size === "base",
            "py-2.5 text-base": size === "lg",
          },
          // Simple padding
          paddingClasses,
          // Text and placeholder colors
          "text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500",
          // Disabled states
          "data-disabled:text-zinc-400 dark:data-disabled:text-zinc-500",
          // File input styles
          "file:-my-2 file:-ml-2.5 file:px-3 file:py-2 file:[margin-inline-end:0.75rem] file:cursor-pointer file:rounded-l-[5px] file:rounded-r-none file:border-0 file:outline-hidden focus:outline-hidden data-disabled:pointer-events-none file:data-disabled:pointer-events-none file:border-solid file:border-zinc-200 file:bg-zinc-50 file:text-zinc-500 file:hover:bg-zinc-100 dark:file:border-zinc-800 dark:file:bg-zinc-950 dark:file:hover:bg-zinc-900/20 dark:file:data-disabled:border-zinc-700 file:[border-inline-end-width:1px] file:data-disabled:bg-zinc-100 file:data-disabled:text-zinc-500 dark:file:data-disabled:bg-zinc-800",
          inputClassName,
        )}
        {...props}
      />

      {/* Custom Suffix */}
      {hasCustomSuffix && (
        <div
          className={cx(
            "flex items-center shrink-0 order-3",
            // Font size based on input size
            {
              "text-xs": size === "sm",
              "text-sm": size === "base" || size === "lg",
            },
            // Styling controls background and border
            suffixStyling && [
              "bg-zinc-50 dark:bg-zinc-900/50 border-l border-zinc-200 dark:border-zinc-700",
              "rounded-r-md",
            ],
            // Padding - less when unstyled (no container to pad)
            suffixStyling
              ? {
                  "px-2": size === "sm",
                  "px-2.5": size === "base",
                  "px-3": size === "lg",
                }
              : {
                  "pl-0.5 pr-2": size === "sm",
                  "pl-1 pr-2.5": size === "base",
                  "pl-1 pr-3": size === "lg",
                },
          )}
        >
          {effectiveSuffix}
        </div>
      )}
    </div>
  );
};

Input.displayName = "Input";

export { Input, type InputProps };
