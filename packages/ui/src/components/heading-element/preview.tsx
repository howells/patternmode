"use client";

import type { HeadingElementProps } from "./heading-element";
import { HeadingElement } from "@patternmode/ui";

import React from "react";

type HeadingElementExampleProps = HeadingElementProps;

export function HeadingElementExample(props: HeadingElementProps) {
  return <HeadingElement {...props} />;
}
