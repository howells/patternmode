import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { CustomSeparatorExample, DeepNavigationExample, DefaultExample, SingleLevelExample, WithEllipsisExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "breadcrumbs",
  name: "Breadcrumbs",
  description: "A navigation component that shows the current page's location within a navigational hierarchy.",
  category: "navigation" as const,
  icon: "ChevronRight",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from "@/components/ui/breadcrumbs";`,
  componentId: "BreadcrumbsExample",
  props: [
    {
      name: "showEllipsis",
      type: "boolean",
      defaultValue: false,
      description: "Whether to show ellipsis for collapsed items.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic breadcrumb navigation.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-ellipsis",
      title: "With Ellipsis",
      description: "Breadcrumbs with collapsed items.",
      code: jsxToString(<WithEllipsisExample />),
    },
    {
      id: "custom-separator",
      title: "Custom Separator",
      description: "Breadcrumbs with custom separator.",
      code: jsxToString(<CustomSeparatorExample />),
    },
    {
      id: "single-level",
      title: "Single Level",
      description: "Breadcrumbs with just current page.",
      code: jsxToString(<SingleLevelExample />),
    },
    {
      id: "deep-navigation",
      title: "Deep Navigation",
      description: "Breadcrumbs showing deep navigation hierarchy.",
      code: jsxToString(<DeepNavigationExample />),
    },
  ],
};
