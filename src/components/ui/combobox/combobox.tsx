import { config } from "@/lib/config";
import { cx, hasErrorInput } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useCombobox } from "downshift";
import { Check, ChevronDown } from "lucide-react";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Button } from "../button";
import { Icon } from "../icon";
import { Input } from "../input";
import { Loader } from "../loader";

/**
 * Base interface for combobox options
 */
export interface ComboboxOption {
  id: string;
  label: string;
  value: string;
  [key: string]: unknown;
}

/**
 * Function signature for fetching data with search and pagination
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
 * Props for the Combobox component
 */
interface ComboboxProps<T extends ComboboxOption = ComboboxOption>
  extends VariantProps<typeof comboboxVariants> {
  /** Static options array (alternative to fetchData) */
  options?: T[];
  /** Function to fetch data dynamically with React Query */
  fetchData?: ComboboxFetchFunction<T>;
  /** React Query key for caching */
  queryKey?: (string | number)[];
  /** Current selected value */
  value?: string;
  /** Callback when selection changes */
  onValueChange?: (value: string | undefined) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Message to show when no items found */
  emptyMessage?: string;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Whether to show error state */
  hasError?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Search debounce delay in ms */
  searchDebounce?: number;
  /** Stroke width for icons */
  iconStrokeWidth?: number;
  /** Function to get the value from an item */
  getItemValue?: (item: T) => string;
  /** Function to get the label from an item */
  getItemLabel?: (item: T) => string;
  /** Custom render function for items */
  renderItem?: (item: T, index: number) => React.ReactNode;
  /** Custom render function for the trigger */
  renderTrigger?: (props: {
    value?: T;
    placeholder?: string;
    isOpen: boolean;
    disabled?: boolean;
  }) => React.ReactNode;
}

/**
 * A flexible combobox component built with Downshift and React Query.
 *
 * Supports both static options and dynamic data fetching with search,
 * pagination, and caching via React Query.
 *
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
  renderItem,
  renderTrigger,
}: ComboboxProps<T>) => {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, searchDebounce);

    return () => clearTimeout(timer);
  }, [inputValue, searchDebounce]);

  // Fetch data with React Query (only if fetchData is provided)
  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [...queryKey, debouncedSearch],
    queryFn: async ({ signal }) => {
      if (!fetchData) return { data: [], hasNextPage: false };
      return fetchData({
        search: debouncedSearch,
        pageParam: 0,
        signal,
      });
    },
    enabled: !!fetchData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Use either static options or fetched data
  const allItems: T[] = options || queryData?.data || [];

  // Find selected item first (needed for filtering logic)
  const selectedItem = allItems.find((item) => getItemValue(item) === value);

  // Filter static options based on search input
  const items: T[] = React.useMemo(() => {
    if (!options || !inputValue.trim()) {
      return allItems;
    }

    // If the input value exactly matches the selected item's label,
    // show all items (user just opened the menu)
    if (selectedItem && inputValue === getItemLabel(selectedItem)) {
      return allItems;
    }

    // Filter static options by label
    return allItems.filter((item) =>
      getItemLabel(item).toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [allItems, inputValue, options, getItemLabel, selectedItem]);

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
        case useCombobox.stateChangeTypes.InputKeyDownEscape:
        case useCombobox.stateChangeTypes.InputBlur:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            inputValue: "", // Clear search input when closing or selecting
          };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
          // If Enter is pressed and no item is highlighted but there are items,
          // select the first item
          if (changes.highlightedIndex === -1 && items.length > 0) {
            return {
              ...changes,
              selectedItem: items[0],
              inputValue: "",
              isOpen: false,
            };
          }
          return {
            ...changes,
            inputValue: "", // Clear input after selection
          };
        default:
          return changes;
      }
    },
    onInputValueChange: ({ inputValue: newInputValue }) => {
      setInputValue(newInputValue || "");
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem) {
        onValueChange?.(getItemValue(newSelectedItem));
      } else {
        onValueChange?.(undefined);
      }
    },
  });

  // Default item renderer
  const defaultRenderItem = (item: T, index: number) => (
    <div
      key={getItemValue(item)}
      className={cx(
        comboboxItemVariants({ size }),
        highlightedIndex === index && "data-[highlighted]:true",
        selectedItem &&
          getItemValue(selectedItem) === getItemValue(item) &&
          "data-[selected]:true"
      )}
      {...getItemProps({ item, index })}
    >
      <span className="flex-1 truncate">{getItemLabel(item)}</span>
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

  // Default trigger renderer
  const defaultRenderTrigger = ({
    value: triggerValue,
    placeholder: triggerPlaceholder,
    isOpen: triggerIsOpen,
  }: {
    value?: T;
    placeholder?: string;
    isOpen: boolean;
    disabled?: boolean;
  }) => (
    <div className="flex w-full items-center justify-between">
      <span
        className={cx(
          "flex-1 truncate text-left",
          !triggerValue && "text-zinc-500 dark:text-zinc-400"
        )}
      >
        {triggerValue ? getItemLabel(triggerValue) : triggerPlaceholder}
      </span>
      <Icon
        icon={ChevronDown}
        size="sm"
        strokeWidth={iconStrokeWidth}
        className={cx(
          "transition-transform duration-200",
          triggerIsOpen && "rotate-180"
        )}
      />
    </div>
  );

  const inputProps = getInputProps({
    placeholder: searchPlaceholder,
    disabled,
  });

  // Map combobox sizes to button sizes
  const buttonSize = size === "base" ? "default" : size;

  return (
    <div className={cx(comboboxVariants({ size }), className)}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        size={buttonSize}
        disabled={disabled}
        className={cx(
          "w-full justify-between font-normal",
          hasError && hasErrorInput,
          !selectedItem && "text-zinc-500 dark:text-zinc-400"
        )}
        {...getToggleButtonProps()}
      >
        {renderTrigger
          ? renderTrigger({
              value: selectedItem,
              placeholder,
              isOpen,
              disabled,
            })
          : defaultRenderTrigger({
              value: selectedItem,
              placeholder,
              isOpen,
              disabled,
            })}
      </Button>

      {/* Dropdown Menu */}
      <div
        className={cx(comboboxListVariants({ size }), !isOpen && "hidden")}
        {...getMenuProps()}
      >
        {/* Search Input */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 p-2">
          <input
            {...inputProps}
            className={cx(
              "w-full rounded-md border border-zinc-200 bg-white px-3 text-sm placeholder:text-zinc-500",
              "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
              "dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400",
              "dark:focus:border-blue-400 dark:focus:ring-blue-400",
              size === "sm" && "py-1.5",
              size === "base" && "py-2",
              size === "lg" && "py-2.5"
            )}
            autoFocus
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader size="sm" />
            <span className="ml-2 text-sm text-zinc-500">Loading...</span>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex items-center justify-center py-4 text-red-500">
            <span className="text-sm">Failed to load options</span>
          </div>
        )}

        {/* Items List */}
        {!isLoading && !error && items.length > 0 && (
          <div className="py-1">
            {items.map((item, index) => (
              <div key={`${getItemValue(item)}-${index}`}>
                {renderItem
                  ? renderItem(item, index)
                  : defaultRenderItem(item, index)}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && items.length === 0 && (
          <div className="flex items-center justify-center py-4 text-zinc-500">
            <span className="text-sm">{emptyMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

Combobox.displayName = "Combobox";

export { Combobox, comboboxVariants };
export type { ComboboxProps };
