"use client";

import { Menu } from "@patternmode/ui";

import React from "react";

type MenuExampleProps = React.ComponentProps<typeof Menu>;

export function MenuExample(props: React.ComponentProps<typeof Menu>) {
  return <Menu {...props} />;
}
