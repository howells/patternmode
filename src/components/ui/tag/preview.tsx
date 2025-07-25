"use client";

import { Code, MapPin, User } from "lucide-react";
import React from "react";
import { Tag } from "./tag";

// Tag examples
export function TagExample({
  showLabels = false,
  showCounts = false,
  showDismissible = false,
  showAvatars = false,
  ...props
}: {
  showLabels?: boolean;
  showCounts?: boolean;
  showDismissible?: boolean;
  showAvatars?: boolean;
  [key: string]: unknown;
}) {
  if (showAvatars) {
    return (
      <div className="flex gap-2">
        <Tag value="John Doe" avatar={{ initials: "JD" }} />
        <Tag value="Jane Smith" avatar={{ initials: "JS" }} dismissible />
        <Tag value="Alex Johnson" avatar={{ initials: "AJ" }} count="Admin" />
      </div>
    );
  }

  if (showDismissible) {
    return (
      <div className="flex gap-2">
        <Tag value="React" dismissible />
        <Tag value="TypeScript" dismissible />
        <Tag value="Next.js" dismissible />
      </div>
    );
  }

  if (showCounts) {
    return (
      <div className="flex gap-2">
        <Tag value="Issues" count={12} />
        <Tag value="Pull Requests" count="3 open" />
        <Tag value="Contributors" count={45} />
      </div>
    );
  }

  if (showLabels) {
    return (
      <div className="flex gap-2">
        <Tag label="Department" value="Engineering" />
        <Tag label="Location" value="San Francisco" />
        <Tag label="Team" value="Frontend" />
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Tag value="Design" />
      <Tag value="Development" />
      <Tag value="Marketing" />
    </div>
  );
}

// Default export for the preview system
export function Example() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Tags</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-zinc-500 mb-2">Basic tags</p>
            <TagExample />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">With labels</p>
            <TagExample showLabels />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">With counts</p>
            <TagExample showCounts />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">Dismissible</p>
            <TagExample showDismissible />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">With avatars</p>
            <TagExample showAvatars />
          </div>
        </div>
      </div>
    </div>
  );
}
