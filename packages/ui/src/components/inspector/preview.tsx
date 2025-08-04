"use client";

import React from "react";
import { Inspector, InspectorBody, InspectorHeader, InspectorSection } from "./component";

type InspectorProps = React.ComponentProps<typeof Inspector> & {
  isOpen?: boolean;
  onToggle?: () => void;
  asOverlay?: boolean;
};

export function InspectorExample(props: InspectorProps) {
  return (
    <Inspector {...props}>
      <InspectorHeader>
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Inspector Panel
        </h3>
      </InspectorHeader>
      <InspectorBody>
        <InspectorSection>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            This is the inspector panel content area. It can contain controls, properties, and other debugging information.
          </div>
        </InspectorSection>
      </InspectorBody>
    </Inspector>
  );
}

// Preview props for prop explorer
export const InspectorPreviewProps = [
  {
    name: "asOverlay",
    type: "boolean",
    description: "Whether to render as an overlay that slides over content.",
    defaultValue: false,
  },
  {
    name: "isOpen",
    type: "boolean",
    description: "Whether the inspector is open (for toggleable mode).",
    defaultValue: undefined,
  },
];
