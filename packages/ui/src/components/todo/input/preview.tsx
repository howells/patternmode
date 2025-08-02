"use client";

import type { InputProps } from "./input";
import { Input } from "@patternmode/ui";

import React from "react";

type InputExampleProps = InputProps;

export function InputExample(props: InputProps) {
  return <Input placeholder="Enter text..." {...props} />;
}
