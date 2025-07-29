// Tremor Textarea [v1.0.0]

import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import { cx, focusInput, hasErrorInput } from "../../lib/utils";

/**
 * Props for the Textarea component.
 *
 * @interface TextareaProps
 * @extends React.TextareaHTMLAttributes<HTMLTextAreaElement>
 */
interface TextareaProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TextareaAutosize>,
    "style"
  > {
  /** Whether to display error styling */
  hasError?: boolean;
  /** Whether to enable auto-resizing (default: true) */
  autoResize?: boolean;
  /** Minimum number of rows to display */
  minRows?: number;
  /** Maximum number of rows before scrolling */
  maxRows?: number;
  /** Callback when textarea height changes */
  onHeightChange?: (height: number, meta: { rowHeight: number }) => void;
  /** Cache measurements for better performance */
  cacheMeasurements?: boolean;
  /** Standard CSS style object */
  style?: React.CSSProperties;
}

/**
 * A multi-line text input component with auto-resize functionality.
 *
 * Built on top of react-textarea-autosize for robust auto-resizing behavior.
 * Provides a textarea that automatically adjusts its height based on content,
 * with configurable min/max rows and consistent styling that matches the Input component.
 * Features error states for form validation, proper focus management, and dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * // Basic auto-resizing textarea
 * <Textarea placeholder="Enter your message" />
 *
 * // With error state
 * <Textarea hasError placeholder="Required field" />
 *
 * // Controlled with row constraints
 * <Textarea
 *   value={message}
 *   onChange={handleChange}
 *   minRows={3}
 *   maxRows={8}
 * />
 *
 * // Disable auto-resize for fixed height
 * <Textarea
 *   autoResize={false}
 *   rows={5}
 *   placeholder="Fixed height textarea"
 * />
 *
 * // Form integration with height change callback
 * <Textarea
 *   name="description"
 *   required
 *   placeholder="Describe your request"
 *   minRows={2}
 *   maxRows={10}
 *   onHeightChange={(height) => console.log('New height:', height)}
 * />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      hasError,
      autoResize = true,
      minRows = 2,
      maxRows,
      onHeightChange,
      cacheMeasurements = false,
      style,
      ...props
    }: TextareaProps,
    forwardedRef
  ) => {
    const baseClassName = cx(
      // base
      "flex min-h-[4rem] w-full rounded-md border px-3 py-1.5 shadow-xs outline-hidden transition-colors sm:text-sm",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // border color
      "border-zinc-200 dark:border-zinc-800",
      // background color
      "bg-white dark:bg-zinc-950",
      // placeholder color
      "placeholder-zinc-400 dark:placeholder-zinc-500",
      // disabled
      "disabled:border-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-300",
      "dark:disabled:border-zinc-700 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500",
      // focus
      focusInput,
      // error
      hasError ? hasErrorInput : "",
      // invalid (optional)
      // "dark:aria-invalid:ring-red-400/20 aria-invalid:ring-2 aria-invalid:ring-red-200 aria-invalid:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
      className
    );

    if (!autoResize) {
      // Fallback to regular textarea when auto-resize is disabled
      return (
        <textarea
          ref={forwardedRef}
          className={baseClassName}
          style={style}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      );
    }

    return (
      <TextareaAutosize
        ref={forwardedRef}
        className={baseClassName}
        minRows={minRows}
        maxRows={maxRows}
        onHeightChange={onHeightChange}
        cacheMeasurements={cacheMeasurements}
        style={style ? { height: style.height as number } : undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
