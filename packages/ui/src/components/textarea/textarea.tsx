import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import { cx, focusInput, hasErrorInput } from "../../lib/utils";

/**
 * Props for the Textarea component.
 *
 * Extends react-textarea-autosize props when `autoResize={true}` (default),
 * falls back to native textarea props when `autoResize={false}`.
 *
 * @interface TextareaProps
 * @augments React.ComponentPropsWithoutRef<typeof TextareaAutosize>
 * @see {@link https://github.com/Andarist/react-textarea-autosize#props} react-textarea-autosize props
 * @example
 * ```tsx
 * <Textarea placeholder="Enter your message..." minRows={2} maxRows={6} />
 * ```
 */
interface TextareaProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TextareaAutosize>,
    "style"
  > {
  /**
   * Whether to display error styling for form validation.
   *
   * @default false
   */
  hasError?: boolean;
  /**
   * Whether to enable auto-resizing behavior using react-textarea-autosize.
   * When `true`, uses TextareaAutosize component. When `false`, uses native textarea.
   *
   * @default true
   */
  autoResize?: boolean;
  /**
   * Minimum number of rows to display (react-textarea-autosize prop).
   * The textarea will never be smaller than this height.
   *
   * @default 3
   */
  minRows?: number;
  /**
   * Maximum number of rows before scrolling (react-textarea-autosize prop).
   * When content exceeds this height, the textarea will scroll instead of expanding.
   *
   * @default undefined (no maximum)
   */
  maxRows?: number;
  /**
   * Callback when textarea height changes (react-textarea-autosize prop).
   * Useful for adjusting parent container layouts or tracking resize events.
   *
   * @param height - New height in pixels
   * @param meta - Additional metadata including rowHeight
   */
  onHeightChange?: (height: number, meta: { rowHeight: number }) => void;
  /**
   * Cache measurements for better performance (react-textarea-autosize prop).
   * Enable this for textareas that resize frequently to avoid recalculating dimensions.
   *
   * @default false
   */
  cacheMeasurements?: boolean;
  /**
   * Standard CSS style object.
   * Note: When using react-textarea-autosize, height styles are managed internally.
   */
  style?: React.CSSProperties;
}

/**
 * A multi-line text input component with intelligent auto-resize functionality.
 *
 * Built on top of **react-textarea-autosize** for robust auto-resizing behavior that
 * automatically adjusts height based on content. The component seamlessly handles
 * text overflow by expanding vertically while respecting configurable row constraints.
 *
 * **Key Features:**
 * - **Auto-resize**: Powered by react-textarea-autosize for smooth height transitions
 * - **Row constraints**: Configure minimum and maximum rows to control expansion
 * - **Performance**: Optional measurement caching for better performance in forms
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * - **Styling**: Consistent design system integration with error states and dark mode
 * - **Flexibility**: Can be disabled to function as a standard fixed-height textarea
 *
 * **react-textarea-autosize Integration:**
 * - Uses `TextareaAutosize` component internally when `autoResize={true}` (default)
 * - Falls back to native `<textarea>` when `autoResize={false}`
 * - Exposes all react-textarea-autosize props: `minRows`, `maxRows`, `onHeightChange`, `cacheMeasurements`
 * - Handles height calculations automatically while preserving custom styles
 *
 * @id textarea
 * @name Textarea
 * @component
 * @see {@link https://github.com/Andarist/react-textarea-autosize} react-textarea-autosize documentation
 * @example
 * ```tsx
 * // Basic auto-resizing textarea (uses react-textarea-autosize)
 * <Textarea placeholder="Enter your message" />
 *
 * // With error state and auto-resize
 * <Textarea hasError placeholder="Required field" />
 *
 * // Controlled with row constraints (react-textarea-autosize features)
 * <Textarea
 *   value={message}
 *   onChange={handleChange}
 *   minRows={3}        // Minimum 3 rows visible
 *   maxRows={8}        // Maximum 8 rows before scrolling
 * />
 *
 * // Disable auto-resize for fixed height (uses native textarea)
 * <Textarea
 *   autoResize={false}
 *   rows={5}
 *   placeholder="Fixed height textarea"
 * />
 *
 * // Performance optimization with measurement caching
 * <Textarea
 *   minRows={2}
 *   maxRows={10}
 *   cacheMeasurements={true}  // Cache for better performance
 *   onHeightChange={(height, meta) => {
 *     console.log('New height:', height, 'Row height:', meta.rowHeight);
 *   }}
 * />
 *
 * // Form integration with validation
 * <Textarea
 *   name="description"
 *   required
 *   placeholder="Describe your request"
 *   minRows={2}
 *   maxRows={10}
 *   hasError={!!errors.description}
 * />
 * ```
 */
/**
 * Auto-resizing multi-line text input component built on react-textarea-autosize with configurable constraints and error states.
 *
 * @id textarea
 * @name Textarea
 * @component
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
        minRows={minRows}
        maxRows={maxRows}
        onHeightChange={onHeightChange}
        cacheMeasurements={cacheMeasurements}
        style={style ? { height: style.height as number } : undefined}
        {...cleanProps}
      />
    );
  };

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
