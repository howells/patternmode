"use client";

import type { StackProps } from "./stack";
import { Stack } from "@patternmode/ui";

import React from "react";

type StackPreviewProps = StackProps;

export function StackPreview(props: StackPreviewProps) {
  return <Stack {...props} />;
}

export function StackExample() {
  return (
    <Stack gap={4}>
      <div className="bg-blue-100 p-4 rounded">Item 1</div>
      <div className="bg-green-100 p-4 rounded">Item 2</div>
      <div className="bg-yellow-100 p-4 rounded">Item 3</div>
    </Stack>
  );
}
