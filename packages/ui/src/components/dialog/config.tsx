import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { ConfirmationExample, ControlledExample, DefaultExample, DialogExample, WithFormExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "dialog",
  name: "Dialog",
  description:
    "Modal dialog component built on Base UI with overlay and focus management.",
  category: "overlay" as const,
  icon: "MessageSquare",

  importStatement: `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";`,
  componentId: "DialogExample",
  props: [
    {
      name: "size",
      type: "select",
      options: ["sm", "md", "lg", "xl"],
      defaultValue: "md",
      description: "Size of the dialog content."
    },
    {
      name: "showCloseButton",
      type: "boolean",
      defaultValue: true,
      description: "Whether to show the close button in the header."
    },
    {
      name: "closeOnOverlayClick",
      type: "boolean",
      defaultValue: true,
      description: "Whether clicking the overlay closes the dialog."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic dialog with trigger button and content.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-form",
      title: "With Form",
      description: "Dialog containing a form with input fields.",
      code: jsxToString(<WithFormExample />)},
    {
      id: "confirmation",
      title: "Confirmation",
      description: "Dialog for confirming destructive actions.",
      code: jsxToString(<ConfirmationExample />)},
    {
      id: "controlled",
      title: "Controlled",
      description: "Dialog with controlled open state.",
      code: jsxToString(<ControlledExample />),}
  ]
};
