"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@patternmode/button";
import { Checkbox } from "@patternmode/checkbox";
import { Input } from "@patternmode/input";
import { Popover, PopoverContent, PopoverTrigger } from "@patternmode/popover";
import { Stack } from "@patternmode/stack";
import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import React from "react";

export type FacetedOption = { value: string; label: string };

export type DataTableFacetedFilterProps<TData> = {
  table: Table<TData> | null;
  columnId: string;
  options: readonly FacetedOption[];
  placeholder?: string;
  className?: string;
};

export function DataTableFacetedFilter<TData>({
  table,
  columnId,
  options,
  placeholder = "Filter",
  className,
}: DataTableFacetedFilterProps<TData>) {
  const [query, setQuery] = React.useState("");
  const filtered = React.useMemo(() => {
    const q = query.toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  const selected: string[] = React.useMemo(() => {
    if (!table) return [];
    const v = table.getColumn(columnId)?.getFilterValue();
    return Array.isArray(v) ? (v as string[]) : [];
  }, [table, columnId]);

  const setSelected = (next: string[]) => {
    table?.getColumn(columnId)?.setFilterValue(next);
  };

  const toggle = (val: string) => {
    const s = new Set(selected);
    if (s.has(val)) s.delete(val);
    else s.add(val);
    setSelected(Array.from(s));
  };

  const triggerLabel = selected.length ? `${placeholder}: ${selected.length}` : `+ ${placeholder}`;

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>{triggerLabel}</PopoverTrigger>
      <PopoverContent className={cx("w-64", className)} sideOffset={8}>
        <Stack gap={2} className="p-2">
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="max-h-60 overflow-auto pr-1">
            {filtered.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900"
                onClick={(e) => {
                  e.preventDefault();
                  toggle(opt.value);
                }}
              >
                <Checkbox checked={selected.includes(opt.value)} onCheckedChange={() => toggle(opt.value)} />
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <Text size="sm" className="py-6 text-center text-zinc-500">
                No results
              </Text>
            )}
          </div>
        </Stack>
      </PopoverContent>
    </Popover>
  );
}
