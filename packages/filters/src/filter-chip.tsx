"use client";

import { Popover } from "@base-ui/react/popover";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export interface FilterChipProps {
  /** The editor shown when the chip is pressed. */
  children?: ReactNode | undefined;
  /** What it filters by: "Brand". */
  field: string;
  icon?: LucideIcon | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  onRemove: () => void;
  open?: boolean | undefined;
  /** "is any of"; absent where the value says it all. */
  operator?: string | undefined;
  /** "5 brands"; absent while a new filter waits for one. */
  value?: ReactNode | undefined;
}

/**
 * One filter in force, read as a sentence: "Brand · is any of · 5 brands".
 * Pressing it opens `children`, the editor for its operator and value; the
 * cross removes it. A filter with nothing to edit (a toggle) has no `children`.
 */
export const FilterChip = ({
  children,
  field,
  icon: FieldIcon,
  onOpenChange,
  onRemove,
  open,
  operator,
  value,
}: FilterChipProps) => {
  const sentence = (
    <>
      <span className="patternmode-filter-chip__segment patternmode-filter-chip__field">
        {FieldIcon === undefined ? null : (
          <FieldIcon aria-hidden="true" className="patternmode-filters-icon" />
        )}
        {field}
      </span>
      {operator === undefined ? null : (
        <span className="patternmode-filter-chip__segment patternmode-filter-chip__operator">
          {operator}
        </span>
      )}
      {value === undefined ? null : (
        <span className="patternmode-filter-chip__segment patternmode-filter-chip__value">
          <span className="patternmode-filter-chip__value-text">{value}</span>
        </span>
      )}
    </>
  );

  return (
    <fieldset aria-label={`${field} filter`} className="patternmode-filter-chip">
      {children === undefined ? (
        <span className="patternmode-filter-chip__static">{sentence}</span>
      ) : (
        <Popover.Root onOpenChange={onOpenChange} open={open}>
          <Popover.Trigger className="patternmode-filter-chip__trigger">{sentence}</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner
              align="start"
              className="patternmode-filters-positioner"
              sideOffset={6}
            >
              <Popover.Popup className="patternmode-filters-popover patternmode-filter-chip__popup">
                {children}
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      )}
      <button
        aria-label={`Remove ${field} filter`}
        className="patternmode-filter-chip__remove"
        onClick={onRemove}
        type="button"
      >
        <X aria-hidden="true" className="patternmode-filters-icon-xs" />
      </button>
    </fieldset>
  );
};
