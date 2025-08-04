"use client";

import * as React from "react";
import { Button } from "../button/component";
import { ButtonGroup } from "./component";

export const ButtonGroupPreview = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Basic Button Group</h3>
        <ButtonGroup>
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Help</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Secondary Variant</h3>
        <ButtonGroup variant="secondary" size="sm">
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>More</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Icon Button Group</h3>
        <ButtonGroup size="icon-sm">
          <Button>✕</Button>
          <Button>✓</Button>
          <Button>⚙</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

// Preview props for prop explorer
export const buttonGroupPreviewProps = [
  {
    name: "variant",
    type: "select",
    description: "Visual style variant for all buttons in the group.",
    options: ["primary", "secondary", "outline", "ghost"],
    defaultValue: "primary",
  },
  {
    name: "size", 
    type: "select",
    description: "Size variant for all buttons in the group.",
    options: ["sm", "base", "lg", "icon-sm", "icon", "icon-lg"],
    defaultValue: "base",
  },
];