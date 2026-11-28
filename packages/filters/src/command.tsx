"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { cn } from "cn";
import { Search } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";

import { commandScore } from "./command-score";

export interface FilterCommandProps<Item> extends Omit<
  Autocomplete.Root.Props<Item>,
  "children" | "inline" | "items" | "open"
> {
  children?: ReactNode;
  className?: string;
  items: readonly Item[];
}

const entryText = <Item,>(
  item: Item,
  itemToStringValue: ((item: Item) => string) | undefined,
): string => {
  if (itemToStringValue !== undefined) {
    return itemToStringValue(item);
  }

  if (item instanceof Object && "label" in item) {
    return String(item.label);
  }

  return String(item);
};

const rankMatchingItems = <Item,>(
  items: readonly Item[],
  query: string,
  itemToStringValue: ((item: Item) => string) | undefined,
): readonly Item[] | undefined => {
  if (query === "") {
    return undefined;
  }

  const scored: { item: Item; score: number }[] = [];

  for (const item of items) {
    const score = commandScore(entryText(item, itemToStringValue), query);

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  return scored.toSorted((a, b) => b.score - a.score).map((entry) => entry.item);
};

/**
 * Inline searchable command list backed by Base UI Autocomplete with cmdk-style
 * fuzzy ranking. Used inside AddFilter and FilterOptions popovers.
 */
export const FilterCommand = <Item,>({
  autoHighlight = "always",
  children,
  className,
  defaultValue,
  itemToStringValue,
  items,
  keepHighlight = true,
  onValueChange,
  value,
  ...rootProps
}: FilterCommandProps<Item>) => {
  const [typed, setTyped] = useState(() => String(defaultValue ?? ""));
  const query = String(value ?? typed).trim();
  const ranked = rankMatchingItems(items, query, itemToStringValue);

  return (
    <Autocomplete.Root
      {...rootProps}
      autoHighlight={autoHighlight}
      defaultValue={defaultValue}
      filter={ranked === undefined ? undefined : null}
      filteredItems={ranked}
      inline
      itemToStringValue={itemToStringValue}
      items={items}
      keepHighlight={keepHighlight}
      onValueChange={(next, details) => {
        setTyped(next);
        onValueChange?.(next, details);
      }}
      open
      value={value}
    >
      <div className={cn("patternmode-filter-command", className)}>{children}</div>
    </Autocomplete.Root>
  );
};

export const FilterCommandInput = ({
  className,
  ...props
}: Omit<ComponentProps<typeof Autocomplete.Input>, "className"> & { className?: string }) => (
  <Autocomplete.InputGroup className="patternmode-filter-command__input-wrap">
    <Search aria-hidden="true" className="patternmode-filter-command__search-icon" />
    <Autocomplete.Input className={cn("patternmode-filter-command__input", className)} {...props} />
  </Autocomplete.InputGroup>
);

export const FilterCommandList = ({
  className,
  ...props
}: Omit<ComponentProps<typeof Autocomplete.List>, "className"> & { className?: string }) => (
  <Autocomplete.List className={cn("patternmode-filter-command__list", className)} {...props} />
);

export const FilterCommandEmpty = ({
  className,
  ...props
}: Omit<ComponentProps<typeof Autocomplete.Empty>, "className"> & { className?: string }) => (
  <Autocomplete.Empty className={cn("patternmode-filter-command__empty", className)} {...props} />
);

export const FilterCommandItem = ({
  className,
  ...props
}: Omit<ComponentProps<typeof Autocomplete.Item>, "className"> & { className?: string }) => (
  <Autocomplete.Item className={cn("patternmode-filter-command__item", className)} {...props} />
);
