import type { TextareaAutosizeProps, TextareaHeightChangeMeta } from "react-textarea-autosize";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { cx, focusInput, hasErrorInput } from "../../lib/utils";

type TextareaProps = {
  /**
   * Whether to display error styling for form validation.
   * Adds red border and error state styling to indicate validation errors.
   */
  hasError?: boolean;

  /**
   * Whether to enable auto-resizing behavior using react-textarea-autosize.
   * When true: Uses TextareaAutosize component with intelligent height adjustment.
   * When false: Uses native HTML textarea with fixed height.
   */
  autoResize?: boolean;

  /**
   * Minimum number of rows to display (react-textarea-autosize prop).
   * The textarea will never be smaller than this height, even when empty.
   * Only applies when autoResize=true.
   */
  minRows?: TextareaAutosizeProps["minRows"];

  /**
   * Maximum number of rows before scrolling (react-textarea-autosize prop).
   * When content exceeds this height, the textarea will scroll instead of expanding.
   * Only applies when autoResize=true.
   */
  maxRows?: TextareaAutosizeProps["maxRows"];

  /**
   * Callback when textarea height changes (react-textarea-autosize prop).
   * Useful for adjusting parent container layouts or tracking resize events.
   * Only applies when autoResize=true.
   */
  onHeightChange?: TextareaAutosizeProps["onHeightChange"];

  /**
   * Cache measurements for better performance (react-textarea-autosize prop).
   * Enable this for textareas that resize frequently to avoid recalculating dimensions.
   * Only applies when autoResize=true.
   */
  cacheMeasurements?: TextareaAutosizeProps["cacheMeasurements"];

  /**
   * Standard CSS style object.
   * Note: When using react-textarea-autosize (autoResize=true),
   * height-related styles are managed internally and may be overridden.
   */
  style?: React.CSSProperties;
} & Omit<TextareaAutosizeProps, "style">;

/**
 * Auto-resizing multi-line text input component built on react-textarea-autosize with configurable constraints and error states.
 */
const Textarea = (
  { ref: forwardedRef, className, hasError, autoResize = true, minRows = 3, maxRows, onHeightChange, cacheMeasurements = false, style, ...props }: TextareaProps & { ref?: React.RefObject<HTMLTextAreaElement | null> },
) => {
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
