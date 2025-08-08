"use client";

import type { ButtonGroupProps } from "./types";
import * as React from "react";
import { Button } from "../button/component";
import { ButtonGroup } from "./component";
import { buttonVariants } from "../button/types";

export function ButtonGroupPreview({
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <ButtonGroup {...props}>
      {children || (
        <>
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Help</Button>
        </>
      )}
    </ButtonGroup>
  );
}

// Preview props for prop explorer
export const buttonGroupPreviewProps = [
  {
    name: "variant",
    type: "select",
    description: "Visual style variant inherited by all child buttons.",
    options: ["default", ...buttonVariants],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Size variant inherited by all child buttons and affects spacing.",
    options: ["xs", "sm", "default", "lg", "icon-xs", "icon-sm", "icon", "icon-lg"],
    defaultValue: "default",
  },
  {
    name: "align",
    type: "select",
    description: "Horizontal alignment of buttons within the container.",
    options: ["start", "center", "end", "between", "around", "evenly"],
    defaultValue: "start",
  },
  {
    name: "wrap",
    type: "boolean",
    description: "Whether buttons should wrap to new lines when container width is exceeded.",
    defaultValue: false,
  },
  {
    name: "gap",
    type: "select",
    description: "Custom gap between buttons (overrides size-based gap).",
    options: [
      { label: "Auto (based on size)", value: undefined },
      { label: "0.5", value: 0.5 },
      { label: "1", value: 1 },
      { label: "1.5", value: 1.5 },
      { label: "2", value: 2 },
      { label: "2.5", value: 2.5 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
    defaultValue: undefined,
  },
];
