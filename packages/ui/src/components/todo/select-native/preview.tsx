"use client";

import type { SelectNativeProps } from "./select-native";
import { SelectNative } from "@patternmode/ui";

import React from "react";

type SelectNativeExampleProps = SelectNativeProps;

export function SelectNativeExample(props: SelectNativeProps) {
  return <SelectNative {...props} />;
}
