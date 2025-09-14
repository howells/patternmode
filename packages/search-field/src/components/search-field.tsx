"use client";

import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
import { Search, X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

export type SearchFieldItem = {
  id: string;
  label: string;
  description?: string;
  category?: string;
  badge?: string;
  data?: unknown;
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
  selectedIndex?: number;
  onSelectedIndexChange?: (index: number) => void;
};

const EMPTY_ITEMS_ARRAY: SearchFieldItem[] = [];

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
  autoFocus: _autoFocus = false,
  disabled = false,
  loading: _loading = false,
  selectedIndex = 0,
  onSelectedIndexChange,
}: SearchFieldProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  const [internalValue, setInternalValue] = useState("");
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const searchValue = value !== undefined ? value : internalValue;
  const setSearchValue = onValueChange || setInternalValue;
  const currentSelectedIndex =
    selectedIndex !== undefined ? selectedIndex : internalSelectedIndex;

  const setCurrentSelectedIndex = useCallback(
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
    [currentSelectedIndex, onSelectedIndexChange]
  );

  const filteredItems = useMemo(() => {
    let filtered = items;

    if (searchValue.trim()) {
      filtered = items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (maxResults) {
      filtered = filtered.slice(0, maxResults);
    }

    return filtered;
  }, [items, searchValue, maxResults]);

  const groupedItems: Record<string, SearchFieldItem[]> = useMemo(() => {
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
      {} as Record<string, SearchFieldItem[]>
    );
  }, [filteredItems, groupByCategory]);

  useEffect(() => {
    setCurrentSelectedIndex(0);
  }, [setCurrentSelectedIndex]);

  useEffect(() => {
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
          Math.min(prev + 1, filteredItems.length - 1)
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
      default:
        break;
    }
  };

  const dropdown = (
    <div
      className={cx(
        floatingSurfaceVariants().base(),
        "absolute right-0 left-0 z-50 mt-1 max-h-64 overflow-auto rounded-md border p-1 shadow-sm",
        dropdownClassName
      )}
      role="listbox"
    >
      {Object.entries(groupedItems).map(([category, group]) => (
        <div key={category}>
          {groupByCategory && category && (
            <div className="px-2 py-1.5 font-medium text-xs text-zinc-500 uppercase tracking-wide">
              {category}
            </div>
          )}
          {group.map((item, index) => {
            const globalIndex = index;
            const isActive = globalIndex === currentSelectedIndex;
            return (
              <div
                aria-selected={isActive}
                className={cx(
                  "flex cursor-default items-start gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-700 dark:text-zinc-300"
                )}
                key={item.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleItemSelect(item);
                }}
                role="option"
                tabIndex={-1}
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="truncate font-medium">{item.label}</div>
                  {item.description && (
                    <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                      {item.description}
                    </div>
                  )}
                </div>
                {item.badge && (
                  <span className="ml-2 rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
      {filteredItems.length === 0 && (
        <div className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Text className="font-medium" size="sm">
            {emptyStateTitle}
          </Text>
          {emptyStateDescription && (
            <Text size="sm">{emptyStateDescription}</Text>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={cx("relative", className)} data-testid="search-field">
      <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm focus-within:ring-2 focus-within:ring-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:ring-zinc-300">
        <Search aria-hidden className="size-4 text-zinc-500" />
        <input
          aria-activedescendant={
            isOpen ? `sf-item-${currentSelectedIndex}` : undefined
          }
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={placeholder}
          className={cx(
            "h-7 w-full bg-transparent outline-none",
            inputClassName
          )}
          disabled={disabled}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          ref={ref}
          role="combobox"
          value={searchValue}
        />
        {showClearButton && searchValue && (
          <button
            aria-label="Clear search"
            className="inline-flex size-6 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:text-zinc-400 dark:focus-visible:ring-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            onClick={handleClear}
            type="button"
          >
            <X aria-hidden className="size-4" />
            <span className="sr-only">Clear</span>
          </button>
        )}
      </div>

      {isOpen && dropdown}
    </div>
  );
};
