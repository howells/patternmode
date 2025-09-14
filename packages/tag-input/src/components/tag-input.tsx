"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Icon } from "@patternmode/icon";
import { Input } from "@patternmode/input";
import { Tag } from "@patternmode/tag";
import { cx } from "@patternmode/utils/cx";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
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
  if (!Array.isArray(options)) {
    return [];
  }
  if (!inputValue) {
    return options;
  }
  const lowercaseInput = inputValue.toLowerCase();
  return options.filter((option) =>
    option.label.toLowerCase().includes(lowercaseInput)
  );
};

const MAX_NEW_TAG_LENGTH = 50;
const defaultValidateNewTag = (value: string): boolean => {
  const len = value.trim().length;
  return len > 0 && len <= MAX_NEW_TAG_LENGTH;
};

const defaultCreateNewTag = (value: string): TagOption => {
  const trimmed = value.trim();
  return {
    value: trimmed.toLowerCase().replace(/\s+/g, "-"),
    label: trimmed,
  };
};

const defaultValue: string[] = [];

export const TagInput = ({
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
    if (!Array.isArray(filtered)) {
      return [];
    }
    const uniqueValues = new Set<string>();
    return filtered.filter((opt) => {
      if (!opt || typeof opt.value !== "string") {
        return false;
      }
      if (uniqueValues.has(opt.value)) {
        return false;
      }
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
      !optionsList.some((opt) => opt.label.toLowerCase() === lowerInput)
    ) {
      const newTag = onCreate(inputValue);
      if (newTag && typeof newTag.value === "string") {
        return [newTag, ...optionsList];
      }
    }
    return optionsList;
  }, [allowCreate, availableOptions, inputValue, onCreate, selectedValues]);

  const isAtMax = typeof maxTags === "number" && value.length >= maxTags;
  const showInput = !isAtMax;

  const onValueAdd = (newValue: string) => {
    if (selectedValues.has(newValue)) {
      return;
    }
    const newValues = [...value, newValue];
    onValueChange?.(newValues);
    setInputValue("");
  };

  const onValueRemove = (removeValue: string) => {
    const newValues = value.filter((v) => v !== removeValue);
    onValueChange?.(newValues);
  };

  const onInputChange = (newValue: string) => {
    setInputValue(newValue);
    setIsOpen(true);
  };

  const onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const trimmedValue = inputValue.trim();
      if (!onValidate(trimmedValue)) {
        return;
      }
      const label = trimmedValue;
      const newOption = onCreate(trimmedValue);
      onValueAdd(newOption.value || label);
      event.preventDefault();
      return;
    }

    if (event.key === "Backspace" && inputValue === "" && value.length > 0) {
      const last = value.at(-1);
      if (last) {
        onValueRemove(last);
      }
      event.preventDefault();
    }
  };

  return (
    <div className={cx("flex w-full flex-col gap-2", className)}>
      <div
        className={cx(
          "flex min-h-[40px] w-full items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 dark:placeholder:text-zinc-400",
          focusRing,
          disabled && "opacity-50"
        )}
      >
        <div
          className={cx(
            "flex flex-1 flex-wrap items-center gap-2",
            wrap ? "flex-wrap" : "flex-nowrap overflow-x-auto"
          )}
        >
          {value.map((val) => {
            const option = options.find((opt) => opt.value === val);
            if (!option) {
              return null;
            }
            const onRemove = () => onValueRemove(val);
            return renderTag ? (
              <React.Fragment key={val}>
                {renderTag(option, onRemove)}
              </React.Fragment>
            ) : (
              <Tag
                className={tagClassName}
                dismissAriaLabel={`Remove ${option.label}`}
                dismissible={clearable}
                key={val}
                onDismiss={onRemove}
                value={option.label}
              />
            );
          })}
          {showInput && (
            <Input
              aria-label="Add tag"
              className={cx(
                "h-7 border-none p-0 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                inputClassName
              )}
              disabled={disabled}
              onChange={(event) => onInputChange(event.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder={value.length ? selectedPlaceholder : placeholder}
              size={size}
              value={inputValue}
            />
          )}
        </div>
        {clearable && value.length > 0 && (
          <button
            aria-label="Clear all tags"
            className={cx(
              "inline-flex size-6 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-400 dark:focus-visible:ring-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-300",
              focusRing
            )}
            onClick={() => onValueChange?.([])}
            type="button"
          >
            <X aria-hidden className="size-4" />
            <span className="sr-only">Clear all tags</span>
          </button>
        )}
      </div>
      <output aria-live="polite" className="sr-only">
        {isOpen && getFilteredOptions.length === 0 ? emptyMessage : ""}
      </output>

      <BaseCombobox.Root onOpenChange={setIsOpen} open={isOpen}>
        <BaseCombobox.Input
          aria-label="Search tags"
          autoComplete="off"
          onChange={(event) => onInputChange(event.target.value)}
          value={inputValue}
        />

        <BaseCombobox.Portal>
          <BaseCombobox.Positioner style={{ width: "var(--reference-width)" }}>
            <BaseCombobox.Popup
              className={cx(
                floatingSurfaceVariants().base(),
                "z-50 w-full p-1",
                dropdownClassName
              )}
              hidden={!isOpen || getFilteredOptions.length === 0}
            >
              <BaseCombobox.List
                className="max-h-[var(--max-height)] overflow-auto"
                style={{ ["--max-height" as never]: `${maxHeight}px` }}
              >
                {getFilteredOptions.map((option) => {
                  const isSelected = selectedValues.has(option.value);
                  return (
                    <BaseCombobox.Item
                      className={cx(
                        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
                        isSelected
                          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                          : "text-zinc-700 dark:text-zinc-300",
                        "data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-900 dark:data-[highlighted]:bg-zinc-800 dark:data-[highlighted]:text-zinc-50"
                      )}
                      disabled={option.disabled}
                      key={option.value}
                      onClick={() => onValueAdd(option.value)}
                      value={option.value}
                    >
                      {renderItem ? (
                        renderItem(option, false, isSelected)
                      ) : (
                        <>
                          {option.icon && (
                            <Icon
                              icon={option.icon}
                              size="sm"
                              strokeWidth={iconStrokeWidth}
                            />
                          )}
                          <span className="flex-1 truncate">
                            {option.label}
                          </span>
                          {isSelected && (
                            <Check aria-hidden="true" className="size-4" />
                          )}
                        </>
                      )}
                    </BaseCombobox.Item>
                  );
                })}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    </div>
  );
};

export const useTagInput = (initialValues: string[] = []) => {
  const [values, setValues] = React.useState<string[]>(initialValues);
  const addTag = (value: string) => {
    setValues((prev) => (prev.includes(value) ? prev : [...prev, value]));
  };
  const removeTag = (value: string) => {
    setValues((prev) => prev.filter((v) => v !== value));
  };
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
