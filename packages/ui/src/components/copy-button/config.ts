import type { ComponentConfig } from "../../types/component-types";
import { Copy } from "lucide-react";
import { CopyButton } from "./component";
import {
  ApiKeyExample,
  CustomLabelsExample,
  DefaultExample,
  LongTextExample,
} from "./examples";

export const copyButtonConfig: ComponentConfig = {
  id: "copy-button",
  name: "Copy Button",
  description: "Button component for copying text content to the clipboard with visual feedback and customizable labels.",
  category: "actions",
  icon: Copy,
  importStatement: `import { CopyButton } from "@patternmode/ui/copy-button";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic copy button with default labels",
      component: DefaultExample,
    },
    {
      id: "custom-labels",
      title: "Custom Labels",
      description: "Copy button with custom copy and copied labels",
      component: CustomLabelsExample,
    },
    {
      id: "long-text",
      title: "Long Text",
      description: "Copy button for longer text content",
      component: LongTextExample,
    },
    {
      id: "api-key",
      title: "API Key",
      description: "Copy button styled for API keys with custom text size",
      component: ApiKeyExample,
    },
  ],
  components: [
    {
      name: "Copy Button",
      description: "Button that copies text to clipboard with visual feedback.",
      component: CopyButton,
      primary: true,
    },
  ],
};
