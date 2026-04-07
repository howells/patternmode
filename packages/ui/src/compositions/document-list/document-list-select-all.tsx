"use client";

import {
  Checkbox,
  type CheckboxProps,
} from "@patternmode/ui/components/checkbox";
import { useDocumentListContext } from "./document-list-context";

export interface DocumentListSelectAllProps
  extends Omit<CheckboxProps, "checked" | "onCheckedChange" | "indeterminate"> {
  /** Label to show, defaults to "Select all" */
  label?: string;
}

/**
 * Select-all checkbox that toggles all items in the list.
 * Shows indeterminate state when some (but not all) items are selected.
 */
export function DocumentListSelectAll({
  label = "Select all",
  ...props
}: DocumentListSelectAllProps) {
  const { selectable, allSelected, someSelected, toggleAll, value } =
    useDocumentListContext();

  if (!selectable) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <Checkbox
        aria-label={label}
        checked={allSelected}
        data-component="document-list-select-all"
        data-slot="document-list-select-all"
        indeterminate={someSelected}
        onCheckedChange={toggleAll}
        size="sm"
        {...props}
      />
      <button
        className="text-muted-foreground"
        onClick={toggleAll}
        type="button"
      >
        {value.length > 0 ? `${value.length} selected` : label}
      </button>
    </div>
  );
}
