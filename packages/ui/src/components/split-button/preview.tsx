"use client";

import type { SplitButtonProps } from "./split-button";
import { SplitButton } from "@patternmode/ui";

import React from "react";

type SplitButtonExampleProps = SplitButtonProps;

export function SplitButtonExample(props: SplitButtonProps) {
  return <SplitButton {...props} />;
}
