"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { PopoverTrigger } from "../../components/popover";
import { ScrollArea } from "../../components/scroll-area";
import { Tag } from "../../components/tag";
import { ScrollFade } from "../scroll-fade";
import { useTagSelectorContext } from "./tag-selector-context";

interface TagSelectorTriggerProps {
  className?: string;
  /** Placeholder text when no tags selected */
  placeholder?: string;
}

/**
 * TagSelectorTrigger - The clickable area that opens the tag selector popover.
 * Shows selected tags in a horizontal scroll with a ghost placeholder at the end.
 * In single-select mode, the placeholder is hidden when a value is selected.
 */
export function TagSelectorTrigger({
  placeholder = "Add tags\u2026",
  className,
}: TagSelectorTriggerProps) {
  const { value, size, open, listboxId, singleSelect } =
    useTagSelectorContext();

  const hidePlaceholder = singleSelect && value.length > 0;

  return (
    <PopoverTrigger asChild>
      <div
        aria-controls={listboxId}
        aria-expanded={open}
        className={cn(
          "relative flex w-full cursor-pointer items-center",
          className,
        )}
        data-component="tag-selector-trigger"
        data-slot="tag-selector-trigger"
        role="combobox"
        tabIndex={0}
      >
        <ScrollArea
          className="flex-1"
          hideScrollbar
          orientation="horizontal"
          viewportClassName="[&>div]:!flex [&>div]:items-center [&>div]:gap-1.5"
        >
          {value.map((tag) =>
            tag.color ? (
              <Tag
                appearance="light"
                dot={tag.color}
                key={tag.id}
                size={size}
                variant={tag.color}
              >
                {tag.label}
              </Tag>
            ) : (
              <Tag key={tag.id} size={size}>
                {tag.label}
              </Tag>
            ),
          )}
          {!hidePlaceholder && (
            <Tag
              className="text-muted-foreground"
              size={size}
              variant="outline"
            >
              {placeholder}
            </Tag>
          )}
          <span aria-hidden className="w-4 shrink-0" />
        </ScrollArea>
        <ScrollFade
          className="to-white"
          orientation="horizontal"
          position="end"
          size="sm"
        />
      </div>
    </PopoverTrigger>
  );
}
