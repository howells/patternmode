import type { ComponentConfig } from "@patternmode/config/component-types";
import { Tag } from "lucide-react";
import { Label } from "./component";
import { BasicExample, CustomStyledExample, DisabledExample, RequiredExample } from "./examples";

export const labelConfig: ComponentConfig = {
  id: "label",
  name: "Label",
  description:
    "A semantic label component built on Base UI Field.Label for accessible form labeling. Provides consistent typography and styling with support for disabled states and dark mode.",
  category: "forms",
  icon: Tag,
  importStatement: `import { Label } from "@patternmode/label";`,
  examples: [
    { id: "basic", title: "Basic", description: "Basic form label", component: BasicExample },
    { id: "required", title: "Required Field", description: "Label for required field with asterisk indicator", component: RequiredExample },
    { id: "disabled", title: "Disabled", description: "Disabled label styling for disabled form controls", component: DisabledExample },
    { id: "custom-styled", title: "Custom Styled", description: "Label with custom styling and emphasis", component: CustomStyledExample }
  ],
  components: [
    {
      name: "Label",
      description: "Form label component providing accessible labeling for input elements",
      component: Label,
    },
  ],
};

