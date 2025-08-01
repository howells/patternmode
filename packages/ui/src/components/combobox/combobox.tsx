"use client";

import type { VariantProps } from "tailwind-variants";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCombobox } from "downshift";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { tv } from "tailwind-variants";

import { config } from "../../lib/config";
import { cx, hasErrorInput } from "../../lib/utils";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import { Input } from "../input/input";
import { Loader } from "../loader/loader";

/**
 * Base interface for combobox options.
 */
export type ComboboxOption = {
  id: string;
  label: string;
  value: string;
  [key: string]: unknown;
};

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
type ComboboxProps<T extends ComboboxOption = ComboboxOption> = {
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
} & VariantProps<typeof comboboxVariants>;

/**
 * Virtualized item list component for handling large datasets efficiently.
 */
function VirtualizedItemList<T extends ComboboxOption>({
  items,
  parentRef,
  getItemValue,
  getItemLabel,
  getItemIcon,
  getItemProps,
  renderItem,
  defaultRenderItem,
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
  size: "sm" | "base" | "lg";
  iconStrokeWidth: number;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}) {
  // Calculate item height based on size
  const itemHeight = React.useMemo(() => {
    switch (size) {
      case "sm": return 32; // py-1.5 px-2.5 with text-xs
      case "lg": return 48; // py-2.5 px-4 with text-base
      default: return 40; // py-2 px-3 with text-sm
    }
  }, [size]);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });

  // Handle infinite scroll
  React.useEffect(() => {
    const virtualItems = virtualizer.getVirtualItems();
    if (
      virtualItems.length > 0
      && virtualItems[virtualItems.length - 1].index >= items.length - 1 - 5 // Load more when 5 items from end
      && hasNextPage
      && !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [virtualizer.getVirtualItems(), items.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div
      style={{
        height: `${virtualizer.getTotalSize()}px`,
        position: "relative",
      }}
      data-testid="combobox-items"
    >
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const item = items[virtualItem.index];
        const itemProps = getItemProps({ item, index: virtualItem.index });

        return (
          <div
            key={virtualItem.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
            data-testid={`combobox-item-${getItemValue(item)}`}
          >
            <div
              className={cx(comboboxItemVariants({ size }))}
              data-highlighted={highlightedIndex === virtualItem.index ? "true" : undefined}
              data-selected={
                selectedItem && getItemValue(selectedItem) === getItemValue(item)
                  ? "true"
                  : undefined
              }
              {...itemProps}
            >
              {renderItem
                ? (
                    renderItem(item, virtualItem.index)
                  )
                : (
                    <>
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
                    </>
                  )}
            </div>
          </div>
        );
      })}

      {/* Loading more items indicator */}
      {isFetchingNextPage && (
        <div
          className="flex items-center justify-center py-2"
          data-testid="combobox-loading-more"
          style={{
            position: "absolute",
            top: `${virtualizer.getTotalSize()}px`,
            left: 0,
            width: "100%",
          }}
        >
          <Loader size="sm" />
          <span className="ml-2 text-xs text-zinc-500">Loading more...</span>
        </div>
      )}
    </div>
  );
}

