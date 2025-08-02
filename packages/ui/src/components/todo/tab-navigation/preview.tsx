"use client";

import { TabNavigation } from "@patternmode/ui";

import React from "react";

type TabNavigationExampleProps = React.ComponentProps<typeof TabNavigation>;

export function TabNavigationExample(props: React.ComponentProps<typeof TabNavigation>) {
  return <TabNavigation {...props} />;
}
