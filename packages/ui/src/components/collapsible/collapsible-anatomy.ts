import { defineAnatomy } from "../../lib/anatomy";

/**
 * collapsibleAnatomy helper for CollapsibleAnatomy.
 * Import from "@patternmode/ui/components/collapsible-anatomy".
 */
export const collapsibleAnatomy = defineAnatomy({
  slot: "Collapsible",
  label: "Collapsible",
  description: "Expandable/collapsible content section",
  children: [
    {
      slot: "CollapsibleTrigger",
      label: "Trigger",
      description: "Button to toggle content",
    },
    {
      slot: "CollapsibleContent",
      label: "Content",
      description: "Collapsible content area",
    },
  ],
});
