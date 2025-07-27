import React from "react";
import { CheckCircle, Circle, Star } from "lucide-react";
import { List, ListIndicator, ListItem } from "./list";

export const listExamples = {
  basic: {
    title: "Basic List",
    description: "A simple unordered list with default styling",
    component: (
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
    ),
  },
  ordered: {
    title: "Ordered List",
    description: "An ordered list using the as prop",
    component: (
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
    ),
  },
  withIcons: {
    title: "With Icons",
    description: "A list with custom icon indicators",
    component: (
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
    ),
  },
  mixedIndicators: {
    title: "Mixed Indicators",
    description: "A list with different types of indicators",
    component: (
      <List variant="plain" align="center">
        <ListItem>
          <ListIndicator icon={Star} />
          Featured item with star
        </ListItem>
        <ListItem>
          <ListIndicator icon={CheckCircle} />
          Completed task
        </ListItem>
        <ListItem>
          <ListIndicator icon={Circle} />
          Pending task
        </ListItem>
      </List>
    ),
  },
  customSize: {
    title: "Custom Icon Size",
    description: "A list with larger icon indicators",
    component: (
      <List variant="plain" align="center">
        <ListItem>
          <ListIndicator icon={CheckCircle} size="lg" />
          Large icon indicator
        </ListItem>
        <ListItem>
          <ListIndicator icon={Circle} size="lg" />
          Another large icon
        </ListItem>
      </List>
    ),
  },
  nested: {
    title: "Nested List",
    description: "A list with nested items",
    component: (
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
    ),
  },
};
