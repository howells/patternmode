import type { TextareaAutosizeProps, TextareaHeightChangeMeta } from "react-textarea-autosize";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { cx, focusInput, hasErrorInput } from "../../lib/utils";

/**
 * Props for the Textarea component.
 *
 * Extends react-textarea-autosize props when `autoResize={true}` (default),
 * falls back to native textarea props when `autoResize={false}`.
 *
 * **Inherited Props:**
 * - All standard HTML textarea attributes (`placeholder`, `value`, `onChange`, `name`, `id`, `required`, `disabled`, etc.)
 * - All react-textarea-autosize props when `autoResize={true}`.
 *
 * @interface TextareaProps
 * @augments React.ComponentPropsWithoutRef<typeof TextareaAutosize>
 * @see {@link https://github.com/Andarist/react-textarea-autosize#props} react-textarea-autosize props
 */
type TextareaProps = {
  /**
   * Whether to display error styling for form validation.
   * Adds red border and error state styling to indicate validation errors.
   *
   * @default false
   */
  hasError?: boolean;

  /**
   * Whether to enable auto-resizing behavior using react-textarea-autosize.
   *
   * - When `true` (default): Uses TextareaAutosize component with intelligent height adjustment
   * - When `false`: Uses native HTML textarea with fixed height.
   *
   * @default true
   */
  autoResize?: boolean;

  /**
   * Minimum number of rows to display (react-textarea-autosize prop).
   * The textarea will never be smaller than this height, even when empty.
   * Only applies when `autoResize={true}`.
   *
   * @default 3
   */
  minRows?: number;

  /**
   * Maximum number of rows before scrolling (react-textarea-autosize prop).
   * When content exceeds this height, the textarea will scroll instead of expanding.
   * Only applies when `autoResize={true}`.
   *
   * @default undefined (no maximum)
   */
  maxRows?: number;

  /**
   * Callback when textarea height changes (react-textarea-autosize prop).
   * Useful for adjusting parent container layouts or tracking resize events.
   * Only applies when `autoResize={true}`.
   *
   * @param height - New height in pixels.
   * @param meta - Additional metadata including rowHeight.
   */
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;

  /**
   * Cache measurements for better performance (react-textarea-autosize prop).
   * Enable this for textareas that resize frequently to avoid recalculating dimensions.
   * Only applies when `autoResize={true}`.
   *
   * @default false
   */
  cacheMeasurements?: boolean;

  /**
   * Standard CSS style object.
   *
   * **Note:** When using react-textarea-autosize (`autoResize={true}`),
   * height-related styles are managed internally and may be overridden.
   */
  style?: React.CSSProperties;
} & Omit<TextareaAutosizeProps, "style">;

/**
 * Auto-resizing multi-line text input component built on react-textarea-autosize with configurable constraints and error states.
 *
 * @id textarea
 * @name Textarea
 * @icon FileText
 * @category inputs
 * @component
 * @see {@link https://github.com/Andarist/react-textarea-autosize} react-textarea-autosize documentation
 * @param props - Component properties.
 * @param props.hasError - Whether to display error styling for form validation.
 * @param props.autoResize - Whether to enable auto-resizing behavior (default: true).
 * @param props.minRows - Minimum number of rows to display (default: 3).
 * @param props.maxRows - Maximum number of rows before scrolling.
 * @param props.onHeightChange - Callback when textarea height changes.
 * @param props.cacheMeasurements - Cache measurements for better performance (default: false).
 * @param props.style - Standard CSS style object.
 * @param props.ref - Ref to the textarea element.
 * @param props.className - Additional CSS class names.
 * @example
 * ```tsx
 * // Basic usage
 * <Textarea placeholder="Enter your message..." />
 *
 * // With constraints
 * <Textarea placeholder="Enter your message..." minRows={2} maxRows={6} />
 *
 * // Form integration
 * <Textarea
 *   name="description"
 *   required
 *   hasError={!!errors.description}
 *   placeholder="Describe your request"
 * />
 *
 * // Fixed height (no auto-resize)
 * <Textarea autoResize={false} rows={5} placeholder="Fixed height" />
 * ```
 */
const Textarea = (
  { ref: forwardedRef, className, hasError, autoResize = true, minRows = 3, maxRows, onHeightChange, cacheMeasurements = false, style, ...props }: TextareaProps & { ref?: React.RefObject<HTMLTextAreaElement | null> },
) => {
  // Just use props directly - let React handle invalid props
  const cleanProps = props;
  const baseClassName = cx(
    // base
    "flex w-full rounded-md border px-3 py-2 shadow-xs outline-hidden transition-colors sm:text-sm",
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
    className,
  );

  if (!autoResize) {
    // Fallback to regular textarea when auto-resize is disabled
    return (
      <textarea
        ref={forwardedRef}
        className={baseClassName}
        style={style}
        {...(cleanProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <TextareaAutosize
      ref={forwardedRef}
      className={baseClassName}
      minRows={Math.max(minRows, 1)}
      maxRows={maxRows && maxRows > 0 ? maxRows : undefined}
      onHeightChange={onHeightChange}
      cacheMeasurements={cacheMeasurements}
      style={style ? { height: style.height as number } : undefined}
      {...cleanProps}
    />
  );
};

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
