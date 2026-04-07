import { defineAnatomy } from "../../lib/anatomy";

/**
 * alertAnatomy helper for AlertAnatomy.
 * Import from "@patternmode/ui/components/alert-anatomy".
 */
export const alertAnatomy = defineAnatomy({
  slot: "Alert",
  label: "Alert",
  description: "Displays a callout for important information",
  children: [
    { slot: "AlertIcon", label: "Icon", description: "Leading icon" },
    { slot: "AlertTitle", label: "Title", description: "Alert heading" },
    {
      slot: "AlertDescription",
      label: "Description",
      description: "Alert body text",
    },
  ],
});
