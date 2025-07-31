import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { AsyncExample, CustomRenderingExample, DefaultExample, ErrorExample, IconsExample, SizesExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "combobox",
  name: "Combobox",
  description:
    "A searchable dropdown component with support for async data loading and custom rendering.",
  category: "inputs" as const,
  icon: "ChevronDown",

  installation: {
    npm: "downshift @tanstack/react-query",
  },
  importStatement: `import { Combobox } from "@/components/ui/combobox";`,
  componentId: "ComboboxExample",
  props: [
    {
      name: "size",
      type: "select",
      options: ["sm", "base", "lg"],
      defaultValue: "base",
      description: "The size of the combobox.",
    },
    {
      name: "placeholder",
      type: "text",
      defaultValue: "Select an option...",
      description: "Placeholder text shown when no value is selected.",
    },
    {
      name: "searchPlaceholder",
      type: "text",
      defaultValue: "Search...",
      description: "Placeholder text for the search input.",
    },
    {
      name: "emptyMessage",
      type: "text",
      defaultValue: "No results found.",
      description: "Message shown when no items match the search.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether the combobox is disabled.",
    },
    {
      name: "hasError",
      type: "boolean",
      defaultValue: false,
      description: "Whether to show error styling.",
    },
    {
      name: "searchDebounce",
      type: "number",
      defaultValue: 300,
      description: "Debounce delay for search in milliseconds.",
    },
    {
      name: "clearSearchOnSelect",
      type: "boolean",
      defaultValue: true,
      description: "Whether to clear search input when item is selected.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic combobox with static options.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "async",
      title: "Async",
      description: "Combobox with async data loading.",
      code: jsxToString(<AsyncExample />),
    },
    {
      id: "icons",
      title: "Icons API",
      description: "Combobox loading icons from API.",
      code: jsxToString(<IconsExample />),
    },
    {
      id: "custom-rendering",
      title: "Custom Rendering",
      description: "Combobox with custom item and trigger rendering.",
      code: jsxToString(<CustomRenderingExample />),
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different sizes of the combobox.",
      code: jsxToString(<SizesExample />),
    },
    {
      id: "error",
      title: "Error State",
      description: "Combobox in error state.",
      code: jsxToString(<ErrorExample />),
    },
  ],
};
