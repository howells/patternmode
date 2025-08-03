"use client";

import type { HeadingElementProps } from "./component";
import React from "react";
import { HeadingElement } from "./component";

export function HeadingElementExample(props: HeadingElementProps) {
  return <HeadingElement level={2} {...props}>Sample Heading</HeadingElement>;
}
