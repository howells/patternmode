"use client";

import { Subheading } from "./component";

export function DefaultExample() {
  return <Subheading level={2}>Section Subheading</Subheading>;
}

export function LevelsExample() {
  return (
    <div className="space-y-2">
      <Subheading level={1}>Level 1</Subheading>
      <Subheading level={2}>Level 2</Subheading>
      <Subheading level={3}>Level 3</Subheading>
      <Subheading level={4}>Level 4</Subheading>
      <Subheading level={5}>Level 5</Subheading>
      <Subheading level={6}>Level 6</Subheading>
    </div>
  );
}

export function WithContentExample() {
  return (
    <div className="space-y-1">
      <Subheading>Subheading with content</Subheading>
      <p className="text-sm text-zinc-600">Supporting description text.</p>
    </div>
  );
}

export function SectionStructureExample() {
  return (
    <section className="space-y-2">
      <Subheading level={2}>Section Title</Subheading>
      <p className="text-sm text-zinc-600">Section content...</p>
    </section>
  );
}

export function ColorInheritanceExample() {
  return (
    <div className="space-y-2 text-blue-600 dark:text-blue-400">
      <Subheading>Inherits parent color</Subheading>
    </div>
  );
}
