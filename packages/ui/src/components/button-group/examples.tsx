"use client";

import * as React from "react";
import { Button } from "../button/component";
import { ButtonGroup } from "./component";

export const DefaultExample = () => {
  return (
    <ButtonGroup>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ButtonGroup>
  );
};

export const VariantExample = () => {
  return (
    <ButtonGroup variant="secondary">
      <Button>Save</Button>
      <Button>Cancel</Button>
    </ButtonGroup>
  );
};

export const SizeExample = () => {
  return (
    <div className="space-y-4">
      <ButtonGroup size="xs">
        <Button>Small</Button>
        <Button>Buttons</Button>
      </ButtonGroup>
      <ButtonGroup size="default">
        <Button>Default</Button>
        <Button>Size</Button>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <Button>Large</Button>
        <Button>Buttons</Button>
      </ButtonGroup>
    </div>
  );
};

export const IconSizeExample = () => {
  return (
    <div className="space-y-4">
      <ButtonGroup size="icon-sm">
        <Button>✕</Button>
        <Button>✓</Button>
        <Button>⚙</Button>
      </ButtonGroup>
      <ButtonGroup size="icon">
        <Button>✕</Button>
        <Button>✓</Button>
        <Button>⚙</Button>
      </ButtonGroup>
    </div>
  );
};

export const AlignmentExample = () => {
  return (
    <div className="space-y-4 w-full">
      <ButtonGroup align="start" className="w-full">
        <Button>Left</Button>
        <Button>Aligned</Button>
      </ButtonGroup>
      <ButtonGroup align="center" className="w-full">
        <Button>Center</Button>
        <Button>Aligned</Button>
      </ButtonGroup>
      <ButtonGroup align="end" className="w-full">
        <Button>Right</Button>
        <Button>Aligned</Button>
      </ButtonGroup>
    </div>
  );
};

export const WrappingExample = () => {
  return (
    <div className="w-48">
      <ButtonGroup wrap={true}>
        <Button>This is a longer button</Button>
        <Button>Another long button</Button>
        <Button>Short</Button>
        <Button>Medium length</Button>
      </ButtonGroup>
    </div>
  );
};

export const CustomGapExample = () => {
  return (
    <div className="space-y-4">
      <ButtonGroup gap={1}>
        <Button>Tight</Button>
        <Button>Spacing</Button>
      </ButtonGroup>
      <ButtonGroup gap={4}>
        <Button>Wide</Button>
        <Button>Spacing</Button>
      </ButtonGroup>
    </div>
  );
};

export const MixedVariantsExample = () => {
  return (
    <ButtonGroup variant="outline">
      <Button>Inherited Outline</Button>
      <Button variant="destructive">Override to Destructive</Button>
      <Button>Back to Outline</Button>
    </ButtonGroup>
  );
};