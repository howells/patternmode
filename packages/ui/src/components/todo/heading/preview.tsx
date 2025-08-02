"use client";

import type { HeadingProps } from "./heading";

import { Heading } from "@patternmode/ui";
import React from "react";

type HeadingExampleProps = {
  [key: string]: unknown;
};

export function HeadingExample(props: HeadingProps) {
  return (
    <Heading level={1} {...props}>
      Heading Text
    </Heading>
  );
}
