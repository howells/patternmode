"use client";

import { useCombobox } from "downshift";
import { Check } from "lucide-react";
import * as React from "react";
import { defaultConfig } from "../../config/default-config";
import { focusRing } from "../../presentation/focus-ring";
import { cx } from "../../utils/cx";
import { DropdownItem } from "../dropdown-item/component";
import { Tag } from "../tag/component";

/**
 * Tag option interface for TagInput.
 */
export type TagOption = {
	/**
	 * Unique identifier for the tag.
	 */
	value: string;
	/**
	 * Display label for the tag.
	 */
	label: string;
	/**
	 * Whether the tag option is disabled.
	 */
	disabled?: boolean;
	/**
	 * Icon to display on the tag.
	 */
	icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
	/**
	 * Additional data for the tag.
	 */
	data?: Record<string, unknown>;
};

export type TagInputProps = {
	/**
	 * Array of available tag options to choose from.
	 */
	options: TagOption[];
	/**
	 * Currently selected tag values as an array of strings.
	 */
	value?: string[];
	/**
	 * Callback function called when the selection changes.
	 * Receives the new array of selected values.
	 */
	onValueChange?: (values: string[]) => void;
	/**
	 * Placeholder text shown when no tags are selected.
	 * @default "Add tags..."
	 */
	placeholder?: string;
	/**
	 * Placeholder text shown when some tags are already selected.
	 * @default "Add more tags..."
	 */
	selectedPlaceholder?: string;
	/**
	 * Message displayed when no options match the search query.
	 * @default "No options found."
	 */
	emptyMessage?: string;
	/**
	 * Whether the input is disabled and non-interactive.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Maximum number of tags that can be selected.
	 * When reached, input becomes disabled.
	 */
	maxTags?: number;
	/**
	 * Whether to allow creating new tags that don't exist in options.
	 * @default false
	 */
	allowCreate?: boolean;
	/**
	 * Additional CSS classes for the container element.
	 */
	className?: string;
	/**
	 * Additional CSS classes for the input element.
	 */
	inputClassName?: string;
	/**
	 * Additional CSS classes for the dropdown menu.
	 */
	dropdownClassName?: string;
	/**
	 * Additional CSS classes for individual tag elements.
	 */
	tagClassName?: string;
	/**
	 * Maximum height for the dropdown menu in pixels.
	 * @default 200
	 */
	maxHeight?: number;
	/**
	 * Stroke width for icons throughout the component.
	 */
	iconStrokeWidth?: number;
	/**
	 * Custom render function for dropdown items.
	 * Receives option, highlight state, and selection state.
	 */
	renderItem?: (
		option: TagOption,
		isHighlighted: boolean,
		isSelected: boolean,
	) => React.ReactNode;
	/**
	 * Custom render function for selected tags.
	 * Receives option and removal callback.
	 */
	renderTag?: (option: TagOption, onRemove: () => void) => React.ReactNode;
	/**
	 * Custom filter function for options based on input value.
	 * Receives options array and current input value.
	 */
	filterOptions?: (options: TagOption[], inputValue: string) => TagOption[];
	/**
	 * Function to validate new tag creation when allowCreate is true.
	 * Should return true if the value is valid for tag creation.
	 * @default (value: string) => value.trim().length > 0 && value.trim().length <= 50
	 */
	onValidate?: (value: string) => boolean;
	/**
	 * Function to create new tag option from input value when allowCreate is true.
	 * Receives input value and should return a TagOption object.
	 */
	onCreate?: (value: string) => TagOption;
	/**
	 * Whether tags should wrap to new lines or scroll horizontally.
	 * @default true
	 */
	wrap?: boolean;
};

/**
 * Default filter function for tag options.
 */
const defaultFilterOptions = (
	options: TagOption[],
	inputValue: string,
): TagOption[] => {
	if (!Array.isArray(options)) {
		return [];
	}
	if (!inputValue) {
		return options;
	}

	const lowercaseInput = inputValue.toLowerCase();
	return options.filter((option) =>
		option.label.toLowerCase().includes(lowercaseInput),
	);
};

