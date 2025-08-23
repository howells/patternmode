"use client";

import { defaultConfig } from "@patternmode/config/default-config";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import { useCombobox } from "downshift";
import { Check } from "lucide-react";
import * as React from "react";
import { DropdownItem } from "@patternmode/dropdown-item";
import { Tag } from "@patternmode/tag";

export type TagOption = {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  data?: Record<string, unknown>;
};

export type TagInputProps = {
  options: TagOption[];
  value?: string[];
  onValueChange?: (values: string[]) => void;
  placeholder?: string;
  selectedPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  maxTags?: number;
  allowCreate?: boolean;
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  tagClassName?: string;
  maxHeight?: number;
  iconStrokeWidth?: number;
  renderItem?: (
    option: TagOption,
    isHighlighted: boolean,
    isSelected: boolean,
  ) => React.ReactNode;
  renderTag?: (option: TagOption, onRemove: () => void) => React.ReactNode;
  filterOptions?: (options: TagOption[], inputValue: string) => TagOption[];
  onValidate?: (value: string) => boolean;
  onCreate?: (value: string) => TagOption;
  wrap?: boolean;
};

const defaultFilterOptions = (options: TagOption[], inputValue: string): TagOption[] => {
  if (!Array.isArray(options)) return [];
  if (!inputValue) return options;
  const lowercaseInput = inputValue.toLowerCase();
  return options.filter((option) => option.label.toLowerCase().includes(lowercaseInput));
};

const defaultValidateNewTag = (value: string): boolean => {
  return value.trim().length > 0 && value.trim().length <= 50;
};

const defaultCreateNewTag = (value: string): TagOption => {
  const trimmed = value.trim();
  return {
    value: trimmed.toLowerCase().replace(/\s+/g, "-"),
    label: trimmed,
  };
};

const defaultValue: string[] = [];
const defaultIconStrokeWidth = defaultConfig.components.iconStrokeWidth;

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
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedValues = React.useMemo(() => new Set(value), [value]);

  const availableOptions = React.useMemo(() => {
    const filtered = filterOptions(options, inputValue);
    if (!Array.isArray(filtered)) return [];
    const uniqueValues = new Set<string>();
    return filtered.filter((opt) => {
      if (!opt || typeof opt.value !== "string") return false;
      if (uniqueValues.has(opt.value)) return false;
      uniqueValues.add(opt.value);
      return true;
    });
  }, [options, inputValue, filterOptions]);

  const getFilteredOptions = React.useMemo(() => {
    const lowerInput = inputValue.toLowerCase();
    const optionsList = availableOptions.filter((opt) => !selectedValues.has(opt.value));
    if (
      allowCreate &&
      inputValue.trim().length > 0 &&
      !options.some((o) => o.label.toLowerCase() === lowerInput || o.value.toLowerCase() === lowerInput)
    ) {
      const newTag = onCreate(inputValue);
      return [newTag, ...optionsList];
    }
    return optionsList;
  }, [allowCreate, availableOptions, inputValue, onCreate, options, selectedValues]);

  const {
    isOpen: comboboxIsOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    openMenu,
  } = useCombobox({
    items: getFilteredOptions,
    inputValue,
    isOpen,
    onInputValueChange: ({ inputValue }) => setInputValue(inputValue ?? ""),
    onIsOpenChange: ({ isOpen }) => setIsOpen(isOpen),
    itemToString: (item) => (item ? item.label : ""),
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges as any;
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return { ...changes, isOpen: false };
        default:
          return changes;
      }
    },
  });

  const handleSelect = (option: TagOption) => {
    if (option.disabled) return;
    const newValues = new Set(value);
    if (selectedValues.has(option.value)) newValues.delete(option.value);
    else newValues.add(option.value);
    onValueChange?.(Array.from(newValues));
  };

  const canAddMore = typeof maxTags === "number" ? value.length < maxTags : true;
  const isInputDisabled = disabled || !canAddMore;

  const renderDropdownItem = (option: TagOption, index: number) => {
    const isHighlighted = index === highlightedIndex;
    const isSelected = selectedValues.has(option.value);
    if (renderItem) return renderItem(option, isHighlighted, isSelected);
    const LeftIcon = option.icon;
    return (
      <DropdownItem
        key={option.value}
        leftIcon={LeftIcon}
        rightIcon={isSelected ? Check : undefined}
        highlighted={isHighlighted}
        selected={isSelected}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => handleSelect(option)}
      >
        {option.label}
      </DropdownItem>
    );
  };

  return (
    <div className={cx("w-full", className)} data-testid="tag-input">
      <div
        className={cx(
          "flex items-center gap-2 rounded-md border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950",
          focusRing(),
          wrap ? "flex-wrap" : "overflow-x-auto",
          isInputDisabled ? "opacity-60 cursor-not-allowed" : "",
        )}
      >
        {value.map((val) => {
          const option = options.find((o) => o.value === val);
          if (!option) return null;
          const onRemove = () => onValueChange?.(value.filter((v) => v !== val));
          if (renderTag) return <React.Fragment key={val}>{renderTag(option, onRemove)}</React.Fragment>;
          return (
            <Tag
              key={val}
              value={option.label}
              dismissible
              onDismiss={onRemove}
              className={tagClassName}
            />
          );
        })}
        <input
          {...getInputProps({
            onFocus: openMenu,
            disabled: isInputDisabled,
            placeholder: value.length > 0 ? selectedPlaceholder : placeholder,
            className: cx(
              "min-w-[8ch] flex-1 bg-transparent outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
              inputClassName,
            ),
          })}
        />
      </div>
      <ul
        {...getMenuProps({
          className: cx(
            "mt-2 max-h-64 w-full overflow-y-auto rounded-md border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
            dropdownClassName,
          ),
          style: { maxHeight },
        })}
      >
        {comboboxIsOpen && getFilteredOptions.length === 0 && (
          <li className="p-2 text-sm text-zinc-500">{emptyMessage}</li>
        )}
        {comboboxIsOpen &&
          getFilteredOptions.map((option, index) => (
            <li key={option.value} {...getItemProps({ item: option, index })}>
              {renderDropdownItem(option, index)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export { TagInput };

export const useTagInput = (initialValues: string[] = []) => {
  const [values, setValues] = React.useState<string[]>(initialValues);
  const addTag = (value: string) => setValues((prev) => (prev.includes(value) ? prev : [...prev, value]));
  const removeTag = (value: string) => setValues((prev) => prev.filter((v) => v !== value));
  const clearTags = () => setValues([]);
  const hasTag = (value: string) => values.includes(value);
  const count = values.length;
  return { values, setValues, addTag, removeTag, clearTags, hasTag, count } as const;
};

