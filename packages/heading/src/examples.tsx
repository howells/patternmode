"use client";

import { Heading } from "./component";

export function DefaultExample() {
  return <Heading level={1}>Page Title</Heading>;
}

export function LevelsExample() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  );
}

export function SemanticHierarchyExample() {
  return (
    <article className="space-y-4">
      <Heading level={1}>Article Title</Heading>
      <Heading level={2}>Section One</Heading>
      <Heading level={3}>Subsection A</Heading>
      <Heading level={2}>Section Two</Heading>
      <Heading level={3}>Subsection B</Heading>
    </article>
  );
}

export function CustomStyleExample() {
  return (
    <div className="space-y-3">
      <Heading className="text-3xl tracking-tight">Large Bold Heading</Heading>
      <Heading className="text-lg text-zinc-600">Muted Heading</Heading>
    </div>
  );
}
