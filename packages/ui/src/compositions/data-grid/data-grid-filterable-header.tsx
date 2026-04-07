"use client";

import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import { Icon } from "@patternmode/ui/components/icon";
import { MenuItem } from "@patternmode/ui/components/menu-item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@patternmode/ui/components/popover";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { Tag } from "@patternmode/ui/components/tag";
import { cn } from "@patternmode/ui/utils/cn";
import type { Column } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronsUpDown,
  Search,
  X,
} from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";

export interface FilterOption {
  label: string;
  value: string;
}

interface DataGridFilterableHeaderProps<TData, TValue> {
  children: ReactNode;
  className?: string;
  column: Column<TData, TValue>;
  /** Filter options — enables the facets section */
  options?: FilterOption[];
  /** Control search: true = always, false = never, undefined = auto (> 5 options) */
  showSearch?: boolean;
  /** Show selected values as dismissible Tag pills above the filter list */
  showSelectedTags?: boolean;
}

/**
 * Unified column header for DataGrid columns.
 * Combines sorting, filtering, search, and tag pills in a single popover.
 *
 * - Sort-only columns render a plain button with sort toggle.
 * - Filter columns open a popover with optional search, facet checkboxes, and sort commands.
 * - Tag columns add dismissible pills above the facet list via `showSelectedTags`.
 */
export function DataGridFilterableHeader<TData, TValue>({
  column,
  children,
  options,
  showSelectedTags,
  showSearch,
  className,
}: DataGridFilterableHeaderProps<TData, TValue>) {
  const canSort = column.getCanSort();
  const canFilter = column.getCanFilter() && options && options.length > 0;
  const sorted = column.getIsSorted();
  const facets = column.getFacetedUniqueValues();
  const selectedValues = new Set(
    column.getFilterValue() as string[] | undefined,
  );
  const hasActiveFilter = selectedValues.size > 0;

  const searchVisible =
    showSearch === true ||
    (showSearch !== false && canFilter && options.length > 5);

  const toggle = (value: string) => {
    const next = new Set(selectedValues);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    column.setFilterValue(next.size > 0 ? Array.from(next) : undefined);
  };

  // Sort-only indicator (single arrow) — shown when NOT filterable
  const sortIconMap = { asc: ArrowUp, desc: ArrowDown } as const;
  const SortIcon =
    sortIconMap[sorted as keyof typeof sortIconMap] ?? ChevronsUpDown;
  const sortOnlyIndicator =
    canSort && !canFilter ? (
      <SortIcon
        className={cn(
          "size-3 transition-opacity",
          sorted ? "opacity-100" : "opacity-30 group-hover:opacity-50",
        )}
        strokeWidth={2}
      />
    ) : null;

  // Menu indicator (chevron + badge count) — shown when filterable
  const menuIndicator = canFilter ? (
    <span className="flex items-center gap-1">
      <ChevronDown
        className="size-3 text-muted-foreground transition-colors group-hover:text-foreground"
        strokeWidth={2}
      />
      {hasActiveFilter && (
        <Badge radius="full" size="xs">
          {selectedValues.size}
        </Badge>
      )}
    </span>
  ) : null;

  const headerContent = (
    <span className="flex items-center gap-2">
      {children}
      {sortOnlyIndicator}
      {menuIndicator}
    </span>
  );

  // No filter — render button (sortable or static)
  if (!canFilter) {
    return (
      <Button
        className={cn(
          "-ml-1 font-normal",
          canSort && "cursor-pointer",
          className,
        )}
        onClick={canSort ? column.getToggleSortingHandler() : undefined}
        radius="full"
        size="xs"
        variant="ghost"
      >
        {headerContent}
      </Button>
    );
  }

  // With filter dropdown
  return (
    <FilterDropdown
      canSort={canSort}
      className={className}
      facets={facets}
      hasActiveFilter={hasActiveFilter}
      headerContent={headerContent}
      onClearFilter={() => column.setFilterValue(undefined)}
      onClearSort={() => column.clearSorting()}
      onSort={(desc) => column.toggleSorting(desc)}
      onToggle={toggle}
      options={options}
      searchVisible={!!searchVisible}
      selectedValues={selectedValues}
      showSelectedTags={showSelectedTags}
      sorted={sorted}
    />
  );
}

