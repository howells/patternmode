"use client";

import type { StackProps } from "./stack";
import { Stack } from "@patternmode/ui";

import React from "react";

type StackExampleProps = StackProps;

export function StackExample(props: StackProps) {
  return <Stack {...props} />;
}
