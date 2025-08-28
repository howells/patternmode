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
	value?: string;
	onValueChange?: (value: string | undefined) => void;
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
} & VariantProps<typeof comboboxVariants> &
	React.ComponentPropsWithoutRef<"div">;
