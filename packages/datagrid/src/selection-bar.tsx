"use client";

import { ToolbarControl } from "@patternmode/filters";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export interface DataGridSelectionBarProps {
  /** Bulk action buttons rendered beside the selection count. */
  actions?: ReactNode;
  /** Clears the current row selection. */
  onClear: () => void;
  /** Number of selected rows. */
  selectedCount: number;
}

/**
 * Bulk-action strip shown when one or more rows are selected.
 * Renders nothing when `selectedCount === 0`.
 */
export const DataGridSelectionBar = ({
  actions,
  onClear,
  selectedCount,
}: DataGridSelectionBarProps) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <section
      aria-label="Selected rows"
      aria-live="polite"
      className="patternmode-datagrid-selection-bar"
    >
      <span className="patternmode-datagrid-selection-bar__count">
        {selectedCount.toLocaleString("en-US")} selected
      </span>
      <div className="patternmode-datagrid-selection-bar__actions">{actions}</div>
      <ToolbarControl className="patternmode-datagrid-selection-bar__clear" onClick={onClear}>
        <X aria-hidden="true" className="patternmode-datagrid-icon-xs" />
        Clear selection
      </ToolbarControl>
    </section>
  );
};
