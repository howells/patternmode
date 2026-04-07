"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { focusInput } from "@patternmode/ui/utils/focus-input";
import { Pencil } from "lucide-react";
import type { RefObject } from "react";
import { Icon } from "../../components/icon";
import { useInlineEdit } from "../../hooks/use-inline-edit";

export interface EditableTextProps {
  /** CSS classes for the text display */
  className?: string;
  /** Enable multiline editing (textarea vs input) */
  multiline?: boolean;
  /** Callback when user saves changes */
  onSave: (value: string) => void;
  /** Placeholder text when value is empty */
  placeholder?: string;
  /** Select all text when entering edit mode */
  selectOnFocus?: boolean;
  /** Show edit icon on hover */
  showEditIcon?: boolean;
  /** Current text value */
  value: string;
}

/**
 * Inline editable text component.
 *
 * Display mode: Shows text as a button with optional edit icon on hover.
 * Edit mode: Input/textarea - save on blur or Enter (Cmd/Ctrl+Enter for multiline), cancel on Escape.
 *
 * @example
 * ```tsx
 * // Single-line editable title
 * <EditableText
 *   value={title}
 *   onSave={setTitle}
 *   placeholder="Untitled"
 *   showEditIcon
 *   selectOnFocus
 *   className="text-xl font-semibold"
 * />
 *
 * // Multiline editable description
 * <EditableText
 *   value={description}
 *   onSave={setDescription}
 *   placeholder="Add a description..."
 *   multiline
 *   className="text-sm text-muted-foreground"
 * />
 * ```
 */
export function EditableText({
  value,
  onSave,
  placeholder = "",
  className,
  multiline = false,
  showEditIcon = false,
  selectOnFocus = false,
}: EditableTextProps) {
  const {
    isEditing,
    draft,
    inputRef,
    startEditing,
    handleChange,
    handleKeyDown,
    handleBlur,
  } = useInlineEdit<HTMLInputElement | HTMLTextAreaElement>({
    value,
    onSave,
    multiline,
    selectOnFocus,
  });

  const isEmpty = !value.trim();
  const displayText = isEmpty ? placeholder : value;

  const inputClasses = cn(
    "w-full bg-transparent outline-none",
    focusInput(),
    "-mx-1 rounded px-1",
    className,
  );

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          className={cn(inputClasses, "field-sizing-content resize-none")}
          data-component="editable-text"
          data-slot="editable-text-input"
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          ref={inputRef as RefObject<HTMLTextAreaElement>}
          value={draft}
        />
      );
    }

    return (
      <input
        className={inputClasses}
        data-component="editable-text"
        data-slot="editable-text-input"
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        ref={inputRef as RefObject<HTMLInputElement>}
        type="text"
        value={draft}
      />
    );
  }

  return (
    <button
      className={cn(
        "group inline-flex items-center gap-1.5 text-left",
        "-mx-1 rounded px-1",
        "transition-colors hover:bg-accent/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/50",
        className,
        isEmpty && "text-muted-foreground italic",
      )}
      data-component="editable-text"
      data-slot="editable-text-display"
      onClick={startEditing}
      type="button"
    >
      <span className={multiline ? "whitespace-pre-wrap" : "truncate"}>
        {displayText}
      </span>
      {showEditIcon && (
        <Icon
          className="shrink-0 opacity-0 transition-opacity group-hover:opacity-50"
          icon={Pencil}
          size="2xs"
        />
      )}
    </button>
  );
}
