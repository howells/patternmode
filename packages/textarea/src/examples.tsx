"use client";

import React from "react";
import { Textarea } from "./components/textarea";

export const DefaultExample = () => (
  <Textarea placeholder="Enter your message..." />
);

export const WithContentExample = () => (
  <Textarea defaultValue={"This is some pre-filled content."} />
);

export const WithErrorExample = () => (
  <Textarea hasError placeholder="Has error" />
);

export const WithRowConstraintsExample = () => (
  <Textarea
    autoResize
    maxRows={6}
    minRows={3}
    placeholder="Auto-resize with row constraints"
  />
);

export const DisabledExample = () => (
  <Textarea disabled placeholder="Disabled" />
);

export const FixedHeightExample = () => (
  <Textarea
    autoResize={false}
    placeholder="Fixed height, scrolls when content grows"
    style={{ height: 120 }}
  />
);

export const WithHeightCallbackExample = () => {
  const [height, setHeight] = React.useState(0);
  return (
    <div className="space-y-2">
      <Textarea
        autoResize
        onHeightChange={(h) => setHeight(h)}
        placeholder="Typing here will report height changes..."
      />
      <div className="text-xs text-zinc-500">
        Current height: {Math.round(height)}px
      </div>
    </div>
  );
};
