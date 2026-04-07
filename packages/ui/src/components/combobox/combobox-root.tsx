"use client";

import { Button } from "@patternmode/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@patternmode/ui/components/command";
import { Icon } from "@patternmode/ui/components/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@patternmode/ui/components/popover";
import { cn } from "@patternmode/ui/utils/cn";
import { useVirtualizer } from "@tanstack/react-virtual";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import type * as React from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
/** An option in the Combobox dropdown list. */
export interface ComboboxItem {
  /** Display text shown in the dropdown and trigger. */
  label: string;
  /** Unique value for this option. */
  value: string;
}

export interface ComboboxVirtualizationOptions {
  /** Enable virtualization for large lists. */
  enabled?: boolean;
  /** Estimated row height in pixels. */
  estimateSizePx?: number;
  /** Max height of the list in pixels. */
  maxHeightPx?: number;
  /** Number of extra rows to render above/below. */
  overscan?: number;
}

export interface ComboboxProps {
  /** Button class name */
  buttonClassName?: string;
  /** Content to display */
  contentClassName?: string;
  /** Test id for the trigger button */
  "data-testid"?: string;
  /** Whether disabled */
  disabled?: boolean;
  /** List of items */
  items: ComboboxItem[];
  /** Value change handler */
  onValueChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Virtualization settings for large item sets. */
  virtualization?: ComboboxVirtualizationOptions;
}

/**
 * Searchable dropdown select with keyboard navigation and optional virtualization.
 * Combines a trigger button with a filterable command list in a popover.
 *
 * @example
 * ```tsx
 * <Combobox
 *   items={[{ label: "React", value: "react" }, { label: "Vue", value: "vue" }]}
 *   value={framework}
 *   onValueChange={setFramework}
 *   placeholder="Select framework..."
 * />
 * ```
 */
export function Combobox({
  items,
  value,
  onValueChange,
  placeholder = "Select…",
  buttonClassName,
  contentClassName,
  disabled,
  virtualization,
  "data-testid": dataTestId,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState<string>(value ?? "");
  const listboxId = useId();

  // keep controlled in sync
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const selected = items.find((i) => i.value === internalValue);
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return items;
    }

    const results: ComboboxItem[] = [];
    for (const item of items) {
      const label = item.label.toLowerCase();
      const val = item.value.toLowerCase();
      if (label.includes(q) || val.includes(q)) {
        results.push(item);
      }
    }
    return results;
  }, [items, query]);

  const shouldVirtualize = Boolean(virtualization?.enabled);
  const listRef = useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: shouldVirtualize ? filteredItems.length : 0,
    getScrollElement: () => listRef.current,
    estimateSize: () => virtualization?.estimateSizePx ?? 36,
    overscan: virtualization?.overscan ?? 8,
    enabled: shouldVirtualize,
  });
  const listStyle: React.CSSProperties | undefined = shouldVirtualize
    ? {
        maxHeight: virtualization?.maxHeightPx ?? 300,
        overflowY: "auto",
      }
    : undefined;

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          appearance="outline"
          aria-controls={listboxId}
          aria-expanded={open}
          className={cn("w-full justify-between font-normal", buttonClassName)}
          data-component="combobox"
          data-testid={dataTestId}
          disabled={disabled}
          pressed={false}
          role="combobox"
          suffixIcon={ChevronsUpDownIcon}
          suffixIconClassName="opacity-50"
          variant="secondary"
        >
          {selected?.label ?? placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "w-[var(--radix-popover-trigger-width)] min-w-[8rem] p-0",
          contentClassName,
        )}
      >
        <Command shouldFilter={false}>
          <CommandInput
            className="h-9"
            onValueChange={setQuery}
            placeholder={"Search…"}
            value={query}
          />
          <CommandList id={listboxId} ref={listRef} style={listStyle}>
            <CommandEmpty>No results found.</CommandEmpty>

            {shouldVirtualize ? (
              <div
                className="relative w-full"
                style={{ height: rowVirtualizer.getTotalSize() }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const item = filteredItems[virtualRow.index];
                  if (!item) {
                    return null;
                  }

                  return (
                    <div
                      className="absolute left-0 w-full"
                      key={item.value}
                      style={{
                        height: virtualRow.size,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <CommandItem
                        onSelect={() => {
                          // Use item.value directly - cmdk lowercases currentValue
                          // which breaks UUID matching
                          const next =
                            item.value === internalValue ? "" : item.value;
                          onValueChange?.(next);
                          setInternalValue(next);
                          setOpen(false);
                          setQuery("");
                        }}
                        value={item.value}
                      >
                        {item.label}
                        <Icon
                          className={cn(
                            "ml-auto",
                            internalValue === item.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                          icon={CheckIcon}
                        />
                      </CommandItem>
                    </div>
                  );
                })}
              </div>
            ) : (
              filteredItems.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    // Use item.value directly - cmdk lowercases currentValue
                    // which breaks UUID matching
                    const next = item.value === internalValue ? "" : item.value;
                    onValueChange?.(next);
                    setInternalValue(next);
                    setOpen(false);
                    setQuery("");
                  }}
                  value={item.value}
                >
                  {item.label}
                  <Icon
                    className={cn(
                      "ml-auto",
                      internalValue === item.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                    icon={CheckIcon}
                  />
                </CommandItem>
              ))
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
