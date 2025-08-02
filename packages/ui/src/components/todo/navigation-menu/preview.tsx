"use client";

import { NavigationMenu } from "@patternmode/ui";

import React from "react";

type NavigationMenuExampleProps = React.ComponentProps<typeof NavigationMenu>;

export function NavigationMenuExample(props: React.ComponentProps<typeof NavigationMenu>) {
  return <NavigationMenu {...props} />;
}
