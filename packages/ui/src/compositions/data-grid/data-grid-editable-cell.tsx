"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { useEffect, useRef, useState } from "react";

interface DataGridEditableCellProps {
  /** Current cell value */
  value: string | number;
  /** Called with the new value when the user commits an edit (blur or Enter) */
  onSave: (value: string) => void;
  /** Additional CSS class name for the display span */
  className?: string;
}

/**
 * Inline-editable cell for DataGrid.
 * Double-click to enter edit mode. Press Enter or blur to save, Escape to cancel.
 *
 * @example
 * ```tsx
 * const columns = [
 *   columnHelper.accessor("name", {
 *     cell: ({ getValue, row }) => (
 *       <DataGridEditableCell
 *         value={getValue()}
 *         onSave={(val) => updateRow(row.original.id, "name", val)}
 *       />
 *     ),
 *   }),
 * ];
 * ```
 */
function DataGridEditableCell({
  value,
  onSave,
  className,
}: DataGridEditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  function handleSave() {
    onSave(draft);
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(String(value));
    setIsEditing(false);
  }

  if (!isEditing) {
    return (
      <button
        className={cn(
          "cursor-text rounded px-1 -mx-1 text-left hover:bg-muted/50",
          className,
        )}
        onDoubleClick={() => setIsEditing(true)}
        tabIndex={0}
        type="button"
      >
        {value}
      </button>
    );
  }

  return (
    <input
      ref={inputRef}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSave();
        }
        if (e.key === "Escape") {
          handleCancel();
        }
      }}
      className="h-7 w-full min-w-0 rounded border border-border bg-input px-1 -mx-1 text-sm outline-none focus:ring-1 focus:ring-ring"
    />
  );
}

export type { DataGridEditableCellProps };
export { DataGridEditableCell };
