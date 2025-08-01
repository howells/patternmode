"use client";

import type { ComboboxProps } from "./combobox";
import { Combobox } from "@patternmode/ui";

import React from "react";

type ComboboxExampleProps = ComboboxProps;

export function ComboboxExample(props: ComboboxProps) {
  return <Combobox {...props} />;
}
