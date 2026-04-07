"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { useEffect, useRef } from "react";
import { Tag } from "../../components/tag";
import { useTagSelectorContext } from "./tag-selector-context";

interface TagSelectorSearchProps {
  className?: string;
  /** Placeholder text for search input */
  placeholder?: string;
}

/**
 * TagSelectorSearch - Search input area with selected tags display.
 * Shows selected tags inline with the search input.
 */
export function TagSelectorSearch({
  placeholder = "Search tags…",
  className,
}: TagSelectorSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    value,
    searchQuery,
    setSearchQuery,
    removeTag,
    tags,
    allowCreate,
    createTag,
    toggleTag,
    open,
  } = useTagSelectorContext();

  // Auto-focus input when popover opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && searchQuery === "" && value.length > 0) {
      // Remove last tag on Backspace when input is empty
      const lastTag = value.at(-1);
      if (lastTag) {
        removeTag(lastTag.id);
      }
    } else if (e.key === "Enter" && searchQuery.trim()) {
      e.preventDefault();
      const trimmed = searchQuery.trim();
      const exactMatch = tags.find(
        (tag) => tag.label.toLowerCase() === trimmed.toLowerCase(),
      );
      if (exactMatch) {
        toggleTag(exactMatch);
        setSearchQuery("");
      } else if (allowCreate) {
        createTag(trimmed);
      }
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 border-border border-b px-4 py-3.5",
        className,
      )}
      data-component="tag-selector-search"
      data-slot="tag-selector-search"
    >
      {value.map((tag) =>
        tag.color ? (
          <Tag
            appearance="light"
            dot={tag.color}
            key={tag.id}
            onDismiss={() => removeTag(tag.id)}
            size="sm"
            variant={tag.color}
          >
            {tag.label}
          </Tag>
        ) : (
          <Tag key={tag.id} onDismiss={() => removeTag(tag.id)} size="sm">
            {tag.label}
          </Tag>
        ),
      )}
      <input
        className="min-w-[80px] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        ref={inputRef}
        type="text"
        value={searchQuery}
      />
    </div>
  );
}
