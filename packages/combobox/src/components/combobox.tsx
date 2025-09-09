"use client";

import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Loader } from "@patternmode/loader";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { ComboboxOption, ComboboxProps } from "../types";
import { comboboxVariants } from "../variants";
import { ComboboxIcon } from "./combobox-icon";
import { ComboboxInput } from "./combobox-input";
import { ComboboxItem } from "./combobox-item";
import { ComboboxItemIndicator } from "./combobox-item-indicator";
import { ComboboxList } from "./combobox-list";
import { ComboboxPopup } from "./combobox-popup";
import { ComboboxPortal } from "./combobox-portal";
import { ComboboxPositioner } from "./combobox-positioner";
import { ComboboxRoot } from "./combobox-root";
import { ComboboxTrigger } from "./combobox-trigger";
import { ComboboxValue } from "./combobox-value";

// Individual Base UI Component Exports with patternmode styling

// Compound Combobox Component (existing implementation)
const Combobox = <T extends ComboboxOption = ComboboxOption>({
  options,
  fetchData,
  value,
  onValueChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  className,
  size = "base",
  searchDebounce = 300,
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  getItemValue = (item: T) => item.value,
  getItemLabel = (item: T) => item.label,
  getItemIcon,
  renderItem,
  clearSearchOnSelect = true,
  multiple = false,
  onValuesChange,
}: ComboboxProps<T>) => {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  // Async state (used when fetchData is provided)
  const [asyncItems, setAsyncItems] = React.useState<T[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [nextCursor, setNextCursor] = React.useState<number | undefined>(
    undefined
  );
  const [error, setError] = React.useState<unknown>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Static items (when options provided)
  const allItems: T[] = React.useMemo(() => options ?? [], [options]);

  // Kick off async fetch on open and when the debounced input changes
  React.useEffect(() => {
    if (!(fetchData && isOpen)) return;
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);
    fetchData({
      search: debouncedSearch,
      pageParam: 0,
      signal: controller.signal,
    })
      .then((res) => {
        setAsyncItems(res.data as T[]);
        setHasNextPage(!!res.hasNextPage);
        setNextCursor(res.nextCursor);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err);
        setAsyncItems([]);
        setHasNextPage(false);
        setNextCursor(undefined);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, [fetchData, debouncedSearch, isOpen]);

  const fetchNextPage = React.useCallback(() => {
    if (!(fetchData && hasNextPage) || isFetchingNextPage) return;
    setIsFetchingNextPage(true);
    fetchData({ search: debouncedSearch, pageParam: nextCursor })
      .then((res) => {
        setAsyncItems((prev) => prev.concat(res.data as T[]));
        setHasNextPage(!!res.hasNextPage);
        setNextCursor(res.nextCursor);
      })
      .finally(() => setIsFetchingNextPage(false));
  }, [fetchData, hasNextPage, isFetchingNextPage, debouncedSearch, nextCursor]);

  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(inputValue), searchDebounce);
    return () => clearTimeout(t);
  }, [inputValue, searchDebounce]);

  const items: T[] = React.useMemo(() => {
    if (fetchData) return asyncItems;
    if (!inputValue.trim()) return allItems;
    return allItems.filter((item) =>
      getItemLabel(item).toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [asyncItems, allItems, inputValue, getItemLabel, fetchData]);

  // Map for quick value->item lookup used by Base UI callbacks.
  const valueToItem = React.useMemo(() => {
    const m = new Map<string, T>();
    for (const it of items) m.set(getItemValue(it), it);
    return m;
  }, [items, getItemValue]);

  return (
    <div
      className={cx(comboboxVariants({ size }), className)}
      data-testid="combobox"
    >
      <ComboboxRoot
        // Provide values to Base UI. We manage filtering externally via `items` and `filter`.
        disabled={disabled}
        filter={(val: unknown, input: string) => {
          const it = valueToItem.get(String(val));
          if (!it) return false;
          return getItemLabel(it).toLowerCase().includes(input.toLowerCase());
        }}
        items={items.map((it) => getItemValue(it))}
        multiple={multiple}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (open) setTimeout(() => inputRef.current?.focus(), 0);
          else if (clearSearchOnSelect) setInputValue("");
        }}
        onValueChange={(next) => {
          if (multiple) {
            const newVals = Array.isArray(next)
              ? (next as string[])
              : [String(next)];
            onValuesChange?.(newVals);
          } else {
            const newVal = next as unknown as string;
            onValueChange?.(newVal);
          }
          if (clearSearchOnSelect) setInputValue("");
        }}
        value={value}
      >
        <ComboboxTrigger size={size}>
          <ComboboxValue>
            {(selected) => {
              const it = selected
                ? valueToItem.get(String(selected))
                : undefined;
              if (!it)
                return (
                  <span className="truncate text-zinc-500 dark:text-zinc-500">
                    {placeholder}
                  </span>
                );
              return (
                <div className="flex min-w-0 items-center gap-2">
                  {getItemIcon?.(it)}
                  <span className="truncate">{getItemLabel(it)}</span>
                </div>
              );
            }}
          </ComboboxValue>
          <ComboboxIcon iconStrokeWidth={iconStrokeWidth} />
        </ComboboxTrigger>

        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup size={size}>
              <div className="border-zinc-200 border-b p-3 dark:border-zinc-800">
                <ComboboxInput
                  onChange={(e) =>
                    setInputValue((e.target as HTMLInputElement).value)
                  }
                  placeholder={searchPlaceholder || placeholder}
                  value={inputValue}
                />
              </div>

              <div
                className="max-h-[calc(24rem-4rem)] overflow-y-auto p-1"
                data-testid="combobox-options"
                onScroll={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
                    fetchNextPage();
                  }
                }}
                ref={scrollRef}
              >
                {isMounted ? (
                  <>
                    {isLoading && (
                      <div
                        className="flex items-center justify-center py-4"
                        data-testid="combobox-loading"
                      >
                        <Loader size={size === "2xs" ? "xs" : "sm"} />
                        <span className="ml-2 text-sm text-zinc-500">
                          Loading...
                        </span>
                      </div>
                    )}
                    {error && !isLoading && (
                      <div
                        className="flex items-center justify-center py-4 text-red-500"
                        data-testid="combobox-error"
                      >
                        <span className="text-sm">Failed to load options</span>
                      </div>
                    )}
                    {!(isLoading || error) && items.length > 0 && (
                      <>
                        <ComboboxList>
                          {(val: string, index: number) => {
                            const item = valueToItem.get(val) as T | undefined;
                            if (!item) return null;

                            if (renderItem) {
                              return renderItem(item, index);
                            }

                            return (
                              <ComboboxItem
                                index={index}
                                key={val}
                                size={size}
                                value={val}
                              >
                                <div className="flex min-w-0 items-center gap-2">
                                  {getItemIcon?.(item)}
                                  <span className="truncate">
                                    {getItemLabel(item)}
                                  </span>
                                </div>
                                <ComboboxItemIndicator />
                              </ComboboxItem>
                            );
                          }}
                        </ComboboxList>
                        {isFetchingNextPage && (
                          <div
                            className="flex items-center justify-center py-2"
                            data-testid="combobox-loading-more"
                          >
                            <Loader size={size === "2xs" ? "xs" : "sm"} />
                            <span className="ml-2 text-xs text-zinc-500">
                              Loading more...
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    {!(isLoading || error) && items.length === 0 && (
                      <div
                        className="flex items-center justify-center py-4 text-zinc-500"
                        data-testid="combobox-empty"
                      >
                        <span className="text-sm">{emptyMessage}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className="flex items-center justify-center py-4"
                    data-testid="combobox-loading"
                  >
                    <Loader size={size === "2xs" ? "xs" : "sm"} />
                    <span className="ml-2 text-sm text-zinc-500">
                      Loading...
                    </span>
                  </div>
                )}
              </div>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>
    </div>
  );
};

Combobox.displayName = "Combobox";

export { Combobox };
