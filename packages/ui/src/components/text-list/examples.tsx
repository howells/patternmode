"use client";

import { CheckCircle, Circle } from "lucide-react";
import React from "react";

import { List, ListIndicator, ListItem } from "./component";

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

export function PlainListExample() {
  return (
    <List variant="plain">
      <ListItem>
        <ListIndicator>•</ListIndicator>
        Custom bullet point with plain variant
      </ListItem>
      <ListItem>
        <ListIndicator>→</ListIndicator>
        Arrow indicator for navigation items
      </ListItem>
      <ListItem>
        <ListIndicator>★</ListIndicator>
        Star indicator for featured items
      </ListItem>
    </List>
  );
}
