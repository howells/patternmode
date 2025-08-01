"use client";

import type { TextProps } from "./text";
import { Text } from "@patternmode/ui";

import React from "react";

type TextExampleProps = TextProps;

export function TextExample(props: TextProps) {
  return (
    <Text {...props}>
      This is a text component that demonstrates typography and inherits its styling from the parent or props.
    </Text>
  );
}
