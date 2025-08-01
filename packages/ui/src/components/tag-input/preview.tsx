"use client";

import type { TagInputProps } from "./tag-input";
import { TagInput } from "@patternmode/ui";

import React from "react";

type TagInputExampleProps = TagInputProps;

export function TagInputExample(props: TagInputProps) {
  return <TagInput {...props} />;
}
