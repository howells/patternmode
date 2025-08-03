"use client";

import { CheckCircle, Circle } from "lucide-react";
import React from "react";

import { TextList, TextListIndicator, TextListItem } from "./component";

export function DefaultExample() {
  return (
    <TextList>
      <TextListItem>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </TextListItem>
      <TextListItem>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </TextListItem>
      <TextListItem>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </TextListItem>
    </TextList>
  );
}

export function OrderedExample() {
  return (
    <TextList as="ol">
      <TextListItem>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </TextListItem>
      <TextListItem>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </TextListItem>
      <TextListItem>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </TextListItem>
    </TextList>
  );
}

export function WithIconsExample() {
  return (
    <TextList variant="plain" align="center">
      <TextListItem>
        <TextListIndicator icon={CheckCircle} />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </TextListItem>
      <TextListItem>
        <TextListIndicator icon={CheckCircle} />
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </TextListItem>
      <TextListItem>
        <TextListIndicator icon={Circle} />
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </TextListItem>
    </TextList>
  );
}

export function NestedExample() {
  return (
    <TextList>
      <TextListItem>First order item</TextListItem>
      <TextListItem>First order item</TextListItem>
      <TextListItem>
        First order item with list
        <TextList className="ml-5 mt-2">
          <TextListItem>Nested item</TextListItem>
          <TextListItem>Nested item</TextListItem>
        </TextList>
      </TextListItem>
      <TextListItem>First order item</TextListItem>
    </TextList>
  );
}

export function PlainListExample() {
  return (
    <TextList variant="plain">
      <TextListItem>
        <TextListIndicator>•</TextListIndicator>
        Custom bullet point with plain variant
      </TextListItem>
      <TextListItem>
        <TextListIndicator>→</TextListIndicator>
        Arrow indicator for navigation items
      </TextListItem>
      <TextListItem>
        <TextListIndicator>★</TextListIndicator>
        Star indicator for featured items
      </TextListItem>
    </TextList>
  );
}
