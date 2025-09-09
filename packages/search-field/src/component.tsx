"use client";

import { Stack } from "@patternmode/stack";
import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
import { Search, X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
// Local minimal fallbacks to avoid cross-package coupling in this component

export type SearchFieldItem = {
  id: string;
  label: string;
  description?: string;
  category?: string;
  badge?: string;
  data?: unknown; // Additional data to pass through
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
  autoFocus: _autoFocus = false,
  disabled = false,
  loading = false,
  selectedIndex = 0,
  onSelectedIndexChange,
}: SearchFieldProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  const [internalValue, setInternalValue] = useState("");
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const searchValue = value !== undefined ? value : internalValue;
  const setSearchValue = onValueChange || setInternalValue;
  const currentSelectedIndex =
    selectedIndex !== undefined ? selectedIndex : internalSelectedIndex;

  // Create a consistent setter that handles both function and direct value updates
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

  // Filter and limit results
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

  // Group by category if requested
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

  // Reset selection when search changes
  useEffect(() => {
    setCurrentSelectedIndex(0);
  }, [setCurrentSelectedIndex]);

  // Show dropdown when there are items and input is focused
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

  let currentIndex = 0;

  return (
    <div className={cx("relative", className)} data-testid="search-field">
      <div className="relative">
        <input
          className={cx("w-full rounded-md border px-8 py-2", inputClassName)}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={() =>
            filteredItems.length > 0 &&
            searchValue.trim().length > 0 &&
            setIsOpen(true)
          }
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          ref={ref}
          // Avoid autoFocus to satisfy a11y lint rule in examples
          // autoFocus={autoFocus}
          type="search"
          value={searchValue}
        />
        <Search className="-translate-y-1/2 absolute top-1/2 left-2 h-4 w-4 text-zinc-400" />

        {showClearButton && searchValue && (
          <button
            aria-label="Clear search"
            className="-translate-y-1/2 absolute top-1/2 right-2 h-6 w-6 p-0 hover:bg-transparent"
            onClick={handleClear}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className={cx(
            "absolute top-full right-0 left-0 z-50 mt-1",
            floatingSurfaceVariants({
              density: "compact",
              width: "auto",
              clamp: "none",
            }).base(),
            "max-h-96 overflow-y-auto",
            dropdownClassName
          )}
        >
          {loading ? (
            <div className="p-4 text-center">
              <Text className="text-zinc-500" size="sm">
                Loading...
              </Text>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-4 text-center">
              <Text className="font-medium text-zinc-500" size="sm">
                {emptyStateTitle}
              </Text>
              {emptyStateDescription && (
                <Text className="text-zinc-400" size="sm">
                  {emptyStateDescription}
                </Text>
              )}
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(groupedItems).map(([category, categoryItems]) => (
                <div key={category}>
                  {groupByCategory && category && (
                    <Text
                      className="px-3 py-2 text-zinc-500 capitalize"
                      size="xs"
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
                        className={cx(
                          "w-full px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800",
                          "focus:bg-zinc-100 focus:outline-none dark:focus:bg-zinc-800",
                          isSelected && "bg-zinc-100 dark:bg-zinc-800"
                        )}
                        key={item.id}
                        onClick={() => handleItemSelect(item)}
                        onMouseEnter={() => setCurrentSelectedIndex(itemIndex)}
                        type="button"
                      >
                        <Stack gap={1}>
                          <Stack
                            align="center"
                            direction="horizontal"
                            justify="between"
                          >
                            <Text className="font-medium">{item.label}</Text>
                            {item.badge && (
                              <span className="rounded bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-800">
                                {item.badge}
                              </span>
                            )}
                          </Stack>
                          {item.description && (
                            <Text
                              className="text-zinc-600 dark:text-zinc-400"
                              size="sm"
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
