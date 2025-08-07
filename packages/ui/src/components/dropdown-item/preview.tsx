"use client";

import type { DropdownItemProps } from "./types";
import { User } from "lucide-react";
import React from "react";
import { DropdownItem } from "./component";

export function DropdownItemPreview(props: DropdownItemProps) {
  const { ref: _ref, ...restProps } = props;
  return (
    <div className="w-48 bg-white dark:bg-zinc-950 border  dark:border-zinc-800 rounded-md p-1">
      <DropdownItem leftIcon={User} {...restProps}>
        {props.children || "Menu Item"}
      </DropdownItem>
    </div>
  );
}

// Preview props for prop explorer
export const dropdownItemPreviewProps = [
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
