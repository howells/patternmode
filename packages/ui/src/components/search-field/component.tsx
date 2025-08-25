import { Button } from "@patternmode/button";
import { Stack } from "@patternmode/stack";
import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import { Search, X } from "lucide-react";
import * as React from "react";
import { EmptyState } from "../empty-state/component";
import { Input } from "@patternmode/input";

export type SearchFieldItem = {
	id: string;
	label: string;
	description?: string;
	category?: string;
	badge?: string;
	data?: any; // Additional data to pass through
};

export type SearchFieldProps = {
	placeholder?: string;
	value?: string;
	onValueChange?: (value: string) => void;
	items?: SearchFieldItem[];
	onItemSelect?: (item: SearchFieldItem) => void;
	onSubmit?: (value: string) => void;
	onClear?: () => void;
	groupByCategory?: boolean;
	showClearButton?: boolean;
	emptyStateTitle?: string;
	emptyStateDescription?: string;
	maxResults?: number;
	className?: string;
	inputClassName?: string;
	dropdownClassName?: string;
	autoFocus?: boolean;
	disabled?: boolean;
	loading?: boolean;
	// Keyboard navigation
	selectedIndex?: number;
	onSelectedIndexChange?: (index: number) => void;
};

const EMPTY_ITEMS_ARRAY: SearchFieldItem[] = [];

/**
 * Search input with dropdown results, keyboard navigation, and filtering. Supports controlled and uncontrolled usage.
 */
