import { defineAnatomy } from "../../lib/anatomy";

/**
 * popoverAnatomy helper for PopoverAnatomy.
 * Import from "@patternmode/ui/components/popover-anatomy".
 */
export const popoverAnatomy = defineAnatomy({
  slot: "Popover",
  label: "Popover",
  description: "Floating content panel",
  children: [
    {
      slot: "PopoverTrigger",
      label: "Trigger",
      description: "Element that opens popover",
    },
    {
      slot: "PopoverContent",
      label: "Content",
      description: "Popover content area",
    },
    {
      slot: "PopoverAnchor",
      label: "Anchor",
      description: "Optional positioning anchor",
    },
  ],
});
