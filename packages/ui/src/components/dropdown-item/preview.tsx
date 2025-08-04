"use client";

import React from "react";
import type { DropdownItemProps } from "./component";
import { User } from "lucide-react";
import { DropdownItem } from "./component";

export function DropdownItemExample(props: DropdownItemProps) {
  return (
    <div className="w-48 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1">
      <DropdownItem leftIcon={User} {...props}>
        {props.children || "Menu Item"}
      </DropdownItem>
    </div>
  );
}

// Preview props for prop explorer
export const DropdownItemPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Content of the dropdown item.",
    defaultValue: "Menu Item",
  },
  {
    name: "variant",
    type: "select",
    description: "Visual style variant of the dropdown item.",
    options: ["default", "destructive"],
    defaultValue: "default",
  },
  {
    name: "highlighted",
    type: "boolean",
    description: "Whether the item is highlighted/focused.",
    defaultValue: false,
  },
  {
    name: "selected",
    type: "boolean",
    description: "Whether the item is selected.",
    defaultValue: false,
  },
  {
    name: "hint",
    type: "string",
    description: "Hint text to display on the right.",
    defaultValue: "",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the dropdown item is disabled.",
    defaultValue: false,
  },
];
