"use client";

import React from "react";
import type { ButtonVariant } from "../../constants/variants";
import { Button } from "../button/component";
import { buttonVariants } from "../button/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./component";

export type DrawerPreviewProps = {
  /**
   * Drawer opening direction.
   * Controls which side of the screen the drawer slides in from.
   */
  direction?: "top" | "right" | "bottom" | "left";
  /**
   * Whether to show the drawer footer.
   * Displays action buttons at the bottom when enabled.
   */
  showFooter?: boolean;
  /**
   * Whether to show the close button.
   * Displays a close button in the header when enabled.
   */
  showCloseButton?: boolean;
  /**
   * Trigger button variant.
   * Controls the styling of the drawer trigger button.
   */
  triggerVariant?: ButtonVariant;
  /**
   * Content complexity level.
   * Determines how much content is displayed in the drawer.
   */
  contentLevel?: "simple" | "detailed" | "form";
};

export function DrawerPreview({
  direction = "bottom",
  showFooter = true,
  showCloseButton = true,
  triggerVariant = "primary",
  contentLevel = "simple",
}: DrawerPreviewProps = {}) {
  const getContent = () => {
    switch (contentLevel) {
      case "simple":
        return (
          <div className="p-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              This is a simple drawer with basic content. Perfect for quick information display.
            </p>
          </div>
        );
      case "detailed":
        return (
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Settings</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Configure your preferences and account settings here.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications</span>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dark Mode</span>
                  <Button variant="outline" size="sm">Toggle</Button>
                </div>
              </div>
            </div>
          </div>
        );
      case "form":
        return (
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border  dark:border-zinc-700 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border  dark:border-zinc-700 rounded-md text-sm"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (

    <Drawer direction={direction}>
      <DrawerTrigger asChild>
        <Button variant={triggerVariant}>
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Preview</DrawerTitle>
          <DrawerDescription>
            This demonstrates a {direction} drawer with {contentLevel} content.
          </DrawerDescription>
          {showCloseButton && (
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="absolute right-4 top-4">
                ×
              </Button>
            </DrawerClose>
          )}
        </DrawerHeader>
        {getContent()}
        {showFooter && (
          <DrawerFooter>
            <div className="flex gap-2 justify-end">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button variant="primary">
                {contentLevel === "form" ? "Save" : "Confirm"}
              </Button>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>

  );
}

// Preview props for prop explorer
export const drawerPreviewProps = [
  {
    name: "direction",
    type: "select",
    description: "Drawer opening direction - controls which side of the screen the drawer slides in from.",
    options: ["top", "right", "bottom", "left"],
    defaultValue: "bottom",
  },
  {
    name: "showFooter",
    type: "boolean",
    description: "Whether to show the drawer footer - displays action buttons at the bottom when enabled.",
    defaultValue: true,
  },
  {
    name: "showCloseButton",
    type: "boolean",
    description: "Whether to show the close button - displays a close button in the header when enabled.",
    defaultValue: true,
  },
  {
    name: "triggerVariant",
    type: "select",
    description: "Trigger button variant - controls the styling of the drawer trigger button.",
    options: [...buttonVariants],
    defaultValue: "primary",
  },
  {
    name: "contentLevel",
    type: "select",
    description: "Content complexity level - determines how much content is displayed in the drawer.",
    options: ["simple", "detailed", "form"],
    defaultValue: "simple",
  },
];
