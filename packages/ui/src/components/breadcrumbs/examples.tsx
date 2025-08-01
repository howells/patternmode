"use client";

import type { ComponentExample } from "../../lib/component-config-types";

import { BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, Breadcrumbs, BreadcrumbSeparator, iconRegistry } from "@patternmode/ui";

import React from "react";

// Pre-imported icons from registry
const { ChevronRight, Home } = iconRegistry;

// Default breadcrumbs
export const DefaultExample = () => (
  <Breadcrumbs>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumbs>
);

// Breadcrumbs with ellipsis
export const WithEllipsisExample = () => (
  <Breadcrumbs>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumbs>
);

// Custom separator
export const CustomSeparatorExample = () => (
  <Breadcrumbs>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Components</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumbs>
);

// Single level breadcrumbs
export const SingleLevelExample = () => (
  <Breadcrumbs>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbPage>Current Page</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumbs>
);

// Deep navigation breadcrumbs
export const DeepNavigationExample = () => (
  <Breadcrumbs>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/products/electronics">Electronics</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/products/electronics/phones">Phones</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>iPhone 15</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumbs>
);

// With icons
export const WithIconsExample = () => (
  <Breadcrumbs>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/" className="flex items-center gap-1">
          <Home className="h-4 w-4" />
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronRight className="h-4 w-4" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronRight className="h-4 w-4" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Settings</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumbs>
);

// Collapsed middle items
export const CollapsedMiddleExample = () => (
  <Breadcrumbs>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/category">Category</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/category/subcategory">Subcategory</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Current Item</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumbs>
);

// Two levels only
export const TwoLevelsExample = () => (
  <Breadcrumbs>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>About</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumbs>
);

// Default export for prop explorer (alias to DefaultExample)
export const BreadcrumbsExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "WithEllipsisExample",
    title: "With Ellipsis",
    description: "With Ellipsis example",
    component: WithEllipsisExample,
  },
  {
    id: "CustomSeparatorExample",
    title: "Custom Separator",
    description: "Custom Separator example",
    component: CustomSeparatorExample,
  },
  {
    id: "SingleLevelExample",
    title: "Single Level",
    description: "Single Level example",
    component: SingleLevelExample,
  },
  {
    id: "DeepNavigationExample",
    title: "Deep Navigation",
    description: "Deep Navigation example",
    component: DeepNavigationExample,
  },
  {
    id: "WithIconsExample",
    title: "With Icons",
    description: "Example with icon integration",
    component: WithIconsExample,
  },
  {
    id: "CollapsedMiddleExample",
    title: "Collapsed Middle",
    description: "Collapsed Middle example",
    component: CollapsedMiddleExample,
  },
  {
    id: "TwoLevelsExample",
    title: "Two Levels",
    description: "Two Levels example",
    component: TwoLevelsExample,
  },
  {
    id: "BreadcrumbsExample",
    title: "Breadcrumbs",
    description: "Breadcrumbs example",
    component: BreadcrumbsExample,
  },
];
