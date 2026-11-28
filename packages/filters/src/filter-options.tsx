"use client";

import { Check } from "lucide-react";

import {
  FilterCommand,
  FilterCommandEmpty,
  FilterCommandInput,
  FilterCommandItem,
  FilterCommandList,
} from "./command";
import type { FilterOption } from "./filter-rules";

export interface FilterOptionsProps {
  /** What the values are, for the search placeholder: "brands". */
  label: string;
  multiple: boolean;
  onChange: (values: readonly string[]) => void;
  options: readonly FilterOption[];
  selected: readonly string[];
}

/**
 * The values a filter can take, with a fuzzy search over them. With `multiple`,
 * each press ticks or unticks a value; without, a press chooses the one value.
 */
export const FilterOptions = ({
  label,
  multiple,
  onChange,
  options,
  selected,
}: FilterOptionsProps) => {
  const chosen = new Set(selected);

  return (
    <FilterCommand itemToStringValue={(option: FilterOption) => option.label} items={options}>
      <FilterCommandInput placeholder={`Search ${label}`} />
      <FilterCommandEmpty>No match</FilterCommandEmpty>
      <FilterCommandList aria-multiselectable={multiple}>
        {(option: FilterOption) => {
          const checked = chosen.has(option.value);

          return (
            <FilterCommandItem
              aria-selected={checked}
              key={option.value}
              onClick={() => {
                if (!multiple) {
                  onChange([option.value]);

                  return;
                }

                onChange(
                  checked
                    ? selected.filter((value) => value !== option.value)
                    : [...selected, option.value],
                );
              }}
              value={option}
            >
              <span
                aria-hidden="true"
                className="patternmode-filter-options__check"
                data-checked={checked ? "" : undefined}
                data-multiple={multiple ? "" : undefined}
              >
                {checked ? <Check className="patternmode-filters-icon-xs" /> : null}
              </span>
              {option.tone === undefined ? null : (
                <span
                  aria-hidden="true"
                  className="patternmode-filter-options__dot"
                  data-tone={option.tone}
                />
              )}
              <span className="patternmode-filter-command__label">{option.label}</span>
              {option.count === undefined ? null : (
                <span className="patternmode-filter-options__count">
                  {option.count.toLocaleString("en-US")}
                </span>
              )}
            </FilterCommandItem>
          );
        }}
      </FilterCommandList>
    </FilterCommand>
  );
};
