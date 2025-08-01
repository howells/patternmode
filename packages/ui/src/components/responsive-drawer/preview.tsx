"use client";

import type { ResponsiveDrawerProps } from "./responsive-drawer";
import { ResponsiveDrawer } from "@patternmode/ui";

import React from "react";

type ResponsiveDrawerExampleProps = ResponsiveDrawerProps;

export function ResponsiveDrawerExample(props: ResponsiveDrawerProps) {
  return <ResponsiveDrawer {...props} />;
}
