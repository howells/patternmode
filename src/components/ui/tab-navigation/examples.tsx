import React from "react";
import { TabNavigation, TabNavigationLink } from "./tab-navigation";

export function TabNavigationExample() {
  return (
    <TabNavigation>
      <TabNavigationLink href="#home">Home</TabNavigationLink>
      <TabNavigationLink href="#about">About</TabNavigationLink>
      <TabNavigationLink href="#contact">Contact</TabNavigationLink>
    </TabNavigation>
  );
}