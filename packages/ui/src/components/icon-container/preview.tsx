"use client";

import type { IconContainerProps } from "./icon-container";
import { IconContainer } from "@patternmode/ui";

import { Box } from "lucide-react";

import React from "react";

type IconContainerExampleProps = IconContainerProps;

export function IconContainerExample(props: IconContainerProps) {
  return <IconContainer icon={Box} {...props} />;
}
