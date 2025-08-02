"use client";

import type { CheckboxGroupProps } from "./checkbox-group";
import { CheckboxGroup } from "@patternmode/ui";

import React from "react";

type CheckboxGroupExampleProps = CheckboxGroupProps;

export function CheckboxGroupExample(props: CheckboxGroupProps) {
  return <CheckboxGroup {...props} />;
}
