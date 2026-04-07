"use client";

import { Badge } from "@patternmode/ui/components/badge";
import { Flex } from "@patternmode/ui/components/flex";
import { Text } from "@patternmode/ui/components/text";
import { X } from "lucide-react";
/** Selected tag type definition */

export interface SelectedTag {
  id: string;
  /** Label text */
  label: string;
  /** Component type */
  type?: "classification" | "brand" | "category" | "default";
  /** Current value */
  value: string;
}

export interface SelectedTagsProps {
  /** CSS class name */
  className?: string;
  /** Label text */
  label?: string;
  /** On clear */
  onClear?: () => void;
  /** On remove */
  onRemove: (id: string) => void;
  tags: SelectedTag[];
}

/**
 * SelectedTags UI component.
 * Import from "@patternmode/ui/compositions/selected-tags".
 */
export function SelectedTags({
  tags,
  onRemove,
  onClear,
  label = "Selected",
  className,
}: SelectedTagsProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Flex align="center" gap="sm" justify="space-between">
        <Text className="font-medium" size="sm">
          {label} ({tags.length})
        </Text>
        {onClear && tags.length > 0 && (
          <button
            className="text-muted-foreground text-sm transition-colors hover:text-foreground"
            onClick={onClear}
            type="button"
          >
            Clear all
          </button>
        )}
      </Flex>

      <Flex className="mt-2" gap="xs" wrap="wrap">
        {tags.map((tag) => {
          let variant: "secondary" | "outline" | "default" = "default";
          if (tag.type === "brand") {
            variant = "secondary";
          } else if (tag.type === "classification") {
            variant = "outline";
          }

          return (
            <Badge className="gap-1.5 pr-1" key={tag.id} variant={variant}>
              {tag.label}
              <button
                aria-label={`Remove ${tag.label}`}
                className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full transition-colors hover:bg-background/20"
                onClick={() => onRemove(tag.id)}
                type="button"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </Badge>
          );
        })}
      </Flex>
    </div>
  );
}
