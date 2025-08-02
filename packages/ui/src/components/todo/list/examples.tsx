"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { iconRegistry, List, ListIndicator, ListItem } from "@patternmode/ui";

import React from "react";
// Pre-imported icons from registry
const { CheckCircle, Circle } = iconRegistry;

export function ListExample() {
  return (
    <List>
      <ListItem>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>
      <ListItem>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
    </List>
  );
}

export function DefaultExample() {
  return (
    <List>
      <ListItem>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>
      <ListItem>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
    </List>
  );
}

export function OrderedExample() {
  return (
    <List as="ol">
      <ListItem>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>
      <ListItem>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
    </List>
  );
}

export function WithIconsExample() {
  return (
    <List variant="plain" align="center">
      <ListItem>
        <ListIndicator icon={CheckCircle} />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem>
        <ListIndicator icon={CheckCircle} />
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>
      <ListItem>
        <ListIndicator icon={Circle} />
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
    </List>
  );
}

export function NestedExample() {
  return (
    <List>
      <ListItem>First order item</ListItem>
      <ListItem>First order item</ListItem>
      <ListItem>
        First order item with list
        <List className="ml-5 mt-2">
          <ListItem>Nested item</ListItem>
          <ListItem>Nested item</ListItem>
          <ListItem>Nested item</ListItem>
        </List>
      </ListItem>
      <ListItem>First order item</ListItem>
    </List>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "ListExample",
    title: "List",
    description: "List example",
    component: ListExample,
  },
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "OrderedExample",
    title: "Ordered",
    description: "Ordered example",
    component: OrderedExample,
  },
  {
    id: "WithIconsExample",
    title: "With Icons",
    description: "Example with icon integration",
    component: WithIconsExample,
  },
  {
    id: "NestedExample",
    title: "Nested",
    description: "Nested example",
    component: NestedExample,
  },
];
