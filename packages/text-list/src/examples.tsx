"use client";

import { TextList, TextListItem } from ".";

export const DefaultExample = () => (
  <TextList>
    <TextListItem>Item one</TextListItem>
    <TextListItem>Item two</TextListItem>
    <TextListItem>Item three</TextListItem>
  </TextList>
);

export const OrderedExample = () => (
  <TextList as="ol" variant="marker">
    <TextListItem>Step one</TextListItem>
    <TextListItem>Step two</TextListItem>
    <TextListItem>Step three</TextListItem>
  </TextList>
);

export const WithIconsExample = () => (
  <TextList variant="plain">
    <TextListItem>Custom indicator via children</TextListItem>
    <TextListItem>Use your own icons or marks</TextListItem>
  </TextList>
);

export const NestedExample = () => (
  <TextList>
    <TextListItem>
      Parent item
      <TextList className="mt-1 ml-6">
        <TextListItem>Child item</TextListItem>
        <TextListItem>Child item</TextListItem>
      </TextList>
    </TextListItem>
    <TextListItem>Another parent item</TextListItem>
  </TextList>
);

export const PlainVariantExample = () => (
  <TextList variant="plain">
    <TextListItem>First line</TextListItem>
    <TextListItem>Second line</TextListItem>
  </TextList>
);
