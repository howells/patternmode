"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Icon } from "@patternmode/icon";
import { Input } from "@patternmode/input";
import { Tag } from "@patternmode/tag";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import { Check, X } from "lucide-react";
import * as React from "react";

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
    isSelected: boolean
  ) => React.ReactNode;
  renderTag?: (option: TagOption, onRemove: () => void) => React.ReactNode;
  filterOptions?: (options: TagOption[], inputValue: string) => TagOption[];
  onValidate?: (value: string) => boolean;
  onCreate?: (value: string) => TagOption;
  wrap?: boolean;
  size?: "2xs" | "xs" | "sm" | "base" | "lg";
  clearable?: boolean;
};

const defaultFilterOptions = (
  options: TagOption[],
  inputValue: string
): TagOption[] => {
  if (!Array.isArray(options)) return [];
  if (!inputValue) return options;
  const lowercaseInput = inputValue.toLowerCase();
  return options.filter((option) =>
    option.label.toLowerCase().includes(lowercaseInput)
  );
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
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  renderItem,
  renderTag,
  filterOptions = defaultFilterOptions,
  onValidate = defaultValidateNewTag,
  onCreate = defaultCreateNewTag,
  wrap = true,
  size = "base",
  clearable = true,
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
    const optionsList = availableOptions.filter(
      (opt) => !selectedValues.has(opt.value)
    );
    
    if (
      allowCreate &&
      inputValue.trim().length > 0 &&
      onValidate(inputValue) &&
      !options.some(
        (o) =>
          o.label.toLowerCase() === lowerInput ||
          o.value.toLowerCase() === lowerInput
      )
    ) {
      const newTag = onCreate(inputValue);
      return [newTag, ...optionsList];
    }
    return optionsList;
  }, [
    allowCreate,
    availableOptions,
    inputValue,
    onCreate,
    onValidate,
    options,
    selectedValues,
  ]);

  const canAddMore = typeof maxTags === "number" ? value.length < maxTags : true;
  const isInputDisabled = disabled || !canAddMore;

  const handleSelect = (selectedValue: string) => {
    const option = [...availableOptions, ...getFilteredOptions].find(
      (opt) => opt.value === selectedValue
    );
    if (!option || option.disabled) return;

    const newValues = new Set(value);
    if (selectedValues.has(option.value)) {
      newValues.delete(option.value);
    } else {
      newValues.add(option.value);
    }
    onValueChange?.(Array.from(newValues));
    setInputValue(""); // Clear input after selection
  };

  const handleRemoveTag = (valueToRemove: string) => {
    onValueChange?.(value.filter((v) => v !== valueToRemove));
  };

  const handleClearAll = () => {
    onValueChange?.([]);
  };

  const valueToItem = React.useMemo(() => {
    const m = new Map<string, TagOption>();
    for (const it of getFilteredOptions) m.set(it.value, it);
    return m;
  }, [getFilteredOptions]);

  return (
    <div className={cx("w-full", className)} data-testid="tag-input">
      <div
        className={cx(
          "flex items-center gap-2 rounded-md border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950",
          "focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500",
          wrap ? "flex-wrap" : "overflow-x-auto",
          isInputDisabled ? "cursor-not-allowed opacity-60" : ""
        )}
      >
        {/* Selected Tags */}
        {value.map((val) => {
          const option = options.find((o) => o.value === val);
          if (!option) return null;
          const onRemove = () => handleRemoveTag(val);
          
          if (renderTag) {
            return (
              <React.Fragment key={val}>
                {renderTag(option, onRemove)}
              </React.Fragment>
            );
          }
          
          return (
            <Tag
              className={tagClassName}
              dismissible
              key={val}
              onDismiss={onRemove}
              value={option.label}
            />
          );
        })}

        {/* Clear All Button */}
        {clearable && value.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className={cx(
              "flex h-6 w-6 items-center justify-center rounded-full",
              "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-400",
              "transition-colors duration-150",
              focusRing
            )}
            aria-label="Clear all tags"
          >
            <Icon icon={X} size="xs" strokeWidth={iconStrokeWidth} />
          </button>
        )}

        {/* Combobox for Adding Tags */}
        <BaseCombobox.Root
          items={getFilteredOptions.map((opt) => opt.value)}
          value={[]} // Always empty since we manage selections separately
          onValueChange={(next) => {
            const selectedValue = Array.isArray(next) ? next[next.length - 1] : next;
            if (selectedValue) {
              handleSelect(String(selectedValue));
            }
          }}
          filter={(val: unknown, input: string) => {
            const it = valueToItem.get(String(val));
            if (!it) return false;
            return it.label.toLowerCase().includes(input.toLowerCase());
          }}
          onOpenChange={setIsOpen}
          disabled={isInputDisabled}
        >
          <BaseCombobox.Input
            value={inputValue}
            onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
            placeholder={value.length > 0 ? selectedPlaceholder : placeholder}
            render={({ className: inputClass, ref: inputRef, ...inputProps }) => (
              <Input
                className={cx(
                  "min-w-[8ch] flex-1 border-none bg-transparent shadow-none focus:ring-0",
                  inputClassName,
                  inputClass
                )}
                externalRef={inputRef as React.RefObject<HTMLInputElement>}
                size={size}
                disabled={isInputDisabled}
                minimal
                {...inputProps}
              />
            )}
          />

          <BaseCombobox.Portal>
            <BaseCombobox.Positioner>
              <BaseCombobox.Popup
                className={cx(
                  "mt-2 w-full rounded-md border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950",
                  "max-h-64 overflow-y-auto isolate", // Create proper stacking context per Base UI recommendations
                  "scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 dark:scrollbar-track-zinc-800 dark:scrollbar-thumb-zinc-600",
                  dropdownClassName
                )}
                style={{ maxHeight }}
                data-testid="tag-input-dropdown"
              >
                {isOpen && getFilteredOptions.length === 0 && (
                  <div className="p-2 text-sm text-zinc-500">{emptyMessage}</div>
                )}
                
                {isOpen && getFilteredOptions.length > 0 && (
                  <BaseCombobox.List>
                    {(val: string, index: number) => {
                      const option = valueToItem.get(val);
                      if (!option) return null;

                      const isSelected = selectedValues.has(option.value);
                      
                      if (renderItem) {
                        return (
                          <BaseCombobox.Item
                            key={val}
                            index={index}
                            value={val}
                            className="outline-none"
                          >
                            {renderItem(option, false, isSelected)}
                          </BaseCombobox.Item>
                        );
                      }

                      const OptionIcon = option.icon;
                      
                      return (
                        <BaseCombobox.Item
                          key={val}
                          index={index}
                          value={val}
                          className={cx(
                            "grid cursor-pointer select-none grid-cols-[0.75rem_1fr_1rem] items-center gap-2",
                            "rounded-md px-2 py-1.5 text-sm outline-none",
                            "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                            "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800",
                            option.disabled && "cursor-not-allowed opacity-50"
                          )}
                          disabled={option.disabled}
                        >
                          <div className="col-start-1">
                            {isSelected && (
                              <Icon 
                                icon={Check} 
                                size="xs" 
                                strokeWidth={iconStrokeWidth}
                                className="text-blue-600 dark:text-blue-400" 
                              />
                            )}
                          </div>
                          <div className="col-start-2 flex min-w-0 items-center gap-2">
                            {OptionIcon && (
                              <Icon 
                                icon={OptionIcon} 
                                size="xs" 
                                strokeWidth={iconStrokeWidth}
                              />
                            )}
                            <span className="truncate">{option.label}</span>
                          </div>
                        </BaseCombobox.Item>
                      );
                    }}
                  </BaseCombobox.List>
                )}
              </BaseCombobox.Popup>
            </BaseCombobox.Positioner>
          </BaseCombobox.Portal>
        </BaseCombobox.Root>
      </div>
    </div>
  );
};

TagInput.displayName = "TagInput";

export { TagInput };

export const useTagInput = (initialValues: string[] = []) => {
  const [values, setValues] = React.useState<string[]>(initialValues);
  const addTag = (value: string) =>
    setValues((prev) => (prev.includes(value) ? prev : [...prev, value]));
  const removeTag = (value: string) =>
    setValues((prev) => prev.filter((v) => v !== value));
  const clearTags = () => setValues([]);
  const hasTag = (value: string) => values.includes(value);
  const count = values.length;
  return {
    values,
    setValues,
    addTag,
    removeTag,
    clearTags,
    hasTag,
    count,
  } as const;
};