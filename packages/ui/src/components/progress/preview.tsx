"use client";

import { Progress } from "@patternmode/ui";

import React from "react";

type ProgressExampleProps = React.ComponentProps<typeof Progress>;

export function ProgressExample(props: React.ComponentProps<typeof Progress>) {
  return <Progress {...props} />;
}
