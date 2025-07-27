import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";

export const componentConfig: ComponentConfig = {
  id: "list",
  name: "List",
  description: "A flexible list component supporting ordered/unordered lists with custom indicators and styling.",
  category: "data" as const,
  icon: "List",

  importStatement: `import { List, ListItem, ListIndicator } from "@/components/ui/list";`,
  componentId: "ListExample",
  props: [
    {
      name: "variant",
      type: "select",
      options: ["marker", "plain"],
      defaultValue: "marker",
      description: "The list style variant."
    },
    {
      name: "as",
      type: "select",
      options: ["ul", "ol"],
      defaultValue: "ul",
      description: "The underlying HTML element to render."
    },
    {
      name: "align",
      type: "select",
      options: ["start", "center", "end"],
      defaultValue: "start",
      description: "Alignment of list items."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic unordered list with default styling.",
      code: `<List>
  <ListItem>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit
  </ListItem>
  <ListItem>
    Assumenda, quia temporibus eveniet a libero incidunt suscipit
  </ListItem>
  <ListItem>
    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
  </ListItem>
</List>`
    },
    {
      id: "ordered",
      title: "Ordered",
      description: "An ordered list using the as prop.",
      code: `<List as="ol">
  <ListItem>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit
  </ListItem>
  <ListItem>
    Assumenda, quia temporibus eveniet a libero incidunt suscipit
  </ListItem>
  <ListItem>
    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
  </ListItem>
</List>`
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "A list with custom icon indicators.",
      code: `<List variant="plain" align="center">
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
</List>`
    },
    {
      id: "nested",
      title: "Nested",
      description: "A list with nested items.",
      code: `<List>
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
</List>`
    }
  ]
};