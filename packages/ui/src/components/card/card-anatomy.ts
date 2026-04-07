import { defineAnatomy } from "../../lib/anatomy";

/**
 * cardAnatomy helper for Card.
 * Import from "@patternmode/ui/components/card".
 */
export const cardAnatomy = defineAnatomy({
  slot: "card",
  label: "Card",
  description: "Container for grouped content",
  children: [
    {
      slot: "card-header",
      label: "CardHeader",
      description: "Header area with title and optional action",
      children: [
        { slot: "card-title", label: "CardTitle", description: "Main heading" },
        {
          slot: "card-description",
          label: "CardDescription",
          description: "Subheading or summary",
        },
        {
          slot: "card-action",
          label: "CardAction",
          description: "Action button or link",
        },
      ],
    },
    {
      slot: "card-content",
      label: "CardContent",
      description: "Main content area",
    },
    {
      slot: "card-footer",
      label: "CardFooter",
      description: "Footer with actions or metadata",
    },
  ],
});