/**
 * Inner dropdown extracted as its own component so `useState` for the
 * search query resets automatically when the popover unmounts.
 */
function FilterDropdown({
  canSort,
  className,
  hasActiveFilter,
  headerContent,
  options,
  searchVisible,
  selectedValues,
  showSelectedTags,
  sorted,
  onClearFilter,
  onClearSort,
  onSort,
  onToggle,
  facets,
}: {
  canSort: boolean;
  className?: string;
  hasActiveFilter: boolean;
  headerContent: ReactNode;
  options: FilterOption[];
  searchVisible: boolean;
  selectedValues: Set<string>;
  showSelectedTags?: boolean;
  sorted: false | "asc" | "desc";
  onClearFilter: () => void;
  onClearSort: () => void;
  onSort: (desc: boolean) => void;
  onToggle: (value: string) => void;
  facets: Map<string, number> | undefined;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) {
      return options;
    }
    const lower = query.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(lower));
  }, [options, query]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn("-ml-1 font-normal", className)}
          radius="full"
          size="xs"
          variant="ghost"
        >
          {headerContent}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[245px] rounded-3xl p-0 shadow-lg"
      >
        {searchVisible && (
          <div className="flex items-center gap-1.5 border-border border-b px-2.5 py-1.5">
            <Icon
              className="shrink-0 text-muted-foreground"
              icon={Search}
              size="xs"
            />
            <input
              className="h-7 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              value={query}
            />
          </div>
        )}

        {showSelectedTags && hasActiveFilter && (
          <div className="flex flex-wrap items-center gap-1.5 border-border border-b px-3 py-2.5">
            {options
              .filter((opt) => selectedValues.has(opt.value))
              .map((opt) => (
                <Tag
                  key={opt.value}
                  onDismiss={() => onToggle(opt.value)}
                  size="base"
                >
                  {opt.label}
                </Tag>
              ))}
          </div>
        )}

        <ScrollArea className="max-h-[300px]">
          <div className="p-1.5" role="listbox">
            {filtered.length === 0 && (
              <p className="py-4 text-center text-muted-foreground text-sm">
                No results.
              </p>
            )}
            {filtered.map((option) => {
              const isSelected = selectedValues.has(option.value);
              const count = facets?.get(option.value) ?? 0;
              const isDisabled = count === 0 && !isSelected;
              return (
                <MenuItem
                  aria-selected={isSelected}
                  disabled={isDisabled}
                  icon={isSelected ? Check : undefined}
                  iconClassName="text-foreground"
                  inset={!isSelected}
                  key={option.value}
                  onClick={() => onToggle(option.value)}
                  radius="full"
                  role="option"
                  size="sm"
                >
                  {option.label}
                </MenuItem>
              );
            })}
            {hasActiveFilter && !showSelectedTags && (
              <MenuItem
                icon={X}
                onClick={onClearFilter}
                radius="full"
                size="sm"
              >
                Clear filter
              </MenuItem>
            )}
          </div>
        </ScrollArea>

        {canSort && (
          <>
            <Separator />
            <div className="p-1.5">
              <MenuItem
                activeIndicator="check"
                icon={ArrowUp}
                isActive={sorted === "asc"}
                onClick={() =>
                  sorted === "asc" ? onClearSort() : onSort(false)
                }
                radius="full"
                size="sm"
              >
                Sort ascending
              </MenuItem>
              <MenuItem
                activeIndicator="check"
                icon={ArrowDown}
                isActive={sorted === "desc"}
                onClick={() =>
                  sorted === "desc" ? onClearSort() : onSort(true)
                }
                radius="full"
                size="sm"
              >
                Sort descending
              </MenuItem>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
