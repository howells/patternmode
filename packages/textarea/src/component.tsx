import { cx } from "@patternmode/utils/cx";
import { focusInput } from "@patternmode/utils/focus-input";
import { hasErrorInput } from "@patternmode/utils/has-error-input";
import type React from "react";
import type {
  TextareaAutosizeProps,
  TextareaHeightChangeMeta,
} from "react-textarea-autosize";
import TextareaAutosize from "react-textarea-autosize";
import { textareaStyles } from "./variants";

export type TextareaProps = {
  minRows?: TextareaAutosizeProps["minRows"];
  maxRows?: TextareaAutosizeProps["maxRows"];
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
  cacheMeasurements?: TextareaAutosizeProps["cacheMeasurements"];
  hasError?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  autoResize?: boolean;
  size?: "xs" | "sm" | "base" | "lg";
} & Omit<TextareaAutosizeProps, "style">;

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
  const baseClassName = cx(
    textareaStyles({ size, fullWidth }),
    "outline-hidden transition-colors",
    "text-zinc-900 dark:text-zinc-50",
    " dark:border-zinc-800",
    "bg-white dark:bg-zinc-950",
    "placeholder-zinc-400 dark:placeholder-zinc-500",
    "disabled: disabled:bg-zinc-100 disabled:text-zinc-300",
    "dark:disabled:border-zinc-700 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500",
    focusInput,
    hasError ? hasErrorInput : "",
    className
  );

  if (!autoResize) {
    return (
      <textarea
        className={baseClassName}
        data-testid="textarea"
        ref={forwardedRef}
        style={style}
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <TextareaAutosize
      cacheMeasurements={cacheMeasurements}
      className={baseClassName}
      data-testid="textarea"
      maxRows={maxRows && maxRows > 0 ? maxRows : undefined}
      minRows={Math.max(minRows, 1)}
      onHeightChange={onHeightChange}
      ref={forwardedRef}
      style={style ? { height: style.height as number } : undefined}
      {...props}
    />
  );
};

Textarea.displayName = "Textarea";

export { Textarea };
