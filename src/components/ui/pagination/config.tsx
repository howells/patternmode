import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { PaginationExample, DefaultExample, WithEllipsisExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "pagination",
  name: "Pagination",
  description:
    "A pagination component for navigating through multiple pages of content.",
  category: "navigation" as const,
  icon: "MoreHorizontal",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination/pagination";`,
  componentId: "DefaultExample",
  props: [
    {
      name: "currentPage",
      type: "number",
      defaultValue: 1,
      description: "The current active page.",
    },
    {
      name: "totalPages",
      type: "number",
      defaultValue: 10,
      description: "The total number of pages.",
    },
    {
      name: "onPageChange",
      type: "function",
      defaultValue: undefined,
      description: "Callback when page changes.",
    },
    {
      name: "showEllipsis",
      type: "boolean",
      defaultValue: true,
      description: "Whether to show ellipsis for page ranges.",
    },
    {
      name: "siblingCount",
      type: "number",
      defaultValue: 1,
      description:
        "Number of sibling pages to show on each side of current page.",
    },
    {
      name: "boundaryCount",
      type: "number",
      defaultValue: 1,
      description: "Number of pages to show at the start and end.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Pagination",
      description:
        "A pagination component for navigating through multiple pages of content.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-ellipsis",
      title: "Pagination with Ellipsis",
      description: "Pagination showing ellipsis for large page counts",
      code: jsxToString(<WithEllipsisExample />),
    },
  ],
};
