"use client";

import { Button } from "@patternmode/button";
import { buttonVariants } from "@patternmode/button/types";
import type { ButtonVariant } from "@patternmode/constants/variants";
import {
  ResponsiveDrawer,
  ResponsiveDrawerClose,
  ResponsiveDrawerContent,
  ResponsiveDrawerDescription,
  ResponsiveDrawerFooter,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger,
} from ".";

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
  triggerVariant?: ButtonVariant;
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

export function ResponsiveDrawerPreview({
  breakpoint = "md",
  showFooter = true,
  showCloseButton = true,
  triggerVariant = "primary",
  contentLevel = "simple",
  showSnapPoints: _showSnapPoints = false,
}: ResponsiveDrawerPreviewProps = {}) {
  const getContent = () => {
    switch (contentLevel) {
      case "simple":
        return (
          <div className="px-4 py-4">
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              This responsive drawer automatically switches between a modal
              dialog on desktop and a bottom sheet on mobile.
            </p>
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
              <h4 className="mb-2 font-medium text-sm">Responsive Behavior</h4>
              <ul className="space-y-1 text-xs text-zinc-500">
                <li>• Desktop: Modal dialog overlay</li>
                <li>• Mobile: Bottom drawer sheet</li>
                <li>• Breakpoint: {breakpoint} and above</li>
              </ul>
            </div>
          </div>
        );
      case "form":
        return (
          <div className="px-4 py-4">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-medium text-sm text-zinc-700 dark:text-zinc-300">
                  Full Name
                </label>
                <input
                  className="w-full rounded-md border px-3 py-2 text-sm dark:border-zinc-700"
                  placeholder="Enter your full name"
                  type="text"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium text-sm text-zinc-700 dark:text-zinc-300">
                  Email Address
                </label>
                <input
                  className="w-full rounded-md border px-3 py-2 text-sm dark:border-zinc-700"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium text-sm text-zinc-700 dark:text-zinc-300">
                  Message
                </label>
                <textarea
                  className="w-full rounded-md border px-3 py-2 text-sm dark:border-zinc-700"
                  placeholder="Enter your message"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
      case "list":
        return (
          <div className="py-4">
            <div className="mb-4 px-4">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                Recent Items
              </h3>
            </div>
            <div className="space-y-1">
              {[
                "Project Alpha",
                "Design System",
                "Mobile App",
                "Website Redesign",
                "Marketing Campaign",
              ].map((item, index) => (
                <div
                  className="cursor-pointer px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  key={item}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item}</span>
                    <span className="text-xs text-zinc-500">
                      {index + 1}d ago
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">
                    Recent activity on this item
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <ResponsiveDrawer>
      <ResponsiveDrawerTrigger
        render={
          <Button variant={triggerVariant}>Open Responsive Drawer</Button>
        }
      />
      <ResponsiveDrawerContent>
        <ResponsiveDrawerHeader>
          <ResponsiveDrawerTitle>
            {contentLevel === "form"
              ? "Contact Form"
              : contentLevel === "list"
                ? "Recent Items"
                : "Responsive Drawer"}
          </ResponsiveDrawerTitle>
          <ResponsiveDrawerDescription>
            This drawer adapts to screen size - modal on desktop, sheet on
            mobile.
          </ResponsiveDrawerDescription>
          {showCloseButton && (
            <ResponsiveDrawerClose
              render={
                <Button
                  className="absolute top-4 right-4"
                  size="sm"
                  variant="ghost"
                >
                  ×
                </Button>
              }
            />
          )}
        </ResponsiveDrawerHeader>
        {getContent()}
        {showFooter && (
          <ResponsiveDrawerFooter>
            <div className="flex justify-end gap-2 px-4">
              <ResponsiveDrawerClose
                render={<Button variant="outline">Cancel</Button>}
              />
              <Button variant="primary">
                {contentLevel === "form" ? "Send Message" : "Done"}
              </Button>
            </div>
          </ResponsiveDrawerFooter>
        )}
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
}

// Preview props for prop explorer
export const responsiveDrawerPreviewProps = [
  {
    name: "breakpoint",
    type: "select",
    description:
      "Responsive breakpoint behavior - controls when the drawer switches between modal and sheet display.",
    options: ["sm", "md", "lg"],
    defaultValue: "md",
  },
  {
    name: "showFooter",
    type: "boolean",
    description:
      "Whether to show the footer with actions - displays action buttons at the bottom when enabled.",
    defaultValue: true,
  },
  {
    name: "showCloseButton",
    type: "boolean",
    description:
      "Whether to show the close button - displays a close button in the header when enabled.",
    defaultValue: true,
  },
  {
    name: "triggerVariant",
    type: "select",
    description:
      "Trigger button variant - controls the styling of the drawer trigger button.",
    options: [...buttonVariants],
    defaultValue: "primary",
  },
  {
    name: "contentLevel",
    type: "select",
    description:
      "Content complexity level - determines how much content is displayed in the drawer.",
    options: ["simple", "form", "list"],
    defaultValue: "simple",
  },
  {
    name: "showSnapPoints",
    type: "boolean",
    description:
      "Whether to show snap points for bottom drawer - enables multiple stopping points when dragging on mobile.",
    defaultValue: false,
  },
];
