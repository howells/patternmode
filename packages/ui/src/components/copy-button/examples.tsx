"use client";

import React from "react";
import { CopyButton } from "./component";

export const DefaultExample = () => (
  <CopyButton text="Hello, World!" />
);

export const CustomLabelsExample = () => (
  <CopyButton
    text="console.log('Hello, World!');"
    copyLabel="Copy Code"
    copiedLabel="Code Copied!"
  />
);

export const LongTextExample = () => (
  <CopyButton
    text="This is a longer piece of text that demonstrates how the copy button works with more substantial content that users might want to copy to their clipboard."
    copyLabel="Copy Text"
    copiedLabel="Text Copied!"
  />
);

export const ApiKeyExample = () => (
  <CopyButton
    text="sk-1234567890abcdef1234567890abcdef"
    copyLabel="Copy API Key"
    copiedLabel="Key Copied!"
    className="text-xs"
  />
);
