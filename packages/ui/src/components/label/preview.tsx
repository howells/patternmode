"use client";

import type { LabelProps } from "./component";
import React from "react";
import { Label } from "./component";

export function LabelExample(props: LabelProps) {
  return <Label {...props} />;
}
