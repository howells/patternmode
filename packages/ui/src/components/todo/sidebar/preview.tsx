"use client";

import { Sidebar } from "@patternmode/ui";

import React from "react";

type SidebarExampleProps = React.ComponentProps<typeof Sidebar>;

export function SidebarExample(props: React.ComponentProps<typeof Sidebar>) {
  return <Sidebar {...props} />;
}
