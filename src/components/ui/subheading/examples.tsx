import React from "react";
import { Subheading } from "@patternmode/ui";

export function DefaultExample() {
  return <Subheading>Getting Started</Subheading>;
}

export function LevelsExample() {
  return (
    <div className="space-y-4">
      <Subheading level={1}>Level 1 Subheading</Subheading>
      <Subheading level={2}>Level 2 Subheading</Subheading>
      <Subheading level={3}>Level 3 Subheading</Subheading>
      <Subheading level={4}>Level 4 Subheading</Subheading>
    </div>
  );
}

export function WithContentExample() {
  return (
    <div className="space-y-4">
      <Subheading>Introduction</Subheading>
      <p className="text-zinc-600">
        This is the introduction paragraph that follows the subheading.
        It provides context and information about the section.
      </p>

      <Subheading>Key Features</Subheading>
      <ul className="list-disc pl-5 space-y-1 text-zinc-600">
        <li>Feature one description</li>
        <li>Feature two description</li>
        <li>Feature three description</li>
      </ul>
    </div>
  );
}