"use client";

import type { DismissButtonProps } from "./dismiss-button";
import { DismissButton } from "@patternmode/ui";

import React from "react";

type DismissButtonExampleProps = DismissButtonProps;

export function DismissButtonExample(props: DismissButtonProps) {
  return <DismissButton {...props} />;
}
