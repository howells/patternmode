"use client";

import { Separator } from "@patternmode/separator";
import React from "react";
import { ScrollArea } from ".";

export const DefaultExample = () => {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 font-medium text-sm leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
};

export const HorizontalExample = () => {
  return (
    <ScrollArea
      className="w-96 whitespace-nowrap rounded-md border"
      orientation="horizontal"
    >
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => (
          <figure className="shrink-0" key={id}>
            <div className="overflow-hidden rounded-md">
              <div
                className="flex aspect-[3/4] h-fit w-fit items-center justify-center bg-gradient-to-br from-zinc-400 to-purple-600 text-white"
                style={{ width: 150, height: 200 }}
              >
                Photo {id}
              </div>
            </div>
            <figcaption className="pt-2 text-xs text-zinc-600">
              Photo {id}
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  );
};

export const BothDirectionsExample = () => {
  return (
    <ScrollArea className="h-48 w-64 rounded-md border" orientation="both">
      <div className="min-h-96 min-w-96 bg-gradient-to-br from-pink-100 to-zinc-100 p-4">
        <h3 className="mb-4">Large Content Area</h3>
        <p className="mb-4">
          This content area is larger than the container in both width and
          height.
        </p>
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 24 }, (_, i) => i + 1).map((id) => (
            <div
              className="flex h-16 w-16 items-center justify-center rounded bg-zinc-200 text-sm"
              key={id}
            >
              {id}
            </div>
          ))}
        </div>
        <p className="mt-4">
          You can scroll both horizontally and vertically to see all content.
        </p>
      </div>
    </ScrollArea>
  );
};

export const CustomStyledExample = () => {
  return (
    <ScrollArea
      className="h-64 w-72 rounded-md border"
      scrollbarClassName="w-4 bg-zinc-50 dark:bg-zinc-950"
      thumbClassName="bg-zinc-500 hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300"
    >
      <div className="space-y-4 p-4">
        <h4 className="text-zinc-900 dark:text-zinc-100">Custom Scrollbar</h4>
        {Array.from({ length: 30 }, (_, i) => i + 1).map((id) => (
          <div className="rounded-md bg-zinc-50 p-3 dark:bg-zinc-900" key={id}>
            <div className="font-medium text-zinc-900 dark:text-zinc-100">
              Item {id}
            </div>
            <div className="text-zinc-700 text-sm dark:text-zinc-300">
              This item demonstrates custom scrollbar styling with blue theme
              colors.
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
