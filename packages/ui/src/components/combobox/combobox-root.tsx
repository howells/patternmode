"use client";

import {
  type ButtonHTMLAttributes,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { cn } from "../../utils/cn";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 8.5 6.4 11.4 12.5 5.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ChevronsIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="m4 10 4-4 4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export interface ComboboxItem {
  keywords?: string[];
  label: string;
  value: string;
}

export interface ComboboxProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "defaultValue" | "onChange" | "value"
  > {
  emptyMessage?: string;
  items: ComboboxItem[];
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string;
}

function Combobox({
  className,
  disabled,
  emptyMessage = "No results found.",
  items,
  onValueChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search…",
  value,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState(value ?? "");
  const listId = useId();

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => {
      const haystacks = [item.label, item.value, ...(item.keywords ?? [])];

      return haystacks.some((entry) =>
        entry.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [items, query]);

  const selectedItem = items.find((item) => item.value === internalValue);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-controls={listId}
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal",
            className
          )}
          data-slot="combobox-trigger"
          disabled={disabled}
          role="combobox"
          type="button"
          variant="secondary"
          {...props}
        >
          <span
            className={cn(
              "truncate",
              selectedItem ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {selectedItem?.label ?? placeholder}
          </span>
          <span className="size-4 shrink-0 text-muted-foreground">
            <ChevronsIcon />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] min-w-[14rem] p-0"
      >
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={setQuery}
            placeholder={searchPlaceholder}
            value={query}
          />
          <CommandList id={listId}>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {filteredItems.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  const nextValue =
                    item.value === internalValue ? "" : item.value;

                  setInternalValue(nextValue);
                  onValueChange?.(nextValue);
                  setOpen(false);
                  setQuery("");
                }}
                value={item.value}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "ml-auto size-4 text-accent transition-opacity",
                    internalValue === item.value ? "opacity-100" : "opacity-0"
                  )}
                >
                  <CheckIcon />
                </span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox };
