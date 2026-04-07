import { defineAnatomy } from "../../lib/anatomy";

/**
 * sheetAnatomy helper for SheetAnatomy.
 * Import from "@patternmode/ui/components/sheet-anatomy".
 */
export const sheetAnatomy = defineAnatomy({
  slot: "Sheet",
  label: "Sheet",
  description: "Slide-out panel from screen edge",
  children: [
    {
      slot: "SheetTrigger",
      label: "Trigger",
      description: "Element that opens sheet",
    },
    {
      slot: "SheetContent",
      label: "Content",
      description: "Sheet panel container",
      children: [
        {
          slot: "SheetHeader",
          label: "Header",
          description: "Top section with title/description",
        },
        {
          slot: "SheetTitle",
          label: "Title",
          description: "Sheet heading",
        },
        {
          slot: "SheetDescription",
          label: "Description",
          description: "Sheet description text",
        },
        {
          slot: "SheetFooter",
          label: "Footer",
          description: "Bottom section for actions",
        },
        {
          slot: "SheetClose",
          label: "Close",
          description: "Close button",
        },
      ],
    },
  ],
});
