"use client";

/* eslint-disable react-refresh/only-export-components */

import type { CardProps } from "./component";
import { ButtonGroup } from "@patternmode/ui/components/button-group";
import React from "react";
import { Button } from "../button/component";
import { Text } from "../text/component";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardHeading } from "./component";

export function CardExample(props: CardProps) {
  const { ref, ...cardProps } = props;

  return (
    <Card {...cardProps}>
      <CardHeader border>
        <CardHeading>{props.children || "Preview Card"}</CardHeading>
        <CardDescription>This is how the Card component looks in the preview.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This is the main content area of the card component. You can customize the card's appearance using the props controls.</Text>
      </CardContent>
      <CardFooter border>
        <ButtonGroup>
          <Button>Primary Action</Button>
          <Button variant="outline">Cancel</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

// Preview props for prop explorer
export const CardPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Card title content (used in CardHeading).",
    defaultValue: "Preview Card",
  },
  {
    name: "variant",
    type: "select",
    description: "Visual style variant of the card.",
    options: ["default", "dashed"],
    defaultValue: "default",
  },
  {
    name: "padding",
    type: "select",
    description: "Padding scale value controlling internal spacing.",
    options: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    defaultValue: 0,
  },
  {
    name: "fillHeight",
    type: "boolean",
    description: "Whether card should fill container height.",
    defaultValue: false,
  },
];
