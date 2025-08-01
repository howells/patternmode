"use client";

import type { TextareaProps } from "./textarea";
import { Textarea } from "@patternmode/ui";

import React from "react";

type TextareaExampleProps = TextareaProps;

export function TextareaExample(props: TextareaExampleProps) {
  // Safe props filtering for security
  const allowedProps = [
    "placeholder",
    "disabled",
    "required",
    "rows",
    "cols",
    "maxLength",
    "minLength",
    "readOnly",
    "autoFocus",
    "name",
    "id",
    "className",
    "style",
    "onChange",
    "onBlur",
    "onFocus",
    "value",
    "defaultValue",
  ];

  const safeProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => allowedProps.includes(key)),
  );

  return <Textarea {...safeProps} />;
}
