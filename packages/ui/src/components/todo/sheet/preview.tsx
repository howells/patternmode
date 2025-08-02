"use client";

import { Sheet } from "@patternmode/ui";

import React from "react";

type SheetExampleProps = React.ComponentProps<typeof Sheet>;

export function SheetExample(props: React.ComponentProps<typeof Sheet>) {
  return <Sheet {...props} />;
}
