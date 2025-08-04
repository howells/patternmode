"use client";

import { CheckCircle, Circle } from "lucide-react";
import React from "react";

import { TextList, TextListIndicator, TextListItem } from "./component";

export function DefaultExample() {
  return (
    <TextList children={(
      <>
        <TextListItem children="Lorem ipsum dolor sit amet, consectetur adipisicing elit" />
        <TextListItem children="Assumenda, quia temporibus eveniet a libero incidunt suscipit" />
        <TextListItem children="Quidem, ipsam illum quis sed voluptatum quae eum fugit earum" />
      </>
    )}
    />
  );
}

export function OrderedExample() {
  return (
    <TextList
      as="ol"
      children={(
        <>
          <TextListItem children="First ordered item with automatic numbering" />
          <TextListItem children="Second ordered item with semantic list structure" />
          <TextListItem children="Third ordered item demonstrating proper accessibility" />
        </>
      )}
    />
  );
}

export function WithIconsExample() {
  return (
    <TextList
      variant="plain"
      align="center"
      children={(
        <>
          <TextListItem children={(
            <>
              <TextListIndicator icon={CheckCircle} />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </>
          )}
          />
          <TextListItem children={(
            <>
              <TextListIndicator icon={CheckCircle} />
              Assumenda, quia temporibus eveniet a libero incidunt suscipit
            </>
          )}
          />
          <TextListItem children={(
            <>
              <TextListIndicator icon={Circle} />
              Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
            </>
          )}
          />
        </>
      )}
    />
  );
}

export function NestedExample() {
  return (
    <TextList children={(
      <>
        <TextListItem children="First order item" />
        <TextListItem children="First order item" />
        <TextListItem children={(
          <>
            First order item with nested list
            <TextList
              className="ml-5 mt-2"
              children={(
                <>
                  <TextListItem children="Nested item" />
                  <TextListItem children="Nested item" />
                </>
              )}
            />
          </>
        )}
        />
        <TextListItem children="First order item" />
      </>
    )}
    />
  );
}

export function PlainVariantExample() {
  return (
    <TextList
      variant="plain"
      children={(
        <>
          <TextListItem children={(
            <>
              <TextListIndicator icon={CheckCircle} />
              Plain variant removes default list styling
            </>
          )}
          />
          <TextListItem children={(
            <>
              <TextListIndicator icon={CheckCircle} />
              Useful when you want custom indicators or styling
            </>
          )}
          />
          <TextListItem children={(
            <>
              <TextListIndicator icon={CheckCircle} />
              Maintains semantic list structure for accessibility
            </>
          )}
          />
        </>
      )}
    />
  );
}
