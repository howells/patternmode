"use client";

import React from "react";
import { Textarea } from "./component";

// Props that users can configure in the prop explorer
export type TextareaPreviewProps = {
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  className?: string;
  hasError?: boolean;
  autoResize?: boolean;
};

// Preview props for prop explorer
export const TextareaPreviewProps = [
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text for the textarea.",
    defaultValue: "Enter your text here...",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the textarea is disabled.",
    defaultValue: false,
  },
  {
    name: "readOnly",
    type: "boolean",
    description: "Whether the textarea is read-only.",
    defaultValue: false,
  },
  {
    name: "rows",
    type: "number",
    description: "Number of visible text lines.",
    defaultValue: 3,
  },
  {
    name: "hasError",
    type: "boolean",
    description: "Whether to display error styling.",
    defaultValue: false,
  },
  {
    name: "autoResize",
    type: "boolean",
    description: "Whether the textarea should automatically resize.",
    defaultValue: true,
  },
];

export function TextareaExample(props: TextareaPreviewProps) {
  const {
    placeholder = "Enter your text here...",
    disabled = false,
    readOnly = false,
    rows = 3,
    className = "",
    hasError = false,
    autoResize = true,
  } = props;

  // Define allowed props for security
  const allowedProps = [
    "placeholder",
    "disabled",
    "readOnly",
    "rows",
    "className",
    "hasError",
    "autoResize",
  ];

  // Safe props filtering - only pass known safe props
  const safeProps = {
    placeholder,
    disabled,
    readOnly,
    rows,
    className,
    hasError,
    autoResize,
  };

  return <Textarea {...safeProps} />;
}
