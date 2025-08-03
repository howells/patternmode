"use client";

import type { SubheadingProps } from "./component";
import React from "react";
import { Subheading } from "./component";

export function SubheadingExample(props: SubheadingProps) {
  return (
    <Subheading {...props}>
      Section Subheading
    </Subheading>
  );
}
