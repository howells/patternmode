"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useCombobox } from "downshift";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import { config } from "../../lib/config";
import { cx, hasErrorInput } from "../../lib/utils";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import { Input } from "../input/input";
import { Loader } from "../loader/loader";
import { ScrollArea } from "../scroll-area/scroll-area";

/**
 * Base interface for combobox options.
 */
export interface ComboboxOption {
  id: string;
  label: string;
  value: string;
  [key: string]: unknown;
}

/**
 * Function signature for fetching data with search and pagination.
 */
export type ComboboxFetchFunction<T = ComboboxOption> = (params: {
  search?: string;
  pageParam?: number;
  signal?: AbortSignal;
}) => Promise<{
  data: T[];
  hasNextPage: boolean;
  nextCursor?: number;
}>;

const comboboxVariants = tv({
  base: ["relative w-full"],
  variants: {
    size: {
      sm: "",
      base: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

const comboboxListVariants = tv({
  base: [
    // base
    "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg dark:bg-zinc-950",
    // border
    "border-zinc-200 dark:border-zinc-800",
    // scrollbar
    "scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 dark:scrollbar-track-zinc-800 dark:scrollbar-thumb-zinc-600",
  ],
  variants: {
    size: {
      sm: "text-xs",
      base: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

const comboboxItemVariants = tv({
  base: [
    // base
    "relative flex cursor-pointer select-none items-center justify-between py-2 px-3 outline-none transition-colors",
    // hover
    "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
    // highlighted
    "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800",
    // selected
    "data-[selected]:bg-blue-50 data-[selected]:text-blue-900 dark:data-[selected]:bg-blue-900/20 dark:data-[selected]:text-blue-100",
  ],
  variants: {
    size: {
      sm: "text-xs py-1.5 px-2.5",
      base: "text-sm py-2 px-3",
      lg: "text-base py-2.5 px-4",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

/**
 * Props for the Combobox component.
 */
interface ComboboxProps<T extends ComboboxOption = ComboboxOption>
  extends VariantProps<typeof comboboxVariants> {
  /**
   * Static options array (alternative to fetchData).
   */
  options?: T[];
  /**
   * Function to fetch data dynamically with React Query.
   */
  fetchData?: ComboboxFetchFunction<T>;
  /**
   * React Query key for caching.
   */
  queryKey?: (string | number)[];
  /**
   * Current selected value.
   */
  value?: string;
  /**
   * Callback when selection changes.
   */
  onValueChange?: (value: string | undefined) => void;
  /**
   * Placeholder text for the input.
   */
  placeholder?: string;
  /**
   * Placeholder text for search input.
   */
  searchPlaceholder?: string;
  /**
   * Message to show when no items found.
   */
  emptyMessage?: string;
  /**
   * Whether the combobox is disabled.
   */
  disabled?: boolean;
  /**
   * Whether to show error state.
   */
  hasError?: boolean;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Search debounce delay in ms.
   */
  searchDebounce?: number;
  /**
   * Stroke width for icons.
   */
  iconStrokeWidth?: number;
  /**
   * Function to get the value from an item.
   */
  getItemValue?: (item: T) => string;
  /**
   * Function to get the label from an item.
   */
  getItemLabel?: (item: T) => string;
  /**
   * Function to get an icon component for an item.
   */
  getItemIcon?: (item: T) => React.ReactNode;
  /**
   * Custom render function for items.
   */
  renderItem?: (item: T, index: number) => React.ReactNode;

  /**
   * Whether to select all text in the input when the menu opens.
   */
  selectOnFocus?: boolean;
  /**
   * Whether to clear the search when an item is selected.
   */
  clearSearchOnSelect?: boolean;
}

/**
 * A flexible combobox component built with Downshift and React Query.
 *
 * Supports both static options and dynamic data fetching with search,
 * pagination, and caching via React Query.
 *
 * @id combobox
 * @name Combobox
 * @component
 * @example
 * ```tsx
 * // Static options
 * <Combobox
 *   options={[{id: "1", label: "Option 1", value: "1"}]}
 *   value={value}
 *   onValueChange={setValue}
 * />
 *
 * // Dynamic data with React Query
 * <Combobox
 *   fetchData={async ({search}) => ({
 *     data: await searchItems(search),
 *     hasNextPage: false
 *   })}
 *   queryKey={["items"]}
 *   value={value}
 *   onValueChange={setValue}
 * />
 *
 * // Keep search text after selection and select it on reopen
 * <Combobox
 *   options={options}
 *   value={value}
 *   onValueChange={setValue}
 *   clearSearchOnSelect={false}
 *   selectOnFocus={true}
 * />
 *
 * // Clear search on selection, empty input on reopen
 * <Combobox
 *   options={options}
 *   value={value}
 *   onValueChange={setValue}
 *   clearSearchOnSelect={true}
 *   selectOnFocus={false}
 * />
 * ```
 */
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
    iconStrokeWidth = config.getIconStrokeWidth(),
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

    // Fetch data with React Query infinite query (only if fetchData is provided)
    const {
      data: infiniteData,
      isLoading,
      error,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
    } = useInfiniteQuery({
      queryKey: [...queryKey, debouncedSearch],
      queryFn: async ({ pageParam = 0, signal }) => {
        if (!fetchData) { return { data: [], hasNextPage: false }; }
        return fetchData({
          search: debouncedSearch,
          pageParam,
          signal,
        });
      },
      enabled: !!fetchData,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false, // Prevent refetch on window focus
      getNextPageParam: lastPage => lastPage.nextCursor,
      initialPageParam: 0,
    });

    // Use either static options or fetched data (flattened from infinite query pages)
    const allItems: T[] = React.useMemo(() => {
      if (options) { return options; }
      if (!infiniteData?.pages) { return []; }

      // Flatten all pages into a single array
      return infiniteData.pages.flatMap(page => page.data);
    }, [options, infiniteData?.pages]);

    // Find selected item first (needed for filtering logic and debounce logic)
    const selectedItem = allItems.find(item => getItemValue(item) === value);

    // Debounce search input
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(inputValue);
      }, searchDebounce);

      return () => clearTimeout(timer);
    }, [inputValue, searchDebounce]);

    // Filter static options based on search input
    const items: T[] = React.useMemo(() => {
    // For async data (fetchData), always return all items from the API
    // No client-side filtering needed - the API handles filtering
      if (fetchData) {
        return allItems;
      }

      // For static options only, do client-side filtering
      if (!inputValue.trim()) {
        return allItems;
      }

      // If the input value exactly matches the selected item's label,
      // show all items (user just opened the menu)
      // Only apply this logic for static data
      if (selectedItem && inputValue === getItemLabel(selectedItem)) {
        return allItems;
      }

      // Filter static options by label
      return allItems.filter(item =>
        getItemLabel(item).toLowerCase().includes(inputValue.toLowerCase()),
      );
    }, [allItems, inputValue, getItemLabel, selectedItem, fetchData]);

    const {
      isOpen,
      getToggleButtonProps,
      getMenuProps,
      getInputProps,
      getItemProps,
      highlightedIndex,
      openMenu,
    } = useCombobox<T>({
      items,
      itemToString: () => "", // Always return empty to prevent auto-filling input
      selectedItem: selectedItem || null,
      inputValue,
      stateReducer: (state, actionAndChanges) => {
        const { type, changes } = actionAndChanges;

        switch (type) {
          case useCombobox.stateChangeTypes.ItemClick:
            return {
              ...changes,
              inputValue: clearSearchOnSelect ? "" : state.inputValue, // Conditionally clear search input
              isOpen: false, // Close the menu
            };
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          // If Enter is pressed and no item is highlighted but there are items,
          // select the first item
            if (state.highlightedIndex === -1 && items.length > 0) {
              return {
                ...changes,
                selectedItem: items[0],
                inputValue: clearSearchOnSelect ? "" : state.inputValue,
                isOpen: false,
              };
            }
            // If an item is highlighted, let Downshift handle it normally
            // but conditionally clear the input after selection
            return {
              ...changes,
              inputValue: clearSearchOnSelect ? "" : state.inputValue,
              isOpen: false, // Close the menu
            };
          case useCombobox.stateChangeTypes.InputKeyDownEscape:
            return {
              ...changes,
              inputValue: "", // Always clear input when escaping
              isOpen: false, // Close the menu
            };
          default:
            return changes;
        }
      },
      onInputValueChange: ({ inputValue: newInputValue, type }) => {
      // Only update input value if it's from user typing, not from internal state changes
        if (
          type === useCombobox.stateChangeTypes.InputChange
          || type === useCombobox.stateChangeTypes.InputKeyDownArrowDown
          || type === useCombobox.stateChangeTypes.InputKeyDownArrowUp
          || !type // Initial call
        ) {
          setInputValue(newInputValue || "");
        }
      },
      onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
        if (newSelectedItem) {
          onValueChange?.(getItemValue(newSelectedItem));
        }
        else {
          onValueChange?.(undefined);
        }
      },
    });

    // Focus the input when the menu opens
    React.useEffect(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isOpen]);

    // Attach scroll event listener for infinite scroll
    React.useEffect(() => {
      if (!fetchData || !isOpen) { return; }

      const scrollElement = scrollRef.current?.querySelector(".h-full.w-full.rounded-\\[inherit\\]") as HTMLElement;

      if (!scrollElement) { return; }

      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollElement;
        const scrolledToBottom = scrollHeight - scrollTop <= clientHeight + 100;

        if (scrolledToBottom && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      };

      scrollElement.addEventListener("scroll", handleScroll);

      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }, [fetchData, hasNextPage, isFetchingNextPage, fetchNextPage, isOpen]);

    // Default item renderer
    const defaultRenderItem = (item: T, index: number) => (
      <div
        key={getItemValue(item)}
        className={cx(comboboxItemVariants({ size }))}
        data-highlighted={highlightedIndex === index ? "true" : undefined}
        data-selected={
          selectedItem && getItemValue(selectedItem) === getItemValue(item)
            ? "true"
            : undefined
        }
        {...getItemProps({ item, index })}
      >
        <div className="flex items-center gap-2 flex-1">
          {getItemIcon && getItemIcon(item)}
          <span className="truncate">{getItemLabel(item)}</span>
        </div>
        {selectedItem && getItemValue(selectedItem) === getItemValue(item) && (
          <Icon
            icon={Check}
            size="sm"
            strokeWidth={iconStrokeWidth}
            className="text-current"
          />
        )}
      </div>
    );

    const inputProps = getInputProps(
      {
        placeholder: searchPlaceholder,
        disabled,
      },
      {
        suppressRefError: true,
      },
    );

    // Map combobox sizes to button sizes
    const buttonSize = size === "base" ? "default" : size;

    return (
      <div className={cx(comboboxVariants({ size }), className)} data-testid="combobox">
        {/* Trigger Button */}
        <Button
          variant="outline"
          size={buttonSize}
          disabled={disabled}
          rightIcon={isOpen ? ChevronUp : ChevronDown}
          fullWidth
          className={cx(
            hasError && hasErrorInput,
            !selectedItem && "text-zinc-500 dark:text-zinc-400",
          )}
          data-testid="combobox-trigger"
          {...getToggleButtonProps()}
        >
          {selectedItem
            ? (
                <div className="flex items-center gap-2 min-w-0">
                  {getItemIcon && getItemIcon(selectedItem)}
                  <span className="truncate">{getItemLabel(selectedItem)}</span>
                </div>
              )
            : (
                placeholder
              )}
        </Button>

        {/* Dropdown Menu */}
        <div
          className={cx(
          // base
            "absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg dark:bg-zinc-950",
            // border
            "border-zinc-200 dark:border-zinc-800",
            !isOpen && "hidden",
          )}
          data-testid="combobox-dropdown"
          {...getMenuProps()}
        >
          {/* Search Input - Fixed at top */}
          <div
            className={cx(
              "border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-t-md",
              size === "sm" && "p-1.5",
              size === "base" && "p-2",
              size === "lg" && "p-2.5",
            )}
          >
            <Input
              {...inputProps}
              {...(selectOnFocus && {
                onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                // Call Downshift's onFocus handler first if it exists
                  const originalOnFocus = (inputProps as Record<string, unknown>)
                    .onFocus as
                  | ((e: React.FocusEvent<HTMLInputElement>) => void)
                  | undefined;
                  if (originalOnFocus) {
                    originalOnFocus(e);
                  }

                  // Then handle text selection
                  if (inputRef.current) {
                    setTimeout(() => {
                      inputRef.current?.select();
                    }, 0);
                  }
                },
              })}
              ref={inputRef}
              type="search"
              size={size}
              autoFocus
              prefixStyling={false}
              data-testid="combobox-search"
            />
          </div>

          {/* Scrollable Content Area */}
          <div className="relative" ref={scrollRef}>
            <ScrollArea
              className={cx(
                "h-32 rounded-b-md overflow-hidden",
                size === "sm" && "text-xs",
                size === "base" && "text-sm",
                size === "lg" && "text-base",
              )}
              data-testid="combobox-options"
              viewportClassName="scroll-smooth"
            >
              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-4" data-testid="combobox-loading">
                  <Loader size="sm" />
                  <span className="ml-2 text-sm text-zinc-500">Loading...</span>
                </div>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <div className="flex items-center justify-center py-4 text-red-500" data-testid="combobox-error">
                  <span className="text-sm">Failed to load options</span>
                </div>
              )}

              {/* Items List */}
              {!isLoading && !error && items.length > 0 && (
                <div className="py-1" data-testid="combobox-items">
                  {items.map((item, index) => (
                    <div key={`${getItemValue(item)}-${index}`} data-testid={`combobox-item-${getItemValue(item)}`}>
                      {renderItem
                        ? renderItem(item, index)
                        : defaultRenderItem(item, index)}
                    </div>
                  ))}

                  {/* Loading more items indicator */}
                  {isFetchingNextPage && (
                    <div className="flex items-center justify-center py-2" data-testid="combobox-loading-more">
                      <Loader size="sm" />
                      <span className="ml-2 text-xs text-zinc-500">Loading more...</span>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && !error && items.length === 0 && (
                <div className="flex items-center justify-center py-4 text-zinc-500" data-testid="combobox-empty">
                  <span className="text-sm">{emptyMessage}</span>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  };

Combobox.displayName = "Combobox";

export { Combobox, comboboxVariants };
export type { ComboboxProps };
