"use client";

import type { LabelProps } from "./label";
import { Label } from "@patternmode/ui";

import React from "react";

type LabelExampleProps = LabelProps;

export function LabelExample(props: LabelProps) {
  return <Label {...props} />;
}
