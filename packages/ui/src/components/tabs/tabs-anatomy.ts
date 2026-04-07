import { defineAnatomy } from "../../lib/anatomy";

/**
 * tabsAnatomy helper for Tabs.
 * Import from "@patternmode/ui/components/tabs".
 */
export const tabsAnatomy = defineAnatomy({
  slot: "tabs",
  label: "Tabs",
  description: "Tabbed content switcher",
  children: [
    {
      slot: "tabs-list",
      label: "TabsList",
      description: "Container for tab triggers",
      children: [
        {
          slot: "tabs-trigger",
          label: "TabsTrigger",
          description: "Button to switch tab content",
        },
      ],
    },
    {
      slot: "tabs-content",
      label: "TabsContent",
      description: "Content panel for each tab",
    },
  ],
});
