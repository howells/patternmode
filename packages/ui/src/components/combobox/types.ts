import type * as React from "react";
import type { VariantProps } from "tailwind-variants";

import type { comboboxVariants } from "./variants";

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

/**
 * Props for the Combobox component.
 */
export type ComboboxProps<T extends ComboboxOption = ComboboxOption> = {
  /**
   * Static options array (alternative to fetchData).
   * Pre-defined list of selectable options for client-side filtering.
   */
  options?: T[];
  /**
   * Function to fetch data dynamically with React Query.
   * Async function for server-side search and pagination support.
   */
  fetchData?: ComboboxFetchFunction<T>;
  /**
   * React Query key for caching.
   * Unique identifier for caching and invalidating query results.
   */
  queryKey?: (string | number)[];
  /**
   * Current selected value.
   * The currently selected option value, used for controlled state.
   */
  value?: string;
  /**
   * Callback when selection changes.
   * Function called when user selects or deselects an option.
   */
  onValueChange?: (value: string | undefined) => void;
  /**
   * Placeholder text for the input.
   * Text displayed when no option is selected.
   */
  placeholder?: string;
  /**
   * Placeholder text for search input.
   * Text displayed in the search field when empty.
   */
  searchPlaceholder?: string;
  /**
   * Message to show when no items found.
   * Text displayed when search returns no results.
   */
  emptyMessage?: string;
  /**
   * Whether the combobox is disabled.
   * When true, prevents user interaction and shows disabled styling.
   */
  disabled?: boolean;
  /**
   * Whether to show error state.
   * When true, applies error styling to indicate validation issues.
   */
  hasError?: boolean;
  /**
   * Additional CSS classes.
   * Custom CSS classes to apply to the combobox container.
   */
  className?: string;
  /**
   * Search debounce delay in ms.
   * Time to wait after user stops typing before triggering search.
   */
  searchDebounce?: number;
  /**
   * Stroke width for icons.
   * Controls the thickness of icon strokes for visual consistency.
   */
  iconStrokeWidth?: number;
  /**
   * Function to get the value from an item.
   * Custom function to extract the value property from option objects.
   */
  getItemValue?: (item: T) => string;
  /**
   * Function to get the label from an item.
   * Custom function to extract the display label from option objects.
   */
  getItemLabel?: (item: T) => string;
  /**
   * Function to get an icon component for an item.
   * Custom function to render icons for each option in the list.
   */
  getItemIcon?: (item: T) => React.ReactNode;
  /**
   * Custom render function for items.
   * Override default item rendering with completely custom components.
   */
  renderItem?: (item: T, index: number) => React.ReactNode;
  /**
   * Whether to select all text in the input when the menu opens.
   * When true, highlights all search text on focus for easy replacement.
   */
  selectOnFocus?: boolean;
  /**
   * Whether to clear the search when an item is selected.
   * When true, clears search input after selection for clean state.
   */
  clearSearchOnSelect?: boolean;
} & VariantProps<typeof comboboxVariants> & React.ComponentPropsWithoutRef<"div">;
