import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { PreviewCardExample, DefaultExample, WithImageExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "preview-card",
  name: "Preview Card",
  description: "A card component that shows a preview or summary of content.",
  category: "layout" as const,
  icon: "Eye",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { PreviewCard } from "@/components/ui/preview-card/preview-card";`,
  componentId: "PreviewCardExample",
  props: [
    {
      name: "title",
      type: "string",
      description: "The title of the preview card",
      defaultValue: "Card Title"
    },
    {
      name: "description",
      type: "string",
      description: "The description text",
      defaultValue: "This is a preview card description."
    },
    {
      name: "image",
      type: "string",
      description: "Image URL for the preview",
      defaultValue: ""
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Preview Card",
      description: "A card component that shows a preview or summary of content.",
      code: jsxToString(<DefaultExample />),
  ]
};