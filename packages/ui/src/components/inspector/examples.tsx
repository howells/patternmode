"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { Inspector } from "@patternmode/ui";

import React from "react";

export function InspectorExample() {
  return (
    <Inspector>
      <div className="p-4">
        <h3 className="font-medium mb-2">User Information</h3>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm text-zinc-500">Name</dt>
            <dd className="text-sm">John</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500">Age</dt>
            <dd className="text-sm">30</dd>
          </div>
        </dl>
      </div>
    </Inspector>
  );
}

export function NestedExample() {
  return (
    <Inspector>
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-medium mb-2">User</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-zinc-500">Name</dt>
              <dd className="text-sm">John</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Age</dt>
              <dd className="text-sm">30</dd>
            </div>
          </dl>
        </div>
        <div>
          <h3 className="font-medium mb-2">Settings</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-zinc-500">Theme</dt>
              <dd className="text-sm">dark</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Notifications</dt>
              <dd className="text-sm">true</dd>
            </div>
          </dl>
        </div>
      </div>
    </Inspector>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "InspectorExample",
    title: "Inspector",
    description: "Inspector example",
    component: InspectorExample,
  },
  {
    id: "NestedExample",
    title: "Nested",
    description: "Nested example",
    component: NestedExample,
  },
];
