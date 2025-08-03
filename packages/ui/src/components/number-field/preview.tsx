"use client";

import type { NumberFieldProps } from "./component";
import React from "react";
import { NumberField } from "./component";

export function NumberFieldExample(props: NumberFieldProps) {
  return <NumberField label="Quantity" placeholder="Enter quantity" {...props} />;
}
