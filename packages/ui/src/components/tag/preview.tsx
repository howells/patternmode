"use client";

import type { TagProps } from "./component";

import React from "react";

import { Tag } from "./component";

export function TagExample(props: TagProps) {
  return <Tag {...props} />;
}
