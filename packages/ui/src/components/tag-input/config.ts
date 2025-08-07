import type { ComponentConfig } from "../../types/component-types";
import { Tags } from "lucide-react";
import { TagInput } from "./component";
import {
  ComplexExample,
  CustomTagRenderingExample,
  DefaultExample,
  DisabledExample,
  WithHookExample,
  WithInitialValuesExample,
  WithMaxTagsExample,
  WithTagCreationExample,
} from "./examples";

export const tagInputConfig: ComponentConfig = {
  id: "tag-input",
  name: "Tag Input",
  description: "A sophisticated multi-select tag input component with search, filtering, and tag creation capabilities built on Downshift for robust accessibility.",
  category: "controls",
  icon: Tags,
  importStatement: `import { TagInput, useTagInput } from "@patternmode/ui/tag-input";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic tag input with predefined options",
      component: DefaultExample,
    },
    {
      id: "with-initial-values",
      title: "With Initial Values",
      description: "Tag input with pre-selected values",
      component: WithInitialValuesExample,
    },
    {
      id: "with-max-tags",
      title: "With Max Tags",
      description: "Tag input with maximum selection limit",
      component: WithMaxTagsExample,
    },
    {
      id: "with-tag-creation",
      title: "With Tag Creation",
      description: "Allow creating new tags on-the-fly",
      component: WithTagCreationExample,
    },
    {
      id: "custom-tag-rendering",
      title: "Custom Tag Rendering",
      description: "Custom rendering for tags and dropdown items",
      component: CustomTagRenderingExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled tag input state",
      component: DisabledExample,
    },
    {
      id: "with-hook",
      title: "With Hook",
      description: "Using the useTagInput hook for state management",
      component: WithHookExample,
    },
    {
      id: "complex",
      title: "Complex Example",
      description: "Advanced example with multiple features",
      component: ComplexExample,
    },
  ],
  components: [
    {
      name: "Tag Input",
      description: "Multi-select tag input with search, filtering, and dynamic creation",
      component: TagInput,
    },
  ],
};
