"use client";

import type { NumberFieldProps } from "./number-field";
import { NumberField } from "@patternmode/ui";

import React from "react";

type NumberFieldExampleProps = NumberFieldProps;

export function NumberFieldExample(props: NumberFieldProps) {
  return <NumberField {...props} />;
}
