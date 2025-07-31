"use client";

import { ScrollArea, Separator } from "@patternmode/ui";
import React from "react";

// Config example ID: "default" -> export name: DefaultExample
export function DefaultExample() {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
  );

  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map(tag => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}

// Config example ID: "horizontal" -> export name: HorizontalExample
export function HorizontalExample() {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <figure key={i} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src="/api/placeholder/300/400"
                alt={`Photo ${i + 1}`}
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="pt-2 text-xs text-zinc-600">
              Photo
              {" "}
              {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  );
}

// Additional examples (not referenced in config but good to have)
export function ScrollAreaExample() {
  return (
    <ScrollArea className="h-48 w-full">
      <div className="p-4">
        <p>Content that overflows vertically...</p>
      </div>
    </ScrollArea>
  );
}

export function HorizontalScrollArea() {
  return (
    <ScrollArea orientation="horizontal" className="w-48">
      <div className="flex space-x-4 p-4">
        <div className="min-w-32">Item 1</div>
        <div className="min-w-32">Item 2</div>
        <div className="min-w-32">Item 3</div>
      </div>
    </ScrollArea>
  );
}

export function BothDirectionsScrollArea() {
  return (
    <ScrollArea orientation="both" className="h-48 w-48">
      <div className="min-h-96 min-w-96 p-4">
        <p>Content that overflows in both directions...</p>
      </div>
    </ScrollArea>
  );
}
