import type { ComponentConfig } from "../../lib/component-config-types";
import { FileText } from "lucide-react";
import {
  DefaultExample,
  DisabledExample,
  FixedHeightExample,
  FormIntegrationExample,
  PerformanceExample,
  WithContentExample,
  WithErrorExample,
  WithHeightCallbackExample,
  WithRowConstraintsExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  // Basic metadata
  id: "textarea",
  name: "Textarea",
  description: "Auto-resizing multi-line text input component built on react-textarea-autosize with configurable constraints and error states.",
  category: "inputs",
  icon: FileText,
  componentId: "Textarea",
  importStatement: "import { Textarea } from \"@patternmode/ui/textarea\";",

  examples: [
    {
      id: "DefaultExample",
      title: "Auto-Resizing Textarea",
      description: "Basic textarea that automatically adjusts height based on content",
      component: DefaultExample,
    },
    {
      id: "WithContentExample",
      title: "With Initial Content",
      description: "Textarea with pre-filled content demonstrating auto-resize",
      component: WithContentExample,
    },
    {
      id: "WithRowConstraintsExample",
      title: "With Row Constraints",
      description: "Textarea with minimum and maximum row limits",
      component: WithRowConstraintsExample,
    },
    {
      id: "WithErrorExample",
      title: "Error State",
      description: "Textarea with error styling and validation",
      component: WithErrorExample,
    },
    {
      id: "DisabledExample",
      title: "Disabled State",
      description: "Non-interactive textarea with disabled styling",
      component: DisabledExample,
    },
    {
      id: "FixedHeightExample",
      title: "Fixed Height",
      description: "Textarea with auto-resize disabled for fixed height",
      component: FixedHeightExample,
    },
    {
      id: "WithHeightCallbackExample",
      title: "Height Change Tracking",
      description: "Textarea with callback to track height changes",
      component: WithHeightCallbackExample,
    },
    {
      id: "FormIntegrationExample",
      title: "Form Integration",
      description: "Complete form example with multiple textareas",
      component: FormIntegrationExample,
    },
    {
      id: "PerformanceExample",
      title: "Performance Optimization",
      description: "Textarea with measurement caching for better performance",
      component: PerformanceExample,
    },
  ],
};
