import { TabNavigation, TabNavigationLink } from "@patternmode/ui";
import React from "react";

export function TabNavigationExample() {
  return (
    <TabNavigation>
      <TabNavigationLink href="#home">Home</TabNavigationLink>
      <TabNavigationLink href="#about">About</TabNavigationLink>
      <TabNavigationLink href="#contact">Contact</TabNavigationLink>
    </TabNavigation>
  );
}
