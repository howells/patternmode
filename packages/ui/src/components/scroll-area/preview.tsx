"use client";

import type { ScrollAreaProps } from "./scroll-area";
import { ScrollArea } from "@patternmode/ui";

import React from "react";

type ScrollAreaExampleProps = ScrollAreaProps;

export function ScrollAreaExample(props: ScrollAreaProps) {
  return <ScrollArea {...props} />;
}
