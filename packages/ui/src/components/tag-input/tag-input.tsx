"use client";

import { useCombobox } from "downshift";
import { Check } from "lucide-react";
import * as React from "react";

import { config } from "../../lib/config";
import { cx, focusRing } from "../../lib/utils";
import { Button } from "../button/button";
import { DropdownItem } from "../dropdown-item/dropdown-item";
import { Icon } from "../icon/icon";
import { Tag } from "../tag/tag";

/**
 * Tag option interface for TagInput.
 * @example
 * ```tsx
 * <TagInput>Content</TagInput>
 * ```
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
   * Icon to display on the left side.
   */
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Additional data for the tag.
   */
  data?: Record<string, unknown>;
};

/**
 * Props for the TagInput component.
 */
export type TagInputProps = {
  /**
   * Array of available tag options.
   */
  options: TagOption[];
  /**
   * Currently selected tag values.
   */
  value?: string[];
  /**
   * Callback when selection changes.
   */
  onValueChange?: (values: string[]) => void;
  /**
   * Placeholder text for the input.
   */
  placeholder?: string;
  /**
   * Placeholder text when tags are selected.
   */
  selectedPlaceholder?: string;
  /**
   * Message shown when no options match search.
   */
  emptyMessage?: string;
  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;
  /**
   * Maximum number of tags that can be selected.
   */
  maxTags?: number;
  /**
   * Whether to allow creating new tags not in options.
   */
  allowCreate?: boolean;
  /**
   * Additional CSS classes for container.
   */
  className?: string;
  /**
   * Additional CSS classes for input.
   */
  inputClassName?: string;
  /**
   * Additional CSS classes for dropdown.
   */
  dropdownClassName?: string;
  /**
   * Additional CSS classes for individual tags.
   */
  tagClassName?: string;
  /**
   * Maximum height for dropdown.
   */
  maxHeight?: number;
  /**
   * Stroke width for icons.
   */
  iconStrokeWidth?: number;
  /**
   * Custom render function for dropdown items.
   */
  renderItem?: (
    option: TagOption,
    isHighlighted: boolean,
    isSelected: boolean
  ) => React.ReactNode;
  /**
   * Custom render function for selected tags.
   */
  renderTag?: (option: TagOption, onRemove: () => void) => React.ReactNode;
  /**
   * Custom filter function for options.
   */
  filterOptions?: (options: TagOption[], inputValue: string) => TagOption[];
  /**
   * Function to validate new tag creation.
   */
  onValidate?: (value: string) => boolean;
  /**
   * Function to create new tag option from input.
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
  return options.filter(option =>
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
const defaultIconStrokeWidth = config.getIconStrokeWidth();

/**
 * A sophisticated multi-select tag input component with search, filtering, and tag creation capabilities.
 *
 * Built on Downshift for robust accessibility and keyboard navigation, this component provides
 * an intuitive interface for selecting multiple items from a searchable dropdown while displaying
 * selected items as dismissible tags. Supports both selection from predefined options and
 * dynamic creation of new tags with validation.
 *
 * **Key Features:**
 * - **Multi-select**: Select multiple tags with visual confirmation and easy removal
 * - **Search & Filter**: Real-time filtering of options as you type
 * - **Tag Creation**: Optionally allow users to create new tags on-the-fly
 * - **Keyboard Navigation**: Full keyboard accessibility with arrow keys, enter, and backspace
 * - **Validation**: Custom validation for new tag creation
 * - **Customization**: Flexible rendering options for both tags and dropdown items
 * - **Limits**: Configurable maximum number of selected tags
 * - **Form Integration**: Works seamlessly with form libraries and validation systems.
 *
 * **Accessibility:**
 * - Screen reader announcements for tag selection/removal
 * - Keyboard navigation through dropdown options
 * - ARIA labels and descriptions for better accessibility
 * - Focus management and visual focus indicators.
 *
 * @category inputs
 * @icon Tags
 * @example
 * ```tsx
 * // Basic tag input with predefined options
 * <TagInput
 *   options={[
 *     { value: "react", label: "React" },
 *     { value: "typescript", label: "TypeScript" },
 *     { value: "nextjs", label: "Next.js" }
 *   ]}
 *   value={selectedTags}
 *   onValueChange={setSelectedTags}
 *   placeholder="Add technologies..."
 * />
 *
 * // With tag creation, limits, and validation
 * <TagInput
 *   options={skillOptions}
 *   value={skills}
 *   onValueChange={setSkills}
 *   placeholder="Add skills..."
 *   allowCreate={true}
 *   maxTags={5}
 *   validateNewTag={(value) => value.length >= 2 && value.length <= 20}
 *   emptyMessage="No skills found. Type to create a new one."
 * />
 *
 * // Custom rendering with avatars
 * <TagInput
 *   options={userOptions}
 *   value={assignedUsers}
 *   onValueChange={setAssignedUsers}
 *   placeholder="Assign users..."
 *   renderTag={(option, onRemove) => (
 *     <Tag
 *       value={option.label}
 *       avatar={{ initials: option.label.split(' ').map(n => n[0]).join('') }}
 *       dismissible
 *       onDismiss={onRemove}
 *     />
 *   )}
 *   renderItem={(option, isHighlighted, isSelected) => (
 *     <div className={`flex items-center gap-2 ${isHighlighted ? 'bg-blue-50' : ''}`}>
 *       <Avatar initials={option.label.split(' ').map(n => n[0]).join('')} size="sm" />
 *       <span>{option.label}</span>
 *       {isSelected && <Check className="ml-auto" />}
 *     </div>
 *   )}
 * />
 *
 * // Form integration with error handling
 * <TagInput
 *   options={categoryOptions}
 *   value={formData.categories}
 *   onValueChange={(values) => setFormData(prev => ({ ...prev, categories: values }))}
 *   placeholder="Select categories..."
 *   disabled={isSubmitting}
 *   maxTags={3}
 *   className={errors.categories ? "border-red-500" : ""}
 * />
 * ```
 */
/**
 * Multi-select tag input component with search, filtering, and dynamic tag creation capabilities.
 *
 * @id tag-input
 * @name TagInput
 * @icon Tags
 * @category inputs
 * @component
 * @param props - Component properties.
 * @param props.options - Array of available tag options.
 * @param props.value - Currently selected tag values.
 * @param props.onValueChange - Callback when selection changes.
 * @param props.placeholder - Placeholder text for the input.
 * @param props.selectedPlaceholder - Placeholder text when tags are selected.
 * @param props.emptyMessage - Message shown when no options match search.
 * @param props.disabled - Whether the input is disabled.
 * @param props.maxTags - Maximum number of tags that can be selected.
 * @param props.allowCreate - Whether to allow creating new tags not in options.
 * @param props.className - Additional CSS classes for container.
 * @param props.inputClassName - Additional CSS classes for input.
 * @param props.dropdownClassName - Additional CSS classes for dropdown.
 * @param props.tagClassName - Additional CSS classes for individual tags.
 * @param props.maxHeight - Maximum height for dropdown.
 * @param props.iconStrokeWidth - Stroke width for icons.
 * @param props.renderItem - Custom render function for dropdown items.
 * @param props.renderTag - Custom render function for selected tags.
 * @param props.filterOptions - Custom filter function for options.
 * @param props.onValidate - Function to validate new tag creation.
 * @param props.onCreate - Function to create new tag option from input.
 * @param props.wrap - Whether tags should wrap to new lines or scroll horizontally.
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
  const safeValue = React.useMemo(() => Array.isArray(value) ? value : [], [value]);

  // Get selected options for display
  const selectedOptions = React.useMemo(() => {
    const safeOptions = Array.isArray(options) ? options : [];
    return safeValue
      .map(val => safeOptions.find(opt => opt.value === val))
      .filter(Boolean) as TagOption[];
  }, [safeValue, options]);

  // Filter available options (exclude already selected)
  const availableOptions = React.useMemo(() => {
    // Ensure options is always an array
    const safeOptions = Array.isArray(options) ? options : [];
    const safeFilterOptions = typeof filterOptions === "function" ? filterOptions : defaultFilterOptions;
    const filteredResult = safeFilterOptions(safeOptions, inputValue);
    const filtered = Array.isArray(filteredResult) ? filteredResult : [];
    const finalFiltered = filtered.filter(
      option => !safeValue.includes(option.value) && !option.disabled,
    );

    // Add "create new" option if allowed and input is valid
    if (allowCreate && inputValue.trim() && onValidate(inputValue)) {
      const exactMatch = safeOptions.find(
        opt => opt.label.toLowerCase() === inputValue.trim().toLowerCase(),
      );

      if (
        !exactMatch
        && !safeValue.includes(
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
    options,
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
  } = useCombobox({
    items: availableOptions,
    itemToString: item => (item ? item.label : ""),
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
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: false,
            inputValue: "",
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
    const newValues = safeValue.filter(val => val !== tagValue);
    onValueChange?.(newValues);
  };

  // Handle keyboard navigation for tags
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && inputValue === "" && safeValue.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      handleRemoveTag(safeValue[safeValue.length - 1]);
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
        leftIcon={option.leftIcon}
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
    <div className={cx("relative", className)}>
      {/* Hidden label for accessibility */}
      <label {...getLabelProps()} className="sr-only">
        {placeholder}
      </label>

      {/* Main input container */}
      <div
        className={cx(
          "min-h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950",
          "flex items-center gap-1 p-2",
          wrap ? "flex-wrap" : "overflow-x-auto",
          focusRing,
          disabled
          && "opacity-50 cursor-not-allowed bg-zinc-50 dark:bg-zinc-900",
        )}
        onClick={() => {
          if (!disabled && !isMaxReached) {
            inputRef.current?.focus({ preventScroll: true });
          }
        }}
      >
        {/* Selected tags */}
        {wrap
          ? (
              selectedOptions.map(renderSelectedTag)
            )
          : (
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
                inputClassName,
              ),
            })}
          />
        )}

        {/* Max tags indicator */}
        {isMaxReached && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400 px-2">
            Max
            {" "}
            {maxTags}
            {" "}
            tags
          </span>
        )}
      </div>

      {/* Dropdown */}
      <div
        {...getMenuProps({
          className: cx(
            "absolute z-50 w-full mt-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg",
            "overflow-hidden",
            (!isOpen || isMaxReached)
            && "opacity-0 pointer-events-none invisible",
            dropdownClassName as string,
          ),
        })}
        style={{ maxHeight }}
      >
        {isOpen && !isMaxReached && (
          <>
            {availableOptions.length > 0
              ? (
                  <div className="overflow-auto" style={{ maxHeight }}>
                    {availableOptions.map((option, index) => (
                      <div
                        key={`${option.value}-${index}`}
                        {...getItemProps({
                          item: option,
                          index,
                          disabled: option.disabled,
                        })}
                        className={cx(
                          option.data?.isNew === true
                          && "border-t border-zinc-200 dark:border-zinc-800",
                        )}
                      >
                        {renderDropdownItem(option, index)}
                      </div>
                    ))}
                  </div>
                )
              : (
                  inputValue && (
                    <div className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                      {emptyMessage}
                    </div>
                  )
                )}
          </>
        )}
      </div>
    </div>
  );
};

TagInput.displayName = "TagInput";

export { TagInput };

/**
 * Hook for managing tag input state.
 */
export function useTagInput(initialValues: string[] = []) {
  const [values, setValues] = React.useState<string[]>(initialValues);

  const addTag = React.useCallback((value: string) => {
    setValues(prev => (prev.includes(value) ? prev : [...prev, value]));
  }, []);

  const removeTag = React.useCallback((value: string) => {
    setValues(prev => prev.filter(v => v !== value));
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
