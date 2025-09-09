"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Icon } from "@patternmode/icon";
import { Input } from "@patternmode/input";
import { Loader } from "@patternmode/loader";
import { cx } from "@patternmode/utils/cx";
import { ChevronsUpDown, Check } from "lucide-react";
import React from "react";
import type { ComboboxMultiProps, ComboboxOption, ComboboxProps } from "./types";
import {
  comboboxItemVariants,
  comboboxListVariants,
  comboboxTriggerVariants,
  comboboxVariants,
} from "./variants";

// Individual Base UI Component Exports with patternmode styling

/**
 * Root combobox container component.
 */
const ComboboxRoot = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Root>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Root>
>(({ className, ...props }, ref) => (
  <BaseCombobox.Root
    ref={ref}
    className={cx(comboboxVariants(), className)}
    {...props}
  />
));
ComboboxRoot.displayName = "ComboboxRoot";

/**
 * Combobox trigger button component.
 */
const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Trigger>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Trigger> & {
    size?: "2xs" | "xs" | "sm" | "base" | "lg";
  }
>(({ className, size = "base", children, ...props }, ref) => (
  <BaseCombobox.Trigger
    ref={ref}
    className={cx(
      comboboxTriggerVariants({ size }),
      "flex h-10 min-w-[12rem] items-center justify-between gap-3 bg-[canvas] pr-3 pl-3.5",
      "hover:bg-zinc-100 data-[popup-open]:bg-zinc-100",
      className
    )}
    data-testid="combobox-trigger"
    {...props}
  >
    {children}
  </BaseCombobox.Trigger>
));
ComboboxTrigger.displayName = "ComboboxTrigger";

/**
 * Combobox value display component.
 */
const ComboboxValue = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Value>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Value>
>(({ className, ...props }, ref) => (
  <BaseCombobox.Value
    ref={ref}
    className={cx("flex min-w-0 items-center gap-2", className)}
    {...props}
  />
));
ComboboxValue.displayName = "ComboboxValue";

/**
 * Combobox icon component with render prop for custom icons.
 */
const ComboboxIcon = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Icon>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Icon> & {
    render?: (props: { className?: string }) => React.ReactNode;
    iconStrokeWidth?: number;
  }
>(({ className, render, iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH, ...props }, ref) => (
  <BaseCombobox.Icon
    ref={ref}
    className={cx("flex", className)}
    {...props}
  >
    {render ? (
      render({ className: "size-4" })
    ) : (
      <Icon
        icon={ChevronsUpDown}
        size="sm"
        strokeWidth={iconStrokeWidth}
        className="size-4"
      />
    )}
  </BaseCombobox.Icon>
));
ComboboxIcon.displayName = "ComboboxIcon";

/**
 * Combobox portal component for rendering popup in different DOM location.
 */
const ComboboxPortal = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Portal>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Portal>
>(({ container, ...props }, ref) => (
  <BaseCombobox.Portal
    ref={ref}
    container={container} // Let Base UI handle default to body
    {...props}
  />
));
ComboboxPortal.displayName = "ComboboxPortal";

/**
 * Combobox positioner component for popup positioning.
 */
const ComboboxPositioner = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Positioner>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Positioner>
>(({ className, sideOffset = 4, align = "start", ...props }, ref) => (
  <BaseCombobox.Positioner
    ref={ref}
    className={className}
    sideOffset={sideOffset}
    align={align}
    {...props}
  />
));
ComboboxPositioner.displayName = "ComboboxPositioner";

/**
 * Combobox popup container component.
 */
const ComboboxPopup = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Popup> & {
    size?: "2xs" | "xs" | "sm" | "base" | "lg";
  }
>(({ className, size = "base", ...props }, ref) => (
  <BaseCombobox.Popup
    ref={ref}
    className={cx(
      comboboxListVariants({ size }),
      "w-[var(--anchor-width)] max-h-[min(var(--available-height),23rem)] max-w-[var(--available-width)]",
      className
    )}
    data-testid="combobox-popup"
    {...props}
  />
));
ComboboxPopup.displayName = "ComboboxPopup";

/**
 * Combobox input component with render prop support.
 */
const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Input>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Input> & {
    size?: "2xs" | "xs" | "sm" | "base" | "lg";
    render?: (props: {
      className?: string;
      ref?: React.RefObject<HTMLInputElement>;
      [key: string]: any;
    }) => React.ReactNode;
  }
