import type { ComponentConfig } from "../../lib/component-config-types";
import { MessageSquare } from "lucide-react";
import { Textarea } from "./component";
import { DefaultExample, WithContentExample, WithErrorExample } from "./examples";
import { TextareaPreviewProps } from "./preview";

// TypeScript type for the component props
export type TextareaConfigProps = {
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  className?: string;
  hasError?: boolean;
  autoResize?: boolean;
};

export const componentConfig: ComponentConfig = {
  id: "textarea",
  name: "Textarea",
  description: "A multi-line text input control that allows users to enter and edit text.",
  category: "controls",
  icon: MessageSquare,
  importStatement: `import { Textarea } from "@patternmode/ui/textarea";`,
  props: TextareaPreviewProps,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic textarea with default settings",
      component: DefaultExample,
    },
    {
      id: "with-content",
      title: "With Content",
      description: "Textarea with pre-filled content",
      component: WithContentExample,
    },
    {
      id: "with-error",
      title: "With Error",
      description: "Textarea in error state",
      component: WithErrorExample,
    },
  ],
  components: [
    {
      name: "Textarea",
      description: "Multi-line text input component",
      component: Textarea,
    },
  ],
};
