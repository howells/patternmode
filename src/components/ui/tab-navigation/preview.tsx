"use client";

import { TabNavigation, TabNavigationLink } from "@patternmode/ui";

export function Example() {
  return (
    <TabNavigation>
      <TabNavigation>
        <TabNavigationLink href="#dashboard">Dashboard</TabNavigationLink>
        <TabNavigationLink href="#analytics">Analytics</TabNavigationLink>
        <TabNavigationLink href="#reports">Reports</TabNavigationLink>
        <TabNavigationLink href="#settings">Settings</TabNavigationLink>
      </TabNavigation>
    </TabNavigation>
  );
}
