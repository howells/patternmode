import { defineAnatomy } from "../../lib/anatomy";

/**
 * accordionAnatomy helper for Accordion.
 * Import from "@patternmode/ui/components/accordion".
 */
export const accordionAnatomy = defineAnatomy({
  slot: "accordion",
  label: "Accordion",
  description: "Expandable content sections",
  children: [
    {
      slot: "accordion-item",
      label: "AccordionItem",
      description: "Single collapsible section",
      children: [
        {
          slot: "accordion-trigger",
          label: "AccordionTrigger",
          description: "Button to toggle content visibility",
        },
        {
          slot: "accordion-content",
          label: "AccordionContent",
          description: "Collapsible content area",
        },
      ],
    },
  ],
});
