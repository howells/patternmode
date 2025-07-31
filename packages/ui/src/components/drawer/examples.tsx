"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@patternmode/ui";
import React from "react";

// Default drawer
export const /**
              *
              */
  DefaultExample = () => (
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <div className="p-4">
          <h3>Drawer Content</h3>
          <p>This is the drawer content.</p>
        </div>
      </DrawerContent>
    </Drawer>
  ); export const /**
                   *
                   */
  DrawerExample = DefaultExample;
