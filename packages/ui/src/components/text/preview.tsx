"use client";

import type { TextProps } from "./component";
import React from "react";
import { Text } from "./component";

export function TextExample(props: TextProps) {
  return (
    <Text {...props}>
      This is a text component that demonstrates typography and inherits its styling from the parent or props.
    </Text>
  );
}
