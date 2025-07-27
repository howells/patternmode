import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, MinimalExample, WithBothActionsExample, LargeSizeExample  } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "empty-state",
  name: "Empty State",
  description:
    "A component to display when there's no content to show, with optional actions to guide users.",
  category: "utility" as const,
  icon: "Inbox",

  importStatement: `import { EmptyState } from "@/components/ui/empty-state/empty-state";`,
  componentId: "EmptyStateExample",
  props: [
    {
      name: "title",
      type: "string",
      defaultValue: "No data found",
      description: "The main heading/title of the empty state."
    },
    {
      name: "description",
      type: "textarea",
      defaultValue:
        "There's nothing here yet. Try creating something new to get started.",
      description: "Optional description text below the title."
    },
    {
      name: "icon",
      type: "icon",
      defaultValue: "FileX",
      description: "Optional icon to display above the title."
    },
    {
      name: "variant",
      type: "select",
      defaultValue: "default",
      options: ["default", "minimal"],
      description: "Visual variant of the empty state."
    },
    {
      name: "size",
      type: "select",
      defaultValue: "default",
      options: ["sm", "default", "lg"],
      description: "Size variant affecting spacing and text sizes."
    },
    {
      name: "showPrimaryAction",
      type: "boolean",
      defaultValue: true,
      description: "Whether to show the primary action button."
    },
    {
      name: "primaryActionLabel",
      type: "string",
      defaultValue: "Create New",
      description: "Label for the primary action button."
    },
    {
      name: "showSecondaryAction",
      type: "boolean",
      defaultValue: false,
      description: "Whether to show the secondary action."
    },
    {
      name: "secondaryActionLabel",
      type: "string",
      defaultValue: "Learn more",
      description: "Label for the secondary action."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description:
        "Basic empty state with title, description, and primary action.",
      code: `<EmptyState
  title="No projects found"
  description="Get started by creating your first project. It only takes a few minutes to set up."
  icon={FolderOpen}
  primaryAction={{
    label: "Create Project",
    onClick: () => console.log("Create clicked")
  }}
/>`
    },
    {
      id: "minimal",
      title: "Minimal",
      description: "Clean empty state with minimal styling.",
      code: jsxToString(<MinimalExample />)},
    {
      id: "with-both-actions",
      title: "With Both Actions",
      description: "Empty state with both primary and secondary actions.",
      code: jsxToString(<WithBothActionsExample />)},
    {
      id: "large-size",
      title: "Large Size",
      description: "Larger empty state for prominent placement.",
      code: jsxToString(<LargeSizeExample />)}
  ]
};
