"use client";

import React from "react";
import { Subheading } from "./component";

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
      <Subheading level={5}>Level 5 Subheading</Subheading>
      <Subheading level={6}>Level 6 Subheading</Subheading>
    </div>
  );
}

export function WithContentExample() {
  return (
    <div className="space-y-4">
      <Subheading>Introduction</Subheading>
      <p className="text-zinc-600 dark:text-zinc-400">
        This is the introduction paragraph that follows the subheading.
        It provides context and information about the section.
      </p>

      <Subheading>Key Features</Subheading>
      <ul className="pl-5 space-y-1 list-disc text-zinc-600 dark:text-zinc-400">
        <li>Feature one description</li>
        <li>Feature two description</li>
        <li>Feature three description</li>
      </ul>
    </div>
  );
}

export function SectionStructureExample() {
  return (
    <article className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-950 dark:text-white mb-2">
          Main Article Title
        </h1>
        <Subheading level={2}>Introduction</Subheading>
        <p className="text-zinc-600 dark:text-zinc-400">
          Article introduction content explaining the main topic and what readers can expect.
        </p>
      </div>

      <div>
        <Subheading level={2}>Main Content</Subheading>
        <Subheading level={3}>Key Points</Subheading>
        <p className="text-zinc-600 dark:text-zinc-400">
          Detailed content with important information and explanations.
        </p>
      </div>

      <div>
        <Subheading level={2}>Conclusion</Subheading>
        <p className="text-zinc-600 dark:text-zinc-400">
          Summary and final thoughts on the topic discussed.
        </p>
      </div>
    </article>
  );
}

export function ColorInheritanceExample() {
  return (
    <div className="space-y-4">
      <div className="text-blue-600">
        <Subheading>Blue Section</Subheading>
      </div>
      <div className="text-green-700">
        <Subheading>Green Section</Subheading>
      </div>
      <div className="text-purple-600">
        <Subheading>Purple Section</Subheading>
      </div>
      <div className="text-zinc-500">
        <Subheading>Muted Section</Subheading>
      </div>
    </div>
  );
}
