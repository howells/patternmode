import { defineAnatomy } from "../../lib/anatomy";

/**
 * breadcrumbAnatomy helper for BreadcrumbAnatomy.
 * Import from "@patternmode/ui/components/breadcrumb-anatomy".
 */
export const breadcrumbAnatomy = defineAnatomy({
  slot: "Breadcrumb",
  label: "Breadcrumb",
  description: "Navigation showing current location in hierarchy",
  children: [
    {
      slot: "BreadcrumbList",
      label: "List",
      description: "Container for breadcrumb items",
      children: [
        {
          slot: "BreadcrumbItem",
          label: "Item",
          description: "Single breadcrumb entry",
          children: [
            {
              slot: "BreadcrumbLink",
              label: "Link",
              description: "Clickable link",
            },
            {
              slot: "BreadcrumbPage",
              label: "Page",
              description: "Current page (non-link)",
            },
          ],
        },
        {
          slot: "BreadcrumbSeparator",
          label: "Separator",
          description: "Visual divider",
        },
        {
          slot: "BreadcrumbEllipsis",
          label: "Ellipsis",
          description: "Collapsed items indicator",
        },
      ],
    },
  ],
});
