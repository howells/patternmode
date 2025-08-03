"use client";

import type { HeadingProps } from "./component";
import React from "react";
import { Heading } from "./component";

export function HeadingExample(props: HeadingProps) {
  return (
    <Heading level={1} {...props}>
      Heading Text
    </Heading>
  );
}
