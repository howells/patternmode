"use client";

import { defaultConfig } from "@patternmode/config/default-config";
import { cx } from "@patternmode/utils/cx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCombobox } from "downshift";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { hasErrorInput } from "@patternmode/utils/has-error-input";
import { Icon } from "@patternmode/icon";
import { Input } from "@patternmode/input";
import { Loader } from "@patternmode/loader";
import type { ComboboxOption, ComboboxProps } from "./types";
import { comboboxItemVariants, comboboxListVariants, comboboxTriggerVariants, comboboxVariants } from "./variants";

function VirtualizedItemList<T extends ComboboxOption>({
  items,
  parentRef,
  getItemValue,
  getItemLabel,
  getItemIcon,
  getItemProps,
  renderItem,
  defaultRenderItem: _defaultRenderItem,
  highlightedIndex,
  selectedItem,
  size,
  iconStrokeWidth,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: {
  items: T[];
  parentRef: React.RefObject<HTMLDivElement>;
  getItemValue: (item: T) => string;
  getItemLabel: (item: T) => string;
  getItemIcon?: (item: T) => React.ReactNode;
  getItemProps: (options: { item: T; index: number }) => any;
  renderItem?: (item: T, index: number) => React.ReactNode;
  defaultRenderItem: (item: T, index: number) => React.ReactNode;
  highlightedIndex: number;
  selectedItem: T | null;
  size: "2xs" | "xs" | "sm" | "base" | "lg";
  iconStrokeWidth: number;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}) {
  const itemHeight = React.useMemo(() => {
    switch (size) {
      case "2xs":
        return 22;
      case "xs":
        return 24;
      case "sm":
        return 28;
      case "lg":
        return 40;
      default:
        return 34;
    }
  }, [size]);

  const virtualizer = useVirtualizer({ count: items.length, getScrollElement: () => parentRef.current, estimateSize: () => itemHeight, overscan: 5 });

  React.useEffect(() => {
    const virtualItems = virtualizer.getVirtualItems();
    if (virtualItems.length > 0 && virtualItems[virtualItems.length - 1].index >= items.length - 1 - 5 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [virtualizer, items.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }} data-testid="combobox-items">
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const item = items[virtualItem.index];
        const itemProps = getItemProps({ item, index: virtualItem.index });
        return (
          <div key={virtualItem.key} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: `${virtualItem.size}px`, transform: `translateY(${virtualItem.start}px)` }} data-testid={`combobox-item-${getItemValue(item)}`}>
            <div className={cx(comboboxItemVariants({ size }))} data-highlighted={highlightedIndex === virtualItem.index ? "true" : undefined} data-selected={selectedItem && getItemValue(selectedItem) === getItemValue(item) ? "true" : undefined} {...itemProps}>
              {renderItem ? (
                renderItem(item, virtualItem.index)
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-1">{getItemIcon?.(item)}<span className="truncate">{getItemLabel(item)}</span></div>
                  {selectedItem && getItemValue(selectedItem) === getItemValue(item) && (
                    <Icon icon={Check} size="sm" strokeWidth={iconStrokeWidth} className="text-current" />
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}

      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-2" data-testid="combobox-loading-more" style={{ position: "absolute", top: `${virtualizer.getTotalSize()}px`, left: 0, width: "100%" }}>
          <Loader size="sm" />
          <span className="ml-2 text-xs text-zinc-500">Loading more...</span>
        </div>
      )}
    </div>
  );
}

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
  iconStrokeWidth = defaultConfig.components.iconStrokeWidth,
  getItemValue = (item: T) => item.value,
  getItemLabel = (item: T) => item.label,
  getItemIcon,
  renderItem,
  selectOnFocus = true,
  clearSearchOnSelect = true,
}: ComboboxProps<T>) => {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => { setIsMounted(true); }, []);

  let queryResult: any;
  try {
    queryResult = useInfiniteQuery({
      queryKey: [...queryKey, debouncedSearch],
      queryFn: async ({ pageParam = 0, signal }) => {
        if (!fetchData) return { data: [], hasNextPage: false };
        return fetchData({ search: debouncedSearch, pageParam, signal });
      },
      enabled: !!fetchData && isMounted,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0,
    });
  } catch {
    queryResult = { data: undefined, isLoading: false, error: null, fetchNextPage: () => Promise.resolve(), isFetchingNextPage: false, hasNextPage: false };
  }

  const { data: infiniteData, isLoading, error, fetchNextPage, isFetchingNextPage, hasNextPage } = queryResult;

  const allItems: T[] = React.useMemo(() => {
    if (options) return options;
    if (!infiniteData?.pages) return [];
    return infiniteData.pages.flatMap((page: any) => page.data);
  }, [options, infiniteData?.pages]);

  const controlledSelectedItem = allItems.find((item) => getItemValue(item) === value) || null;
  const [internalSelectedItem, setInternalSelectedItem] = React.useState<T | null>(null);
  const selectedItem = (value !== undefined ? controlledSelectedItem : internalSelectedItem) as T | null;

  React.useEffect(() => {
    const timer = setTimeout(() => { setDebouncedSearch(inputValue); }, searchDebounce);
    return () => clearTimeout(timer);
  }, [inputValue, searchDebounce]);

  const items: T[] = React.useMemo(() => {
    if (fetchData) return allItems;
    if (!inputValue.trim()) return allItems;
    if (selectedItem && inputValue === getItemLabel(selectedItem)) return allItems;
    return allItems.filter((item) => getItemLabel(item).toLowerCase().includes(inputValue.toLowerCase()));
  }, [allItems, inputValue, getItemLabel, selectedItem, fetchData]);

  const { isOpen, getToggleButtonProps, getMenuProps, getInputProps, getItemProps, highlightedIndex } = useCombobox<T>({
    items,
    itemToString: () => "",
    selectedItem: selectedItem || null,
    inputValue,
    stateReducer: (state, actionAndChanges) => {
      const { type, changes } = actionAndChanges as any;
      switch (type) {
        case useCombobox.stateChangeTypes.ItemClick:
          return { ...changes, inputValue: clearSearchOnSelect ? "" : state.inputValue, isOpen: false };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
          if (state.highlightedIndex === -1 && items.length > 0) {
            return { ...changes, selectedItem: items[0], inputValue: clearSearchOnSelect ? "" : state.inputValue, isOpen: false };
          }
          return { ...changes, inputValue: clearSearchOnSelect ? "" : state.inputValue, isOpen: false };
        case useCombobox.stateChangeTypes.InputKeyDownEscape:
          return { ...changes, inputValue: "", isOpen: false };
        default:
          return changes;
      }
    },
    onInputValueChange: ({ inputValue: newInputValue, type }) => {
      if (
        type === useCombobox.stateChangeTypes.InputChange ||
        type === useCombobox.stateChangeTypes.InputKeyDownArrowDown ||
        type === useCombobox.stateChangeTypes.InputKeyDownArrowUp ||
        !type
      ) {
        setInputValue(newInputValue || "");
      }
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      // Update internal state for uncontrolled usage
      setInternalSelectedItem((newSelectedItem as T) || null);
      if (newSelectedItem) onValueChange?.(getItemValue(newSelectedItem));
      else onValueChange?.(undefined);
    },
  });

  React.useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);

  const defaultRenderItem = (item: T, index: number) => (
    <div key={getItemValue(item)} className={cx(comboboxItemVariants({ size }))} data-highlighted={highlightedIndex === index ? "true" : undefined} data-selected={selectedItem && getItemValue(selectedItem) === getItemValue(item) ? "true" : undefined} {...getItemProps({ item, index })}>
      <div className="flex items-center gap-2 flex-1">{getItemIcon?.(item)}<span className="truncate">{getItemLabel(item)}</span></div>
      {selectedItem && getItemValue(selectedItem) === getItemValue(item) && (
        <Icon icon={Check} size="sm" strokeWidth={iconStrokeWidth} className="text-current" />
      )}
    </div>
  );

  const inputProps = getInputProps({ placeholder: searchPlaceholder, disabled }, { suppressRefError: true });

  return (
    <div className={cx(comboboxVariants({ size }), className)} data-testid="combobox">
      <button type="button" disabled={disabled} className={cx(comboboxTriggerVariants({ size }), hasError && hasErrorInput)} data-testid="combobox-trigger" {...getToggleButtonProps()}>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {selectedItem ? (<><>{getItemIcon?.(selectedItem)}</><span className="truncate">{getItemLabel(selectedItem)}</span></>) : (
            <span className="text-zinc-500 dark:text-zinc-500">{placeholder}</span>
          )}
        </div>
        <span className="text-zinc-400 dark:text-zinc-500">
          <Icon icon={ChevronsUpDown} size={size === "2xs" ? "xs" : size} strokeWidth={defaultConfig.components.iconStrokeWidth} />
        </span>
      </button>

      <div className={cx(comboboxListVariants({ size }), !isOpen && "hidden")} data-testid="combobox-dropdown" {...getMenuProps()}>
        <div className={cx("border-b  dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-t-md", size === "xs" && "p-1", size === "sm" && "p-1.5", size === "base" && "p-2", size === "lg" && "p-2.5") }>
          <Input {...inputProps} ref={inputRef} type="search" size={size} autoFocus prefixStyling={false} data-testid="combobox-search" />
        </div>
        <div className="h-60 overflow-auto" ref={scrollRef} data-testid="combobox-options">
          {!isMounted ? (
            <div className="flex items-center justify-center py-4" data-testid="combobox-loading">
              <Loader size={size === "2xs" ? "xs" : "sm"} />
              <span className="ml-2 text-sm text-zinc-500">Loading...</span>
            </div>
          ) : (
            <>
              {isLoading && (
                <div className="flex items-center justify-center py-4" data-testid="combobox-loading">
                  <Loader size={size === "2xs" ? "xs" : "sm"} />
                  <span className="ml-2 text-sm text-zinc-500">Loading...</span>
                </div>
              )}
              {error && !isLoading && (
                <div className="flex items-center justify-center py-4 text-red-500" data-testid="combobox-error">
                  <span className="text-sm">Failed to load options</span>
                </div>
              )}
              {!isLoading && !error && items.length > 0 && (
                <VirtualizedItemList
                  items={items}
                  parentRef={scrollRef}
                  getItemValue={getItemValue}
                  getItemLabel={getItemLabel}
                  getItemIcon={getItemIcon}
                  getItemProps={getItemProps}
                  renderItem={renderItem}
                  defaultRenderItem={defaultRenderItem}
                  highlightedIndex={highlightedIndex}
                  selectedItem={selectedItem}
                  size={size}
                  iconStrokeWidth={iconStrokeWidth}
                  isFetchingNextPage={isFetchingNextPage}
                  hasNextPage={hasNextPage}
                  fetchNextPage={fetchNextPage}
                />
              )}
              {!isLoading && !error && items.length === 0 && (
                <div className="flex items-center justify-center py-4 text-zinc-500" data-testid="combobox-empty">
                  <span className="text-sm">{emptyMessage}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Combobox.displayName = "Combobox";

export { Combobox };
