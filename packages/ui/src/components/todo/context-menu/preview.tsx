"use client";

import { ContextMenu } from "@patternmode/ui";

import React from "react";

type ContextMenuExampleProps = React.ComponentProps<typeof ContextMenu>;

export function ContextMenuExample(props: React.ComponentProps<typeof ContextMenu>) {
  return <ContextMenu {...props} />;
}
