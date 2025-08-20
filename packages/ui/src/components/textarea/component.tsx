import type React from "react";
import type {
	TextareaAutosizeProps,
	TextareaHeightChangeMeta,
} from "react-textarea-autosize";
import TextareaAutosize from "react-textarea-autosize";
import { focusInput } from "../../presentation/focus-input";
import { hasErrorInput } from "../../presentation/has-error-input";
import { cx } from "../../utils/cx";
import type { TextareaPreviewProps } from "./preview";
import { textareaStyles } from "./variants";

type TextareaProps = TextareaPreviewProps & {
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
	onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;

	/**
	 * Cache measurements for better performance (react-textarea-autosize prop).
	 * Enable this for textareas that resize frequently to avoid recalculating dimensions.
	 * Only applies when autoResize=true.
	 */
	cacheMeasurements?: TextareaAutosizeProps["cacheMeasurements"];

	/**
	 * Whether to display error styling for form validation.
	 * Adds red border and error state styling to indicate validation errors.
	 */
	hasError?: boolean;

	/**
	 * Whether the textarea should take full width of its container.
	 * When false, applies max-w-sm constraint for better UX in wide layouts.
	 */
	fullWidth?: boolean;

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
const Textarea = ({
	ref: forwardedRef,
	className,
	hasError,
	autoResize = true,
	size = "base",
	fullWidth = false,
	minRows = 3,
	maxRows,
	onHeightChange,
	cacheMeasurements = false,
	style,
	...props
}: TextareaProps & { ref?: React.RefObject<HTMLTextAreaElement | null> }) => {
	const cleanProps = props;

	const baseClassName = cx(
		textareaStyles({ size, fullWidth }),
		"outline-hidden transition-colors",
		// text color
		"text-zinc-900 dark:text-zinc-50",
		// border color
		" dark:border-zinc-800",
		// background color
		"bg-white dark:bg-zinc-950",
		// placeholder color
		"placeholder-zinc-400 dark:placeholder-zinc-500",
		// disabled
		"disabled: disabled:bg-zinc-100 disabled:text-zinc-300",
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
				data-testid="textarea"
				ref={forwardedRef}
				className={baseClassName}
				style={style}
				{...(cleanProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
			/>
		);
	}

	return (
		<TextareaAutosize
			data-testid="textarea"
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
