"use client";

import React from "react";
import { ProgressBar } from "./component";

type ProgressExampleProps = React.ComponentProps<typeof ProgressBar>;

export function ProgressExample(props: ProgressExampleProps) {
  return <ProgressBar {...props} />;
}
