"use client";

import type { SubheadingProps } from "./subheading";
import { Subheading } from "@patternmode/ui";

import React from "react";

type SubheadingExampleProps = SubheadingProps;

export function SubheadingExample(props: SubheadingProps) {
  return <Subheading {...props} />;
}