/**
 * A highly flexible combobox component with search functionality, dynamic data fetching, and infinite scroll support.
 *
 * Built on Downshift for robust accessibility and React Query for efficient data management, this component
 * provides an autocomplete-style interface for selecting from large datasets. Supports both static options
 * and dynamic server-side filtering with pagination, making it ideal for handling thousands of options
 * with optimal performance.
 *
 * @inheritdoc
 * @inheritdoc
 *
 * **Key Features:**
 * - **Dual Data Sources**: Static options array or dynamic fetching with React Query
 * - **Search & Filter**: Real-time search with debouncing and server-side filtering
 * - **Infinite Scroll**: Automatic pagination and loading for large datasets
 * - **Performance Optimized**: Caching, stale time management, and efficient re-renders
 * - **Keyboard Navigation**: Full arrow key navigation and selection support
 * - **Customizable Rendering**: Custom item renderers and icon support
 * - **Accessibility**: ARIA-compliant with screen reader support and focus management
 * - **Loading States**: Built-in loading, error, and empty state handling
 *
 * **Advanced Capabilities:**
 * - **React Query Integration**: Automatic caching, background refetching, and error handling
 * - **Search Behavior Control**: Configurable search clearing and text selection on focus
 * - **Custom Data Shaping**: Flexible item value/label extraction functions
 * - **Icon Integration**: Per-item icon support with automatic sizing
 * - **Debounced Search**: Configurable search debouncing to reduce API calls
 * - **Infinite Loading**: Seamless loading of additional pages on scroll
 *
 * **Common Use Cases:**
 * - User selection with thousands of options (users, companies, locations)
 * - Product search and selection in e-commerce applications
 * - Tag selection with server-side search and filtering
 * - Resource pickers with real-time search (files, images, documents)
 * - Multi-tenant application resource selection
 * - API endpoint or service selection interfaces
 * - Location and address autocomplete functionality
 *
 * **Accessibility:**
 * - Full ARIA combobox implementation with proper roles and states
 * - Keyboard navigation with arrow keys, enter, and escape
 * - Screen reader announcements for results and loading states
 * - Focus management and visual focus indicators
 * - Proper labeling and descriptions for assistive technology
 *
 * @category inputs
 * @icon Search
 * @example
 * ```tsx
 * // Static options with search filtering
 * <Combobox
 *   options={[
 *     { id: "1", label: "React", value: "react" },
 *     { id: "2", label: "Vue", value: "vue" },
 *     { id: "3", label: "Angular", value: "angular" }
 *   ]}
 *   value={selectedFramework}
 *   onValueChange={setSelectedFramework}
 *   placeholder="Select a framework..."
 *   searchPlaceholder="Search frameworks..."
 * />
 *
 * // Dynamic data fetching with React Query
 * <Combobox
 *   fetchData={async ({ search, pageParam }) => {
 *     const response = await fetch(
 *       `/api/users?search=${search}&page=${pageParam}&limit=20`
 *     );
 *     const { users, hasMore, nextPage } = await response.json();
 *     return {
 *       data: users.map(user => ({
 *         id: user.id,
 *         label: `${user.name} (${user.email})`,
 *         value: user.id,
 *         avatar: user.avatar
 *       })),
 *       hasNextPage: hasMore,
 *       nextCursor: nextPage
 *     };
 *   }}
 *   queryKey={["users"]}
 *   value={selectedUser}
 *   onValueChange={setSelectedUser}
 *   placeholder="Select a user..."
 *   emptyMessage="No users found"
 * />
 *
 * // Custom item rendering with icons
 * <Combobox
 *   options={statusOptions}
 *   value={status}
 *   onValueChange={setStatus}
 *   getItemIcon={(item) => <StatusIcon status={item.value} />}
 *   renderItem={(item, index) => (
 *     <div className="flex items-center gap-3 p-2">
 *       <StatusIcon status={item.value} />
 *       <div>
 *         <div className="font-medium">{item.label}</div>
 *         <div className="text-sm text-gray-500">{item.description}</div>
 *       </div>
 *     </div>
 *   )}
 * />
 *
 * // Advanced configuration with custom behavior
 * <Combobox
 *   fetchData={searchProducts}
 *   queryKey={["products", categoryId]}
 *   value={selectedProduct}
 *   onValueChange={setSelectedProduct}
 *   searchDebounce={500}
 *   clearSearchOnSelect={false}
 *   selectOnFocus={true}
 *   size="lg"
 *   hasError={!!productError}
 *   disabled={isLoading}
 *   getItemValue={(item) => item.sku}
 *   getItemLabel={(item) => `${item.name} - ${item.price}`}
 *   emptyMessage="No products match your search"
 * />
 *
 * // Form integration with validation
 * <div className="space-y-2">
 *   <label className="text-sm font-medium">Assigned To</label>
 *   <Combobox
 *     fetchData={fetchUsers}
 *     queryKey={["users", teamId]}
 *     value={formData.assignedTo}
 *     onValueChange={(value) => 
 *       setFormData(prev => ({ ...prev, assignedTo: value }))
 *     }
 *     placeholder="Select team member..."
 *     hasError={!!errors.assignedTo}
 *     disabled={isSubmitting}
 *   />
 *   {errors.assignedTo && (
 *     <p className="text-sm text-red-600">{errors.assignedTo}</p>
 *   )}
 * </div>
 * ```
 */
/**
 * Searchable dropdown component combining input and select functionality.
 *
 * @id combobox
 * @name Combobox
 * @icon Search
 * @category inputs
 * @component
 * @param props - Component properties.
 * @param props.options - Static options array (alternative to fetchData).
 * @param props.fetchData - Function to fetch data dynamically with React Query.
 * @param props.queryKey - React Query key for caching.
 * @param props.value - Current selected value.
 * @param props.onValueChange - Callback when selection changes.
 * @param props.placeholder - Placeholder text for the input.
 * @param props.searchPlaceholder - Placeholder text for search input.
 * @param props.emptyMessage - Message to show when no items found.
 * @param props.disabled - Whether the combobox is disabled.
 * @param props.hasError - Whether to show error state.
 * @param props.className - Additional CSS classes.
 * @param props.size - Size variant of the combobox.
 * @param props.searchDebounce - Search debounce delay in ms.
 * @param props.iconStrokeWidth - Stroke width for icons.
 * @param props.getItemValue - Function to get the value from an item.
 * @param props.getItemLabel - Function to get the label from an item.
 * @param props.getItemIcon - Function to get an icon component for an item.
 * @param props.renderItem - Custom render function for items.
 * @param props.selectOnFocus - Whether to select all text in the input when the menu opens.
 * @param props.clearSearchOnSelect - Whether to clear the search when an item is selected.
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

  // Virtual scrolling handles infinite scroll automatically via the VirtualizedItemList component

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

        {/* Virtual Scrollable Content Area */}
        <div
          className={cx(
            "h-60 overflow-auto rounded-b-md",
            size === "sm" && "text-xs",
            size === "base" && "text-sm",
            size === "lg" && "text-base",
          )}
          ref={scrollRef}
          data-testid="combobox-options"
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

          {/* Virtual Items List */}
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

          {/* Empty State */}
          {!isLoading && !error && items.length === 0 && (
            <div className="flex items-center justify-center py-4 text-zinc-500" data-testid="combobox-empty">
              <span className="text-sm">{emptyMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Combobox.displayName = "Combobox";

export { Combobox, comboboxVariants };
export type { ComboboxProps };
