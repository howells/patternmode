import React from "react";
import TextareaAutosize, {
  type TextareaAutosizeProps,
  type TextareaHeightChangeMeta
} from "react-textarea-autosize";

import { cx, focusInput, hasErrorInput } from "../../lib/utils";

/**
 * Props for the Textarea component
 *
 * Extends react-textarea-autosize props when `autoResize={true}` (default),
 * falls back to native textarea props when `autoResize={false}`.
 *
 * **Inherited Props:**
 * - All standard HTML textarea attributes (`placeholder`, `value`, `onChange`, `name`, `id`, `required`, `disabled`, etc.)
 * - All react-textarea-autosize props when `autoResize={true}`
 *
 * @interface TextareaProps
 * @augments React.ComponentPropsWithoutRef<typeof TextareaAutosize>
 * @see {@link https://github.com/Andarist/react-textarea-autosize#props} react-textarea-autosize props
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
 * ```
 */
interface TextareaProps extends Omit<TextareaAutosizeProps, "style"> {
  /**
   * Whether to display error styling for form validation.
   * Adds red border and error state styling to indicate validation errors.
   *
   * @default false
   * @example
   * ```tsx
   * <Textarea hasError={!!fieldError} placeholder="Required field" />
   * ```
   */
  hasError?: boolean;

  /**
   * Whether to enable auto-resizing behavior using react-textarea-autosize.
   *
   * - When `true` (default): Uses TextareaAutosize component with intelligent height adjustment
   * - When `false`: Uses native HTML textarea with fixed height
   *
   * @default true
   * @example
   * ```tsx
   * // Auto-resizing (default)
   * <Textarea placeholder="Grows with content" />
   *
   * // Fixed height
   * <Textarea autoResize={false} rows={5} placeholder="Fixed height" />
   * ```
   */
  autoResize?: boolean;

  /**
   * Minimum number of rows to display (react-textarea-autosize prop).
   * The textarea will never be smaller than this height, even when empty.
   * Only applies when `autoResize={true}`.
   *
   * @default 3
   * @minimum 1
   * @example
   * ```tsx
   * <Textarea minRows={2} placeholder="At least 2 rows tall" />
   * ```
   */
  minRows?: number;

  /**
   * Maximum number of rows before scrolling (react-textarea-autosize prop).
   * When content exceeds this height, the textarea will scroll instead of expanding.
   * Only applies when `autoResize={true}`.
   *
   * @default undefined (no maximum)
   * @minimum 1
   * @example
   * ```tsx
   * <Textarea maxRows={8} placeholder="Max 8 rows, then scroll" />
   * ```
   */
  maxRows?: number;

    /**
   * Callback when textarea height changes (react-textarea-autosize prop).
   * Useful for adjusting parent container layouts or tracking resize events.
   * Only applies when `autoResize={true}`.
   *
   * @param height - New height in pixels
   * @param meta - Additional metadata including rowHeight
   * @example
   * ```tsx
   * <Textarea
   *   onHeightChange={(height, meta) => {
   *     console.log('New height:', height, 'Row height:', meta.rowHeight);
   *     // Adjust parent container if needed
   *   }}
   * />
   * ```
   */
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;

  /**
   * Cache measurements for better performance (react-textarea-autosize prop).
   * Enable this for textareas that resize frequently to avoid recalculating dimensions.
   * Only applies when `autoResize={true}`.
   *
   * @default false
   * @example
   * ```tsx
   * <Textarea cacheMeasurements={true} placeholder="Optimized for frequent resizing" />
   * ```
   */
  cacheMeasurements?: boolean;

  /**
   * Standard CSS style object.
   *
   * **Note:** When using react-textarea-autosize (`autoResize={true}`),
   * height-related styles are managed internally and may be overridden.
   *
   * @example
   * ```tsx
   * <Textarea style={{ fontFamily: 'monospace', fontSize: '14px' }} />
   * ```
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
