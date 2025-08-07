import type { ComponentConfig } from "../../types/component-types";
import { MessageSquare } from "lucide-react";
import { Textarea } from "./component";
import { DefaultExample, DisabledExample, FixedHeightExample, WithContentExample, WithErrorExample, WithHeightCallbackExample, WithRowConstraintsExample } from "./examples";
import { textareaPreviewProps } from "./preview";

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

export const textareaConfig: ComponentConfig = {
  id: "textarea",
  name: "Textarea",
  description: "A multi-line text input control that allows users to enter and edit text.",
  category: "controls",
  featured: true,
  icon: MessageSquare,
  importStatement: `import { Textarea } from "@patternmode/ui/textarea";`,
  previewProps: textareaPreviewProps,
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
    {
      id: "with-row-constraints",
      title: "Row Constraints",
      description: "Textarea with minimum and maximum row limits",
      component: WithRowConstraintsExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Textarea in disabled state",
      component: DisabledExample,
    },
    {
      id: "fixed-height",
      title: "Fixed Height",
      description: "Textarea with fixed height and scrolling",
      component: FixedHeightExample,
    },
    {
      id: "with-height-callback",
      title: "Height Tracking",
      description: "Textarea with height change monitoring",
      component: WithHeightCallbackExample,
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
