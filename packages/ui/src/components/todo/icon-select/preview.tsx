"use client";

import type { IconSelectProps } from "./icon-select";
import { IconSelect } from "@patternmode/ui";

import React from "react";

type IconSelectExampleProps = IconSelectProps;

export function IconSelectExample(props: IconSelectProps) {
  return <IconSelect {...props} />;
}
