"use client";

import { Textarea } from "./component";

export type TextareaPreviewProps = {
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  className?: string;
  hasError?: boolean;
  autoResize?: boolean;
  size?: "xs" | "sm" | "base" | "lg";
  fullWidth?: boolean;
};

export const textareaPreviewProps = [
  { name: "placeholder", type: "string", defaultValue: "Enter your text here..." },
  { name: "disabled", type: "boolean", defaultValue: false },
  { name: "readOnly", type: "boolean", defaultValue: false },
  { name: "rows", type: "number", defaultValue: 3, min: 1, max: 10 },
  { name: "hasError", type: "boolean", defaultValue: false },
  { name: "autoResize", type: "boolean", defaultValue: true },
  { name: "size", type: "select", options: ["xs", "sm", "base", "lg"], defaultValue: "base" },
  { name: "fullWidth", type: "boolean", defaultValue: false },
];

export function TextareaPreview(props: TextareaPreviewProps) {
  return (
    <div className="p-6">
      <Textarea {...props} />
    </div>
  );
}