>(({ className, size = "base", render, ...props }, ref) => (
  <BaseCombobox.Input
    ref={ref}
    render={render || (({ className: inputClassName, ref: inputRef, ...renderProps }) => (
      <Input
        className={cx(
          "w-full border-0 shadow-none ring-0 focus:ring-0 focus:border-0 focus:shadow-none bg-transparent px-0",
          inputClassName
        )}
        externalRef={inputRef as React.RefObject<HTMLInputElement>}
        size={size}
        minimal
        {...renderProps}
      />
    ))}
    className={className}
    {...props}
  />
));
ComboboxInput.displayName = "ComboboxInput";

/**
 * Combobox list component for items container.
 */
const ComboboxList = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.List>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.List>
>(({ className, ...props }, ref) => (
  <BaseCombobox.List
    ref={ref}
    className={className}
    {...props}
  />
));
ComboboxList.displayName = "ComboboxList";

/**
 * Combobox item component with styling variants.
 */
const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Item>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Item> & {
    size?: "2xs" | "xs" | "sm" | "base" | "lg";
  }
>(({ className, size = "base", ...props }, ref) => (
  <BaseCombobox.Item
    ref={ref}
    className={cx(
      comboboxItemVariants({ size }),
      className
    )}
    {...props}
  />
));
ComboboxItem.displayName = "ComboboxItem";

/**
 * Combobox item indicator component (checkmark for selected items).
 */
const ComboboxItemIndicator = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.ItemIndicator> & {
    render?: (props: { className?: string }) => React.ReactNode;
  }
>(({ className, render, ...props }, ref) => (
  <BaseCombobox.ItemIndicator
    ref={ref}
    className={cx("absolute right-2 flex size-3.5 items-center justify-center", className)}
    {...props}
  >
    {render ? (
      render({ className: "size-3.5" })
    ) : (
      <Icon
        icon={Check}
        size="xs"
        strokeWidth={2.5}
        className="size-3.5"
      />
    )}
  </BaseCombobox.ItemIndicator>
));
ComboboxItemIndicator.displayName = "ComboboxItemIndicator";

