"use client";

import { Dot } from "./component";
import type { DotProps } from "./types";

export function DotPreview(props: DotProps) {
  return <Dot {...props} />;
}

export const dotPreviewProps = [
  {
    name: "variant",
    type: "select",
    description: "Semantic variant or Tailwind color name.",
    options: ["default", "success", "warning", "error", "info", "blue", "green", "red", "yellow", "purple", "pink", "indigo"],
    defaultValue: "default",
  },
  { name: "label", type: "string", description: "Optional label to display next to the dot.", defaultValue: "" },
  { name: "animated", type: "boolean", description: "Animate for active statuses.", defaultValue: false },
  { name: "size", type: "select", description: "Dot size.", options: ["sm", "default", "lg"], defaultValue: "default" },
];