/**
 * Default new tag validator.
 */
const defaultValidateNewTag = (value: string): boolean => {
	return value.trim().length > 0 && value.trim().length <= 50;
};

/**
 * Default new tag creator.
 */
const defaultCreateNewTag = (value: string): TagOption => {
	const trimmed = value.trim();
	return {
		value: trimmed.toLowerCase().replace(/\s+/g, "-"),
		label: trimmed,
	};
};

/**
 * Default empty array for value prop.
 */
const defaultValue: string[] = [];

/**
 * Default icon stroke width.
 */
const defaultIconStrokeWidth = defaultConfig.components.iconStrokeWidth;

/**
 * A sophisticated multi-select tag input component with search, filtering, and tag creation capabilities.
 */
const TagInput = ({
	options,
	value = defaultValue,
	onValueChange,
	placeholder = "Add tags...",
	selectedPlaceholder = "Add more tags...",
	emptyMessage = "No options found.",
	disabled = false,
	maxTags,
	allowCreate = false,
	className,
	inputClassName,
	dropdownClassName,
	tagClassName,
	maxHeight = 200,
	iconStrokeWidth = defaultIconStrokeWidth,
	renderItem,
	renderTag,
	filterOptions = defaultFilterOptions,
	onValidate = defaultValidateNewTag,
	onCreate = defaultCreateNewTag,
	wrap = true,
}: TagInputProps) => {
	const [inputValue, setInputValue] = React.useState("");

	const inputRef = React.useRef<HTMLInputElement>(null);

	// Ensure value is always an array to prevent runtime errors
	const safeValue = React.useMemo(
		() => (Array.isArray(value) ? value : []),
		[value],
	);

	// Create a complete options list that includes both provided options AND created tags
	const allOptions = React.useMemo(() => {
		const safeOptions = Array.isArray(options) ? options : [];
		const createdOptions: TagOption[] = [];

		// For each selected value, if it's not in options, it must be a created tag
		safeValue.forEach((val) => {
			const existsInOptions = safeOptions.some((opt) => opt.value === val);
			if (!existsInOptions) {
				// Reconstruct the created tag
				createdOptions.push({
					value: val,
					label: val, // Keep it simple - just use the stored value as label
				});
			}
		});

		return [...safeOptions, ...createdOptions];
	}, [options, safeValue]);

	// Get selected options for display
	const selectedOptions = React.useMemo(() => {
		return safeValue
			.map((val) => allOptions.find((opt) => opt.value === val))
			.filter(Boolean) as TagOption[];
	}, [safeValue, allOptions]);

	// Filter available options (exclude already selected)
	const availableOptions = React.useMemo(() => {
		const safeFilterOptions =
			typeof filterOptions === "function"
				? filterOptions
				: defaultFilterOptions;
		const filteredResult = safeFilterOptions(allOptions, inputValue);
		const filtered = Array.isArray(filteredResult) ? filteredResult : [];
		const finalFiltered = filtered.filter(
			(option) =>
				option && !safeValue.includes(option.value) && !option.disabled,
		);

		// Add "create new" option if allowed and input is valid
		if (allowCreate && inputValue.trim() && onValidate(inputValue)) {
			const exactMatch = allOptions.find(
				(opt) => opt.label.toLowerCase() === inputValue.trim().toLowerCase(),
			);

			if (
				!exactMatch &&
				!safeValue.includes(
					inputValue.trim().toLowerCase().replace(/\s+/g, "-"),
				)
			) {
				const newTagOption: TagOption = {
					...onCreate(inputValue),
					data: { isNew: true },
				};
				finalFiltered.unshift(newTagOption);
			}
		}

		return finalFiltered;
	}, [
		allOptions,
		safeValue,
		inputValue,
		allowCreate,
		onValidate,
		onCreate,
		filterOptions,
	]);

	// Downshift setup
	const {
		isOpen,
		getToggleButtonProps: _getToggleButtonProps,
		getLabelProps,
		getMenuProps,
		getInputProps,
		highlightedIndex,
		getItemProps,
		selectItem: _selectItem,
		reset,
	} = useCombobox<TagOption>({
		items: availableOptions,
		itemToString: (item) => (item ? item.label : ""),
		inputValue,
		onInputValueChange: ({ inputValue: newInputValue }) => {
			setInputValue(newInputValue || "");
		},
		onSelectedItemChange: ({ selectedItem }) => {
			if (selectedItem) {
				const newValues = [...safeValue, selectedItem.value];
				onValueChange?.(newValues);
				setInputValue("");
				reset();
			}
		},
		stateReducer: (state, actionAndChanges) => {
			const { type, changes } = actionAndChanges;

			switch (type) {
				case useCombobox.stateChangeTypes.ItemClick:
					return {
						...changes,
						isOpen: false,
						inputValue: "",
					};
				case useCombobox.stateChangeTypes.InputKeyDownEnter:
					// For Enter key, only clear input if an item was actually selected
					return {
						...changes,
						isOpen: false,
						inputValue: changes.selectedItem ? "" : state.inputValue,
					};
				case useCombobox.stateChangeTypes.InputBlur:
					return {
						...changes,
						inputValue: state.inputValue, // Keep input value on blur
					};
				default:
					return changes;
			}
		},
	});

	// Handle tag removal
	const handleRemoveTag = (tagValue: string) => {
		const newValues = safeValue.filter((val) => val !== tagValue);
		onValueChange?.(newValues);
	};

	// Handle keyboard navigation for tags
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && inputValue === "" && safeValue.length > 0) {
			// Remove last tag when backspace is pressed on empty input
			handleRemoveTag(safeValue[safeValue.length - 1]);
		} else if (
			e.key === "Enter" &&
			allowCreate &&
			inputValue.trim() &&
			onValidate(inputValue)
		) {
			// Handle Enter key for tag creation
			const exactMatch = options.find(
				(opt) => opt.label.toLowerCase() === inputValue.trim().toLowerCase(),
			);

			if (
				!exactMatch &&
				!safeValue.includes(
					inputValue.trim().toLowerCase().replace(/\s+/g, "-"),
				)
			) {
				// Create new tag
				const newTag = onCreate(inputValue);
				const newValues = [...safeValue, newTag.value];
				onValueChange?.(newValues);
				setInputValue("");
				e.preventDefault();
			}
		}
	};

	// Check if max tags reached
	const isMaxReached = maxTags ? safeValue.length >= maxTags : false;

	// Render individual tag
	const renderSelectedTag = (option: TagOption) => {
		if (renderTag) {
			return renderTag(option, () => handleRemoveTag(option.value));
		}

		return (
			<Tag
				key={option.value}
				value={option.label}
				icon={option.icon}
				dismissible
				onDismiss={() => handleRemoveTag(option.value)}
				className={cx("text-xs", tagClassName)}
			/>
		);
	};

	// Render dropdown item
	const renderDropdownItem = (option: TagOption, index: number) => {
		const isHighlighted = highlightedIndex === index;
		const isSelected = safeValue.includes(option.value);
		const isNewTag = option.data?.isNew;

		if (renderItem) {
			return renderItem(option, isHighlighted, isSelected);
		}

		return (
			<DropdownItem
				leftIcon={option.icon}
				rightIcon={isSelected ? Check : undefined}
				highlighted={isHighlighted}
				selected={isSelected}
				disabled={option.disabled}
				iconStrokeWidth={iconStrokeWidth}
			>
				{isNewTag ? `Create "${option.label}"` : option.label}
			</DropdownItem>
		);
	};

	return (
		<div
			className={cx("relative w-full max-w-sm", className)}
			data-testid="tag-input"
		>
			{/* Hidden label for accessibility */}
			<label {...getLabelProps()} className="sr-only">
				{placeholder}
			</label>

			{/* Main input container */}
			<div
				className={cx(
					"h-control-base w-full rounded-md border  dark:border-zinc-800 bg-white dark:bg-zinc-950",
					"flex items-center gap-1 px-2 py-1",
					wrap ? "flex-wrap" : "overflow-x-auto",
					focusRing,
					disabled &&
						"opacity-50 cursor-not-allowed bg-zinc-50 dark:bg-zinc-900",
				)}
				onClick={() => {
					if (!disabled && !isMaxReached) {
						inputRef.current?.focus({ preventScroll: true });
					}
				}}
			>
				{/* Selected tags */}
				{wrap ? (
					<div className="flex items-center gap-1 flex-wrap">
						{selectedOptions.map(renderSelectedTag)}
					</div>
				) : (
					<div className="flex items-center gap-1 flex-shrink-0">
						{selectedOptions.map(renderSelectedTag)}
					</div>
				)}

				{/* Input field */}
				{!isMaxReached && (
					<input
						{...getInputProps({
							ref: inputRef,
							id: "tag-input",
							placeholder:
								selectedOptions.length > 0 ? selectedPlaceholder : placeholder,
							disabled,
							onKeyDown: handleKeyDown,
							className: cx(
								"flex-1 min-w-0 bg-transparent border-none outline-none text-sm",
								"placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
								selectedOptions.length > 0 && "ml-1",
								inputClassName,
							),
						})}
					/>
				)}

				{/* Max tags indicator */}
				{isMaxReached && (
					<span className="text-xs text-zinc-500 dark:text-zinc-400 px-2">
						Max {maxTags} tags
					</span>
				)}
			</div>

			{/* Dropdown */}
			<div
				{...getMenuProps({
					className: cx(
						"absolute z-50 w-full mt-1 bg-white dark:bg-zinc-950 border  dark:border-zinc-800 rounded-md shadow-lg",
						"overflow-hidden",
						(!isOpen || isMaxReached) &&
							"opacity-0 pointer-events-none invisible",
						dropdownClassName as string,
					),
				})}
				style={{ maxHeight }}
			>
				{isOpen &&
					!isMaxReached &&
					(availableOptions.length > 0 ? (
						<div className="overflow-auto" style={{ maxHeight }}>
							{availableOptions.map((option, index) => (
								<div
									key={
										option.data?.isNew ? `create-${option.value}` : option.value
									}
									{...getItemProps({
										item: option,
										index,
										disabled: option.disabled,
									})}
									className={cx(
										option.data?.isNew === true &&
											"border-t  dark:border-zinc-800",
									)}
								>
									{renderDropdownItem(option, index)}
								</div>
							))}
						</div>
					) : (
						inputValue && (
							<div className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">
								{emptyMessage}
							</div>
						)
					))}
			</div>
		</div>
	);
};

TagInput.displayName = "TagInput";

/**
 * Hook for managing tag input state.
 */
export function useTagInput(initialValues: string[] = []) {
	const [values, setValues] = React.useState<string[]>(initialValues);

	const addTag = React.useCallback((value: string) => {
		setValues((prev) => (prev.includes(value) ? prev : [...prev, value]));
	}, []);

	const removeTag = React.useCallback((value: string) => {
		setValues((prev) => prev.filter((v) => v !== value));
	}, []);

	const clearTags = React.useCallback(() => {
		setValues([]);
	}, []);

	const hasTag = React.useCallback(
		(value: string) => {
			return values.includes(value);
		},
		[values],
	);

	return {
		/**
		 * Current tag values.
		 */
		values,
		/**
		 * Set tag values.
		 */
		setValues,
		/**
		 * Add a single tag.
		 */
		addTag,
		/**
		 * Remove a single tag.
		 */
		removeTag,
		/**
		 * Clear all tags.
		 */
		clearTags,
		/**
		 * Check if a tag is selected.
		 */
		hasTag,
		/**
		 * Number of selected tags.
		 */
		count: values.length,
	};
}

export { TagInput };
