import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { DefaultExample, WithShortcutsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "context-menu",
  name: "Context Menu",
  description: "A context menu component that appears on right-click, providing contextual actions and options.",
  category: "overlay" as const,
  icon: "MoreHorizontal",

  importStatement: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";`,
  componentId: "ContextMenuExample",
  props: [
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether the context menu is disabled.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic context menu with simple menu items.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-shortcuts",
      title: "With Shortcuts",
      description: "Context menu items with keyboard shortcuts displayed.",
      code: jsxToString(<WithShortcutsExample />),
    },
  ],
};
