"use client";

import type { ButtonProps } from "./button";
import { Button } from "@patternmode/ui";

import React from "react";

type ButtonExampleProps = ButtonProps;

export function ButtonExample(props: ButtonProps) {
  return <Button {...props} />;
}
