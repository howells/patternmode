"use client";

import { Popover } from "@patternmode/ui";

import React from "react";

type PopoverExampleProps = React.ComponentProps<typeof Popover>;

export function PopoverExample(props: React.ComponentProps<typeof Popover>) {
  return <Popover {...props} />;
}