// Compound Combobox Component (existing implementation)
const Combobox = <T extends ComboboxOption = ComboboxOption>({
  options,
  fetchData,
  queryKey = ["combobox"],
  value,
  onValueChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  hasError = false,
  className,
  size = "base",
  searchDebounce = 300,
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  getItemValue = (item: T) => item.value,
  getItemLabel = (item: T) => item.label,
  getItemIcon,
  renderItem,
  selectOnFocus: _selectOnFocus = true,
  clearSearchOnSelect = true,
}: ComboboxProps<T>) => {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  // Async state (used when fetchData is provided)
  const [asyncItems, setAsyncItems] = React.useState<T[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [nextCursor, setNextCursor] = React.useState<number | undefined>(
    undefined
  );
  const [error, setError] = React.useState<unknown>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Static items (when options provided)
  const allItems: T[] = React.useMemo(() => options ?? [], [options]);

  // Kick off async fetch on open and when the debounced input changes
  React.useEffect(() => {
    if (!(fetchData && isOpen)) return;
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);
    fetchData({
      search: debouncedSearch,
      pageParam: 0,
      signal: controller.signal,
    })
      .then((res) => {
        setAsyncItems(res.data as T[]);
        setHasNextPage(!!res.hasNextPage);
        setNextCursor(res.nextCursor);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err);
        setAsyncItems([]);
        setHasNextPage(false);
        setNextCursor(undefined);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, [fetchData, debouncedSearch, isOpen]);

  const fetchNextPage = React.useCallback(() => {
    if (!(fetchData && hasNextPage) || isFetchingNextPage) return;
    setIsFetchingNextPage(true);
    fetchData({ search: debouncedSearch, pageParam: nextCursor })
      .then((res) => {
        setAsyncItems((prev) => prev.concat(res.data as T[]));
        setHasNextPage(!!res.hasNextPage);
        setNextCursor(res.nextCursor);
      })
      .finally(() => setIsFetchingNextPage(false));
  }, [fetchData, hasNextPage, isFetchingNextPage, debouncedSearch, nextCursor]);

  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(inputValue), searchDebounce);
    return () => clearTimeout(t);
  }, [inputValue, searchDebounce]);

  const items: T[] = React.useMemo(() => {
    if (fetchData) return asyncItems;
    if (!inputValue.trim()) return allItems;
    return allItems.filter((item) =>
      getItemLabel(item).toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [asyncItems, allItems, inputValue, getItemLabel, fetchData]);

  // Map for quick value->item lookup used by Base UI callbacks.
  const valueToItem = React.useMemo(() => {
    const m = new Map<string, T>();
    for (const it of items) m.set(getItemValue(it), it);
    return m;
  }, [items, getItemValue]);

  return (
    <div
      className={cx(comboboxVariants({ size }), className)}
      data-testid="combobox"
    >
      <ComboboxRoot
        // Provide values to Base UI. We manage filtering externally via `items` and `filter`.
        filter={(val: unknown, input: string) => {
          const it = valueToItem.get(String(val));
          if (!it) return false;
          return getItemLabel(it).toLowerCase().includes(input.toLowerCase());
        }}
        items={items.map((it) => getItemValue(it))}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (open) setTimeout(() => inputRef.current?.focus(), 0);
          else if (clearSearchOnSelect) setInputValue("");
        }}
        onValueChange={(next) => {
          const newVal = next as unknown as string;
          onValueChange?.(newVal);
          if (clearSearchOnSelect) setInputValue("");
        }}
        value={value}
        disabled={disabled}
      >
        <ComboboxTrigger size={size}>
          <ComboboxValue>
            {(selected) => {
              const it = selected
                ? valueToItem.get(String(selected))
                : undefined;
              if (!it)
                return (
                  <span className="truncate text-zinc-500 dark:text-zinc-500">
                    {placeholder}
                  </span>
                );
              return (
                <div className="flex min-w-0 items-center gap-2">
                  {getItemIcon?.(it)}
                  <span className="truncate">{getItemLabel(it)}</span>
                </div>
              );
            }}
          </ComboboxValue>
          <ComboboxIcon iconStrokeWidth={iconStrokeWidth} />
        </ComboboxTrigger>

        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup size={size}>
              <div className="border-b border-zinc-200 p-3 dark:border-zinc-800">
                <ComboboxInput
                  onChange={(e) =>
                    setInputValue((e.target as HTMLInputElement).value)
                  }
                  placeholder={searchPlaceholder || placeholder}
                  size={size}
                  value={inputValue}
                />
              </div>

              <div
                className="max-h-[calc(24rem-4rem)] overflow-y-auto p-1"
                data-testid="combobox-options"
                onScroll={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
                    fetchNextPage();
                  }
                }}
                ref={scrollRef}
              >
                {isMounted ? (
                  <>
                    {isLoading && (
                      <div
                        className="flex items-center justify-center py-4"
                        data-testid="combobox-loading"
                      >
                        <Loader size={size === "2xs" ? "xs" : "sm"} />
                        <span className="ml-2 text-sm text-zinc-500">
                          Loading...
                        </span>
                      </div>
                    )}
                    {error && !isLoading && (
                      <div
                        className="flex items-center justify-center py-4 text-red-500"
                        data-testid="combobox-error"
                      >
                        <span className="text-sm">Failed to load options</span>
                      </div>
                    )}
                    {!(isLoading || error) && items.length > 0 && (
                      <>
                        <ComboboxList>
                          {(val: string, index: number) => {
                            const item = valueToItem.get(val) as T | undefined;
                            if (!item) return null;
                            
                            if (renderItem) {
                              return renderItem(item, index);
                            }

                            return (
                              <ComboboxItem
                                index={index}
                                key={val}
                                value={val}
                                size={size}
                              >
                                <div className="flex min-w-0 items-center gap-2">
                                  {getItemIcon?.(item)}
                                  <span className="truncate">
                                    {getItemLabel(item)}
                                  </span>
                                </div>
                                <ComboboxItemIndicator />
                              </ComboboxItem>
                            );
                          }}
                        </ComboboxList>
                        {isFetchingNextPage && (
                          <div
                            className="flex items-center justify-center py-2"
                            data-testid="combobox-loading-more"
                          >
                            <Loader size={size === "2xs" ? "xs" : "sm"} />
                            <span className="ml-2 text-xs text-zinc-500">
                              Loading more...
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    {!(isLoading || error) && items.length === 0 && (
                      <div
                        className="flex items-center justify-center py-4 text-zinc-500"
                        data-testid="combobox-empty"
                      >
                        <span className="text-sm">{emptyMessage}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className="flex items-center justify-center py-4"
                    data-testid="combobox-loading"
                  >
                    <Loader size={size === "2xs" ? "xs" : "sm"} />
                    <span className="ml-2 text-sm text-zinc-500">
                      Loading...
                    </span>
                  </div>
                )}
              </div>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>
    </div>
  );
};

Combobox.displayName = "Combobox";

// Multi-select combobox built on Base UI, exposing a checkbox list selection
const ComboboxMulti = <T extends ComboboxOption = ComboboxOption>({
  options,
  values,
  onValuesChange,
  placeholder = "Select",
  searchPlaceholder = "Search...",
  disabled = false,
  hasError = false,
  className,
  searchDebounce = 300,
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  getItemValue = (item: T) => item.value,
  getItemLabel = (item: T) => item.label,
  getItemIcon,
  size = "base",
}: ComboboxMultiProps<T>) => {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(inputValue), searchDebounce);
    return () => clearTimeout(t);
  }, [inputValue, searchDebounce]);

  const items = React.useMemo(() => {
    if (!debouncedSearch.trim()) return options;
    const q = debouncedSearch.toLowerCase();
    return options.filter((i) => getItemLabel(i).toLowerCase().includes(q));
  }, [options, debouncedSearch, getItemLabel]);

  // Map for quick lookups
  const valueToItem = React.useMemo(() => {
    const m = new Map<string, T>();
    for (const it of options) m.set(getItemValue(it), it);
    return m;
  }, [options, getItemValue]);

  return (
    <div className={cx(comboboxVariants({ size }), className)} data-testid="combobox-multi">
      <ComboboxRoot
        items={options.map((it) => getItemValue(it))}
        value={values}
        onValueChange={(next) => {
          const arr = Array.isArray(next) ? (next as string[]) : [String(next)];
          onValuesChange(arr);
        }}
        selectionBehavior="toggle"
        filter={(val: unknown, input: string) => {
          const it = valueToItem.get(String(val));
          if (!it) return false;
          return getItemLabel(it).toLowerCase().includes(input.toLowerCase());
        }}
        disabled={disabled}
      >
        <ComboboxTrigger
          className={cx(
            hasError && "outline outline-1 outline-red-500"
          )}
          size={size}
        >
          <ComboboxValue>
            {(selected) => {
              const sel = Array.isArray(selected)
                ? (selected as string[])
                : selected
                ? [String(selected)]
                : [];
              if (sel.length === 0) {
                return (
                  <span className="truncate text-zinc-500 dark:text-zinc-500">
                    {placeholder}
                  </span>
                );
              }
              return (
                <span className="truncate">{sel.length} selected</span>
              );
            }}
          </ComboboxValue>
          <ComboboxIcon iconStrokeWidth={iconStrokeWidth} />
        </ComboboxTrigger>

        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup size={size}>
              <div className="border-b border-zinc-200 p-3 dark:border-zinc-800">
                <ComboboxInput
                  onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
                  placeholder={searchPlaceholder || placeholder}
                  size={size}
                  value={inputValue}
                />
              </div>

              <div className="max-h-[calc(24rem-4rem)] overflow-y-auto p-1">
                <ComboboxList>
                  {(val: string, index: number) => {
                    const item = valueToItem.get(val) as T | undefined;
                    if (!item) return null;
                    const isSelected = values.includes(val);
                    return (
                      <ComboboxItem
                        index={index}
                        key={val}
                        value={val}
                        size={size}
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          {getItemIcon?.(item)}
                          <span className="truncate">{getItemLabel(item)}</span>
                          {isSelected && <span className="sr-only">selected</span>}
                        </div>
                        <ComboboxItemIndicator />
                      </ComboboxItem>
                    );
                  }}
                </ComboboxList>
              </div>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>
    </div>
  );
};

ComboboxMulti.displayName = "ComboboxMulti";

// Attach individual components to the main Combobox for compound component pattern
Object.assign(Combobox, {
  Root: ComboboxRoot,
  Trigger: ComboboxTrigger,
  Value: ComboboxValue,
  Icon: ComboboxIcon,
  Portal: ComboboxPortal,
  Positioner: ComboboxPositioner,
  Popup: ComboboxPopup,
  Input: ComboboxInput,
  List: ComboboxList,
  Item: ComboboxItem,
  ItemIndicator: ComboboxItemIndicator,
});

export { 
  Combobox, 
  ComboboxMulti,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxIcon,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
};