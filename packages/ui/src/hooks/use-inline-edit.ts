"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseInlineEditOptions {
  /** Enable multiline editing behavior (Cmd/Ctrl+Enter to save) */
  multiline?: boolean;
  /** Callback when user saves changes */
  onSave: (value: string) => void;
  /** Select all text when entering edit mode */
  selectOnFocus?: boolean;
  /** Current value */
  value: string;
}

export interface UseInlineEditResult<
  T extends HTMLInputElement | HTMLTextAreaElement,
> {
  /** Exit edit mode without saving */
  cancelEditing: () => void;
  /** Current draft value */
  draft: string;
  /** Handle blur event (saves changes) */
  handleBlur: () => void;
  /** Handle input change event */
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  /** Handle keyboard events (Escape to cancel, Enter/Cmd+Enter to save) */
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  /** Ref to attach to input/textarea */
  inputRef: React.RefObject<T | null>;
  /** Whether currently in edit mode */
  isEditing: boolean;
  /** Update draft value */
  setDraft: (value: string) => void;
  /** Enter edit mode */
  startEditing: () => void;
}

/**
 * Hook for inline text editing with keyboard shortcuts.
 *
 * Provides state management for:
 * - Edit mode toggle
 * - Draft value that syncs with prop value
 * - Auto-focus and optional text selection
 * - Keyboard shortcuts (Escape to cancel, Enter to save)
 *
 * @example
 * ```tsx
 * const { isEditing, draft, inputRef, startEditing, handleChange, handleKeyDown, handleBlur } =
 *   useInlineEdit({ value, onSave, selectOnFocus: true });
 *
 * if (isEditing) {
 *   return (
 *     <input
 *       ref={inputRef}
 *       value={draft}
 *       onChange={handleChange}
 *       onKeyDown={handleKeyDown}
 *       onBlur={handleBlur}
 *     />
 *   );
 * }
 *
 * return <button onClick={startEditing}>{value}</button>;
 * ```
 */
export function useInlineEdit<
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement,
>({
  value,
  onSave,
  multiline = false,
  selectOnFocus = false,
}: UseInlineEditOptions): UseInlineEditResult<T> {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<T>(null);

  // Sync draft with value when value changes externally (but not while editing)
  useEffect(() => {
    if (!isEditing) {
      setDraft(value);
    }
  }, [value, isEditing]);

  // Focus and optionally select text when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (selectOnFocus) {
        inputRef.current.select();
      } else {
        // Place cursor at end
        const len = inputRef.current.value.length;
        inputRef.current.setSelectionRange(len, len);
      }
    }
  }, [isEditing, selectOnFocus]);

  const save = useCallback(() => {
    const trimmed = draft.trim();
    setIsEditing(false);
    if (trimmed !== value) {
      onSave(trimmed);
    }
  }, [draft, value, onSave]);

  const cancelEditing = useCallback(() => {
    setDraft(value);
    setIsEditing(false);
  }, [value]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        cancelEditing();
        return;
      }

      if (event.key === "Enter") {
        if (multiline) {
          // For multiline: Cmd/Ctrl+Enter saves, plain Enter adds newline
          if (event.metaKey || event.ctrlKey) {
            event.preventDefault();
            save();
          }
          // Otherwise let Enter add newline naturally
        } else {
          // For single-line: Enter saves
          event.preventDefault();
          save();
        }
      }
    },
    [multiline, save, cancelEditing],
  );

  const handleBlur = useCallback(() => {
    save();
  }, [save]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDraft(event.target.value);
    },
    [],
  );

  return {
    isEditing,
    draft,
    inputRef,
    startEditing,
    cancelEditing,
    setDraft,
    handleChange,
    handleKeyDown,
    handleBlur,
  };
}
