import React from "react";
// Configuration data - no React imports or JSX
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, DestructiveExample } from "./examples";

// Component configuration - single source of truth
export const componentConfig: ComponentConfig = {
  id: "alert-dialog",
  name: "Alert Dialog",
  description:
    "A modal dialog that interrupts the user with important content and expects a response.",
  category: "overlay" as const,
  icon: "AlertTriangle",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog/alert-dialog";`,
  componentId: "AlertDialogExample",

  // Props that users can experiment with
  props: [
    {
      name: "variant",
      type: "select",
      description: "The visual style variant of the alert dialog.",
      defaultValue: "default",
      options: ["default", "destructive"]
    },
    {
      name: "title",
      type: "string",
      description: "The title of the alert dialog.",
      defaultValue: "Are you absolutely sure?"
    },
    {
      name: "description",
      type: "textarea",
      description: "The description text of the alert dialog.",
      defaultValue:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
    },
    {
      name: "cancelText",
      type: "string",
      description: "Text for the cancel button.",
      defaultValue: "Cancel"
    },
    {
      name: "actionText",
      type: "string",
      description: "Text for the action button.",
      defaultValue: "Continue"
    }
  ],

  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic alert dialog with default styling.",
      code: jsxToString(<DefaultExample />)},
    {
      id: "destructive",
      title: "Destructive",
      description: "Alert dialog with destructive action styling.",
      code: jsxToString(<DestructiveExample />)}
  ]
};
