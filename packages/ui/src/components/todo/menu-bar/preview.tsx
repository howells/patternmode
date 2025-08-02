"use client";

import { MenuBar } from "@patternmode/ui";

import React from "react";

type MenuBarExampleProps = React.ComponentProps<typeof MenuBar>;

export function MenuBarExample(props: React.ComponentProps<typeof MenuBar>) {
  return <MenuBar {...props} />;
}
