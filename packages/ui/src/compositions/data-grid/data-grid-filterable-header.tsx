"use client";

import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@patternmode/ui/components/dropdown-menu";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Tag } from "@patternmode/ui/components/tag";
import { cn } from "@patternmode/ui/utils/cn";
import type { Column } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronsUpDown,
  X,
} from "lucide-react";
import type { ReactNode } from "react";

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
  /** Show selected values as dismissible Tag pills above the filter list */
  showSelectedTags?: boolean;
}

/**
 * Unified column header for DataGrid columns.
 * Uses DropdownMenu for filter/sort interactions — same component used in
 * all dropdown menus across the design system. Zero duplication.
 *
 * - Sort-only columns render a button with sort toggle.
 * - Filter columns open a DropdownMenu with checkbox items and sort commands.
 */
export function DataGridFilterableHeader<TData, TValue>({
  column,
  children,
  options,
  showSelectedTags,
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

  const toggle = (value: string) => {
    const next = new Set(selectedValues);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    column.setFilterValue(next.size > 0 ? Array.from(next) : undefined);
  };

  // Sort icon for sort-only columns (no filter)
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

  // Chevron + active filter count for filterable columns
  const menuIndicator = canFilter ? (
    <span className="flex items-center gap-1">
      <ChevronDown
        className="size-3 text-muted-foreground transition-colors group-hover:text-foreground"
        strokeWidth={2}
      />
      {hasActiveFilter && <Badge size="xs">{selectedValues.size}</Badge>}
    </span>
  ) : null;

  const headerContent = (
    <span className="flex items-center gap-2">
      {children}
      {sortOnlyIndicator}
      {menuIndicator}
    </span>
  );

  // Sort-only — no dropdown, just a clickable button
  if (!canFilter) {
    return (
      <Button
        className={cn(
          "-ml-1 font-normal",
          canSort && "cursor-pointer",
          className,
        )}
        onClick={canSort ? column.getToggleSortingHandler() : undefined}
        size="xs"
        variant="ghost"
      >
        {headerContent}
      </Button>
    );
  }

  // Filterable — DropdownMenu with checkbox items
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("-ml-1 font-normal", className)}
          size="xs"
          variant="ghost"
        >
          {headerContent}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[220px]">
        {showSelectedTags && hasActiveFilter && (
          <>
            <div className="flex flex-wrap items-center gap-1.5 px-2 py-2">
              {options
                .filter((opt) => selectedValues.has(opt.value))
                .map((opt) => (
                  <Tag
                    key={opt.value}
                    onDismiss={() => toggle(opt.value)}
                    size="base"
                  >
                    {opt.label}
                  </Tag>
                ))}
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          <DropdownMenuLabel>Filter</DropdownMenuLabel>
          <ScrollArea className="max-h-[240px]">
            {options.map((option) => {
              const isSelected = selectedValues.has(option.value);
              const count = facets?.get(option.value) ?? 0;
              return (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={isSelected}
                  disabled={count === 0 && !isSelected}
                  onCheckedChange={() => toggle(option.value)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              );
            })}
          </ScrollArea>
          {hasActiveFilter && (
            <DropdownMenuItem
              icon={X}
              onClick={() => column.setFilterValue(undefined)}
            >
              Clear filter
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        {canSort && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Sort</DropdownMenuLabel>
              <DropdownMenuItem
                icon={ArrowUp}
                onClick={() =>
                  sorted === "asc"
                    ? column.clearSorting()
                    : column.toggleSorting(false)
                }
                suffix={sorted === "asc" ? "Active" : undefined}
              >
                Sort ascending
              </DropdownMenuItem>
              <DropdownMenuItem
                icon={ArrowDown}
                onClick={() =>
                  sorted === "desc"
                    ? column.clearSorting()
                    : column.toggleSorting(true)
                }
                suffix={sorted === "desc" ? "Active" : undefined}
              >
                Sort descending
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
