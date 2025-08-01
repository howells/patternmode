"use client";

import type { TagProps } from "./tag";
import { Tag } from "@patternmode/ui";

import React from "react";

export function TagExample(props: TagProps) {
  return <Tag {...props} />;
}
