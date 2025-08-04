"use client";

import React from "react";
import { Button } from "../button/component";
import {
  ResponsiveDrawer,
  ResponsiveDrawerClose,
  ResponsiveDrawerContent,
  ResponsiveDrawerDescription,
  ResponsiveDrawerFooter,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger,
} from "./component";

export type ResponsiveDrawerPreviewProps = {
  /**
   * Responsive breakpoint behavior.
   * Controls when the drawer switches between modal and sheet display.
   */
  breakpoint?: "sm" | "md" | "lg";
  /**
   * Whether to show the footer with actions.
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
  triggerVariant?: "default" | "outline" | "ghost";
  /**
   * Content complexity level.
   * Determines how much content is displayed in the drawer.
   */
  contentLevel?: "simple" | "form" | "list";
  /**
   * Whether to show snap points for bottom drawer.
   * Enables multiple stopping points when dragging on mobile.
   */
  showSnapPoints?: boolean;
};

export function ResponsiveDrawerExample({
  breakpoint = "md",
  showFooter = true,
  showCloseButton = true,
  triggerVariant = "default",
  contentLevel = "simple",
  showSnapPoints = false,
}: ResponsiveDrawerPreviewProps = {}) {
  const getContent = () => {
    switch (contentLevel) {
      case "simple":
        return (
          <div className="py-4 px-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              This responsive drawer automatically switches between a modal dialog on desktop and a bottom sheet on mobile.
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">Responsive Behavior</h4>
              <ul className="text-xs text-zinc-500 space-y-1">
                <li>• Desktop: Modal dialog overlay</li>
                <li>• Mobile: Bottom drawer sheet</li>
                <li>• Breakpoint: {breakpoint} and above</li>
              </ul>
            </div>
          </div>
        );
      case "form":
        return (
          <div className="py-4 px-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Enter your message"
                  rows={3}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"
                />
              </div>
            </div>
          </div>
        );
      case "list":
        return (
          <div className="py-4">
            <div className="px-4 mb-4">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Recent Items</h3>
            </div>
            <div className="space-y-1">
              {["Project Alpha", "Design System", "Mobile App", "Website Redesign", "Marketing Campaign"].map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item}</span>
                    <span className="text-xs text-zinc-500">{index + 1}d ago</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">Recent activity on this item</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-8 flex justify-center">
      <ResponsiveDrawer>
        <ResponsiveDrawerTrigger asChild>
          <Button variant={triggerVariant}>
            Open Responsive Drawer
          </Button>
        </ResponsiveDrawerTrigger>
        <ResponsiveDrawerContent snapPoints={showSnapPoints ? [0.2, 0.5, 0.8] : undefined}>
          <ResponsiveDrawerHeader>
            <ResponsiveDrawerTitle>
              {contentLevel === "form"
                ? "Contact Form"
                : contentLevel === "list" ? "Recent Items" : "Responsive Drawer"}
            </ResponsiveDrawerTitle>
            <ResponsiveDrawerDescription>
              This drawer adapts to screen size - modal on desktop, sheet on mobile.
            </ResponsiveDrawerDescription>
            {showCloseButton && (
              <ResponsiveDrawerClose asChild>
                <Button variant="ghost" size="sm" className="absolute right-4 top-4">
                  ×
                </Button>
              </ResponsiveDrawerClose>
            )}
          </ResponsiveDrawerHeader>
          {getContent()}
          {showFooter && (
            <ResponsiveDrawerFooter>
              <div className="flex gap-2 justify-end px-4">
                <ResponsiveDrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </ResponsiveDrawerClose>
                <Button variant="default">
                  {contentLevel === "form" ? "Send Message" : "Done"}
                </Button>
              </div>
            </ResponsiveDrawerFooter>
          )}
        </ResponsiveDrawerContent>
      </ResponsiveDrawer>
    </div>
  );
}

// Preview props for prop explorer
export const ResponsiveDrawerPreviewProps = [
  {
    name: "breakpoint",
    type: "select",
    description: "Responsive breakpoint behavior - controls when the drawer switches between modal and sheet display.",
    options: ["sm", "md", "lg"],
    defaultValue: "md",
  },
  {
    name: "showFooter",
    type: "boolean",
    description: "Whether to show the footer with actions - displays action buttons at the bottom when enabled.",
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
    options: ["default", "outline", "ghost"],
    defaultValue: "outline",
  },
  {
    name: "contentLevel",
    type: "select",
    description: "Content complexity level - determines how much content is displayed in the drawer.",
    options: ["simple", "form", "list"],
    defaultValue: "simple",
  },
  {
    name: "showSnapPoints",
    type: "boolean",
    description: "Whether to show snap points for bottom drawer - enables multiple stopping points when dragging on mobile.",
    defaultValue: false,
  },
];
