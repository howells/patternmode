"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Input } from "@patternmode/input";
import { Loader } from "@patternmode/loader";
import { cx } from "@patternmode/utils/cx";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import type { ComboboxOption, ComboboxProps } from "./types";
import {
  comboboxItemVariants,
  comboboxListVariants,
  comboboxTriggerVariants,
  comboboxVariants,
} from "./variants";

const Combobox = <T extends ComboboxOption = ComboboxOption>({
  options,
  fetchData,
  queryKey = ["combobox"],
  value,
  onValueChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  hasError = false,
  className,
  size = "base",
  searchDebounce = 300,
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  getItemValue = (item: T) => item.value,
  getItemLabel = (item: T) => item.label,
  getItemIcon,
  renderItem,
  selectOnFocus: _selectOnFocus = true,
  clearSearchOnSelect = true,
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
      <BaseCombobox.Root
        // Provide values to Base UI. We manage filtering externally via `items` and `filter`.
        filter={(val: unknown, input: string) => {
          const it = valueToItem.get(String(val));
          if (!it) return false;
          return getItemLabel(it).toLowerCase().includes(input.toLowerCase());
        }}
        items={items.map((it) => getItemValue(it))}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (open) setTimeout(() => inputRef.current?.focus(), 0);
          else if (clearSearchOnSelect) setInputValue("");
        }}
        onValueChange={(next) => {
          const newVal = next as unknown as string;
          onValueChange?.(newVal);
          if (clearSearchOnSelect) setInputValue("");
        }}
        value={value}
      >
        <BaseCombobox.Trigger
          className={cx(
            comboboxTriggerVariants({ size }),
            "flex h-10 min-w-[12rem] items-center justify-between gap-3 bg-[canvas] pr-3 pl-3.5",
            "hover:bg-zinc-100 data-[popup-open]:bg-zinc-100"
          )}
          data-testid="combobox-trigger"
        >
          <BaseCombobox.Value>
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
          </BaseCombobox.Value>
          <BaseCombobox.Icon className="flex">
            <ChevronsUpDown className="size-4" />
          </BaseCombobox.Icon>
        </BaseCombobox.Trigger>

        <BaseCombobox.Portal>
          <BaseCombobox.Positioner>
            <BaseCombobox.Popup
              className={cx(
                comboboxListVariants({ size }),
                "max-h-[min(24rem,var(--available-height))] max-w-[var(--available-width)] origin-[var(--transform-origin)] [--input-container-height:3rem]",
                "rounded-lg bg-[canvas] text-zinc-900 shadow-lg shadow-zinc-200 outline-1 outline-zinc-200",
                "transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
                "dark:-outline-offset-1 dark:shadow-none dark:outline-zinc-300"
              )}
              data-testid="combobox-dropdown"
            >
              <div className="h-[var(--input-container-height)] w-80 p-2">
                <BaseCombobox.Input
                  onChange={(e) =>
                    setInputValue((e.target as HTMLInputElement).value)
                  }
                  placeholder={searchPlaceholder || placeholder}
                  render={({ className, ref, ...renderProps }) => (
                    <Input
                      className={cx(
                        "h-10 w-full rounded-md border border-zinc-200 pl-3.5 text-base",
                        "focus:-outline-offset-1 focus:outline focus:outline-2 focus:outline-blue-800",
                        className
                      )}
                      externalRef={
                        ref as unknown as React.RefObject<HTMLInputElement>
                      }
                      size={size}
                      {...renderProps}
                    />
                  )}
                  value={inputValue}
                />
              </div>

              <div
                className="max-h-[min(calc(24rem-var(--input-container-height)),calc(var(--available-height)-var(--input-container-height)))] scroll-py-2 overflow-y-auto overscroll-contain py-2 empty:p-0"
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
                        <BaseCombobox.List>
                          {(val: string, index: number) => {
                            const item = valueToItem.get(val) as T | undefined;
                            if (!item) return null;
                            return (
                              <BaseCombobox.Item
                                className={cx(
                                  "grid cursor-default select-none grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 outline-none",
                                  "data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-zinc-50",
                                  "data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-2 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-zinc-900"
                                )}
                                index={index}
                                key={val}
                                value={val}
                              >
                                <BaseCombobox.ItemIndicator className="col-start-1">
                                  {/* small checkmark */}
                                  <svg
                                    aria-hidden="true"
                                    className="size-3"
                                    fill="currentColor"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    width="10"
                                  >
                                    <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
                                  </svg>
                                </BaseCombobox.ItemIndicator>
                                <div className="col-start-2 flex min-w-0 items-center gap-2">
                                  {getItemIcon?.(item)}
                                  <span className="truncate">
                                    {getItemLabel(item)}
                                  </span>
                                </div>
                              </BaseCombobox.Item>
                            );
                          }}
                        </BaseCombobox.List>
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
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    </div>
  );
};

Combobox.displayName = "Combobox";

export { Combobox };
