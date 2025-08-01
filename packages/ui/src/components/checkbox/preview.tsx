"use client";

import type { CheckboxProps } from "./checkbox";
import { Checkbox } from "@patternmode/ui";

import React from "react";

type CheckboxExampleProps = CheckboxProps;

export function CheckboxExample(props: CheckboxProps) {
  return <Checkbox {...props} />;
}
