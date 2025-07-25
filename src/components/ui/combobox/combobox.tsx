"use client";

import { config } from "@/lib/config";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useCombobox } from "downshift";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button/button";
import { cx } from "@/lib/utils";

/**
 * Basic option type for simple comboboxes
 */
export interface ComboboxOption {
  /** Unique identifier for the option */
  value: string;
  /** Display text for the option */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Icon to display on the left side */
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Icon to display on the right side */
  rightIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Additional data for the option */
  data?: Record<string, unknown>;
}

/**
 * Fetch function signature for async data loading
 */
export type ComboboxFetchFunction<T = ComboboxOption> = (context: {
  pageParam: number;
  queryKey: readonly unknown[];
  signal?: AbortSignal;
  search: string;
}) => Promise<{
  items: T[];
  totalCount: number;
  hasMore: boolean;
  nextPage?: number;
}>;

/**
 * Props for the unified Combobox component
 */
export interface ComboboxProps<T = ComboboxOption> {
  // Basic props
  /** Array of options for static data */
  options?: T[];
  /** Currently selected value */
  value?: string;
  /** Callback when selection changes */
  onValueChange?: (value: string | null) => void;
  /** Placeholder text for the trigger button */
  placeholder?: string;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Message shown when no options match search */
  emptyMessage?: string;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Whether the combobox allows clearing the selection */
  clearable?: boolean;
  /** Whether to show the search input */
  searchable?: boolean;

  // Async/Infinite props
  /** Query key for React Query (enables async mode) */
  queryKey?: readonly unknown[];
  /** Fetch function for async data loading */
  fetchData?: ComboboxFetchFunction<T>;
  /** Search debounce delay in ms (default: 300) */
  searchDebounce?: number;
  /** React Query stale time in ms (default: 0 for fresh data) */
  staleTime?: number;
  /** React Query cache time in ms (default: 10 minutes) */
  cacheTime?: number;
  /** Enable background refetching (default: true) */
  refetchOnWindowFocus?: boolean;

  // Styling props
  /** Additional CSS classes for container */
  className?: string;
  /** Additional CSS classes for trigger button */
  buttonClassName?: string;
  /** Additional CSS classes for dropdown content */
  dropdownClassName?: string;
  /** Additional CSS classes for input */
  inputClassName?: string;
  /** Whether trigger button should take full width */
  triggerFullWidth?: boolean;
  /** Maximum height for dropdown */
  maxHeight?: number;
  /** Stroke width for icons */
  iconStrokeWidth?: number;

  // Customization props
  /** Custom render function for trigger content */
  renderTrigger?: (selectedOption: T | null) => React.ReactNode;
  /** Custom render function for option items */
  renderItem?: (
    option: T,
    isHighlighted: boolean,
    isSelected: boolean
  ) => React.ReactNode;
  /** Custom filter function for static options */
  filterOptions?: (options: T[], inputValue: string) => T[];
  /** Function to convert item to string value */
  getItemValue?: (item: T) => string;
  /** Function to get display label for item */
  getItemLabel?: (item: T) => string;
  /** Custom item to string function for accessibility */
  itemToString?: (item: T | null) => string;

  // Behavior props
  /** Whether to close dropdown on selection */
  closeOnSelect?: boolean;
}

/**
 * Default filter function for static options
 */
const defaultFilterOptions = <T extends ComboboxOption>(
  options: T[],
  inputValue: string
): T[] => {
  if (!inputValue) return options;

  const lowercaseInput = inputValue.toLowerCase();
  return options.filter((option) =>
    option.label.toLowerCase().includes(lowercaseInput)
  );
};

/**
 * Default item to string function for accessibility
 */
const defaultItemToString = <T extends ComboboxOption>(
  item: T | null
): string => {
  return item ? item.label : "";
};

/**
 * Default get item value function
 */
const defaultGetItemValue = <T extends ComboboxOption>(item: T): string => {
  return item.value;
};

/**
 * Default get item label function
 */
const defaultGetItemLabel = <T extends ComboboxOption>(item: T): string => {
  return item.label;
};

/**
 * A powerful, unified combobox component built with Downshift.
 *
 * Supports multiple modes:
 * - Static options with local filtering
 * - Async data loading with React Query
 * - Infinite scrolling for large datasets
 * - Full customization of rendering and behavior
 *
 * @example
 * ```tsx
 * // Basic static combobox
 * <Combobox
 *   options={[
 *     { value: "apple", label: "Apple" },
 *     { value: "banana", label: "Banana" },
 *     { value: "cherry", label: "Cherry" }
 *   ]}
 *   placeholder="Select fruit..."
 *   onValueChange={setFruit}
 * />
 *
 * // Async combobox with React Query
 * <Combobox
 *   queryKey={['users']}
 *   fetchData={async ({ pageParam, search }) => {
 *     const response = await fetch(`/api/users?page=${pageParam}&search=${search}`);
 *     return response.json();
 *   }}
 *   placeholder="Search users..."
 *   onValueChange={setUser}
 * />
 *
 * // Custom rendering with icons
 * <Combobox
 *   options={languages}
 *   renderItem={(option, isHighlighted, isSelected) => (
 *     <div className={cx(
 *       "flex items-center gap-2 p-2",
 *       isHighlighted && "bg-zinc-100 dark:bg-zinc-800"
 *     )}>
 *       {option.leftIcon && <option.leftIcon className="size-4" />}
 *       <span>{option.label}</span>
 *       {isSelected && <Check className="ml-auto size-4" />}
 *     </div>
 *   )}
 * />
 * ```
 */
