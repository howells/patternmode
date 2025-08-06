"use client";

// Tremor Input [v2.0.0] - Base UI

import type { InputProps } from "./types";
import { Input as BaseInput } from "@base-ui-components/react/input";
import { Eye, EyeOff, Search } from "lucide-react";

import React from "react";
import { config } from "../../lib/config";
import { cx, focusRing } from "../../lib/utils";
import { formControlContainerVariants, formControlElementVariants } from "../../lib/form-control-variants";
import { inputElementStyles } from "./variants";

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
    "size-3": size === "xs",
    "size-3.5": size === "sm",
    "size-4": size === "base",
    "size-5": size === "lg",
  };
  const iconClassName = cx(
    "shrink-0 text-zinc-500 dark:text-zinc-400",
    iconSize,
  );

  // Gap size based on input size
  const gapClassName = size === "xs" || size === "sm"
    ? "gap-0.5"
    : size === "base"
      ? "gap-1"
      : "gap-1.5";

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
                        "size-3": size === "xs",
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
                        "size-3": size === "xs",
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
    ? size === "xs"
      ? "pl-1"
      : size === "sm"
        ? "pl-1.5"
        : size === "base"
          ? "pl-2"
          : "pl-2.5"
    : size === "xs"
      ? "pl-2"
      : size === "sm"
        ? "pl-2.5"
        : size === "base"
          ? "pl-3"
          : "pl-3.5";

  // Calculate right padding
  const rightPadding = hasUnstyledSuffix
    ? size === "xs"
      ? "pr-1"
      : size === "sm"
        ? "pr-1.5"
        : size === "base"
          ? "pr-2"
          : "pr-2.5"
    : size === "xs"
      ? "pr-2"
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
        formControlContainerVariants({ size, hasError }),
        "items-stretch",
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
              "text-xs": size === "xs" || size === "sm",
              "text-sm": size === "base" || size === "lg",
            },
            // Styling controls background and border
            prefixStyling && [
              "bg-zinc-50 dark:bg-zinc-900/50 border-r  dark:border-zinc-700",
              // Size-based prefix border radius
              {
                "rounded-l-sm": size === "xs",
                "rounded-l": size === "sm",
                "rounded-l-md": size === "base", 
                "rounded-l-lg": size === "lg",
              },
            ],
            // Padding - less when unstyled (no container to pad)
            prefixStyling
              ? {
                  "px-1.5": size === "xs",
                  "px-2": size === "sm",
                  "px-2.5": size === "base",
                  "px-3": size === "lg",
                }
              : {
                  "pl-1.5": size === "xs",
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
          inputElementStyles({ size }),
          "order-2",
          // Simple padding
          paddingClasses,
          // File input styles
          "file:-my-2 file:-ml-2.5 file:px-3 file:py-2 file:[margin-inline-end:0.75rem] file:cursor-pointer file:rounded-l-[5px] file:rounded-r-none file:border-0 file:outline-hidden focus:outline-hidden data-disabled:pointer-events-none file:data-disabled:pointer-events-none file:border-solid file: file:bg-zinc-50 file:text-zinc-500 file:hover:bg-zinc-100 dark:file:border-zinc-800 dark:file:bg-zinc-950 dark:file:hover:bg-zinc-900/20 dark:file:data-disabled:border-zinc-700 file:[border-inline-end-width:1px] file:data-disabled:bg-zinc-100 file:data-disabled:text-zinc-500 dark:file:data-disabled:bg-zinc-800",
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
              "text-xs": size === "xs" || size === "sm",
              "text-sm": size === "base" || size === "lg",
            },
            // Styling controls background and border
            suffixStyling && [
              "bg-zinc-50 dark:bg-zinc-900/50 border-l  dark:border-zinc-700",
              // Size-based suffix border radius
              {
                "rounded-r-sm": size === "xs",
                "rounded-r": size === "sm",
                "rounded-r-md": size === "base",
                "rounded-r-lg": size === "lg", 
              },
            ],
            // Padding - less when unstyled (no container to pad)
            suffixStyling
              ? {
                  "px-1.5": size === "xs",
                  "px-2": size === "sm",
                  "px-2.5": size === "base",
                  "px-3": size === "lg",
                }
              : {
                  "pl-0.5 pr-1.5": size === "xs",
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

export { Input };
