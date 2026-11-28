"use client";

import { Popover } from "@base-ui/react/popover";
import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";
import { useState } from "react";

import {
  FilterCommand,
  FilterCommandEmpty,
  FilterCommandInput,
  FilterCommandItem,
  FilterCommandList,
} from "./command";
import { ToolbarControl } from "./filter-toolbar";
import { usePageKey } from "./use-page-key";
import type { ShortcutScope } from "./use-page-key";

export interface FilterField {
  readonly id: string;
  readonly label: string;
  readonly icon?: LucideIcon | undefined;
  /** What kind of value it takes, shown at the right: "Choice", "Number". */
  readonly hint?: string | undefined;
}

export interface AddFilterProps {
  fields: readonly FilterField[];
  onPick: (id: string) => void;
  /** Optional container scope so multiple filter toolbars on one page do not collide. */
  scopeRef?: ShortcutScope;
  /** Enable the global `F` shortcut to open the picker. Defaults to true. */
  shortcut?: boolean;
}

/**
 * "Filter": opens the fields a list can filter by, with a search over them.
 * Choosing one hands it to `onPick`, which opens that field's chip. "F" opens
 * it from anywhere on the page.
 */
export const AddFilter = ({ fields, onPick, scopeRef, shortcut = true }: AddFilterProps) => {
  const [open, setOpen] = useState(false);

  usePageKey(
    "f",
    () => {
      setOpen(true);
    },
    shortcut && fields.length > 0,
    scopeRef,
  );

  if (fields.length === 0) {
    return null;
  }

  return (
    <Popover.Root onOpenChange={setOpen} open={open}>
      <Popover.Trigger render={<ToolbarControl />}>
        <Plus aria-hidden="true" className="patternmode-filters-icon" />
        Filter
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align="start" className="patternmode-filters-positioner" sideOffset={6}>
          <Popover.Popup className="patternmode-filters-popover patternmode-add-filter__popup">
            <FilterCommand itemToStringValue={(field: FilterField) => field.label} items={fields}>
              <FilterCommandInput placeholder="Filter by…" />
              <FilterCommandEmpty>No field</FilterCommandEmpty>
              <FilterCommandList>
                {(field: FilterField) => {
                  const FieldIcon = field.icon;

                  return (
                    <FilterCommandItem
                      key={field.id}
                      onClick={() => {
                        setOpen(false);
                        onPick(field.id);
                      }}
                      value={field}
                    >
                      {FieldIcon === undefined ? (
                        <span aria-hidden="true" className="patternmode-filters-icon-spacer" />
                      ) : (
                        <FieldIcon aria-hidden="true" className="patternmode-filters-icon" />
                      )}
                      <span className="patternmode-filter-command__label">{field.label}</span>
                      {field.hint === undefined ? null : (
                        <span className="patternmode-filter-command__hint">{field.hint}</span>
                      )}
                    </FilterCommandItem>
                  );
                }}
              </FilterCommandList>
              <div className="patternmode-add-filter__footer">
                <span className="patternmode-add-filter__legend">
                  <kbd className="patternmode-filters-kbd">↑↓</kbd> Move
                </span>
                <span className="patternmode-add-filter__legend">
                  <kbd className="patternmode-filters-kbd">↵</kbd> Choose
                </span>
                {shortcut ? (
                  <span className="patternmode-add-filter__legend">
                    <kbd className="patternmode-filters-kbd">F</kbd> Open
                  </span>
                ) : null}
              </div>
            </FilterCommand>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
