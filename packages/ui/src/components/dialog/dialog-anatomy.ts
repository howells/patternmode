import { defineAnatomy } from "../../lib/anatomy";

/**
 * dialogAnatomy helper for DialogAnatomy.
 * Import from "@patternmode/ui/components/dialog-anatomy".
 */
export const dialogAnatomy = defineAnatomy({
  slot: "dialog",
  label: "Dialog",
  description: "Modal overlay for focused content",
  children: [
    {
      slot: "dialog-trigger",
      label: "DialogTrigger",
      description: "Button to open the dialog",
    },
    {
      slot: "dialog-content",
      label: "DialogContent",
      description: "Main modal container",
      children: [
        {
          slot: "dialog-header",
          label: "DialogHeader",
          description: "Header area",
          children: [
            {
              slot: "dialog-title",
              label: "DialogTitle",
              description: "Modal heading",
            },
            {
              slot: "dialog-description",
              label: "DialogDescription",
              description: "Modal description",
            },
          ],
        },
        {
          slot: "dialog-footer",
          label: "DialogFooter",
          description: "Footer with action buttons",
        },
      ],
    },
  ],
});
