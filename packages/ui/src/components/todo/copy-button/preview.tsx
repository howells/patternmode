"use client";

import type { CopyButtonProps } from "./copy-button";

import { CopyButton } from "@patternmode/ui";
import React from "react";

type CopyButtonExampleProps = {
  [key: string]: unknown;
};

export function CopyButtonExample(props: CopyButtonProps) {
  return (
    <CopyButton
      text="Hello, World!"
      {...props}
    />
  );
}
