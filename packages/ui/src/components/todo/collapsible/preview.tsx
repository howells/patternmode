"use client";

import { Collapsible } from "@patternmode/ui";

import React from "react";

type CollapsibleExampleProps = React.ComponentProps<typeof Collapsible>;

export function CollapsibleExample(props: React.ComponentProps<typeof Collapsible>) {
  return <Collapsible {...props} />;
}
