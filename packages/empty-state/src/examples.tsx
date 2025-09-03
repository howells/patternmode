"use client";

import { BarChart3, Database, FolderOpen, Inbox } from "lucide-react";
import { EmptyState } from "./component";

// Default empty state
export const DefaultExample = () => (
  <EmptyState
    description="Get started by creating your first project. It only takes a few minutes to set up."
    icon={FolderOpen}
    primaryAction={{
      label: "Create Project",
      onClick: () => {
        /* noop */
      },
    }}
    title="No projects found"
  />
);

// Minimal variant
export const MinimalExample = () => (
  <EmptyState
    description="This space is waiting for content."
    icon={Inbox}
    title="Nothing here"
    variant="minimal"
  />
);

// With both actions
export const WithBothActionsExample = () => (
  <EmptyState
    description="Connect your data source to see insights and analytics here."
    icon={Database}
    primaryAction={{
      label: "Connect Data",
      onClick: () => {
        /* noop */
      },
    }}
    secondaryAction={{
      label: "View Documentation",
      href: "/docs",
    }}
    title="No data available"
  />
);

// Large size
export const LargeSizeExample = () => (
  <EmptyState
    description="This is where you'll see all your important metrics and data once you get started."
    icon={BarChart3}
    primaryAction={{
      label: "Get Started",
      onClick: () => {
        /* noop */
      },
    }}
    size="lg"
    title="Welcome to your dashboard"
  />
);
