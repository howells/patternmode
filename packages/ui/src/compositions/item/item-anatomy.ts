import { defineAnatomy } from "../../lib/anatomy";

/**
 * itemAnatomy documents the structure of the Item component.
 * Import from "@patternmode/ui/compositions/item".
 */
export const itemAnatomy = defineAnatomy({
  slot: "item",
  label: "Item",
  description:
    "A flexible content container for displaying structured information",
  children: [
    {
      slot: "item-media",
      label: "ItemMedia",
      description: "Icon, image, or avatar display area",
    },
    {
      slot: "item-header",
      label: "ItemHeader",
      description: "Header row spanning full width",
    },
    {
      slot: "item-content",
      label: "ItemContent",
      description: "Main content area with title and description",
      children: [
        {
          slot: "item-title",
          label: "ItemTitle",
          description: "Primary heading",
        },
        {
          slot: "item-description",
          label: "ItemDescription",
          description: "Secondary text",
        },
      ],
    },
    {
      slot: "item-actions",
      label: "ItemActions",
      description: "Action buttons or controls",
    },
    {
      slot: "item-footer",
      label: "ItemFooter",
      description: "Footer row spanning full width",
    },
  ],
});

/**
 * itemGroupAnatomy documents the structure of the ItemGroup component.
 * Import from "@patternmode/ui/compositions/item".
 */
export const itemGroupAnatomy = defineAnatomy({
  slot: "item-group",
  label: "ItemGroup",
  description: "Semantic container for grouping related items",
  children: [
    {
      slot: "item",
      label: "Item",
      description: "Individual item in the group",
    },
    {
      slot: "item-separator",
      label: "ItemSeparator",
      description: "Divider between items",
    },
  ],
});
