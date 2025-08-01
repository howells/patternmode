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
    "relative block w-full appearance-none rounded-md border shadow-xs outline-hidden transition",
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
      sm: [
        "py-1.5 text-sm",
        // file styles for sm
        "file:-my-1.5 file:-ml-2 file:px-2 file:py-1.5 file:[margin-inline-end:0.5rem]",
      ],
      base: [
        "py-2 text-sm",
        // file styles for base
        "file:-my-2 file:-ml-2.5 file:px-3 file:py-2 file:[margin-inline-end:0.75rem]",
      ],
      lg: [
        "py-2.5 text-base",
        // file styles for lg
        "file:-my-2.5 file:-ml-3 file:px-4 file:py-2.5 file:[margin-inline-end:1rem]",
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

/**
 * Props for the Input component.
 *
 * @interface InputProps
 * @augments Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, "size" | "prefix">
 * @augments VariantProps<typeof inputStyles>
 * @example
 * ```tsx
 * <Input placeholder="Enter text..." />
 * ```
 */
type InputProps = {
  /**
   * Additional CSS classes for the input element.
   */
  inputClassName?: string;
  /**
   * Input type (text, email, password, etc.).
   */
  type?: string;
  /**
   * Custom prefix content.
   */
  prefix?: React.ReactNode;
  /**
   * Custom suffix content.
   */
  suffix?: React.ReactNode;
  /**
   * Prefix text content.
   */
  prefixText?: string;
  /**
   * Prefix icon component.
   */
  prefixIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  /**
   * Suffix text content.
   */
  suffixText?: string;
  /**
   * Suffix icon component.
   */
  suffixIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  /**
   * Whether to apply prefix styling.
   */
  prefixStyling?: boolean;
  /**
   * Whether to apply suffix styling.
   */
  suffixStyling?: boolean;
  /**
   * Stroke width for icons (defaults to 1).
   */
  iconStrokeWidth?: number;
  /**
   * Minimal variant for command palettes - removes border, shadow, focus ring.
   */
  minimal?: boolean;
  /**
   * Remove all styling and return bare input element.
   */
  unstyled?: boolean;
} & Omit<
      React.ComponentPropsWithoutRef<typeof BaseInput>,
      "size" | "prefix"
    > & VariantProps<typeof inputStyles>;

/**
 * A comprehensive input component supporting multiple types, sizes, validation states, and extensive customization options.
 *
 * Built on Base UI's Input primitive, this component provides a robust foundation for form inputs with
 * advanced features including prefix/suffix content, icons, password visibility toggles, search functionality,
 * and comprehensive styling. Supports all standard HTML input types with enhanced accessibility and
 * form integration capabilities.
 *
 * @inheritdoc
 *
 * **Key Features:**
 * - **Multiple Input Types**: Text, email, password, search, number, file, and all standard HTML input types
 * - **Size Variants**: Small, base (default), and large sizes for different UI contexts
 * - **Prefix/Suffix Content**: Icons, text, or custom components on either side of the input
 * - **Validation States**: Error states with visual feedback for form validation
 * - **Built-in Functionality**: Automatic search icons and password visibility toggles
 * - **File Input Support**: Styled file inputs with proper file picker integration
 * - **Accessibility**: Full ARIA support, proper labeling, and keyboard navigation
 *
 * **Advanced Customization:**
 * - **Styling Control**: Prefix/suffix styling can be enabled or disabled independently
 * - **Minimal Variant**: Clean styling for command palettes and search interfaces
 * - **Unstyled Mode**: Completely unstyled input for maximum customization
 * - **Icon Integration**: Automatic sizing and coloring for icons based on input size
 * - **Custom Content**: Support for complex prefix/suffix content including buttons and badges
 *
 * **Common Use Cases:**
 * - Form fields for user registration and login
 * - Search inputs with search icons
 * - Password fields with visibility toggles
 * - Currency and numeric inputs with prefix/suffix indicators
 * - File upload inputs with styled file pickers
 * - Email and contact form fields
 * - Address and location inputs
 * - Command palette and filter inputs
 *
 * **Accessibility:**
 * - Proper ARIA labels and descriptions
 * - Keyboard navigation and focus management
 * - Screen reader compatibility with state announcements
 * - High contrast support and focus indicators
 * - Support for assistive input methods
 *
 * @category inputs
 * @icon Type
 * @example
 * ```tsx
 * // Basic text input
 * <Input placeholder="Enter your name" />
 *
 * // Email input with validation
 * <Input
 *   type="email"
 *   placeholder="your@email.com"
 *   hasError={!!errors.email}
 * />
 *
 * // Password input with built-in visibility toggle
 * <Input
 *   type="password"
 *   placeholder="Enter password"
 *   autoComplete="current-password"
 * />
 *
 * // Search input with automatic search icon
 * <Input
 *   type="search"
 *   placeholder="Search products..."
 *   size="lg"
 * />
 *
 * // Currency input with prefix and suffix
 * <Input
 *   type="number"
 *   prefixText="$"
 *   suffixText="USD"
 *   placeholder="0.00"
 *   step="0.01"
 * />
 *
 * // Input with custom icons
 * <Input
 *   prefixIcon={User}
 *   placeholder="Username"
 *   size="base"
 * />
 *
 * // File input with styling
 * <Input
 *   type="file"
 *   accept=".pdf,.doc,.docx"
 *   size="lg"
 * />
 *
 * // Complex prefix/suffix with custom components  
 * <Input
 *   prefix={
 *     <div className="flex items-center gap-2">
 *       <Badge variant="secondary">API</Badge>
 *       <Select value="get">
 *         <option value="get">GET</option>
 *         <option value="post">POST</option>
 *       </Select>
 *     </div>
 *   }
 *   suffix={
 *     <Button size="sm" variant="ghost">
 *       Send
 *     </Button>
 *   }
 *   placeholder="Enter API endpoint..."
 *   prefixStyling={false}
 *   suffixStyling={false}
 * />
 *
 * // Minimal variant for command palettes
 * <Input
 *   minimal
 *   prefixIcon={Search}
 *   placeholder="Search commands..."
 *   className="bg-transparent"
 * />
 *
 * // Form integration with validation
 * <div className="space-y-2">
 *   <label htmlFor="phone" className="text-sm font-medium">
 *     Phone Number
 *   </label>
 *   <Input
 *     id="phone"
 *     type="tel"
 *     prefixText="+1"
 *     placeholder="(555) 123-4567"
 *     hasError={!!errors.phone}
 *     className={errors.phone ? "border-red-500" : ""}
 *   />
 *   {errors.phone && (
 *     <p className="text-sm text-red-600">{errors.phone}</p>
 *   )}
 * </div>
 *
 * // Number input without spinner controls
 * <Input
 *   type="number"
 *   enableStepper={false}
 *   placeholder="Enter amount"
 *   min="0"
 *   max="999999"
 * />
 * ```
 */
/**
 * Single-line text input field with validation support and various styling options.
 *
 * @id input
 * @name Input
 * @icon Type
 * @category inputs
 * @component
 * @param props - Component properties.
 * @param props.inputClassName - Additional CSS classes for the input element.
 * @param props.type - Input type (text, email, password, etc.).
 * @param props.size - Size variant of the input.
 * @param props.hasError - Whether to display error styling.
 * @param props.enableStepper - Whether to show number input steppers.
 * @param props.prefix - Custom prefix content.
 * @param props.suffix - Custom suffix content.
 * @param props.prefixText - Prefix text content.
 * @param props.prefixIcon - Prefix icon component.
 * @param props.suffixText - Suffix text content.
 * @param props.suffixIcon - Suffix icon component.
 * @param props.prefixStyling - Whether to apply prefix styling.
 * @param props.suffixStyling - Whether to apply suffix styling.
 * @param props.iconStrokeWidth - Stroke width for icons.
 * @param props.minimal - Minimal variant for command palettes.
 * @param props.unstyled - Remove all styling and return bare input element.
 * @param props.placeholder - Placeholder text.
 * @param props.value - Input value when controlled.
 * @param props.defaultValue - Default value when uncontrolled.
 * @param props.onChange - Change event handler.
 * @param props.disabled - Whether the input is disabled.
 * @param props.readOnly - Whether the input is read-only.
 * @param props.required - Whether the input is required.
 * @param props.name - Name attribute for form integration.
 * @param props.className - Additional CSS classes for the container.
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
