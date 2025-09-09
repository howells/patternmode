import type * as React from "react";
import type { VariantProps } from "tailwind-variants";
import type { comboboxVariants } from "./variants";

export type ComboboxOption = {
  id: string;
  label: string;
  value: string;
  [key: string]: unknown;
};

export type ComboboxFetchFunction<T = ComboboxOption> = (params: {
  search?: string;
  pageParam?: number;
  signal?: AbortSignal;
}) => Promise<{ data: T[]; hasNextPage: boolean; nextCursor?: number }>;

export type ComboboxProps<T extends ComboboxOption = ComboboxOption> = {
  options?: T[];
  fetchData?: ComboboxFetchFunction<T>;
  queryKey?: (string | number)[];
  value?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
  onValuesChange?: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  searchDebounce?: number;
  iconStrokeWidth?: number;
  getItemValue?: (item: T) => string;
  getItemLabel?: (item: T) => string;
  getItemIcon?: (item: T) => React.ReactNode;
  renderItem?: (item: T, index: number) => React.ReactNode;
  selectOnFocus?: boolean;
  clearSearchOnSelect?: boolean;
  multiple?: boolean;
} & VariantProps<typeof comboboxVariants> &
  React.ComponentPropsWithoutRef<"div">;

export type ComboboxMultiOption = ComboboxOption;

export type ComboboxMultiProps<
  T extends ComboboxMultiOption = ComboboxMultiOption,
> = {
  options: T[];
  values: string[];
  onValuesChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  searchDebounce?: number;
  iconStrokeWidth?: number;
  getItemValue?: (item: T) => string;
  getItemLabel?: (item: T) => string;
  getItemIcon?: (item: T) => React.ReactNode;
} & VariantProps<typeof comboboxVariants> &
  React.ComponentPropsWithoutRef<"div">;
