import React from "react";
import { Heading } from "./heading";

export function HeadingExample() {
  return <Heading level={1}>Page Title</Heading>;
}

export function LevelsExample() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
    </div>
  );
}