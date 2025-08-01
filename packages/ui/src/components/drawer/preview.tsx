"use client";

import { Drawer } from "@patternmode/ui";

import React from "react";

type DrawerExampleProps = React.ComponentProps<typeof Drawer>;

export function DrawerExample(props: React.ComponentProps<typeof Drawer>) {
  return <Drawer {...props} />;
}
