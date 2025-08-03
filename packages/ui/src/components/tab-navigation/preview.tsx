"use client";

import type { TabNavigationProps } from "./component";
import React from "react";
import { TabNavigation, TabNavigationLink } from "./component";

export function TabNavigationExample(props: TabNavigationProps) {
  return (
    <TabNavigation {...props}>
      <TabNavigationLink href="#overview">
        Overview
      </TabNavigationLink>
      <TabNavigationLink href="#analytics">
        Analytics
      </TabNavigationLink>
      <TabNavigationLink href="#reports">
        Reports
      </TabNavigationLink>
      <TabNavigationLink href="#settings">
        Settings
      </TabNavigationLink>
    </TabNavigation>
  );
}
