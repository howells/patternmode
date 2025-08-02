"use client";

import { Dialog } from "@patternmode/ui";

import React from "react";

type DialogExampleProps = React.ComponentProps<typeof Dialog>;

export function DialogExample(props: React.ComponentProps<typeof Dialog>) {
  return <Dialog {...props} />;
}