export function Combobox<T extends ComboboxOption = ComboboxOption>({
  // Basic props
  options = [],
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  disabled = false,
  clearable = false,
  searchable = true,

  // Async props
  queryKey,
  fetchData,
  searchDebounce = 300,
  staleTime = 0,
  cacheTime = 10 * 60 * 1000,
  refetchOnWindowFocus = true,

  // Styling props
  className,
  buttonClassName,
  dropdownClassName,
  inputClassName,
  triggerFullWidth = true,
  maxHeight = 300,
  iconStrokeWidth = config.getIconStrokeWidth(),

  // Customization props
  renderTrigger,
  renderItem,
  filterOptions = defaultFilterOptions,
  getItemValue = defaultGetItemValue,
  getItemLabel = defaultGetItemLabel,
  itemToString = defaultItemToString,

  // Behavior props
  closeOnSelect = true,
}: ComboboxProps<T>) {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [sessionId, setSessionId] = React.useState(() => Date.now());

  // Determine if we're in async mode
  const isAsyncMode = !!(queryKey && fetchData);

  // Refs for infinite scroll
  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  // Debounced search effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, searchDebounce);

    return () => clearTimeout(timer);
  }, [inputValue, searchDebounce]);

  // React Query for async mode
  const queryResult = useInfiniteQuery({
    queryKey: queryKey
      ? [...queryKey, debouncedSearch, sessionId]
      : ["disabled"],
    queryFn: fetchData
      ? ({ pageParam = 0, queryKey, signal }) =>
          fetchData({ pageParam, queryKey, signal, search: debouncedSearch })
      : async () => ({ items: [], totalCount: 0, hasMore: false }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: {
      items: T[];
      totalCount: number;
      hasMore: boolean;
      nextPage?: number;
    }) =>
      lastPage.hasMore
        ? lastPage.nextPage ??
          (lastPage.items.length > 0 ? lastPage.nextPage ?? 1 : undefined)
        : undefined,
    staleTime,
    gcTime: cacheTime,
    refetchOnWindowFocus,
    enabled: isAsyncMode,
  });

  // Get items based on mode
  const allItems = React.useMemo(() => {
    if (isAsyncMode) {
      return (
        queryResult.data?.pages.flatMap(
          (page: {
            items: T[];
            totalCount: number;
            hasMore: boolean;
            nextPage?: number;
          }) => page.items
        ) ?? []
      );
    } else {
      return searchable ? filterOptions(options, inputValue) : options;
    }
  }, [
    isAsyncMode,
    queryResult.data,
    options,
    inputValue,
    searchable,
    filterOptions,
  ]);

  // Get loading states
  const isLoading = isAsyncMode ? queryResult.isFetching : false;
  const isLoadingMore = isAsyncMode ? queryResult.isFetchingNextPage : false;
  const hasMore = isAsyncMode ? queryResult.hasNextPage ?? false : false;
  const error = isAsyncMode ? queryResult.error : null;

  // Find selected item
  const selectedOption =
    allItems.find((option) => getItemValue(option) === value) || null;

  // Downshift setup
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    openMenu,
    closeMenu,
  } = useCombobox({
    items: allItems,
    itemToString,
    selectedItem: selectedOption,
    inputValue,
    onInputValueChange: ({ inputValue: newInputValue }) => {
      setInputValue(newInputValue || "");
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onValueChange?.(selectedItem ? getItemValue(selectedItem) : null);
      if (closeOnSelect) {
        setInputValue("");
        closeMenu();
      }
    },
    onIsOpenChange: ({ isOpen: newIsOpen }) => {
      if (newIsOpen && isAsyncMode) {
        // Reset session for fresh data
        setSessionId(Date.now());
        setInputValue("");
        setDebouncedSearch("");
      }
    },
  });

  // Intersection observer for infinite scroll
  React.useEffect(() => {
    if (!isOpen || !hasMore || isLoadingMore || !isAsyncMode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          queryResult.fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isOpen, hasMore, isLoadingMore, isAsyncMode, queryResult]);

  // Handle clear
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectItem(null);
    setInputValue("");
    onValueChange?.(null);
  };

  // Render trigger content
  const renderTriggerContent = () => {
    if (renderTrigger) {
      return renderTrigger(selectedOption);
    }

    if (selectedOption) {
      return (
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedOption.leftIcon && (
            <selectedOption.leftIcon
              className="size-4 shrink-0"
              strokeWidth={iconStrokeWidth}
            />
          )}
          <span className="truncate">{getItemLabel(selectedOption)}</span>
        </div>
      );
    }

    return (
      <span className="text-zinc-500 dark:text-zinc-400">{placeholder}</span>
    );
  };

  // Render item content
  const renderItemContent = (option: T, index: number) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = Boolean(
      selectedOption && getItemValue(selectedOption) === getItemValue(option)
    );

    if (renderItem) {
      return renderItem(option, isHighlighted, isSelected);
    }

    return (
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {option.leftIcon && (
          <option.leftIcon
            className="size-4 shrink-0"
            strokeWidth={iconStrokeWidth}
          />
        )}
        <span className="truncate">{getItemLabel(option)}</span>
        {isSelected && (
          <Check
            className="ml-auto size-4 shrink-0"
            strokeWidth={iconStrokeWidth}
          />
        )}
      </div>
    );
  };

  // Handle retry on error
  const handleRetry = () => {
    if (isAsyncMode) {
      queryResult.refetch();
    }
  };

  return (
    <div className={cx("relative", className)}>
      {/* Hidden label for accessibility */}
      <label {...getLabelProps()} className="sr-only">
        {placeholder}
      </label>

      {/* Trigger Button */}
      <Button
        {...getToggleButtonProps({
          disabled,
          onClick: () => {
            if (!isOpen) {
              openMenu();
            }
          },
        })}
        variant="outline"
        fullWidth={triggerFullWidth}
        textAlign={triggerFullWidth ? "left" : "center"}
        className={cx(
          "justify-between",
          !selectedOption && "text-zinc-500 dark:text-zinc-400",
          buttonClassName
        )}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {renderTriggerContent()}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {clearable && selectedOption && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
              aria-label="Clear selection"
            >
              <X className="size-3" strokeWidth={iconStrokeWidth} />
            </button>
          )}
          <ChevronsUpDown
            className={cx(
              "size-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
            strokeWidth={iconStrokeWidth}
          />
        </div>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          {...getMenuProps()}
          className={cx(
            "absolute z-50 w-full mt-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg",
            "overflow-hidden",
            dropdownClassName
          )}
          style={{ maxHeight }}
        >
          {searchable && (
            <div className="p-2 border-b border-zinc-200 dark:border-zinc-800">
              <input
                {...getInputProps({
                  placeholder: searchPlaceholder,
                  className: cx(
                    "w-full px-3 py-2 text-sm bg-transparent border border-zinc-200 dark:border-zinc-700 rounded-md",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
                    inputClassName
                  ),
                })}
              />
            </div>
          )}

          <div
            className="overflow-auto"
            style={{ maxHeight: maxHeight - (searchable ? 60 : 0) }}
          >
            {error ? (
              <div className="flex flex-col items-center gap-2 p-4">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Error: {error.message}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  className="text-xs"
                >
                  Try Again
                </Button>
              </div>
            ) : allItems.length === 0 && !isLoading ? (
              <div className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                {emptyMessage}
              </div>
            ) : (
              <>
                {allItems.map((option, index) => (
                  <div
                    key={`${getItemValue(option)}-${index}`}
                    {...getItemProps({
                      item: option,
                      index,
                      disabled: option.disabled,
                    })}
                    className={cx(
                      "px-3 py-2 cursor-pointer text-sm flex items-center gap-2",
                      "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                      highlightedIndex === index &&
                        "bg-zinc-100 dark:bg-zinc-800",
                      selectedOption &&
                        getItemValue(selectedOption) === getItemValue(option) &&
                        "font-medium",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {renderItemContent(option, index)}
                  </div>
                ))}

                {/* Infinite scroll loading indicator */}
                {isAsyncMode && hasMore && (
                  <div
                    ref={loadMoreRef}
                    className="flex items-center justify-center p-4"
                  >
                    {isLoadingMore ? (
                      <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          strokeWidth={iconStrokeWidth}
                        />
                        Loading more...
                      </div>
                    ) : (
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        Scroll for more
                      </div>
                    )}
                  </div>
                )}

                {/* Initial loading state */}
                {isAsyncMode && isLoading && allItems.length === 0 && (
                  <div className="flex items-center justify-center p-8">
                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        strokeWidth={iconStrokeWidth}
                      />
                      Loading...
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Hook for managing combobox state with additional utilities
 */
export function useComboboxState<T extends ComboboxOption = ComboboxOption>(
  initialValue = "",
  options: T[] = []
) {
  const [value, setValue] = React.useState(initialValue);

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value) || null,
    [options, value]
  );

  const isValid = React.useMemo(
    () => !value || options.some((option) => option.value === value),
    [options, value]
  );

  const handleValueChange = React.useCallback((newValue: string | null) => {
    setValue(newValue || "");
  }, []);

  return {
    /** Current selected value */
    value,
    /** Update selected value */
    setValue: handleValueChange,
    /** Currently selected option object */
    selectedOption,
    /** Whether current value is valid (exists in options) */
    isValid,
    /** Clear the selection */
    clear: () => setValue(""),
    /** Check if a specific value is selected */
    isSelected: (checkValue: string) => value === checkValue,
  };
}
