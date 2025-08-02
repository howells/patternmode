"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Avatar, Badge, Button, Card, iconRegistry, StackedList } from "@patternmode/ui";

import React from "react";
// Pre-imported icons from registry
const { Calendar, FileText, UserPlus } = iconRegistry;

// Default example - matches config "default" id
export function DefaultExample() {
  return (
    <StackedList>
      <StackedList.Header
        title="Team Members"
        description="Manage your team and their permissions."
        actions={(
          <Button size="sm" variant="outline">
            Add Member
          </Button>
        )}
      />
      <StackedList.Item
        left={<Avatar initials="JD" alt="John Doe" />}
        right={(
          <Button size="sm" variant="outline">
            Edit
          </Button>
        )}
      >
        <StackedList.Content title="John Doe" description="Software Engineer" />
      </StackedList.Item>
      <StackedList.Item
        left={<Avatar initials="JS" alt="Jane Smith" />}
        right={(
          <Button size="sm" variant="outline">
            Edit
          </Button>
        )}
      >
        <StackedList.Content title="Jane Smith" description="Product Manager" />
      </StackedList.Item>
    </StackedList>
  );
}

// In card example - matches config "in-card" id
export function InCardExample() {
  return (
    <Card padding={0}>
      <StackedList>
        <StackedList.Header
          title="Recent Activity"
          description="Latest updates from your team."
        />
        <StackedList.Item
          left={<Avatar initials="AB" alt="Alice Brown" />}
          right={<span className="text-sm text-zinc-500">2h ago</span>}
        >
          <StackedList.Content
            title="Alice Brown"
            description="Updated project documentation"
          />
        </StackedList.Item>
        <StackedList.Item
          left={<Avatar initials="BW" alt="Bob Wilson" />}
          right={<span className="text-sm text-zinc-500">5h ago</span>}
        >
          <StackedList.Content
            title="Bob Wilson"
            description="Merged pull request #42"
          />
        </StackedList.Item>
      </StackedList>
    </Card>
  );
}

// With icons example - matches config "with-icons" id
export function WithIconsExample() {
  return (
    <StackedList>
      <StackedList.Item
        left={<FileText className="size-5 text-zinc-500" />}
        right={<Badge variant="warning">Updated</Badge>}
      >
        <StackedList.Content
          title="Project Documentation"
          description="Updated project requirements and specifications"
        />
      </StackedList.Item>
      <StackedList.Item
        left={<Calendar className="size-5 text-zinc-500" />}
        right={<Badge variant="default">Scheduled</Badge>}
      >
        <StackedList.Content
          title="Team Meeting"
          description="Weekly sync with the development team"
        />
      </StackedList.Item>
    </StackedList>
  );
}

// Interactive example - matches config "interactive" id
export function InteractiveExample() {
  return (
    <StackedList>
      <StackedList.Item
        as="a"
        href="/users/carol"
        left={<Avatar initials="CD" alt="Carol Davis" />}
        right={<Badge variant="success">Active</Badge>}
      >
        <StackedList.Content
          title="Carol Davis"
          description="Marketing Manager"
        />
      </StackedList.Item>
      <StackedList.Item
        as="button"
        onClick={() => {}}
        left={<Avatar initials="DM" alt="David Miller" />}
        right={<Badge variant="warning">Away</Badge>}
      >
        <StackedList.Content
          title="David Miller"
          description="Sales Representative"
        />
      </StackedList.Item>
    </StackedList>
  );
}

// Empty state example - matches config "empty-state" id
export function EmptyStateExample() {
  return (
    <StackedList>
      <StackedList.Header
        title="Team Members"
        description="Manage your team and their permissions."
      />
      <StackedList.Empty
        title="No team members"
        description="Get started by adding your first team member."
        icon={<UserPlus className="size-12" />}
        action={<Button variant="default">Add Team Member</Button>}
      />
    </StackedList>
  );
}
export const StackedListExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "StackedListExample",
    title: "Stacked List",
    description: "Stacked List example",
    component: StackedListExample,
  },
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "InCardExample",
    title: "In Card",
    description: "In Card example",
    component: InCardExample,
  },
  {
    id: "WithIconsExample",
    title: "With Icons",
    description: "Example with icon integration",
    component: WithIconsExample,
  },
  {
    id: "InteractiveExample",
    title: "Interactive",
    description: "Interactive example",
    component: InteractiveExample,
  },
  {
    id: "EmptyStateExample",
    title: "Empty State",
    description: "Empty State example",
    component: EmptyStateExample,
  },
];
