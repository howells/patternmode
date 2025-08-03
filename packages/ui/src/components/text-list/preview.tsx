"use client";

import type { TextListProps } from "./component";
import React from "react";
import { TextList } from "./component";

export function TextListExample(props: TextListProps) {
  return <TextList {...props} />;
}