export const SearchField = ({
	ref,
	placeholder = "Search...",
	value,
	onValueChange,
	items = EMPTY_ITEMS_ARRAY,
	onItemSelect,
	onSubmit,
	onClear,
	groupByCategory = false,
	showClearButton = true,
	emptyStateTitle = "No results found",
	emptyStateDescription,
	maxResults,
	className,
	inputClassName,
	dropdownClassName,
	autoFocus = false,
	disabled = false,
	loading = false,
	selectedIndex = 0,
	onSelectedIndexChange,
}: SearchFieldProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
	const [internalValue, setInternalValue] = React.useState("");
	const [internalSelectedIndex, setInternalSelectedIndex] = React.useState(0);
	const [isOpen, setIsOpen] = React.useState(false);

	// Use controlled state if provided, otherwise use internal state
	const searchValue = value !== undefined ? value : internalValue;
	const setSearchValue = onValueChange || setInternalValue;
	const currentSelectedIndex =
		selectedIndex !== undefined ? selectedIndex : internalSelectedIndex;

	// Create a consistent setter that handles both function and direct value updates
	const setCurrentSelectedIndex = React.useCallback(
		(indexOrUpdater: number | ((prev: number) => number)) => {
			const newIndex =
				typeof indexOrUpdater === "function"
					? indexOrUpdater(currentSelectedIndex)
					: indexOrUpdater;

			if (onSelectedIndexChange) {
				onSelectedIndexChange(newIndex);
			} else {
				setInternalSelectedIndex(newIndex);
			}
		},
		[currentSelectedIndex, onSelectedIndexChange],
	);

	// Filter and limit results
	const filteredItems = React.useMemo(() => {
		let filtered = items;

		if (searchValue.trim()) {
			filtered = items.filter(
				(item) =>
					item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
					item.description?.toLowerCase().includes(searchValue.toLowerCase()),
			);
		}

		if (maxResults) {
			filtered = filtered.slice(0, maxResults);
		}

		return filtered;
	}, [items, searchValue, maxResults]);

	// Group by category if requested
	const groupedItems: Record<string, SearchFieldItem[]> = React.useMemo(() => {
		if (!groupByCategory) {
			return { "": filteredItems };
		}

		return filteredItems.reduce(
			(groups, item) => {
				const category = item.category || "Other";
				if (!groups[category]) {
					groups[category] = [];
				}
				groups[category].push(item);
				return groups;
			},
			{} as Record<string, SearchFieldItem[]>,
		);
	}, [filteredItems, groupByCategory]);

	// Reset selection when search changes
	React.useEffect(() => {
		setCurrentSelectedIndex(0);
	}, [setCurrentSelectedIndex]);

	// Show dropdown when there are items and input is focused
	React.useEffect(() => {
		setIsOpen(filteredItems.length > 0 && searchValue.trim().length > 0);
	}, [filteredItems.length, searchValue]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleItemSelect = (item: SearchFieldItem) => {
		onItemSelect?.(item);
		setIsOpen(false);
	};

	const handleClear = () => {
		setSearchValue("");
		onClear?.();
		setIsOpen(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!isOpen) {
			if (e.key === "Enter" && searchValue.trim()) {
				onSubmit?.(searchValue);
			}
			return;
		}

		switch (e.key) {
			case "ArrowDown": {
				e.preventDefault();
				setCurrentSelectedIndex((prev) =>
					Math.min(prev + 1, filteredItems.length - 1),
				);
				break;
			}
			case "ArrowUp": {
				e.preventDefault();
				setCurrentSelectedIndex((prev) => Math.max(prev - 1, 0));
				break;
			}
			case "Enter": {
				e.preventDefault();
				const selected = filteredItems[currentSelectedIndex];
				if (selected) {
					handleItemSelect(selected);
				} else if (searchValue.trim()) {
					onSubmit?.(searchValue);
				}
				break;
			}
			case "Escape": {
				e.preventDefault();
				setIsOpen(false);
				break;
			}
		}
	};

	let currentIndex = 0;

	return (
		<div className={cx("relative", className)} data-testid="search-field">
			<div className="relative">
				<Input
					ref={ref}
					type="search"
					placeholder={placeholder}
					value={searchValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					onFocus={() =>
						filteredItems.length > 0 &&
						searchValue.trim().length > 0 &&
						setIsOpen(true)
					}
					prefixIcon={Search}
					prefixStyling={false}
					autoFocus={autoFocus}
					disabled={disabled}
					className={inputClassName}
				/>

				{showClearButton && searchValue && (
					<Button
						variant="ghost"
						size="sm"
						onClick={handleClear}
						className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
						aria-label="Clear search"
					>
						<X className="h-4 w-4" />
					</Button>
				)}
			</div>

			{isOpen && (
				<div
					className={cx(
						"absolute top-full left-0 right-0 z-50 mt-1",
						"bg-white dark:bg-zinc-900 border  dark:border-zinc-800",
						"rounded-md shadow-lg max-h-96 overflow-y-auto",
						dropdownClassName,
					)}
				>
					{loading ? (
						<div className="p-4 text-center">
							<Text size="sm" className="text-zinc-500">
								Loading...
							</Text>
						</div>
					) : filteredItems.length === 0 ? (
						<div className="p-4">
							<EmptyState
								title={emptyStateTitle}
								description={emptyStateDescription}
								variant="minimal"
								size="sm"
							/>
						</div>
					) : (
						<div className="py-2">
							{Object.entries(groupedItems).map(([category, categoryItems]) => (
								<div key={category}>
									{groupByCategory && category && (
										<Text
											size="xs"
											className="font-semibold text-zinc-500 capitalize px-3 py-2"
										>
											{category}
										</Text>
									)}

									{categoryItems.map((item) => {
										const isSelected = currentIndex === currentSelectedIndex;
										const itemIndex = currentIndex;
										currentIndex++;

										return (
											<button
												type="button"
												key={item.id}
												className={cx(
													"w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800",
													"focus:bg-zinc-100 dark:focus:bg-zinc-800 focus:outline-none",
													isSelected && "bg-zinc-100 dark:bg-zinc-800",
												)}
												onClick={() => handleItemSelect(item)}
												onMouseEnter={() => setCurrentSelectedIndex(itemIndex)}
											>
												<Stack gap={1}>
													<Stack
														direction="horizontal"
														align="center"
														justify="between"
													>
														<Text className="font-medium">{item.label}</Text>
														{item.badge && (
															<span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">
																{item.badge}
															</span>
														)}
													</Stack>
													{item.description && (
														<Text
															size="sm"
															className="text-zinc-600 dark:text-zinc-400"
														>
															{item.description}
														</Text>
													)}
												</Stack>
											</button>
										);
									})}
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

SearchField.displayName = "SearchField";
