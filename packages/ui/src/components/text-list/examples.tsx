"use client";

import { CheckCircle, Circle } from "lucide-react";
import React from "react";

import { TextList, TextListIndicator, TextListItem } from "./component";

export function DefaultExample() {
  return (
    <TextList>
      <TextListItem>Lorem ipsum dolor sit amet, consectetur adipisicing elit</TextListItem>
      <TextListItem>Assumenda, quia temporibus eveniet a libero incidunt suscipit</TextListItem>
      <TextListItem>Quidem, ipsam illum quis sed voluptatum quae eum fugit earum</TextListItem>
    </TextList>
  );
}

export function OrderedExample() {
  return (
    <TextList as="ol">
      <TextListItem>First ordered item with automatic numbering</TextListItem>
      <TextListItem>Second ordered item with semantic list structure</TextListItem>
      <TextListItem>Third ordered item demonstrating proper accessibility</TextListItem>
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
      <TextListItem>Parent list item with nested content</TextListItem>
      <TextListItem>
        Second parent item containing:
        <TextList className="ml-6 mt-2">
          <TextListItem>First nested item</TextListItem>
          <TextListItem>Second nested item</TextListItem>
          <TextListItem>Third nested item</TextListItem>
        </TextList>
      </TextListItem>
      <TextListItem>Final parent item</TextListItem>
    </TextList>
  );
}

export function PlainVariantExample() {
  return (
    <TextList variant="plain">
      <TextListItem>
        <TextListIndicator>•</TextListIndicator>
        First item with custom bullet
      </TextListItem>
      <TextListItem>
        <TextListIndicator>→</TextListIndicator>
        Second item with arrow indicator
      </TextListItem>
      <TextListItem>
        <TextListIndicator>★</TextListIndicator>
        Third item with star indicator
      </TextListItem>
    </TextList>
  );
}