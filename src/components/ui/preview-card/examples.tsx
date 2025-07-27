"use client";

import React from "react";
import { PreviewCard } from "./preview-card";

export function PreviewCardExample() {
  return (
    <PreviewCard>
      <div className="p-4">
        <h3 className="font-semibold">Preview Title</h3>
        <p className="text-sm text-zinc-600">
          This is a preview of some content that might be shown in a card
          format.
        </p>
      </div>
    </PreviewCard>
  );
}

export function DefaultExample() {
  return (
    <PreviewCard>
      <img
        src="/placeholder.jpg"
        alt="Preview"
        className="h-32 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold">Card with Image</h3>
        <p className="text-sm text-zinc-600">
          A preview card that includes an image at the top.
        </p>
      </div>
    </PreviewCard>
  );
}
