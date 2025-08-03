"use client";

import type { ResponsiveDrawerProps } from "./component";
import React from "react";
import {
  ResponsiveDrawer,
  ResponsiveDrawerContent,
  ResponsiveDrawerDescription,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger,
} from "./component";

export function ResponsiveDrawerExample(props: ResponsiveDrawerProps) {
  return (
    <ResponsiveDrawer {...props}>
      <ResponsiveDrawerTrigger className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Open Drawer
      </ResponsiveDrawerTrigger>
      <ResponsiveDrawerContent>
        <ResponsiveDrawerHeader>
          <ResponsiveDrawerTitle>Drawer Title</ResponsiveDrawerTitle>
          <ResponsiveDrawerDescription>
            This is a responsive drawer that adapts to different screen sizes.
          </ResponsiveDrawerDescription>
        </ResponsiveDrawerHeader>
        <div className="p-4">
          <p>Drawer content goes here.</p>
        </div>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
}
