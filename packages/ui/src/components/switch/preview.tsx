"use client";

import type { SwitchProps } from "./types";
import React from "react";
import { Switch } from "./component";

export function SwitchPreview(props: SwitchProps) {
  return <Switch {...props} />;
}

// Preview props for prop explorer
export const switchPreviewProps = [
  {
    name: "label",
    type: "string",
    description: "Optional label text displayed next to the switch.",
    defaultValue: "Enable notifications",
  },
  {
    name: "size",
    type: "select",
    description: "Size variant of the switch component.",
    options: ["default", "small"],
    defaultValue: "default",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    description: "Whether the switch is initially checked.",
    defaultValue: false,
  },
  {
    name: "checked",
    type: "boolean",
    description: "Whether the switch is checked (controlled).",
    defaultValue: undefined,
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the switch is disabled.",
    defaultValue: false,
  },
];
