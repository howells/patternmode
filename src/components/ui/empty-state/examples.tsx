import React from "react";
import { EmptyState } from "@patternmode/ui";
import { FolderOpen, Inbox, Database, BarChart3 } from "lucide-react";

// Default empty state
export const DefaultExample = () => (
  <EmptyState
    title="No projects found"
    description="Get started by creating your first project. It only takes a few minutes to set up."
    icon={FolderOpen}
    primaryAction={{
      label: "Create Project",
      onClick: () => console.log("Create clicked")
    }}
  />
);

// Minimal variant
export const MinimalExample = () => (
  <EmptyState
    variant="minimal"
    title="Nothing here"
    description="This space is waiting for content."
    icon={Inbox}
  />
);

// With both actions
export const WithBothActionsExample = () => (
  <EmptyState
    title="No data available"
    description="Connect your data source to see insights and analytics here."
    icon={Database}
    primaryAction={{
      label: "Connect Data",
      onClick: () => console.log("Connect clicked")
    }}
    secondaryAction={{
      label: "View Documentation",
      href: "/docs"
    }}
  />
);

// Large size
export const LargeSizeExample = () => (
  <EmptyState
    size="lg"
    title="Welcome to your dashboard"
    description="This is where you'll see all your important metrics and data once you get started."
    icon={BarChart3}
    primaryAction={{
      label: "Get Started",
      onClick: () => console.log("Get started clicked")
    }}
  />
);export const EmptyStateExample = DefaultExample;
